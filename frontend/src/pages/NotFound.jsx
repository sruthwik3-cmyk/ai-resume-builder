import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <h1 className="text-9xl font-extrabold text-indigo-600 dark:text-indigo-400 opacity-20 mb-4">404</h1>
      <h2 className="text-3xl font-bold mb-6">Page not found</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
        Sorry, we couldn't find the page you're looking for. Perhaps you've mistyped the URL or the page has been moved.
      </p>
      <Link
        to="/"
        className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-md shadow-indigo-600/20"
      >
        <Home size={20} />
        <span>Return to Home</span>
      </Link>
    </div>
  );
};

export default NotFound;
