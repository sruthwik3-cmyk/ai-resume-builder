import React from 'react';

const CreativeTemplate = ({ data, preview = false }) => {
  return (
    <div className={`bg-gray-50 text-gray-800 ${preview ? 'text-xs' : 'text-sm'} font-sans max-w-4xl mx-auto shadow-md h-full flex flex-col md:flex-row break-words overflow-hidden`} id="resume-preview">
      {/* Sidebar sidebar */}
      <div className={`md:w-1/3 bg-teal-800 text-teal-50 ${preview ? 'p-4' : 'p-8'} flex flex-col`}>
        <div className="mb-8">
          <h1 className={`${preview ? 'text-2xl' : 'text-4xl'} font-bold text-white mb-1 uppercase tracking-wider`}>
            {data.personalInfo?.firstName} <br /> {data.personalInfo?.lastName}
          </h1>
          <h2 className={`${preview ? 'text-sm' : 'text-lg'} text-teal-200 font-medium tracking-widest uppercase mt-2`}>
            {data.personalInfo?.jobTitle}
          </h2>
        </div>

        <div className="mb-8 space-y-3">
          <h3 className={`${preview ? 'text-sm' : 'text-lg'} font-bold border-b border-teal-600 pb-2 mb-4 uppercase tracking-wider text-white`}>Contact</h3>
          {data.personalInfo?.email && <p className="flex flex-col break-all"><span className="text-teal-300 text-[10px] sm:text-xs">Email</span>{data.personalInfo.email}</p>}
          {data.personalInfo?.phone && <p className="flex flex-col"><span className="text-teal-300 text-[10px] sm:text-xs">Phone</span>{data.personalInfo.phone}</p>}
          {data.personalInfo?.address && <p className="flex flex-col"><span className="text-teal-300 text-[10px] sm:text-xs">Location</span>{data.personalInfo.address}</p>}
          {data.socialLinks?.linkedin && <p className="flex flex-col break-all"><span className="text-teal-300 text-[10px] sm:text-xs">LinkedIn</span>{data.socialLinks.linkedin}</p>}
          {data.socialLinks?.github && <p className="flex flex-col break-all"><span className="text-teal-300 text-[10px] sm:text-xs">GitHub</span>{data.socialLinks.github}</p>}
        </div>

        {data.education && data.education.length > 0 && (
          <div className="mb-8">
            <h3 className={`${preview ? 'text-sm' : 'text-lg'} font-bold border-b border-teal-600 pb-2 mb-4 uppercase tracking-wider text-white`}>Education</h3>
            <div className="space-y-4">
              {data.education.map((edu, index) => (
                <div key={index}>
                  <p className="font-bold text-white">{edu.degree}</p>
                  <p className="text-teal-200">{edu.institution}</p>
                  <p className="text-teal-300 text-[10px] sm:text-xs mt-1">{edu.startDate} - {edu.endDate}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.skills && data.skills.length > 0 && (
          <div className="mb-8">
            <h3 className={`${preview ? 'text-sm' : 'text-lg'} font-bold border-b border-teal-600 pb-2 mb-4 uppercase tracking-wider text-white`}>Skills</h3>
            <div className="flex flex-col gap-1">
              {data.skills.map((skill, index) => (
                <span key={index} className="font-medium">{skill}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className={`md:w-2/3 bg-white ${preview ? 'p-4' : 'p-8'} flex flex-col`}>
        {data.summary && (
          <div className="mb-8">
            <h3 className={`${preview ? 'text-sm' : 'text-xl'} font-bold text-teal-800 uppercase tracking-wider mb-3 flex items-center`}>
              <span className="w-8 h-1 bg-teal-500 mr-3 inline-block"></span>
              Profile
            </h3>
            <p className="text-gray-600 leading-relaxed">{data.summary}</p>
          </div>
        )}

        {data.experience && data.experience.length > 0 && (
          <div className="mb-8">
            <h3 className={`${preview ? 'text-sm' : 'text-xl'} font-bold text-teal-800 uppercase tracking-wider mb-5 flex items-center`}>
              <span className="w-8 h-1 bg-teal-500 mr-3 inline-block"></span>
              Experience
            </h3>
            <div className="space-y-6">
              {data.experience.map((exp, index) => (
                <div key={index} className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-3 before:h-3 before:bg-teal-100 before:border-2 before:border-teal-600 before:rounded-full after:content-[''] after:absolute after:left-[5px] after:top-6 after:w-0.5 after:h-full after:bg-teal-100 last:after:hidden">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                    <h4 className={`${preview ? 'text-sm' : 'text-lg'} font-bold text-gray-800`}>{exp.title}</h4>
                    <span className="text-teal-600 font-medium text-[10px] sm:text-xs bg-teal-50 px-2 py-1 rounded inline-block mt-1 sm:mt-0">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="mb-2 text-gray-500 font-medium">
                    {exp.company} {exp.location && <span>| {exp.location}</span>}
                  </div>
                  <p className="text-gray-600 whitespace-pre-wrap">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.projects && data.projects.length > 0 && (
          <div className="mb-8">
            <h3 className={`${preview ? 'text-sm' : 'text-xl'} font-bold text-teal-800 uppercase tracking-wider mb-5 flex items-center`}>
              <span className="w-8 h-1 bg-teal-500 mr-3 inline-block"></span>
              Projects
            </h3>
            <div className="space-y-5">
              {data.projects.map((proj, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold text-teal-700">{proj.name}</h4>
                    {proj.link && <a href={proj.link} className="text-teal-500 hover:underline text-[10px] sm:text-xs overflow-hidden text-ellipsis whitespace-nowrap max-w-[50%]">{proj.link}</a>}
                  </div>
                  <p className="text-gray-600 mb-2 whitespace-pre-wrap text-[11px] sm:text-sm">{proj.description}</p>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {proj.technologies.map((tech, i) => (
                        <span key={i} className="bg-teal-100 text-teal-800 px-2 py-0.5 rounded text-[10px]">{tech}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreativeTemplate;
