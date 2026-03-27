import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Shield, Camera, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

import { motion } from 'framer-motion';

const Profile = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    toast.success('Profile updated successfully (Mock Edition)');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
          Account Settings
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">Manage your professional identity and security.</p>
      </motion.div>

      <div className="grid md:grid-cols-12 gap-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="md:col-span-4"
        >
          <div className="glass-card p-8 flex flex-col items-center text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
            
            <div className="relative w-32 h-32 rounded-3xl bg-indigo-50 dark:bg-indigo-900/40 flex items-center justify-center mb-6 text-indigo-600 dark:text-indigo-400 group-hover:scale-105 transition-transform duration-500 shadow-inner">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full rounded-3xl object-cover" />
              ) : (
                <User size={56} />
              )}
              <button className="absolute -bottom-2 -right-2 bg-indigo-600 text-white p-2.5 rounded-2xl border-4 border-white dark:border-slate-900 hover:bg-indigo-700 transition-all shadow-xl hover:scale-110">
                <Camera size={16} />
              </button>
            </div>
            
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{user?.name}</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 font-medium">{user?.email}</p>
            
            <div className="flex flex-col w-full gap-3 mt-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/50">
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">Status</span>
                <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 bg-white dark:bg-slate-900 px-2 py-0.5 rounded-lg shadow-sm">PREMIUM</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800/50">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Member Since</span>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Mar 2026</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="md:col-span-8 space-y-8"
        >
          <div className="glass-card p-8">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8 flex items-center">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center mr-3 text-indigo-600 dark:text-indigo-400">
                <User size={18} />
              </div>
              Personal Information
            </h3>
            
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input-premium w-full"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      className="input-premium w-full opacity-60 cursor-not-allowed bg-slate-50 dark:bg-slate-900/50"
                      disabled
                    />
                    <Lock size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-2 font-medium flex items-center">
                    <Mail size={12} className="mr-1 text-indigo-500" />
                    Verified account email cannot be legacy-changed
                  </p>
                </div>
              </div>
              
              <div className="pt-4 flex justify-end">
                <button type="submit" className="btn-premium px-10">
                  Save Profile
                </button>
              </div>
            </form>
          </div>

          <div className="glass-card p-10 bg-slate-900 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 text-white/5 group-hover:scale-110 transition-transform duration-700">
              <Shield size={160} />
            </div>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <Shield size={24} className="mr-3 text-indigo-400" />
                Security & Privacy
              </h3>
              <p className="text-slate-400 mb-8 max-w-md font-medium">Protect your account with high-strength encryption and privacy filters.</p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all font-bold text-sm border border-white/10 backdrop-blur-sm">
                  Change Password
                </button>
                <button className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all font-bold text-sm border border-white/10 backdrop-blur-sm">
                  Two-Factor Auth
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
