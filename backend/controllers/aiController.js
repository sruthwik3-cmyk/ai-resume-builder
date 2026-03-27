import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

let ai;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
}

export const improveSummary = async (req, res) => {
  const { summary } = req.body;
  if (!summary) return res.status(400).json({ message: 'Summary is required' });

  if (!ai) {
    return res.json({ improvedSummary: "[DEMO] To get real AI suggestions, please add your free GEMINI_API_KEY to the backend .env file. \n\nHere is what you wrote: " + summary });
  }

  try {
    const prompt = `You are an expert resume writer. The user has written a draft professional summary that may contain spelling errors, bad grammar, or be a very short "rough draft" sentence. 
Your task: Auto-correct all errors, fix the grammar, and rewrite it into a highly professional, impactful, yet natural and human-sounding resume summary. 
Do not sound overly robotic. Return ONLY the final polished paragraph. No conversational filler or intro text.

User's Draft:
${summary}`;
    const response = await ai.models.generateContent({ model: 'gemini-1.5-flash', contents: prompt });
    res.json({ improvedSummary: response.text });
  } catch (err) {
    res.status(500).json({ message: 'AI generation failed', error: err.message });
  }
};

export const suggestSkills = async (req, res) => {
  const { role } = req.body;
  if (!role) return res.status(400).json({ message: 'Job role is required' });

  if (!ai) {
    let mockSkills = ['JavaScript', 'React', 'Node.js', 'Team Collaboration'];
    if (role.toLowerCase().includes('frontend')) mockSkills = ['React', 'Vue', 'HTML/CSS', 'TypeScript', 'Tailwind CSS'];
    if (role.toLowerCase().includes('backend')) mockSkills = ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Docker'];
    mockSkills.push('(Add GEMINI_API_KEY to .env for real skills)');
    return res.json({ suggestions: mockSkills });
  }

  try {
    const prompt = `List exactly 8 critical skills (hard and soft) for a "${role}". Return ONLY a comma-separated list of the 8 skills. No additional text, bullets, or intro.`;
    const response = await ai.models.generateContent({ model: 'gemini-1.5-flash', contents: prompt });
    const skills = response.text.split(',').map(s => s.trim()).filter(Boolean);
    res.json({ suggestions: skills });
  } catch (err) {
    res.status(500).json({ message: 'AI generation failed', error: err.message });
  }
};

export const improveProject = async (req, res) => {
  const { description } = req.body;
  if (!description) return res.status(400).json({ message: 'Project description is required' });

  if (!ai) {
    return res.json({ improvedDescription: "[DEMO] To get real AI suggestions, please add your free GEMINI_API_KEY to the backend .env file. \n\nHere is what you wrote: " + description });
  }

  try {
    const prompt = `You are an expert resume writer. The user has written a draft project description or work experience that may contain spelling errors, bad grammar, or poor formatting.
Your task: Auto-correct all errors, fix the grammar, and rewrite it into professional, action-oriented resume bullet points. Make it sound natural and human-written, but highly impactful (highlighting achievements). 
Use standard bullet points (•) if appropriate. Return ONLY the final polished text, no conversational filler or intro text.

User's Draft:
${description}`;
    const response = await ai.models.generateContent({ model: 'gemini-1.5-flash', contents: prompt });
    res.json({ improvedDescription: response.text });
  } catch (err) {
    res.status(500).json({ message: 'AI generation failed', error: err.message });
  }
};

export const suggestAtsKeywords = async (req, res) => {
  const { role } = req.body;
  if (!role) return res.status(400).json({ message: 'Job role is required' });

  if (!ai) {
    return res.json({ keywords: ['Leadership', 'Agile', 'Communication'] });
  }

  try {
    const prompt = `List exactly 5 ATS-friendly keywords for the job title "${role}". Return ONLY a comma-separated list of the 5 keywords.`;
    const response = await ai.models.generateContent({ model: 'gemini-1.5-flash', contents: prompt });
    const keywords = response.text.split(',').map(s => s.trim()).filter(Boolean);
    res.json({ keywords });
  } catch (err) {
    res.status(500).json({ message: 'AI generation failed', error: err.message });
  }
};

