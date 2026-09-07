import Stripe from 'stripe';
import { v4 as uuidv4 } from 'uuid';
import prisma from './database';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

// Payment configuration
const PAYMENT_CONFIG = {
  amount: 699, // $6.99 in cents
  currency: 'usd',
  productName: 'Medical Travel Guide',
  productDescription: 'AI-generated medical travel guide',
};

// Create payment intent
export async function createPaymentIntent(
  guideId: string,
  amount: number = PAYMENT_CONFIG.amount,
  userId?: string
): Promise<{
  clientSecret: string;
  paymentIntentId: string;
  amount: number;
  currency: string;
}> {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: PAYMENT_CONFIG.currency,
      metadata: {
        guideId,
        userId: userId || 'anonymous',
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    const payment = await prisma.payment.create({
      data: {
        userId: userId || 'anonymous',
        guideId,
        amount: amount / 100,
        currency: PAYMENT_CONFIG.currency.toUpperCase(),
        status: 'pending',
        stripePaymentId: paymentIntent.id,
      },
    });

    return {
      clientSecret: paymentIntent.client_secret || '',
      paymentIntentId: paymentIntent.id,
      amount: payment.amount,
      currency: payment.currency,
    };
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
}

// Confirm payment
export async function confirmPayment(paymentIntentId: string): Promise<any | null> {
  const payment = await prisma.payment.findFirst({
    where: { stripePaymentId: paymentIntentId },
  });

  if (!payment) {
    return null;
  }

  return prisma.payment.update({
    where: { id: payment.id },
    data: { status: 'completed', updatedAt: new Date() },
  });
}

// Get payment by ID
export async function getPaymentById(id: string): Promise<any | null> {
  return prisma.payment.findUnique({ where: { id } });
}

// Get payment by Stripe payment intent ID
export async function getPaymentByStripeId(stripePaymentId: string): Promise<any | null> {
  return prisma.payment.findFirst({ where: { stripePaymentId } });
}

// Get payment by guide ID
export async function getPaymentByGuideId(guideId: string): Promise<any | null> {
  return prisma.payment.findFirst({
    where: {
      guideId,
      status: 'completed',
    },
  });
}

// Check if guide is paid
export async function isGuidePaid(guideId: string): Promise<boolean> {
  const payment = await getPaymentByGuideId(guideId);
  return payment !== null && payment.status === 'completed';
}

// Handle Stripe webhook
export async function handleWebhook(event: Stripe.Event): Promise<void> {
  switch (event.type) {
    case 'payment_intent.succeeded':
      const succeededPayment = event.data.object as Stripe.PaymentIntent;
      await confirmPayment(succeededPayment.id);
      console.log('Payment succeeded:', succeededPayment.id);
      break;

    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object as Stripe.PaymentIntent;
      await handleFailedPayment(failedPayment);
      console.log('Payment failed:', failedPayment.id);
      break;

    case 'charge.refunded':
      const refundedCharge = event.data.object as Stripe.Charge;
      await handleRefund(refundedCharge);
      console.log('Charge refunded:', refundedCharge.id);
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }
}

// Handle failed payment
async function handleFailedPayment(paymentIntent: Stripe.PaymentIntent): Promise<void> {
  const payment = await prisma.payment.findFirst({
    where: { stripePaymentId: paymentIntent.id },
  });

  if (payment) {
    await prisma.payment.update({
      where: { id: payment.id },
      data: { status: 'failed', updatedAt: new Date() },
    });
  }
}

// Handle refund from webhook
async function handleRefund(charge: Stripe.Charge): Promise<void> {
  if (charge.payment_intent) {
    const payment = await prisma.payment.findFirst({
      where: { stripePaymentId: charge.payment_intent as string },
    });

    if (payment) {
      await prisma.payment.update({
        where: { id: payment.id },
        data: { status: 'refunded', updatedAt: new Date() },
      });
    }
  }
}

// Create checkout session for Stripe Checkout
export async function createCheckoutSession(
  guideId: string,
  successUrl: string,
  cancelUrl: string,
  userId?: string
): Promise<{ sessionId: string; url: string }> {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: PAYMENT_CONFIG.currency,
            product_data: {
              name: PAYMENT_CONFIG.productName,
              description: PAYMENT_CONFIG.productDescription,
            },
            unit_amount: PAYMENT_CONFIG.amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        guideId,
        userId: userId || 'anonymous',
      },
    });

    return {
      sessionId: session.id,
      url: session.url || '',
    };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
}

// Verify payment status
export async function verifyPaymentStatus(
  paymentIntentId: string
): Promise<{ paid: boolean; status: string; details?: any }> {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    return {
      paid: paymentIntent.status === 'succeeded',
      status: paymentIntent.status,
      details: {
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        created: paymentIntent.created,
      },
    };
  } catch (error) {
    console.error('Payment verification error:', error);
    return {
      paid: false,
      status: 'error',
    };
  }
}

