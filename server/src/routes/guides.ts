import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { GuideStatus, CreateGuideRequest } from '../types';
import { generateGuideContent, generateGuideImages } from '../services/aiService';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

// In-memory storage (replace with database in production)
const guides: Map<string, any> = new Map();

// Create a new guide
router.post('/', asyncHandler(async (req: Request, res: Response) => {
  const { questionnaireData }: CreateGuideRequest = req.body;

  if (!questionnaireData) {
    return res.status(400).json({ error: 'Questionnaire data is required' });
  }

  const guideId = uuidv4();
  const guide = {
    id: guideId,
    userId: 'user_' + Date.now(),
    city: questionnaireData.city,
    questionnaireData,
    status: GuideStatus.PENDING,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  guides.set(guideId, guide);

  res.status(201).json({
    id: guideId,
    status: GuideStatus.PENDING,
    paymentRequired: true,
    amount: 6.99,
  });
}));

// Get guide by ID
router.get('/:id', asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const guide = guides.get(id);

  if (!guide) {
    return res.status(404).json({ error: 'Guide not found' });
  }

  res.json(guide);
}));

// Get guide content (generates if not exists)
router.get('/:id/content', asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const guide = guides.get(id);

  if (!guide) {
    return res.status(404).json({ error: 'Guide not found' });
  }

  // Generate content if not exists
  if (!guide.content) {
    guide.status = GuideStatus.GENERATING;
    guides.set(id, guide);

    const content = await generateGuideContent(guide.questionnaireData);
    guide.content = content;
    guide.status = GuideStatus.COMPLETED;
    guide.updatedAt = new Date();
    guides.set(id, guide);
  }

  res.json(guide);
}));

// Generate guide images
router.post('/:id/images', asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const guide = guides.get(id);

  if (!guide) {
    return res.status(404).json({ error: 'Guide not found' });
  }

  const cityName = guide.questionnaireData.city;
  const medicalType = guide.questionnaireData.medicalType;

  const images = await generateGuideImages(cityName, medicalType);
  
  guide.images = images;
  guide.updatedAt = new Date();
  guides.set(id, guide);

  res.json({ images });
}));

// List user's guides
router.get('/', asyncHandler(async (req: Request, res: Response) => {
  // In production, filter by authenticated user
  const userGuides = Array.from(guides.values());
  res.json(userGuides);
}));

// Update guide
router.put('/:id', asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const guide = guides.get(id);

  if (!guide) {
    return res.status(404).json({ error: 'Guide not found' });
  }

  const updates = req.body;
  const updatedGuide = {
    ...guide,
    ...updates,
    updatedAt: new Date(),
  };

  guides.set(id, updatedGuide);

  res.json(updatedGuide);
}));

// Delete a guide
router.delete('/:id', asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const guide = guides.get(id);

  if (!guide) {
    return res.status(404).json({ error: 'Guide not found' });
  }

  guides.delete(id);
  res.json({ message: 'Guide deleted successfully' });
}));

// Get guide statistics
router.get('/stats/overview', asyncHandler(async (req: Request, res: Response) => {
  const allGuides = Array.from(guides.values());
  
  const stats = {
    total: allGuides.length,
    pending: allGuides.filter(g => g.status === GuideStatus.PENDING).length,
    generating: allGuides.filter(g => g.status === GuideStatus.GENERATING).length,
    completed: allGuides.filter(g => g.status === GuideStatus.COMPLETED).length,
    failed: allGuides.filter(g => g.status === GuideStatus.FAILED).length,
    byCity: allGuides.reduce((acc, guide) => {
      acc[guide.city] = (acc[guide.city] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
  };

  res.json(stats);
}));

export default router;
