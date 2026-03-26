import React, { createContext, useContext, useState, useCallback } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';

const ResumeContext = createContext();

export const useResumeContext = () => useContext(ResumeContext);

export const ResumeProvider = ({ children }) => {
  const [resumes, setResumes] = useState([]);
  const [currentResume, setCurrentResume] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchResumes = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/resumes');
      setResumes(data);
    } catch (error) {
      toast.error('Failed to fetch resumes');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchResumeById = async (id) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/resumes/${id}`);
      setCurrentResume(data);
      return data;
    } catch (error) {
      toast.error('Failed to load resume');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createResume = async (resumeData) => {
    try {
      const { data } = await api.post('/resumes', resumeData);
      setResumes((prev) => [data, ...prev]);
      toast.success('Resume created');
      return data;
    } catch (error) {
      toast.error('Failed to create resume');
      return null;
    }
  };

  const updateResume = async (id, updateData) => {
    try {
      const { data } = await api.put(`/resumes/${id}`, updateData);
      setResumes((prev) => prev.map((r) => (r._id === id ? data : r)));
      if (currentResume?._id === id) {
        setCurrentResume(data);
      }
      return data;
    } catch (error) {
      toast.error('Failed to update resume');
      return null;
    }
  };

  const updateCurrentResumeLocal = (updateFn) => {
    setCurrentResume((prev) => {
      if (!prev) return prev;
      return updateFn(prev);
    });
  };

  const deleteResume = async (id) => {
    try {
      await api.delete(`/resumes/${id}`);
      setResumes((prev) => prev.filter((r) => r._id !== id));
      if (currentResume?._id === id) {
        setCurrentResume(null);
      }
      toast.success('Resume deleted');
      return true;
    } catch (error) {
      toast.error('Failed to delete resume');
      return false;
    }
  };

  const value = {
    resumes,
    currentResume,
    loading,
    fetchResumes,
    fetchResumeById,
    createResume,
    updateResume,
    updateCurrentResumeLocal,
    deleteResume,
    setCurrentResume,
  };

  return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>;
};
