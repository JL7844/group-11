import { Router } from 'express';
import { prisma } from '../services/prisma.js';

const router = Router();

router.post('/', async (req, res) => {
  const { lawyerId, clientId, start, isVirtual } = req.body || {};
  if (!lawyerId || !start) return res.status(400).json({ error: 'lawyerId and start are required' });
  const startDate = new Date(start);
  const endDate = new Date(startDate.getTime() + 30 * 60 * 1000);

  const appointment = await prisma.appointment.create({
    data: {
      lawyerId,
      clientId: clientId || 'anonymous',
      start: startDate,
      end: endDate,
      isVirtual: isVirtual ?? true,
      // status default
    },
  });
  res.status(201).json(appointment);
});

router.get('/', async (_req, res) => {
  const items = await prisma.appointment.findMany({ take: 50 });
  res.json(items);
});

export default router;