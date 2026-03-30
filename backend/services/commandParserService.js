/**
 * Basic Rule-Based Command Parser for CareerCraft AI
 * Extracts key information from natural language job search queries.
 */

export const parseCommand = (command) => {
  const lowercaseCmd = command.toLowerCase().trim();
  
  // Default values
  const result = {
    platform: 'LinkedIn', 
    jobRole: 'Software Engineer',
    location: 'Remote',
    limit: 10,
    taskType: 'search'
  };

  // Platform Detection
  const platforms = {
    'naukri': 'Naukri',
    'indeed': 'Indeed',
    'internshala': 'Internshala',
    'linkedin': 'LinkedIn'
  };
  
  for (const [key, val] of Object.entries(platforms)) {
    if (lowercaseCmd.includes(key)) {
      result.platform = val;
      break;
    }
  }

  // Limit Detection (look for numbers)
  const limitMatch = lowercaseCmd.match(/top (\d+)|(\d+) results|limit (\d+)|(\d+) jobs/);
  if (limitMatch) {
    result.limit = parseInt(limitMatch[1] || limitMatch[2] || limitMatch[3] || limitMatch[4]);
  }

  // Location Detection (look for 'in [Location]' or 'at [Location]')
  const locationMatch = lowercaseCmd.match(/(?:^|\s)(?:in|at|location)\s+([a-z\s]+?)(?:\s(?:on|with|for|at|top|limit|and|save|results)|$)/i);
  if (locationMatch && locationMatch[1]) {
    const loc = locationMatch[1].trim();
    if (loc && !['remote', 'naukri', 'linkedin', 'indeed', 'internshala'].includes(loc)) {
      // Uppercase the first letter of each word for beauty
      result.location = loc.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    }
  }
  if (lowercaseCmd.includes('remote')) result.location = 'Remote';

  // Job Role Detection (Improved Heuristics)
  let role = '';
  if (lowercaseCmd === 'jobs' || lowercaseCmd === 'internships' || lowercaseCmd === 'roles') {
    role = lowercaseCmd;
  } else {
    const roleRegexes = [
      /(?:search|find|for)\s+(.*?)\s+(?:in|at|on|top|limit|jobs|internships|roles)/i,
      /(.*?)\s+(?:jobs|internships|roles|positions|opportunities)/i,
      /(?:search|find|for)\s+(.*)/i
    ];

    for (const regex of roleRegexes) {
      const match = lowercaseCmd.match(regex);
      if (match && match[1]) {
        let potentialRole = match[1].trim();
        // Filter out common filler words and other detected entities
        potentialRole = potentialRole.replace(/top \d+\s*|in .*|at .*|on naukri|on linkedin|on internshala|on indeed/gi, '').trim();
        if (potentialRole && !['show me', 'me', 'some'].includes(potentialRole)) {
          role = potentialRole;
          break;
        }
      }
    }
  }

  if (role) result.jobRole = role;
  else if (lowercaseCmd.length > 2 && !Object.keys(platforms).includes(lowercaseCmd)) {
    result.jobRole = lowercaseCmd.replace(/in .*|at .*|on .*|top \d+/gi, '').trim() || result.jobRole;
  }

  return result;
};
