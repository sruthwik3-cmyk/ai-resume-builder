import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useResumeContext } from '../context/ResumeContext';
import { FileText, Plus, Edit2, Trash2, Copy, Eye, Search } from 'lucide-react';

const MyResumes = () => {
  const { resumes, fetchResumes, deleteResume, createResume, loading } = useResumeContext();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchResumes();
  }, [fetchResumes]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      await deleteResume(id);
    }
  };

  const handleDuplicate = async (resume) => {
    const { _id, createdAt, updatedAt, ...rest } = resume;
    const newResume = { ...rest, title: `${resume.title} (Copy)` };
    const created = await createResume(newResume);
    if (created) {
      navigate(`/builder/${created._id}`);
    }
  };

  const filteredResumes = resumes.filter((r) =>
    r.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">My Resumes</h1>
        <div className="flex space-x-4 w-full md:w-auto">
          <div className="relative flex-grow md:flex-grow-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search resumes..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Link
            to="/builder"
            className="flex flex-shrink-0 items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-md"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">New Resume</span>
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : filteredResumes.length === 0 ? (
        <div className="glass p-16 rounded-2xl text-center border-dashed border-2">
          <FileText size={64} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
          <h3 className="text-2xl font-semibold mb-2">No resumes found</h3>
          <p className="text-gray-500 mb-6">
            {searchTerm ? "We couldn't find any resumes matching your search." : "You haven't created any resumes yet."}
          </p>
          {!searchTerm && (
            <Link
              to="/builder"
              className="inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-bold shadow-md transition-colors"
            >
              <Plus size={20} />
              <span>Create Your First Resume</span>
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResumes.map((resume) => (
            <div key={resume._id} className="glass group rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100 dark:border-gray-800 flex flex-col">
              <div className="bg-gray-100 dark:bg-gray-800 h-48 flex items-center justify-center relative">
                <FileText size={64} className="text-gray-300 dark:text-gray-600" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
                  <Link to={`/builder/${resume._id}`} className="bg-white text-gray-900 p-2 rounded-full hover:scale-110 transition-transform" title="Edit">
                    <Edit2 size={20} />
                  </Link>
                  <button onClick={() => handleDuplicate(resume)} className="bg-white text-gray-900 p-2 rounded-full hover:scale-110 transition-transform" title="Duplicate">
                    <Copy size={20} />
                  </button>
                  <button onClick={() => handleDelete(resume._id)} className="bg-red-500 text-white p-2 rounded-full hover:scale-110 transition-transform" title="Delete">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-lg mb-1 truncate" title={resume.title}>{resume.title}</h3>
                  <p className="text-xs text-gray-500 mb-4">
                    Updated {new Date(resume.updatedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-xs px-2 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-md font-medium capitalize">
                    {resume.selectedTemplate} Template
                  </span>
                  <Link
                    to={`/builder/${resume._id}`}
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center"
                  >
                    Open <Edit2 size={14} className="ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyResumes;
