import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus } from 'lucide-react';

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const Signup = () => {
  const { register: registerUserAuth } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    const res = await registerUserAuth(data.name, data.email, data.password);
    if (res.success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full glass p-8 rounded-2xl">
        <div className="text-center mb-10">
          <div className="mx-auto bg-indigo-100 dark:bg-indigo-900/50 w-16 h-16 rounded-full flex items-center justify-center mb-4 text-indigo-600 dark:text-indigo-400">
            <UserPlus size={32} />
          </div>
          <h2 className="text-3xl font-extrabold">Create an account</h2>
          <p className="mt-2 text-sm text-gray-500">Start building your optimal resume</p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              {...register('name')}
              className={`w-full px-4 py-3 rounded-lg border bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-indigo-500 outline-none transition-all ${
                errors.name ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
              }`}
              placeholder="John Doe"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email address</label>
            <input
              {...register('email')}
              className={`w-full px-4 py-3 rounded-lg border bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-indigo-500 outline-none transition-all ${
                errors.email ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
              }`}
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              {...register('password')}
              type="password"
              className={`w-full px-4 py-3 rounded-lg border bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-indigo-500 outline-none transition-all ${
                errors.password ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
              }`}
              placeholder="••••••••"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors flex justify-center items-center h-12 mt-4"
          >
            {isSubmitting ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              'Sign Up'
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 hover:text-indigo-500 font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
