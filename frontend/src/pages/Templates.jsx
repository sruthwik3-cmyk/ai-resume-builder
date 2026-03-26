import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResumeContext } from '../context/ResumeContext';
import ModernTemplate from '../templates/ModernTemplate';
import MinimalTemplate from '../templates/MinimalTemplate';
import CreativeTemplate from '../templates/CreativeTemplate';
import AtsTemplate from '../templates/AtsTemplate';
import { Check, Edit3 } from 'lucide-react';

const mockData = {
  personalInfo: { firstName: 'Jane', lastName: 'Doe', jobTitle: 'Software Engineer', email: 'jane@example.com', phone: '+1 234 567 8900', address: 'San Francisco, CA' },
  summary: 'Passionate software engineer with 5+ years of experience building scalable web applications. Strong expertise in React, Node.js, and cloud architectures.',
  education: [{ institution: 'Stanford University', degree: 'B.S.', fieldOfStudy: 'Computer Science', startDate: '2015', endDate: '2019' }],
  experience: [{ title: 'Senior Developer', company: 'TechCorp Inc.', location: 'San Francisco', startDate: '2020', endDate: 'Present', current: true, description: 'Led frontend team in migrating legacy app to React.\nImproved load times by 40%.' }],
  skills: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'AWS', 'GraphQL'],
  projects: [{ name: 'E-commerce Platform', description: 'Built an end-to-end shopping platform serving 10k users.', technologies: ['React', 'Node.js', 'MongoDB'] }],
};

const templates = [
  { id: 'modern', name: 'Modern Professional', Component: ModernTemplate },
  { id: 'minimal', name: 'Minimal Clean', Component: MinimalTemplate },
  { id: 'creative', name: 'Creative Sidebar', Component: CreativeTemplate },
  { id: 'ats', name: 'ATS Friendly', Component: AtsTemplate },
];

const Templates = () => {
  const navigate = useNavigate();
  const { createResume } = useResumeContext();
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [loading, setLoading] = useState(false);

  const handleUseTemplate = async () => {
    setLoading(true);
    const resume = await createResume({
      title: `${templates.find(t => t.id === selectedTemplate)?.name} Resume`,
      selectedTemplate,
    });
    setLoading(false);
    if (resume) {
      navigate(`/builder/${resume._id}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-4">Choose Your Resume Template</h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          Select a template to get started. All templates are ATS-optimized and easily customizable later.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/4 space-y-4">
          <h2 className="text-lg font-bold mb-4 uppercase tracking-wider text-gray-500">Available Templates</h2>
          {templates.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedTemplate(t.id)}
              className={`w-full text-left p-4 rounded-xl transition-all border-2 ${
                selectedTemplate === t.id
                  ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 font-bold'
                  : 'border-transparent bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              <div className="flex justify-between items-center">
                <span>{t.name}</span>
                {selectedTemplate === t.id && <Check size={18} />}
              </div>
            </button>
          ))}
          
          <button
            onClick={handleUseTemplate}
            disabled={loading}
            className="w-full mt-8 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-4 rounded-xl transition-colors flex justify-center items-center shadow-lg shadow-indigo-600/30"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Edit3 size={20} className="mr-2" /> Use This Template
              </>
            )}
          </button>
        </div>

        <div className="w-full md:w-3/4">
          <div className="bg-gray-200 dark:bg-gray-800 p-4 sm:p-8 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center min-h-[600px]">
            <div className="w-full max-w-[210mm] bg-white text-black shadow-xl scale-[0.5] sm:scale-75 md:scale-[0.85] origin-top transition-all duration-300 h-auto min-h-[297mm]">
              {templates.map((t) => (
                <div key={t.id} className={selectedTemplate === t.id ? 'block' : 'hidden'}>
                  <t.Component data={mockData} preview={true} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Templates;
