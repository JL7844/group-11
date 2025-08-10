import { Router } from 'express';

const router = Router();

router.post('/register', (_req, res) => {
  res.json({});
});

router.post('/login', (_req, res) => {
  res.json({ token: 'TODO' });
});

export default router;