import { createObjectCsvWriter } from 'csv-writer';
import path from 'path';
import fs from 'fs';

/**
 * Export Service for CareerCraft AI
 * Handles CSV generation for job results and other career assets.
 */

export const generateJobCsv = async (taskId, results) => {
  const exportsDir = path.join(process.cwd(), 'tmp', 'exports');
  
  if (!fs.existsSync(exportsDir)) {
    fs.mkdirSync(exportsDir, { recursive: true });
  }

  const filePath = path.join(exportsDir, `job_results_${taskId}.csv`);
  
  const csvWriter = createObjectCsvWriter({
    path: filePath,
    header: [
      { id: 'title', title: 'Job Title' },
      { id: 'company', title: 'Company' },
      { id: 'location', title: 'Location' },
      { id: 'link', title: 'Link' },
      { id: 'posted', title: 'Posted Date' },
      { id: 'type', title: 'Type' }
    ]
  });

  await csvWriter.writeRecords(results);
  return filePath;
};
