// Mock AI Controller

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const improveSummary = async (req, res) => {
  try {
    const { summary } = req.body;
    await delay(1500); // Simulate API latency

    const improvedSummary = `Experienced and results-driven professional with a strong background in delivering high-quality solutions. Proven ability to collaborate with cross-functional teams and drive project success. Built upon: ${
      summary ? summary.substring(0, 50) + '...' : 'my core competencies.'
    } Adaptable and continuously learning to stay ahead in a fast-paced environment.`;

    res.status(200).json({ improvedSummary });
  } catch (error) {
    res.status(500).json({ message: 'AI Error', error: error.message });
  }
};

export const suggestSkills = async (req, res) => {
  try {
    const { role } = req.body;
    await delay(1200);

    let suggestions = [];
    const roleLower = (role || '').toLowerCase();

    if (roleLower.includes('frontend') || roleLower.includes('react')) {
      suggestions = [
        'React.js', 'Redux', 'TypeScript', 'Tailwind CSS', 'Next.js', 'HTML5/CSS3', 'RESTful APIs', 'Git', 'Jest', 'Responsive Design'
      ];
    } else if (roleLower.includes('backend') || roleLower.includes('node')) {
      suggestions = [
        'Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'Docker', 'AWS', 'REST APIs', 'GraphQL', 'Microservices', 'Redis'
      ];
    } else if (roleLower.includes('data') || roleLower.includes('python')) {
      suggestions = [
        'Python', 'SQL', 'Pandas', 'Machine Learning', 'Data Visualization', 'Tableau', 'Spark', 'TensorFlow', 'ETL', 'Statistical Modeling'
      ];
    } else {
      suggestions = [
        'Project Management', 'Communication', 'Problem Solving', 'Leadership', 'Agile/Scrum', 'Team Collaboration', 'Time Management', 'Critical Thinking'
      ];
    }

    res.status(200).json({ suggestions });
  } catch (error) {
    res.status(500).json({ message: 'AI Error', error: error.message });
  }
};

export const improveProject = async (req, res) => {
  try {
    const { description } = req.body;
    await delay(1500);

    const improvedDescription = 
      "• Engineered a scalable solution that increased efficiency by 30%.\n" +
      "• Architected core modules utilizing modern best practices, reducing technical debt.\n" +
      "• Collaborated with stakeholders to define requirements and deliver ahead of schedule.\n" +
      "• Optimized performance and significantly improved user experience.";

    res.status(200).json({ improvedDescription });
  } catch (error) {
    res.status(500).json({ message: 'AI Error', error: error.message });
  }
};

export const suggestAtsKeywords = async (req, res) => {
  try {
    const { role } = req.body;
    await delay(1000);

    const keywords = ['Optimization', 'Leadership', 'Cross-functional Collaboration', 'Continuous Integration', 'Scalability', 'Performance Tuning'];
    res.status(200).json({ keywords });
  } catch (error) {
    res.status(500).json({ message: 'AI Error', error: error.message });
  }
};
