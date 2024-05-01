// Modifiers route

import { Router } from 'express';
import { pool } from '../db';
const router = Router();

// Get all
router.get('/', (req, res) => {

    res.json("modifiers endpoint");
});



export default router;