export const reviewResume = async (req, res) => {
  const { resumeData } = req.body;
  if (!resumeData) return res.status(400).json({ message: 'Resume data is required' });

  if (!ai) {
    return res.json({ 
      review: JSON.stringify([
        { severity: "Critical", message: "Add GEMINI_API_KEY to your .env file to unlock the full AI review feature.", category: "general", suggestedContent: "" },
        { severity: "Improvement", message: "Your summary is too brief. Try highlighting your top achievement.", category: "summary", suggestedContent: "Results-driven professional with expertise in [Key Skill]. Proven track record of delivering [Impact] across [Industry]." }
      ])
    });
  }

  try {
    const resumeTextContext = JSON.stringify({
      targetRole: resumeData.personalInfo?.jobTitle,
      summary: resumeData.summary,
      skills: resumeData.skills,
      experience: resumeData.experience?.map(e => ({ title: e.title, description: e.description })),
      education: resumeData.education?.map(e => ({ degree: e.degree })),
      projects: resumeData.projects?.map(p => ({ name: p.name, description: p.description }))
    });

    const prompt = `You are an expert ATS (Applicant Tracking System) software and a senior technical recruiter. 
Review the following resume data and identify gaps, weak descriptions, and structural issues.

Format your response as a JSON ARRAY of objects. Each object must have:
1. "severity": One of "Critical", "Warning", "Improvement", or "Suggestion"
2. "message": A clear explanation of the issue.
3. "category": One of "summary", "skills", "experience", "education", "projects", or "general".
4. "suggestedContent": A specific string that is a high-quality, professional REPLACEMENT for the weak or missing section. 
   - For "summary", this is a full paragraph.
   - For "skills", this is a comma-separated list.
   - For "projects" or "experience", this is a professional, action-oriented description.
   - If the improvement is general or doesn't have a direct replacement, leave this empty.

Do NOT include any text outside the JSON array. Output ONLY the JSON.

Resume Data:
${resumeTextContext}`;

    const response = await ai.models.generateContent({ model: 'gemini-1.5-flash', contents: prompt });
    
    // Clean potential markdown code blocks from response
    let cleanText = response.text.replace(/```json|```/g, '').trim();
    res.json({ review: cleanText });
  } catch (err) {
    res.status(500).json({ message: 'AI Review generation failed', error: err.message });
  }
};

export const generateCoverLetter = async (req, res) => {
  const { resumeData, jobDescription } = req.body;
  if (!resumeData || !jobDescription) {
    return res.status(400).json({ message: 'Resume data and job description are required' });
  }

  if (!ai) {
    return res.json({ coverLetter: "[DEMO] Dear Hiring Manager,\n\nI am writing to express my strong interest in the open position. My background fits perfectly with your requirements.\n\nThank you for your time.\n\nSincerely,\nDemonstration User" });
  }

  try {
    const resumeTextContext = JSON.stringify({
      name: `${resumeData.personalInfo?.firstName} ${resumeData.personalInfo?.lastName}`,
      contact: `${resumeData.personalInfo?.email} | ${resumeData.personalInfo?.phone}`,
      summary: resumeData.summary,
      skills: resumeData.skills,
      experience: resumeData.experience?.map(e => ({ title: e.title, company: e.company, description: e.description }))
    });

    const prompt = `You are an expert career coach and executive assistant. Write a highly tailored, professional, and compelling Cover Letter using the user's Resume Data and the Target Job Description below.

Resume Data:
${resumeTextContext}

Target Job Description:
${jobDescription}

Instructions:
1. Write a standard 3-4 paragraph cover letter.
2. The tone should be confident, professional, and directly highlight ONLY the skills from the resume that match the job description.
3. Keep it natural and human-written. Do not sound overly robotic or generic.
4. Output ONLY the raw text of the cover letter. Do not include any placeholder brackets (like [Company Name] or [Date]). Just infer the company from the JD if possible, or omit it if not explicitly listed.
5. End with a professional sign-off using the name from the Resume Data.`;

    const response = await ai.models.generateContent({ model: 'gemini-1.5-flash', contents: prompt });
    res.json({ coverLetter: response.text });
  } catch (err) {
    res.status(500).json({ message: 'Cover letter generation failed', error: err.message });
  }
};
