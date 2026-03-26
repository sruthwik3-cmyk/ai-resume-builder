import React from 'react';

const ModernTemplate = ({ data, preview = false }) => {
  return (
    <div className={`bg-white text-gray-900 ${preview ? 'p-4 text-xs' : 'p-8 sm:p-12 text-sm'} font-sans max-w-4xl mx-auto shadow-lg h-full break-words`} id="resume-preview">
      <div className="border-b-4 border-indigo-600 pb-4 mb-6 relative">
        <h1 className={`${preview ? 'text-2xl' : 'text-4xl'} font-bold text-gray-900 uppercase tracking-tight`}>
          {data.personalInfo?.firstName} <span className="text-indigo-600">{data.personalInfo?.lastName}</span>
        </h1>
        {data.personalInfo?.jobTitle && (
          <h2 className={`${preview ? 'text-sm' : 'text-xl'} font-medium text-gray-500 mt-1 uppercase tracking-widest`}>
            {data.personalInfo.jobTitle}
          </h2>
        )}
        <div className={`flex flex-wrap gap-x-4 gap-y-1 mt-3 ${preview ? 'text-[10px]' : 'text-sm'} text-gray-600`}>
          {data.personalInfo?.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo?.phone && <span className="before:content-['•'] before:mr-4">{data.personalInfo.phone}</span>}
          {data.personalInfo?.address && <span className="before:content-['•'] before:mr-4">{data.personalInfo.address}</span>}
          {data.socialLinks?.linkedin && <span className="before:content-['•'] before:mr-4">{data.socialLinks.linkedin}</span>}
          {data.socialLinks?.github && <span className="before:content-['•'] before:mr-4">{data.socialLinks.github}</span>}
        </div>
      </div>

      {data.summary && (
        <div className="mb-6 break-inside-avoid">
          <h3 className={`${preview ? 'text-sm' : 'text-lg'} font-bold text-indigo-700 uppercase tracking-wider mb-2 flex items-center`}>
            <span className="w-6 h-px bg-indigo-600 mr-3 inline-block"></span> Professional Summary
          </h3>
          <p className="text-gray-700 leading-relaxed">{data.summary}</p>
        </div>
      )}

      {data.experience && data.experience.length > 0 && (
        <div className="mb-6">
          <h3 className={`${preview ? 'text-sm' : 'text-lg'} font-bold text-indigo-700 uppercase tracking-wider mb-4 flex items-center`}>
            <span className="w-6 h-px bg-indigo-600 mr-3 inline-block"></span> Experience
          </h3>
          <div className="space-y-4">
            {data.experience.map((exp, index) => (
              <div key={index} className="break-inside-avoid relative pl-4 before:content-[''] before:absolute before:left-0 before:top-1.5 before:w-1.5 before:h-1.5 before:bg-indigo-600 before:rounded-full">
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-bold text-gray-900">{exp.title}</h4>
                  <span className={`${preview ? 'text-[10px]' : 'text-sm'} text-gray-500 font-medium whitespace-nowrap ml-4`}>
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="font-medium text-indigo-600">{exp.company}</span>
                  {exp.location && <span className={`${preview ? 'text-[10px]' : 'text-sm'} text-gray-500`}>{exp.location}</span>}
                </div>
                <p className="text-gray-700 whitespace-pre-wrap">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={`grid ${preview ? 'grid-cols-1' : 'grid-cols-2'} gap-6`}>
        {data.education && data.education.length > 0 && (
          <div className="mb-6">
            <h3 className={`${preview ? 'text-sm' : 'text-lg'} font-bold text-indigo-700 uppercase tracking-wider mb-4 flex items-center`}>
              <span className="w-6 h-px bg-indigo-600 mr-3 inline-block"></span> Education
            </h3>
            <div className="space-y-4">
              {data.education.map((edu, index) => (
                <div key={index} className="break-inside-avoid">
                  <h4 className="font-bold text-gray-900">{edu.degree} in {edu.fieldOfStudy}</h4>
                  <div className="flex justify-between items-baseline mt-1 mb-1">
                    <span className="font-medium text-gray-700">{edu.institution}</span>
                  </div>
                  <span className={`${preview ? 'text-[10px]' : 'text-sm'} text-gray-500 block mb-1`}>
                    {edu.startDate} - {edu.endDate}
                  </span>
                  {edu.description && <p className="text-gray-600 mt-1">{edu.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {data.skills && data.skills.length > 0 && (
          <div className="mb-6">
            <h3 className={`${preview ? 'text-sm' : 'text-lg'} font-bold text-indigo-700 uppercase tracking-wider mb-4 flex items-center`}>
              <span className="w-6 h-px bg-indigo-600 mr-3 inline-block"></span> Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span key={index} className={`bg-gray-100 text-gray-700 ${preview ? 'px-2 py-0.5 text-[10px]' : 'px-3 py-1'} rounded-md font-medium`}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {data.projects && data.projects.length > 0 && (
        <div className="mb-6">
          <h3 className={`${preview ? 'text-sm' : 'text-lg'} font-bold text-indigo-700 uppercase tracking-wider mb-4 flex items-center`}>
            <span className="w-6 h-px bg-indigo-600 mr-3 inline-block"></span> Projects
          </h3>
          <div className="space-y-4">
            {data.projects.map((proj, index) => (
              <div key={index} className="break-inside-avoid">
                <div className="flex items-baseline justify-between mb-1">
                  <h4 className="font-bold text-gray-900">{proj.name}</h4>
                  {proj.link && <a href={proj.link} className={`text-indigo-600 hover:underline ${preview ? 'text-[10px]' : 'text-sm'}`}>{proj.link}</a>}
                </div>
                <p className="text-gray-700 mb-2 whitespace-pre-wrap">{proj.description}</p>
                {proj.technologies && proj.technologies.length > 0 && (
                  <p className={`${preview ? 'text-[10px]' : 'text-sm'} text-gray-500`}>
                    <span className="font-semibold text-gray-700">Tech: </span> 
                    {proj.technologies.join(', ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ModernTemplate;
