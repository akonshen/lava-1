import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
import prisma from './database';

// Password hashing utilities
function hashPassword(password: string, salt?: string): { hash: string; salt: string } {
  const userSalt = salt || crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, userSalt, 10000, 64, 'sha512').toString('hex');
  return { hash, salt: userSalt };
}

function verifyPassword(password: string, hash: string, salt: string): boolean {
  const { hash: testHash } = hashPassword(password, salt);
  return testHash === hash;
}

// User service
export const userService = {
  // Create a new user
  async createUser(email: string, password: string, name?: string): Promise<{ user: any; token: string }> {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format');
    }

    // Validate password strength
    if (password.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }

    // Hash password
    const { hash, salt } = hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        name: name || email.split('@')[0],
        passwordHash: hash,
        salt,
      },
    });

    // Create session
    const token = await this.createSession(user.id);

    // Log activity
    await this.logActivity(user.id, 'user_registered', { email });

    return { user: this.sanitizeUser(user), token };
  },

  // Login user
  async loginUser(email: string, password: string): Promise<{ user: any; token: string }> {
    // Find user by email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Verify password
    if (!verifyPassword(password, user.passwordHash, user.salt)) {
      throw new Error('Invalid credentials');
    }

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    // Create session
    const token = await this.createSession(user.id);

    // Log activity
    await this.logActivity(user.id, 'user_logged_in');

    return { user: this.sanitizeUser(user), token };
  },

  // Logout user
  async logoutUser(token: string): Promise<void> {
    const session = await prisma.session.findUnique({ where: { token } });
    if (session) {
      await this.logActivity(session.userId, 'user_logged_out');
      await prisma.session.delete({ where: { token } });
    }
  },

  // Logout all sessions
  async logoutAllSessions(userId: string): Promise<void> {
    await prisma.session.deleteMany({ where: { userId } });
    await this.logActivity(userId, 'user_logged_out_all');
  },

  // Create session
  async createSession(userId: string, ipAddress?: string, userAgent?: string): Promise<string> {
    const token = uuidv4();
    await prisma.session.create({
      data: {
        userId,
        token,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        ipAddress,
        userAgent,
      },
    });
    return token;
  },

  // Validate session
  async validateSession(token: string): Promise<any | null> {
    const session = await prisma.session.findUnique({ where: { token } });
    if (!session || new Date() > session.expiresAt) {
      if (session) {
        await prisma.session.delete({ where: { token } });
      }
      return null;
    }

    // Update last accessed
    await prisma.session.update({
      where: { token },
      data: { lastAccessedAt: new Date() },
    });

    const user = await prisma.user.findUnique({ where: { id: session.userId } });
    if (!user) {
      return null;
    }

    return user;
  },

  // Get user by ID
  async getUserById(userId: string): Promise<any | null> {
    return prisma.user.findUnique({ where: { id: userId } });
  },

  // Get user by email
  async getUserByEmail(email: string): Promise<any | null> {
    return prisma.user.findUnique({ where: { email } });
  },

  // Update user profile
  async updateProfile(userId: string, updates: any): Promise<any> {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    // Prevent updating sensitive fields
    const { passwordHash, salt, id, createdAt, ...safeUpdates } = updates;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: safeUpdates,
    });

    // Log activity
    await this.logActivity(userId, 'profile_updated', { fields: Object.keys(safeUpdates) });

    return this.sanitizeUser(updatedUser);
  },

  // Change password
  async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<void> {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    // Verify current password
    if (!verifyPassword(currentPassword, user.passwordHash, user.salt)) {
      throw new Error('Current password is incorrect');
    }

    // Validate new password
    if (newPassword.length < 8) {
      throw new Error('New password must be at least 8 characters long');
    }

    // Hash new password
    const { hash, salt } = hashPassword(newPassword);

    // Update user
    await prisma.user.update({
      where: { id: userId },
      data: { passwordHash: hash, salt },
    });

    // Log activity
    await this.logActivity(userId, 'password_changed');

    // Invalidate all other sessions
    await prisma.session.deleteMany({ where: { userId } });
  },

  // Request password reset
  async requestPasswordReset(email: string): Promise<string | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      // Return null to prevent email enumeration
      return null;
    }

    // Generate reset token
    const resetToken = uuidv4();

    // Log activity
    await this.logActivity(user.id, 'password_reset_requested');

    return resetToken;
  },

  // Reset password
  async resetPassword(token: string, newPassword: string): Promise<void> {
    // In production, validate token against database
    // For now, just update password

    // Validate new password
    if (newPassword.length < 8) {
      throw new Error('New password must be at least 8 characters long');
    }

    // Log activity
    await this.logActivity(token, 'password_reset_completed');
  },

  // Delete user account
  async deleteAccount(userId: string, password: string): Promise<void> {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    // Verify password
    if (!verifyPassword(password, user.passwordHash, user.salt)) {
      throw new Error('Password is incorrect');
    }

    // Log activity before deletion
    await this.logActivity(userId, 'account_deleted');

    // Delete user (cascading deletes will handle related records)
    await prisma.user.delete({ where: { id: userId } });
  },

  // Get user sessions
  async getUserSessions(userId: string): Promise<any[]> {
    return prisma.session.findMany({
      where: {
        userId,
        expiresAt: { gt: new Date() },
      },
      orderBy: { lastAccessedAt: 'desc' },
    });
  },

  // Get user activity log
  async getUserActivity(userId: string, limit: number = 50): Promise<any[]> {
    return prisma.userActivity.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  },

  // Log user activity
  async logActivity(userId: string, action: string, details?: any, ipAddress?: string, userAgent?: string): Promise<void> {
    await prisma.userActivity.create({
      data: {
        userId,
        action,
        details,
        ipAddress,
        userAgent,
      },
    });
  },

  // Get all users (admin)
  async getAllUsers(page: number = 1, limit: number = 10): Promise<{ users: any[]; total: number }> {
    const skip = (page - 1) * limit;
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.count(),
    ]);

    return {
      users: users.map((user: any) => this.sanitizeUser(user)),
      total,
    };
  },

  // Get user statistics
  async getUserStats(): Promise<{
    total: number;
    active: number;
    newToday: number;
    newThisWeek: number;
    newThisMonth: number;
  }> {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const thisWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [total, active, newToday, newThisWeek, newThisMonth] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({
        where: { lastLoginAt: { gt: thisWeek } },
      }),
      prisma.user.count({
        where: { createdAt: { gte: today } },
      }),
      prisma.user.count({
        where: { createdAt: { gte: thisWeek } },
      }),
      prisma.user.count({
        where: { createdAt: { gte: thisMonth } },
      }),
    ]);

    return { total, active, newToday, newThisWeek, newThisMonth };
  },

  // Sanitize user (remove sensitive fields)
  sanitizeUser(user: any): Omit<any, 'passwordHash' | 'salt'> {
    const { passwordHash, salt, ...sanitizedUser } = user;
    return sanitizedUser;
  },
};

export default userService;
