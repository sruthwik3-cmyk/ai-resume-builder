import { parseCommand } from './backend/services/commandParserService.js';

const testCases = [
  { name: "Standard LinkedIn", command: "Search Python developer jobs in Bangalore and save top 10 results", expected: { platform: "LinkedIn", jobRole: "python developer", location: "Bangalore", limit: 10 } },
  { name: "Internshala", command: "Find React internships in Mumbai on Internshala", expected: { platform: "Internshala", jobRole: "react", location: "Mumbai", limit: 10 } },
  { name: "Naukri Limit", command: "Search Senior Java roles on Naukri limit 5", expected: { platform: "Naukri", jobRole: "senior java", location: "Remote", limit: 5 } },
  { name: "No Platform", command: "Find UI/UX designer roles at Hyderabad", expected: { platform: "LinkedIn", jobRole: "ui/ux designer", location: "Hyderabad", limit: 10 } },
  { name: "Case Insens.", command: "Search Node.js jobs on linkedin in Delhi", expected: { platform: "LinkedIn", jobRole: "node.js", location: "Delhi", limit: 10 } },
  { name: "Top 20", command: "Show me top 20 Frontend jobs", expected: { platform: "LinkedIn", jobRole: "frontend", location: "Remote", limit: 20 } },
  { name: "Remote", command: "Search remote devops roles on Naukri", expected: { platform: "Naukri", jobRole: "devops", location: "Remote", limit: 10 } },
  { name: "Complex Role", command: "Find Full Stack Developer in Pune", expected: { platform: "LinkedIn", jobRole: "full stack developer", location: "Pune", limit: 10 } },
  { name: "Minimal", command: "jobs", expected: { platform: "LinkedIn", jobRole: "jobs", location: "Remote", limit: 10 } },
  { name: "Platform Only", command: "naukri", expected: { platform: "Naukri", jobRole: "Software Engineer", location: "Remote", limit: 10 } }
];

testCases.forEach((tc) => {
  const r = parseCommand(tc.command);
  const pP = r.platform === tc.expected.platform;
  const lP = r.limit === tc.expected.limit;
  const locP = r.location.toLowerCase().trim() === tc.expected.location.toLowerCase().trim();
  const rP = r.jobRole.toLowerCase().trim().includes(tc.expected.jobRole.toLowerCase().trim());
  
  if (!(pP && lP && locP && rP)) {
    console.log(`FAIL: ${tc.name}`);
    if (!pP) console.log(`  P: "${r.platform}" vs "${tc.expected.platform}"`);
    if (!lP) console.log(`  Lim: ${r.limit} vs ${tc.expected.limit}`);
    if (!locP) console.log(`  L: "${r.location}" vs "${tc.expected.location}"`);
    if (!rP) console.log(`  R: "${r.jobRole}" vs "${tc.expected.jobRole}"`);
  } else {
    console.log(`PASS: ${tc.name}`);
  }
});
