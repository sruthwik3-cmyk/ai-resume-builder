import express from 'express';
import {
  improveSummary,
  suggestSkills,
  improveProject,
  suggestAtsKeywords,
  reviewResume,
  generateCoverLetter,
} from '../controllers/aiController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/improve-summary', protect, improveSummary);
router.post('/suggest-skills', protect, suggestSkills);
router.post('/improve-project', protect, improveProject);
router.post('/ats-keywords', protect, suggestAtsKeywords);
router.post('/review-resume', protect, reviewResume);
router.post('/generate-cover-letter', protect, generateCoverLetter);

export default router;
