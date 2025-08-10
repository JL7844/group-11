import { Router } from 'express';

const router = Router();

router.post('/', (_req, res) => {
  res.status(201).json({});
});

router.get('/', (_req, res) => {
  res.json([]);
});

export default router;