import React from 'react';

const AtsTemplate = ({ data, preview = false }) => {
  return (
    <div className={`bg-white text-black ${preview ? 'p-4 text-xs' : 'p-10 sm:p-12 text-sm'} font-sans max-w-4xl mx-auto h-full overflow-hidden break-words`} id="resume-preview">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className={`${preview ? 'text-2xl' : 'text-4xl'} font-bold mb-1 uppercase tracking-tight`}>
          {data.personalInfo?.firstName} {data.personalInfo?.lastName}
        </h1>
        {data.personalInfo?.jobTitle && (
          <h2 className={`${preview ? 'text-lg' : 'text-xl'} mb-2`}>{data.personalInfo.jobTitle}</h2>
        )}
        <div className={`flex flex-wrap justify-center gap-2 ${preview ? 'text-[10px]' : 'text-sm'} leading-relaxed`}>
          {data.personalInfo?.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo?.phone && <span>| {data.personalInfo.phone}</span>}
          {data.personalInfo?.address && <span>| {data.personalInfo.address}</span>}
        </div>
        <div className={`flex flex-wrap justify-center gap-2 ${preview ? 'text-[10px]' : 'text-sm'}`}>
          {data.socialLinks?.linkedin && <span>| LinkedIn: {data.socialLinks.linkedin}</span>}
          {data.socialLinks?.github && <span>| GitHub: {data.socialLinks.github}</span>}
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-4 break-inside-avoid">
          <h3 className={`${preview ? 'text-sm' : 'text-lg'} font-bold border-b-2 border-black pb-1 mb-2 uppercase`}>Summary</h3>
          <p className="text-justify leading-relaxed">{data.summary}</p>
        </div>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <div className="mb-4 break-inside-avoid">
          <h3 className={`${preview ? 'text-sm' : 'text-lg'} font-bold border-b-2 border-black pb-1 mb-2 uppercase`}>Skills</h3>
          <p className="leading-relaxed">{data.skills.join(', ')}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <div className="mb-4">
          <h3 className={`${preview ? 'text-sm' : 'text-lg'} font-bold border-b-2 border-black pb-1 mb-3 uppercase`}>Professional Experience</h3>
          <div className="space-y-4">
            {data.experience.map((exp, index) => (
              <div key={index} className="break-inside-avoid">
                <div className="flex justify-between font-bold">
                  <span>{exp.title}</span>
                  <span>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <div className="flex justify-between italic mb-1 text-gray-800">
                  <span>{exp.company}</span>
                  {exp.location && <span>{exp.location}</span>}
                </div>
                <ul className={`list-disc list-outside pl-4 space-y-1 ${preview ? 'ml-2' : 'ml-4'} text-gray-900`}>
                  {exp.description && exp.description.split('\n').filter(Boolean).map((line, i) => (
                    <li key={i}>{line.replace(/^[-•]\s*/, '')}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <div className="mb-4">
          <h3 className={`${preview ? 'text-sm' : 'text-lg'} font-bold border-b-2 border-black pb-1 mb-3 uppercase`}>Projects</h3>
          <div className="space-y-3">
            {data.projects.map((proj, index) => (
              <div key={index} className="break-inside-avoid">
                <div className="flex justify-between font-bold">
                  <span>{proj.name}</span>
                  {proj.link && <span className="text-gray-600 font-normal">{proj.link}</span>}
                </div>
                {proj.technologies && proj.technologies.length > 0 && (
                  <div className="text-gray-800 italic mb-1 text-[11px] sm:text-sm">Technologies: {proj.technologies.join(', ')}</div>
                )}
                <ul className={`list-disc list-outside pl-4 space-y-1 ${preview ? 'ml-2' : 'ml-4'} text-gray-900`}>
                  {proj.description && proj.description.split('\n').filter(Boolean).map((line, i) => (
                    <li key={i}>{line.replace(/^[-•]\s*/, '')}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <div className="mb-4">
          <h3 className={`${preview ? 'text-sm' : 'text-lg'} font-bold border-b-2 border-black pb-1 mb-3 uppercase`}>Education</h3>
          <div className="space-y-3">
            {data.education.map((edu, index) => (
              <div key={index} className="break-inside-avoid">
                <div className="flex justify-between font-bold">
                  <span>{edu.institution}</span>
                  <span>{edu.startDate} - {edu.endDate}</span>
                </div>
                <div className="italic text-gray-800 flex justify-between">
                  <span>{edu.degree} in {edu.fieldOfStudy}</span>
                </div>
                {edu.description && <p className="mt-1 text-gray-900 whitespace-pre-wrap">{edu.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AtsTemplate;
