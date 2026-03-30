import AutomationTask from '../models/AutomationTask.js';
import { parseCommand } from '../services/commandParserService.js';
import { runJobSearch } from '../services/playwrightService.js';
import { generateJobCsv } from '../services/exportService.js';
import path from 'path';

/**
 * CareerCraft AI Automation Controller
 * Handles the lifecycle of task-based job search automations.
 */

export const runAutomationTask = async (req, res) => {
  const { command } = req.body;
  const userId = req.user._id;

  try {
    const parsed = parseCommand(command);
    
    // Initial task creation
    const task = new AutomationTask({
      userId,
      command,
      parsedCommand: parsed,
      status: 'running'
    });
    
    await task.save();
    
    // Respond immediately for async processing (UI will poll or wait)
    res.status(202).json({ success: true, task });

    // Execute in "background"
    try {
      const results = await runJobSearch(parsed);
      task.status = 'completed';
      task.results = results;
      await task.save();
    } catch (err) {
      task.status = 'failed';
      task.error = err.message;
      await task.save();
    }

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAutomationHistory = async (req, res) => {
  try {
    const history = await AutomationTask.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, history });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAutomationTaskById = async (req, res) => {
  try {
    const task = await AutomationTask.findById(req.params.id);
    if (!task) return res.status(404).json({ success: false, message: 'Task not found' });
    res.status(200).json({ success: true, task });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const exportTaskResults = async (req, res) => {
  try {
    const task = await AutomationTask.findById(req.params.id);
    if (!task || task.status !== 'completed') {
      return res.status(404).json({ success: false, message: 'Task results not available for export' });
    }
    
    const filePath = await generateJobCsv(task._id, task.results);
    res.status(200).download(filePath, `job_results_${task._id}.csv`);
    
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
