import { Router } from 'express';

const router = Router();

router.post('/create-intent', (_req, res) => {
  res.json({ clientSecret: 'pi_secret_stub' });
});

export default router;