import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import MyResumes from './pages/MyResumes'
import Profile from './pages/Profile'
import Templates from './pages/Templates'
import CoverLetterGenerator from './pages/CoverLetterGenerator'
import ResumeBuilder from './pages/ResumeBuilder'
import NotFound from './pages/NotFound'

// Helper component to handle conditional layout
const AppContent = () => {
  const location = useLocation();
  const isBuilder = location.pathname.startsWith('/builder');

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-900 selection:bg-indigo-500/30">
      <Toaster position="top-center" toastOptions={{ className: 'dark:bg-gray-800 dark:text-white' }} />
      {!isBuilder && <Navbar />}
      <main className={`flex-grow w-full relative ${isBuilder ? 'h-screen overflow-hidden' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* Dashboard and Core Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/resumes" element={<ProtectedRoute><MyResumes /></ProtectedRoute>} />
          <Route path="/cover-letter" element={<ProtectedRoute><CoverLetterGenerator /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/templates" element={<ProtectedRoute><Templates /></ProtectedRoute>} />
          <Route path="/builder" element={<ProtectedRoute><ResumeBuilder /></ProtectedRoute>} />
          <Route path="/builder/:id" element={<ProtectedRoute><ResumeBuilder /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isBuilder && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
