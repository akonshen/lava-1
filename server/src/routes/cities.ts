import { Router, Request, Response } from 'express';
import { CITY_DATA, HOSPITALS, getHospitalsByCity, getHospitalById, getCityByName, getSpecialtyHospitals, searchHospitals } from '../utils/cityData';
import { City } from '../types';

const router = Router();

// Get all cities
router.get('/', (req: Request, res: Response) => {
  try {
    const cities = Object.values(CITY_DATA);
    res.json(cities);
  } catch (error) {
    console.error('Error fetching cities:', error);
    res.status(500).json({ error: 'Failed to fetch cities' });
  }
});

// Get city by ID
router.get('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const city = CITY_DATA[id as City];

    if (!city) {
      return res.status(404).json({ error: 'City not found' });
    }

    res.json(city);
  } catch (error) {
    console.error('Error fetching city:', error);
    res.status(500).json({ error: 'Failed to fetch city' });
  }
});

// Get city by name
router.get('/name/:name', (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const city = getCityByName(name);

    if (!city) {
      return res.status(404).json({ error: 'City not found' });
    }

    res.json(city);
  } catch (error) {
    console.error('Error fetching city:', error);
    res.status(500).json({ error: 'Failed to fetch city' });
  }
});

// Get hospitals in a city
router.get('/:id/hospitals', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const city = CITY_DATA[id as City];

    if (!city) {
      return res.status(404).json({ error: 'City not found' });
    }

    const hospitals = getHospitalsByCity(id as City);
    res.json(hospitals);
  } catch (error) {
    console.error('Error fetching hospitals:', error);
    res.status(500).json({ error: 'Failed to fetch hospitals' });
  }
});

// Get all hospitals
router.get('/hospitals/all', (req: Request, res: Response) => {
  try {
    res.json(HOSPITALS);
  } catch (error) {
    console.error('Error fetching hospitals:', error);
    res.status(500).json({ error: 'Failed to fetch hospitals' });
  }
});

// Get hospital by ID
router.get('/hospitals/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const hospital = getHospitalById(id);

    if (!hospital) {
      return res.status(404).json({ error: 'Hospital not found' });
    }

    res.json(hospital);
  } catch (error) {
    console.error('Error fetching hospital:', error);
    res.status(500).json({ error: 'Failed to fetch hospital' });
  }
});

// Search hospitals by specialty
router.get('/hospitals/specialty/:specialty', (req: Request, res: Response) => {
  try {
    const { specialty } = req.params;
    const hospitals = getSpecialtyHospitals(specialty);
    res.json(hospitals);
  } catch (error) {
    console.error('Error searching hospitals:', error);
    res.status(500).json({ error: 'Failed to search hospitals' });
  }
});

// Search hospitals by query
router.get('/hospitals/search', (req: Request, res: Response) => {
  try {
    const { q } = req.query;
    if (!q || typeof q !== 'string') {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const hospitals = searchHospitals(q);
    res.json(hospitals);
  } catch (error) {
    console.error('Error searching hospitals:', error);
    res.status(500).json({ error: 'Failed to search hospitals' });
  }
});

// Get medical types
router.get('/medical-types/all', (req: Request, res: Response) => {
  try {
    const medicalTypes = [
      { id: 'dental', name: 'Dental Care', description: 'Dental treatments and procedures' },
      { id: 'checkup', name: 'Health Checkup', description: 'Comprehensive health examinations' },
      { id: 'tcm', name: 'Traditional Chinese Medicine', description: 'Acupuncture, herbal medicine, and TCM treatments' },
      { id: 'specialist', name: 'Specialist Visit', description: 'Consultation with medical specialists' },
      { id: 'emergency', name: 'Emergency Care', description: 'Emergency medical services' },
    ];
    res.json(medicalTypes);
  } catch (error) {
    console.error('Error fetching medical types:', error);
    res.status(500).json({ error: 'Failed to fetch medical types' });
  }
});

// Get budget ranges
router.get('/budget-ranges/all', (req: Request, res: Response) => {
  try {
    const budgetRanges = [
      { id: 'budget', name: 'Budget-Friendly', description: 'Affordable options with good quality', multiplier: 0.8 },
      { id: 'moderate', name: 'Moderate', description: 'Balanced cost and quality', multiplier: 1.0 },
      { id: 'premium', name: 'Premium', description: 'High-end services with premium amenities', multiplier: 1.5 },
    ];
    res.json(budgetRanges);
  } catch (error) {
    console.error('Error fetching budget ranges:', error);
    res.status(500).json({ error: 'Failed to fetch budget ranges' });
  }
});

export default router;
