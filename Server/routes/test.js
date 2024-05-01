// Test route

import { Router } from 'express';
const router = Router();

// Test endpoint
router.get('/', (req, res) => {
  res.send('Hello, world!');
});

export default router;
