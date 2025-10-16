import express from 'express';
import { getJobs, applyJob } from '../controllers/jobController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/', getJobs);
router.post('/:id/apply', protect, applyJob);

export default router;