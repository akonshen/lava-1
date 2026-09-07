import { Router, Request, Response } from 'express';
import { 
  createPaymentIntent, 
  confirmPayment, 
  getPaymentById, 
  handleWebhook, 
  createCheckoutSession, 
  verifyPaymentStatus, 
  processRefund, 
  getPaymentHistory, 
  calculateRevenue,
  getPaymentByGuideId,
  isGuidePaid,
  getRecentPayments,
  getPaymentsByStatus,
  getPaymentStatsByDateRange,
  validatePaymentAmount,
  getPaymentConfig
} from '../services/paymentService';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

// Create payment intent
router.post('/', asyncHandler(async (req: Request, res: Response) => {
  const { guideId, amount, userId } = req.body;

  if (!guideId) {
    return res.status(400).json({ error: 'Guide ID is required' });
  }

  if (amount && !validatePaymentAmount(amount)) {
    return res.status(400).json({ error: 'Invalid payment amount' });
  }

  const { clientSecret, paymentIntentId, amount: paymentAmount, currency } = await createPaymentIntent(guideId, amount, userId);

  res.json({
    clientSecret,
    paymentIntentId,
    amount: paymentAmount,
    currency,
  });
}));

// Create checkout session
router.post('/checkout', asyncHandler(async (req: Request, res: Response) => {
  const { guideId, successUrl, cancelUrl, userId } = req.body;

  if (!guideId) {
    return res.status(400).json({ error: 'Guide ID is required' });
  }

  const { sessionId, url } = await createCheckoutSession(
    guideId,
    successUrl || `${process.env.APP_URL}/payment/success`,
    cancelUrl || `${process.env.APP_URL}/payment/cancel`,
    userId
  );

  res.json({
    sessionId,
    url,
    amount: getPaymentConfig().amount / 100,
    currency: getPaymentConfig().currency.toUpperCase(),
  });
}));

// Confirm payment
router.post('/confirm', asyncHandler(async (req: Request, res: Response) => {
  const { paymentIntentId } = req.body;

  if (!paymentIntentId) {
    return res.status(400).json({ error: 'Payment Intent ID is required' });
  }

  const payment = await confirmPayment(paymentIntentId);

  if (!payment) {
    return res.status(404).json({ error: 'Payment not found' });
  }

  res.json(payment);
}));

// Get payment by ID
router.get('/:id', asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payment = await getPaymentById(id);

  if (!payment) {
    return res.status(404).json({ error: 'Payment not found' });
  }

  res.json(payment);
}));

// Verify payment status
router.get('/:id/verify', asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payment = await getPaymentById(id);

  if (!payment) {
    return res.status(404).json({ error: 'Payment not found' });
  }

  const status = await verifyPaymentStatus(payment.stripePaymentId);

  res.json({
    paymentId: id,
    ...status,
  });
}));

// Check if guide is paid
router.get('/guide/:guideId/paid', asyncHandler(async (req: Request, res: Response) => {
  const { guideId } = req.params;
  const paid = await isGuidePaid(guideId);
  const payment = await getPaymentByGuideId(guideId);

  res.json({
    guideId,
    paid,
    payment: payment || null,
  });
}));

// Process refund
router.post('/:id/refund', asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { amount, reason } = req.body;

  const result = await processRefund(id, amount, reason);

  if (!result.success) {
    return res.status(400).json({ error: result.error });
  }

  res.json({
    paymentId: id,
    refundId: result.refundId,
    success: true,
  });
}));

// Get payment history for a user
router.get('/user/:userId/history', asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { page, limit, status } = req.query;

  const history = await getPaymentHistory(userId, {
    page: page ? parseInt(page as string) : 1,
    limit: limit ? parseInt(limit as string) : 10,
    status: status as string,
  });

  res.json(history);
}));

// Get recent payments
router.get('/admin/recent', asyncHandler(async (req: Request, res: Response) => {
  const { limit } = req.query;
  const payments = await getRecentPayments(limit ? parseInt(limit as string) : 10);
  res.json(payments);
}));

// Get payments by status
router.get('/admin/status/:status', asyncHandler(async (req: Request, res: Response) => {
  const { status } = req.params;
  const payments = await getPaymentsByStatus(status as any);
  res.json(payments);
}));

// Get payment statistics by date range
router.get('/admin/stats/date-range', asyncHandler(async (req: Request, res: Response) => {
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    return res.status(400).json({ error: 'Start date and end date are required' });
  }

  const stats = await getPaymentStatsByDateRange(
    new Date(startDate as string),
    new Date(endDate as string)
  );

  res.json(stats);
}));

// Get revenue statistics
router.get('/admin/revenue', asyncHandler(async (req: Request, res: Response) => {
  const stats = await calculateRevenue();
  res.json(stats);
}));

// Get payment configuration
router.get('/config', asyncHandler(async (req: Request, res: Response) => {
  const config = getPaymentConfig();
  res.json({
    amount: config.amount / 100,
    currency: config.currency.toUpperCase(),
    productName: config.productName,
  });
}));

// Stripe webhook
router.post('/webhook', asyncHandler(async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'] as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  // In production, verify the webhook signature
  // const event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  
  // For development, just use the body directly
  const event = req.body;

  await handleWebhook(event);

  res.json({ received: true });
}));

export default router;
