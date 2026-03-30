import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      default: 'Untitled Resume',
    },
    personalInfo: {
      firstName: String,
      lastName: String,
      email: String,
      phone: String,
      address: String,
      jobTitle: String,
      photo: String,
    },
    summary: {
      type: String,
      default: '',
    },
    education: [
      {
        institution: String,
        degree: String,
        fieldOfStudy: String,
        startDate: String,
        endDate: String,
        description: String,
      },
    ],
    skills: [String],
    projects: [
      {
        name: String,
        description: String,
        link: String,
        technologies: [String],
      },
    ],
    experience: [
      {
        company: String,
        title: String,
        location: String,
        startDate: String,
        endDate: String,
        current: Boolean,
        description: String,
      },
    ],
    certifications: [
      {
        name: String,
        issuer: String,
        date: String,
        url: String,
      },
    ],
    achievements: [String],
    languages: [
      {
        language: String,
        proficiency: String,
      },
    ],
    socialLinks: {
      linkedin: String,
      github: String,
      portfolio: String,
      twitter: String,
    },
    hobbies: [String],
    selectedTemplate: {
      type: String,
      default: 'modern',
      enum: ['modern', 'minimal', 'creative', 'ats', 'elite', 'executive', 'classic'],
    },
  },
  {
    timestamps: true,
  }
);

const Resume = mongoose.model('Resume', resumeSchema);
export default Resume;
