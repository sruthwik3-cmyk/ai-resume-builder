import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Shield, Camera } from 'lucide-react';
import toast from 'react-hot-toast';

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
    // In a real app, this would call an API
    toast.success('Profile updated successfully (Mock)');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Account Settings</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="glass p-6 rounded-2xl flex flex-col items-center text-center">
            <div className="relative w-32 h-32 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mb-4 text-indigo-600 dark:text-indigo-400">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
              ) : (
                <User size={64} />
              )}
              <button className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full border-4 border-white dark:border-gray-900 hover:bg-indigo-700 transition-colors">
                <Camera size={16} />
              </button>
            </div>
            <h2 className="text-xl font-bold mb-1">{user?.name}</h2>
            <p className="text-gray-500 text-sm mb-4">{user?.email}</p>
            <span className="px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full text-xs font-bold">
              Pro Member (Free)
            </span>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="glass p-6 rounded-2xl">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <User size={20} className="mr-2 text-indigo-500" />
              Personal Information
            </h3>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-indigo-500 outline-none"
                    disabled
                  />
                  <p className="text-xs text-gray-500 mt-1 flex items-center">
                    <Mail size={12} className="mr-1" />
                    Email cannot be changed currently
                  </p>
                </div>
              </div>
              <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-md mt-4">
                Save Changes
              </button>
            </form>
          </div>

          <div className="glass p-6 rounded-2xl">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Shield size={20} className="mr-2 text-indigo-500" />
              Security
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">New Password</label>
                <input
                  type="password"
                  placeholder="Leave blank to keep current"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <button className="bg-gray-800 dark:bg-gray-700 hover:bg-gray-900 dark:hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-md">
                Update Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
