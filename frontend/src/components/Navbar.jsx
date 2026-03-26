import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FileText, LogOut, User, Moon, Sun } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial user preference
    if (document.documentElement.classList.contains('dark') || 
        window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="glass sticky top-0 z-50 w-full transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-indigo-600 p-2 rounded-lg text-white">
            <FileText size={24} />
          </div>
          <span className="font-bold text-xl tracking-tight hidden sm:block">AI Resume</span>
        </Link>
        <div className="flex items-center space-x-6">
          <button onClick={toggleTheme} className="text-gray-500 hover:text-indigo-600 transition-colors p-1 rounded-full border border-transparent hover:border-gray-200 dark:hover:border-gray-700 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800">
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          {user ? (
            <>
              <Link to="/dashboard" className="text-sm font-medium hover:text-indigo-500 transition-colors">Dashboard</Link>
              <Link to="/resumes" className="text-sm font-medium hover:text-indigo-500 transition-colors">My Resumes</Link>
              <div className="flex items-center space-x-4 border-l border-gray-200 dark:border-gray-700 pl-4">
                <Link to="/profile" className="flex items-center text-sm font-medium hover:text-indigo-500">
                  <User size={18} className="mr-1" /> Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
                >
                  <LogOut size={18} className="mr-1" /> Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium hover:text-indigo-500 transition-colors">Log In</Link>
              <Link
                to="/signup"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-md shadow-indigo-500/20"
              >
                Sign Up It's Free
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
