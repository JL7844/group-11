import { Router } from 'express';
import { prisma } from '../services/prisma.js';

const router = Router();

router.get('/', async (req, res) => {
  const q = String(req.query.q || '').trim();
  const location = String(req.query.location || '').trim();
  const minYears = req.query.minYears ? Number(req.query.minYears) : undefined;
  const minRating = req.query.minRating ? Number(req.query.minRating) : undefined;

  const where: any = {};
  if (q) {
    where.OR = [
      { user: { name: { contains: q, mode: 'insensitive' } } },
      { location: { contains: q, mode: 'insensitive' } },
      { bio: { contains: q, mode: 'insensitive' } },
    ];
  }
  if (location) {
    where.location = { contains: location, mode: 'insensitive' };
  }
  if (typeof minYears === 'number' && !Number.isNaN(minYears)) {
    where.yearsExperience = { gte: minYears };
  }
  if (typeof minRating === 'number' && !Number.isNaN(minRating)) {
    where.rating = { gte: minRating };
  }

  const items = await prisma.lawyerProfile.findMany({
    where,
    include: { user: { select: { id: true, name: true } } },
    take: 50,
  });
  const total = await prisma.lawyerProfile.count({ where });
  res.json({ items, total });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const data = await prisma.lawyerProfile.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, name: true } },
      availability: true,
    },
  });
  if (!data) return res.status(404).json({ error: 'Not found' });
  res.json(data);
});

router.post('/', async (req, res) => {
  res.status(201).json({});
});

router.patch('/:id', async (req, res) => {
  res.json({});
});

export default router;