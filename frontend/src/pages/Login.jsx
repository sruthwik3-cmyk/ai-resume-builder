import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, Eye, EyeOff, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { GoogleLogin } from '@react-oauth/google';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isResetMode, setIsResetMode] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    const res = await login(data.email, data.password);
    if (res.success) {
      navigate('/dashboard');
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    const res = await googleLogin(credentialResponse.credential);
    if (res.success) {
      navigate('/dashboard');
    }
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('resetEmail');
    const newPassword = formData.get('resetPassword');

    if (!email || !newPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    setResetLoading(true);
    try {
      const { data } = await api.post('/auth/reset-password', { email, newPassword });
      toast.success(data.message);
      setIsResetMode(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Password reset failed');
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4 relative overflow-hidden mesh-gradient">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6 group">
            <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg">
              <ShieldCheck size={24} />
            </div>
            <span className="font-bold text-2xl tracking-tight dark:text-white">AI Resume Pro</span>
          </Link>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
            {isResetMode ? 'Reset Password' : 'Welcome Back'}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            {isResetMode ? 'Enter your email and a new password.' : 'Continue your journey to your dream job.'}
          </p>
        </div>

        <div className="glass-card p-10 rounded-[2.5rem] shadow-2xl relative">
          <div className="mb-6">
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => toast.error('Google Login Failed')}
                theme="filled_blue"
                shape="pill"
                text="continue_with"
                width="100%"
              />
            </div>
            <div className="relative mt-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
              </div>
              <div className="relative flex justify-center text-sm uppercase">
                <span className="px-2 bg-white dark:bg-slate-900 text-slate-500 font-bold">Or continue with email</span>
              </div>
            </div>
          </div>
          {!isResetMode ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 ml-1">Email Address</label>
                <div className="relative">
                  <input
                    {...register('email')}
                    type="email"
                    className={`input-premium pl-4 pr-4 ${errors.email ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                    placeholder="name@company.com"
                  />
                </div>
                {errors.email && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-xs mt-2 font-bold ml-1">{errors.email.message}</motion.p>}
              </div>

              <div>
                <div className="flex justify-between items-center mb-2 ml-1">
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">Password</label>
                  <button 
                    type="button"
                    onClick={() => setIsResetMode(true)}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    {...register('password')}
                    type={showPassword ? "text" : "password"}
                    className={`input-premium pl-4 pr-12 ${errors.password ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                    placeholder="••••••••"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-xs mt-2 font-bold ml-1">{errors.password.message}</motion.p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-premium py-4 text-lg flex justify-center items-center shadow-indigo-600/30 group"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 ml-1">Email Address</label>
                <input
                  name="resetEmail"
                  type="email"
                  className="input-premium"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 ml-1">New Password</label>
                <input
                  name="resetPassword"
                  type="password"
                  className="input-premium"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setIsResetMode(false)}
                  className="flex-1 px-4 py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={resetLoading}
                  className="flex-[2] btn-premium py-4 text-sm font-bold flex justify-center items-center"
                >
                  {resetLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Reset Password'}
                </button>
              </div>
            </form>
          )}

          <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
              New to AI Resume Pro?{' '}
              <Link to="/signup" className="text-indigo-600 hover:text-indigo-500 hover:underline underline-offset-4 decoration-2 transition-all">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
