import { v4 as uuidv4 } from 'uuid';
import prisma from './database';
import { generateGuideContent, generateGuideImages } from './aiService';

// Guide service
export const guideService = {
  // Create a new guide
  async createGuide(userId: string, questionnaireData: any): Promise<any> {
    const guide = await prisma.guide.create({
      data: {
        userId,
        city: questionnaireData.city,
        medicalType: questionnaireData.medicalType,
        budgetRange: questionnaireData.budgetRange,
        travelDates: questionnaireData.travelDates,
        specificNeeds: questionnaireData.specificNeeds,
        medicalHistory: questionnaireData.medicalHistory,
        insurance: questionnaireData.insurance,
        specialRequirements: questionnaireData.specialRequirements,
        status: 'pending',
      },
    });

    return guide;
  },

  // Get guide by ID
  async getGuideById(id: string): Promise<any | null> {
    return prisma.guide.findUnique({ where: { id } });
  },

  // Get user's guides
  async getUserGuides(userId: string, page: number = 1, limit: number = 10): Promise<{ guides: any[]; total: number }> {
    const skip = (page - 1) * limit;

    const [guides, total] = await Promise.all([
      prisma.guide.findMany({
        where: { userId },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.guide.count({ where: { userId } }),
    ]);

    return { guides, total };
  },

  // Generate guide content
  async generateContent(guideId: string): Promise<any> {
    const guide = await prisma.guide.findUnique({ where: { id: guideId } });
    if (!guide) {
      throw new Error('Guide not found');
    }

    // Update status to generating
    await prisma.guide.update({
      where: { id: guideId },
      data: { status: 'generating' },
    });

    try {
      // Generate content using AI
      const questionnaireData = {
        city: guide.city as any,
        medicalType: guide.medicalType as any,
        budgetRange: guide.budgetRange,
        travelDates: guide.travelDates as any,
        specificNeeds: guide.specificNeeds || undefined,
        languagePreference: 'en',
      } as any;

      const content = await generateGuideContent(questionnaireData);

      // Update guide with content
      const updatedGuide = await prisma.guide.update({
        where: { id: guideId },
        data: {
          content: content as any,
          status: 'completed',
        },
      });

      return updatedGuide;
    } catch (error) {
      // Update status to failed
      await prisma.guide.update({
        where: { id: guideId },
        data: { status: 'failed' },
      });
      throw error;
    }
  },

  // Generate guide images
  async generateImages(guideId: string): Promise<any> {
    const guide = await prisma.guide.findUnique({ where: { id: guideId } });
    if (!guide) {
      throw new Error('Guide not found');
    }

    const images = await generateGuideImages(guide.city, guide.medicalType);

    const updatedGuide = await prisma.guide.update({
      where: { id: guideId },
      data: { images: images as any },
    });

    return updatedGuide;
  },

  // Update guide
  async updateGuide(guideId: string, updates: any): Promise<any> {
    const guide = await prisma.guide.findUnique({ where: { id: guideId } });
    if (!guide) {
      throw new Error('Guide not found');
    }

    return prisma.guide.update({
      where: { id: guideId },
      data: { ...updates, updatedAt: new Date() },
    });
  },

  // Delete guide
  async deleteGuide(guideId: string): Promise<void> {
    const guide = await prisma.guide.findUnique({ where: { id: guideId } });
    if (!guide) {
      throw new Error('Guide not found');
    }

    await prisma.guide.delete({ where: { id: guideId } });
  },

  // Get guide statistics
  async getGuideStats(): Promise<{
    total: number;
    pending: number;
    generating: number;
    completed: number;
    failed: number;
    byCity: Record<string, number>;
  }> {
    const [total, pending, generating, completed, failed, guidesByCity] = await Promise.all([
      prisma.guide.count(),
      prisma.guide.count({ where: { status: 'pending' } }),
      prisma.guide.count({ where: { status: 'generating' } }),
      prisma.guide.count({ where: { status: 'completed' } }),
      prisma.guide.count({ where: { status: 'failed' } }),
      prisma.guide.groupBy({
        by: ['city'],
        _count: true,
      }),
    ]);

    const byCity: Record<string, number> = {};
    guidesByCity.forEach((item: any) => {
      byCity[item.city] = item._count;
    });

    return { total, pending, generating, completed, failed, byCity };
  },

  // Get all guides (admin)
  async getAllGuides(page: number = 1, limit: number = 10): Promise<{ guides: any[]; total: number }> {
    const skip = (page - 1) * limit;

    const [guides, total] = await Promise.all([
      prisma.guide.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.guide.count(),
    ]);

    return { guides, total };
  },
};

export default guideService;
