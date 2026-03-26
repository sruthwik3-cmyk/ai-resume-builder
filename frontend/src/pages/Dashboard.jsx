import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useResumeContext } from '../context/ResumeContext';
import { FileText, Plus, Clock, Star } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const { resumes, fetchResumes, loading } = useResumeContext();

  useEffect(() => {
    fetchResumes();
  }, [fetchResumes]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {user?.name.split(' ')[0]}!</h1>
          <p className="text-gray-500 mt-1">Here is what's happening with your career documents.</p>
        </div>
        <Link
          to="/builder"
          className="inline-flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold shadow-md transition-colors"
        >
          <Plus size={20} />
          <span>Create New Resume</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="glass p-6 rounded-2xl flex items-center space-x-4">
          <div className="bg-blue-100 dark:bg-blue-900/50 p-4 rounded-xl text-blue-600 dark:text-blue-400">
            <FileText size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Resumes</p>
            <h3 className="text-3xl font-bold">{resumes.length}</h3>
          </div>
        </div>
        
        <div className="glass p-6 rounded-2xl flex items-center space-x-4">
          <div className="bg-purple-100 dark:bg-purple-900/50 p-4 rounded-xl text-purple-600 dark:text-purple-400">
            <Star size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Profile Completeness</p>
            <h3 className="text-3xl font-bold">85%</h3>
          </div>
        </div>

        <div className="glass p-6 rounded-2xl flex items-center space-x-4">
          <div className="bg-emerald-100 dark:bg-emerald-900/50 p-4 rounded-xl text-emerald-600 dark:text-emerald-400">
            <Clock size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Last Updated</p>
            <h3 className="text-xl font-bold truncate">
              {resumes.length > 0 ? new Date(resumes[0].updatedAt).toLocaleDateString() : 'Never'}
            </h3>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Recent Resumes</h2>
          <Link to="/resumes" className="text-indigo-600 hover:text-indigo-800 font-medium text-sm">
            View All
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : resumes.length === 0 ? (
          <div className="glass p-12 rounded-2xl text-center border-dashed border-2">
            <FileText size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No resumes yet</h3>
            <p className="text-gray-500 mb-6">Create your first resume to get started</p>
            <Link
              to="/builder"
              className="inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              <Plus size={18} />
              <span>Create Resume</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.slice(0, 3).map((resume) => (
              <div key={resume._id} className="glass group rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100 dark:border-gray-800">
                <div className="bg-gray-100 dark:bg-gray-800 h-40 flex items-center justify-center">
                  <FileText size={48} className="text-gray-300 dark:text-gray-600" />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-1 truncate">{resume.title}</h3>
                  <p className="text-xs text-gray-500 mb-4">
                    Updated {new Date(resume.updatedAt).toLocaleDateString()}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs px-2 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-md font-medium capitalize">
                      {resume.selectedTemplate} Template
                    </span>
                    <Link
                      to={`/builder/${resume._id}`}
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
                    >
                      Edit →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