// Process refund
export async function processRefund(
  paymentId: string,
  amount?: number,
  reason?: string
): Promise<{ success: boolean; refundId?: string; error?: string }> {
  try {
    const payment = await prisma.payment.findUnique({ where: { id: paymentId } });
    if (!payment) {
      return { success: false, error: 'Payment not found' };
    }

    if (payment.status !== 'completed') {
      return { success: false, error: 'Payment is not completed' };
    }

    const refundData: Stripe.RefundCreateParams = {
      payment_intent: payment.stripePaymentId,
    };

    if (amount) {
      refundData.amount = Math.round(amount * 100); // Convert to cents
    }

    if (reason) {
      refundData.reason = reason as Stripe.RefundCreateParams.Reason;
    }

    const refund = await stripe.refunds.create(refundData);

    // Update payment status
    await prisma.payment.update({
      where: { id: paymentId },
      data: { status: 'refunded', updatedAt: new Date() },
    });

    return {
      success: true,
      refundId: refund.id,
    };
  } catch (error) {
    console.error('Refund error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Get payment history for a user
export async function getPaymentHistory(
  userId: string,
  options: {
    page?: number;
    limit?: number;
    status?: string;
  } = {}
): Promise<{ payments: any[]; total: number; page: number; limit: number }> {
  const { page = 1, limit = 10, status } = options;
  const skip = (page - 1) * limit;

  const where: any = { userId };
  if (status) {
    where.status = status;
  }

  const [payments, total] = await Promise.all([
    prisma.payment.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.payment.count({ where }),
  ]);

  return { payments, total, page, limit };
}

// Calculate revenue statistics
export async function calculateRevenue(): Promise<{
  total: number;
  successful: number;
  refunded: number;
  pending: number;
  failed: number;
  averageOrderValue: number;
  successRate: number;
}> {
  const [total, successful, refunded, pending, failed, totalPayments, successfulPayments] = await Promise.all([
    prisma.payment.aggregate({ _sum: { amount: true } }),
    prisma.payment.aggregate({ _sum: { amount: true }, where: { status: 'completed' } }),
    prisma.payment.aggregate({ _sum: { amount: true }, where: { status: 'refunded' } }),
    prisma.payment.aggregate({ _sum: { amount: true }, where: { status: 'pending' } }),
    prisma.payment.aggregate({ _sum: { amount: true }, where: { status: 'failed' } }),
    prisma.payment.count(),
    prisma.payment.count({ where: { status: 'completed' } }),
  ]);

  const totalAmount = total._sum.amount || 0;
  const successfulAmount = successful._sum.amount || 0;
  const refundedAmount = refunded._sum.amount || 0;
  const pendingAmount = pending._sum.amount || 0;
  const failedAmount = failed._sum.amount || 0;

  const averageOrderValue = successfulPayments > 0 ? successfulAmount / successfulPayments : 0;
  const successRate = totalPayments > 0 ? (successfulPayments / totalPayments) * 100 : 0;

  return {
    total: totalAmount,
    successful: successfulAmount,
    refunded: refundedAmount,
    pending: pendingAmount,
    failed: failedAmount,
    averageOrderValue,
    successRate,
  };
}

// Get payment by status
export async function getPaymentsByStatus(status: string): Promise<any[]> {
  return prisma.payment.findMany({
    where: { status },
    orderBy: { createdAt: 'desc' },
  });
}

// Get recent payments
export async function getRecentPayments(limit: number = 10): Promise<any[]> {
  return prisma.payment.findMany({
    take: limit,
    orderBy: { createdAt: 'desc' },
  });
}

// Get payment statistics by date range
export async function getPaymentStatsByDateRange(
  startDate: Date,
  endDate: Date
): Promise<{
  count: number;
  totalAmount: number;
  averageAmount: number;
}> {
  const where = {
    createdAt: {
      gte: startDate,
      lte: endDate,
    },
  };

  const [count, aggregate] = await Promise.all([
    prisma.payment.count({ where }),
    prisma.payment.aggregate({
      where,
      _sum: { amount: true },
      _avg: { amount: true },
    }),
  ]);

  return {
    count,
    totalAmount: aggregate._sum.amount || 0,
    averageAmount: aggregate._avg.amount || 0,
  };
}

// Validate payment amount
export function validatePaymentAmount(amount: number): boolean {
  return amount >= 100 && amount <= 10000; // $1.00 to $100.00
}

// Get payment configuration
export function getPaymentConfig() {
  return { ...PAYMENT_CONFIG };
}
