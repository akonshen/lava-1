import { Request, Response, NextFunction } from 'express';

// Custom error class
export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Error handling middleware
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      statusCode: err.statusCode,
      message: err.message,
    });
  }

  // Handle Stripe errors
  if (err.name === 'StripeError') {
    return res.status(400).json({
      status: 'error',
      statusCode: 400,
      message: 'Payment processing error',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }

  // Handle JSON parse errors
  if (err.name === 'SyntaxError' && 'body' in err) {
    return res.status(400).json({
      status: 'error',
      statusCode: 400,
      message: 'Invalid JSON in request body',
    });
  }

  // Default error
  return res.status(500).json({
    status: 'error',
    statusCode: 500,
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error',
  });
};

// 404 handler
export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    status: 'error',
    statusCode: 404,
    message: `Route ${req.originalUrl} not found`,
  });
};

// Async error wrapper
export const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Request validation middleware
export const validateRequest = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 'error',
        statusCode: 400,
        message: 'Validation error',
        details: error.details.map((d: any) => d.message),
      });
    }
    next();
  };
};

// Rate limiting middleware (simple in-memory implementation)
const requestCounts = new Map<string, { count: number; resetTime: number }>();

export const rateLimiter = (maxRequests: number = 100, windowMs: number = 60000) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || req.connection.remoteAddress || 'unknown';
    const now = Date.now();
    const windowData = requestCounts.get(ip);

    if (!windowData || now > windowData.resetTime) {
      requestCounts.set(ip, { count: 1, resetTime: now + windowMs });
      next();
      return;
    }

    if (windowData.count >= maxRequests) {
      return res.status(429).json({
        status: 'error',
        statusCode: 429,
        message: 'Too many requests',
        retryAfter: Math.ceil((windowData.resetTime - now) / 1000),
      });
    }

    windowData.count++;
    next();
  };
};

// Request logging middleware
export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  const { method, originalUrl } = req;

  res.on('finish', () => {
    const duration = Date.now() - start;
    const { statusCode } = res;
    const log = `${method} ${originalUrl} ${statusCode} ${duration}ms`;
    
    if (statusCode >= 400) {
      console.error(log);
    } else {
      console.log(log);
    }
  });

  next();
};
