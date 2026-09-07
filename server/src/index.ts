import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

import guideRoutes from './routes/guides';
import paymentRoutes from './routes/payments';
import cityRoutes from './routes/cities';
import authRoutes from './routes/auth';
import { errorHandler, notFoundHandler, requestLogger, rateLimiter } from './middleware/errorHandler';
import { testDatabaseConnection, seedDatabase, disconnectDatabase } from './services/database';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: [
    process.env.CORS_ORIGIN || 'http://localhost:8081',
    'https://web-preview-taupe.vercel.app',
    'https://web-preview.vercel.app',
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Request logging
app.use(morgan('dev'));
app.use(requestLogger);

// Rate limiting
app.use(rateLimiter(100, 60000)); // 100 requests per minute

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/api/guides', guideRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/cities', cityRoutes);
app.use('/api/auth', authRoutes);

// Health check
app.get('/health', async (req, res) => {
  const dbConnected = await testDatabaseConnection();
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    database: dbConnected ? 'connected' : 'disconnected',
  });
});

// API info endpoint
app.get('/api', (req, res) => {
  res.json({
    name: 'LAVA API',
    version: '1.0.0',
    description: 'Medical Travel Guide API',
    endpoints: {
      guides: '/api/guides',
      payments: '/api/payments',
      cities: '/api/cities',
      auth: '/api/auth',
      health: '/health',
    },
  });
});

// 404 handler
app.use(notFoundHandler);

// Error handling middleware
app.use(errorHandler);

// Start server
async function startServer() {
  try {
    // Test database connection
    const dbConnected = await testDatabaseConnection();
    if (!dbConnected) {
      console.error('Failed to connect to database');
      process.exit(1);
    }

    // Seed database
    await seedDatabase();

    // Start listening
    app.listen(PORT, () => {
      console.log(`🚀 LAVA Server running on port ${PORT}`);
      console.log(`📍 Health check: http://localhost:${PORT}/health`);
      console.log(`📍 API info: http://localhost:${PORT}/api`);
      console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down...');
  await disconnectDatabase();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Shutting down...');
  await disconnectDatabase();
  process.exit(0);
});

startServer();

export default app;
