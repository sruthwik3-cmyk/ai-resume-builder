import React from 'react';

const MinimalTemplate = ({ data, preview = false }) => {
  return (
    <div className={`bg-white text-gray-800 ${preview ? 'p-4 text-xs' : 'p-10 sm:p-14 text-sm'} font-serif max-w-4xl mx-auto h-full break-words`} id="resume-preview">
      <div className="text-center mb-8 pb-6 border-b border-gray-300">
        <h1 className={`${preview ? 'text-2xl' : 'text-4xl'} font-normal text-gray-900 tracking-widest uppercase mb-2`}>
          {data.personalInfo?.firstName} {data.personalInfo?.lastName}
        </h1>
        <div className={`flex flex-wrap justify-center gap-x-4 gap-y-1 ${preview ? 'text-[10px]' : 'text-sm'} text-gray-500`}>
          {data.personalInfo?.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo?.phone && <span>| {data.personalInfo.phone}</span>}
          {data.personalInfo?.address && <span>| {data.personalInfo.address}</span>}
        </div>
        <div className={`flex flex-wrap justify-center gap-x-4 gap-y-1 mt-1 ${preview ? 'text-[10px]' : 'text-sm'} text-gray-500`}>
          {data.socialLinks?.linkedin && <span>LinkedIn: {data.socialLinks.linkedin}</span>}
          {data.socialLinks?.github && <span>| GitHub: {data.socialLinks.github}</span>}
        </div>
      </div>

      {data.summary && (
        <div className="mb-6 break-inside-avoid">
          <p className="text-gray-700 leading-relaxed text-center italic">{data.summary}</p>
        </div>
      )}

      {data.experience && data.experience.length > 0 && (
        <div className="mb-8">
          <h3 className={`${preview ? 'text-sm' : 'text-lg'} font-semibold text-gray-900 uppercase tracking-widest border-b border-gray-200 pb-1 mb-4`}>
            Experience
          </h3>
          <div className="space-y-5">
            {data.experience.map((exp, index) => (
              <div key={index} className="break-inside-avoid">
                <div className="flex justify-between items-baseline mb-0.5">
                  <h4 className="font-semibold text-gray-900">{exp.company}</h4>
                  <span className={`${preview ? 'text-[10px]' : 'text-sm'} text-gray-600 italic`}>
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-gray-700 italic">{exp.title}</span>
                  {exp.location && <span className={`${preview ? 'text-[10px]' : 'text-sm'} text-gray-500`}>{exp.location}</span>}
                </div>
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.education && data.education.length > 0 && (
        <div className="mb-8">
          <h3 className={`${preview ? 'text-sm' : 'text-lg'} font-semibold text-gray-900 uppercase tracking-widest border-b border-gray-200 pb-1 mb-4`}>
            Education
          </h3>
          <div className="space-y-4">
            {data.education.map((edu, index) => (
              <div key={index} className="break-inside-avoid">
                <div className="flex justify-between items-baseline mb-0.5">
                  <h4 className="font-semibold text-gray-900">{edu.institution}</h4>
                  <span className={`${preview ? 'text-[10px]' : 'text-sm'} text-gray-600 italic`}>
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
                <div className="mb-1 text-gray-700 italic">
                  <span>{edu.degree} in {edu.fieldOfStudy}</span>
                </div>
                {edu.description && <p className="text-gray-700 leading-relaxed">{edu.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {data.projects && data.projects.length > 0 && (
        <div className="mb-8">
          <h3 className={`${preview ? 'text-sm' : 'text-lg'} font-semibold text-gray-900 uppercase tracking-widest border-b border-gray-200 pb-1 mb-4`}>
            Projects
          </h3>
          <div className="space-y-4">
            {data.projects.map((proj, index) => (
              <div key={index} className="break-inside-avoid">
                <div className="flex items-baseline gap-2 mb-1">
                  <h4 className="font-semibold text-gray-900">{proj.name}</h4>
                  {proj.link && <span className="text-gray-400">|</span>}
                  {proj.link && <span className={`${preview ? 'text-[10px]' : 'text-sm'} text-gray-600 italic`}>{proj.link}</span>}
                </div>
                <p className="text-gray-700 mb-1 whitespace-pre-wrap leading-relaxed">{proj.description}</p>
                {proj.technologies && proj.technologies.length > 0 && (
                  <p className={`${preview ? 'text-[10px]' : 'text-[13px]'} text-gray-500`}>
                    Technologies: {proj.technologies.join(', ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {data.skills && data.skills.length > 0 && (
        <div className="mb-8 break-inside-avoid">
          <h3 className={`${preview ? 'text-sm' : 'text-lg'} font-semibold text-gray-900 uppercase tracking-widest border-b border-gray-200 pb-1 mb-4`}>
            Skills
          </h3>
          <p className="text-gray-700 leading-relaxed">
            {data.skills.join(' • ')}
          </p>
        </div>
      )}
    </div>
  );
};

export default MinimalTemplate;
