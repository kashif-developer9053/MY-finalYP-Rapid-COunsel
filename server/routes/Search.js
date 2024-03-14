// search.js
import express from 'express';
import { searchLawyers } from '../controllers/Search.js';

const router = express.Router();

router.post('/getlawyers', searchLawyers);

export default router;
