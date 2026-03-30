import express from 'express';
import { runAutomationTask, getAutomationHistory, getAutomationTaskById, exportTaskResults } from '../controllers/automationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * CareerCraft AI Automation Routes
 * All routes are protected by user authentication.
 */

router.use(protect); // Global protection for all automation routes

router.post('/run', runAutomationTask);
router.get('/history', getAutomationHistory);
router.get('/:id', getAutomationTaskById);
router.get('/export/:id', exportTaskResults);

export default router;
