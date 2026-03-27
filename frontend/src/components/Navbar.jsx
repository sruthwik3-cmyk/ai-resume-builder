import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FileText, LogOut, User, Moon, Sun, Sparkles, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isDark, setIsDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'My Resumes', path: '/resumes' },
    { name: 'Cover Letter', path: '/cover-letter', icon: <Sparkles size={14} className="text-amber-500" /> },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className={`glass rounded-2xl px-6 flex justify-between h-16 items-center transition-all duration-500 ${
          isScrolled ? 'shadow-xl border-white/30' : 'shadow-none border-white/10'
        }`}>
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div 
              whileHover={{ rotate: 10, scale: 1.1 }}
              className="bg-gradient-to-br from-indigo-600 to-purple-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-600/30"
            >
              <FileText size={22} />
            </motion.div>
            <span 
              className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              AI Resume <span className="text-indigo-600 dark:text-indigo-400">Pro</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            <div className="flex items-center space-x-1 mr-4 border-r border-gray-200 dark:border-slate-800 pr-4">
              <button 
                onClick={toggleTheme} 
                className="p-2 rounded-xl text-slate-500 hover:text-indigo-600 hover:bg-white dark:hover:bg-slate-900 transition-all"
                title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>

            {user ? (
              <>
                <div className="flex items-center space-x-1">
                  {navLinks.map((link) => (
                    <Link 
                      key={link.path}
                      to={link.path} 
                      className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                        location.pathname === link.path 
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                        : 'text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-900 hover:text-indigo-600'
                      }`}
                    >
                      {link.icon}
                      {link.name}
                    </Link>
                  ))}
                </div>
                
                <div className="flex items-center space-x-3 ml-4">
                  <Link 
                    to="/profile" 
                    className="flex items-center space-x-2 p-1 pr-3 rounded-full bg-slate-100 dark:bg-slate-900 border border-transparent hover:border-indigo-200 dark:hover:border-indigo-900 transition-all"
                  >
                    {user?.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.name} 
                        className="w-8 h-8 rounded-full object-cover border-2 border-indigo-600 shadow-sm"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-inner">
                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                      </div>
                    )}
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-200 hidden lg:inline-block">
                      {user?.name?.split(' ')[0] || 'Member'}
                    </span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all"
                    title="Logout"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="px-5 py-2 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-indigo-600 transition-colors">
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="btn-premium py-2 px-5 text-sm"
                >
                  Get Started <span className="ml-1 opacity-70">Free</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="md:hidden absolute top-24 left-4 right-4 z-50 p-4 glass rounded-3xl shadow-2xl"
          >
            <div className="flex flex-col space-y-2">
              {user ? (
                <>
                  <div className="flex items-center space-x-3 p-3 mb-2 border-b border-gray-100 dark:border-slate-800">
                    {user?.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.name} 
                        className="w-10 h-10 rounded-full object-cover border-2 border-indigo-600"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                      </div>
                    )}
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{user?.name || 'Member'}</p>
                      <p className="text-xs text-slate-500">{user?.email || '-'}</p>
                    </div>
                  </div>
                  {navLinks.map((link) => (
                    <Link 
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 p-3 rounded-2xl font-bold transition-all ${
                        location.pathname === link.path 
                        ? 'bg-indigo-600 text-white' 
                        : 'text-slate-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-900'
                      }`}
                    >
                      {link.icon || <FileText size={18} />}
                      {link.name}
                    </Link>
                  ))}
                  <Link 
                    to="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-2xl text-slate-600 dark:text-slate-300 font-bold hover:bg-gray-50 dark:hover:bg-slate-900"
                  >
                    <User size={18} />
                    Profile Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 p-3 rounded-2xl text-red-500 font-bold hover:bg-red-50 dark:hover:bg-red-950/30"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-4 text-center font-bold text-slate-600 dark:text-slate-300"
                  >
                    Log In
                  </Link>
                  <Link 
                    to="/signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="btn-premium text-center py-4"
                  >
                    Get Started Free
                  </Link>
                </>
              )}
              <button 
                onClick={toggleTheme}
                className="flex items-center justify-center gap-2 p-3 rounded-2xl text-slate-500 font-bold border border-gray-200 dark:border-slate-800 mt-2"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
                {isDark ? "Light Mode" : "Dark Mode"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
