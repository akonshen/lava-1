import { Router, Request, Response } from 'express';
import { userService } from '../services/userService';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

// Authentication middleware
const authenticate = async (req: Request, res: Response, next: Function) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  const user = await userService.validateSession(token);
  if (!user) {
    return res.status(401).json({ error: 'Invalid or expired session' });
  }

  req.body.user = user;
  next();
};

// User registration
router.post('/register', asyncHandler(async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const { user, token } = await userService.createUser(email, password, name);
    res.status(201).json({ user, token });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Registration failed';
    if (message === 'User already exists') {
      return res.status(409).json({ error: message });
    }
    if (message.includes('password') || message.includes('email')) {
      return res.status(400).json({ error: message });
    }
    throw error;
  }
}));

// User login
router.post('/login', asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const { user, token } = await userService.loginUser(email, password);
    res.json({ user, token });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Login failed';
    if (message === 'Invalid credentials') {
      return res.status(401).json({ error: message });
    }
    throw error;
  }
}));

// User logout
router.post('/logout', authenticate, asyncHandler(async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token) {
    await userService.logoutUser(token);
  }
  res.json({ message: 'Logged out successfully' });
}));

// Logout all sessions
router.post('/logout-all', authenticate, asyncHandler(async (req: Request, res: Response) => {
  const { user } = req.body;
  await userService.logoutAllSessions(user.id);
  res.json({ message: 'All sessions logged out' });
}));

// Get current user
router.get('/me', authenticate, asyncHandler(async (req: Request, res: Response) => {
  const { user } = req.body;
  res.json({ user: userService.sanitizeUser(user) });
}));

// Update user profile
router.put('/profile', authenticate, asyncHandler(async (req: Request, res: Response) => {
  const { user } = req.body;
  const updates = req.body;

  try {
    const updatedUser = await userService.updateProfile(user.id, updates);
    res.json({ user: updatedUser });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Update failed';
    throw new Error(message);
  }
}));

// Change password
router.put('/password', authenticate, asyncHandler(async (req: Request, res: Response) => {
  const { user } = req.body;
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Current and new password are required' });
  }

  try {
    await userService.changePassword(user.id, currentPassword, newPassword);
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Password change failed';
    if (message.includes('incorrect') || message.includes('password')) {
      return res.status(400).json({ error: message });
    }
    throw error;
  }
}));

// Request password reset
router.post('/forgot-password', asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const resetToken = await userService.requestPasswordReset(email);
  
  // In production, send email with reset link
  // For now, just return success
  res.json({ message: 'If the email exists, a reset link has been sent' });
}));

// Reset password
router.post('/reset-password', asyncHandler(async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ error: 'Token and new password are required' });
  }

  try {
    await userService.resetPassword(token, newPassword);
    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Password reset failed';
    if (message.includes('invalid') || message.includes('expired')) {
      return res.status(400).json({ error: message });
    }
    throw error;
  }
}));

// Delete user account
router.delete('/account', authenticate, asyncHandler(async (req: Request, res: Response) => {
  const { user } = req.body;
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ error: 'Password is required to delete account' });
  }

  try {
    await userService.deleteAccount(user.id, password);
    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Account deletion failed';
    if (message.includes('incorrect') || message.includes('password')) {
      return res.status(400).json({ error: message });
    }
    throw error;
  }
}));

// Get user sessions
router.get('/sessions', authenticate, asyncHandler(async (req: Request, res: Response) => {
  const { user } = req.body;
  const sessions = await userService.getUserSessions(user.id);
  res.json({ sessions });
}));

// Get user activity log
router.get('/activity', authenticate, asyncHandler(async (req: Request, res: Response) => {
  const { user } = req.body;
  const { limit } = req.query;
  const activity = await userService.getUserActivity(user.id, limit ? parseInt(limit as string) : 50);
  res.json({ activity });
}));

// Get user's guides
router.get('/guides', authenticate, asyncHandler(async (req: Request, res: Response) => {
  const { user } = req.body;
  // In production, fetch from database
  res.json({ guides: [] });
}));

// Admin routes
router.get('/admin/stats', authenticate, asyncHandler(async (req: Request, res: Response) => {
  const { user } = req.body;
  
  // Check if user is admin
  if (user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }

  const stats = await userService.getUserStats();
  res.json(stats);
}));

router.get('/admin/users', authenticate, asyncHandler(async (req: Request, res: Response) => {
  const { user } = req.body;
  
  // Check if user is admin
  if (user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }

  const { page, limit } = req.query;
  const users = await userService.getAllUsers(
    page ? parseInt(page as string) : 1,
    limit ? parseInt(limit as string) : 10
  );
  res.json(users);
}));

export default router;
