import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: 'c:/Users/ADMIN/Resume Builder/backend/.env' });

const ResumeSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  title: String
}, { timestamps: true });

const UserSchema = new mongoose.Schema({
  email: String,
  name: String
});

const Resume = mongoose.model('Resume', ResumeSchema);
const User = mongoose.model('User', UserSchema);

async function checkData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const user = await User.findOne({ email: 'sriperambudururuthwik@gmail.com' });
    if (!user) {
      console.log('User not found');
      process.exit(0);
    }
    console.log(`Found User: ${user._id} (${user.name})`);

    const resumes = await Resume.find({ userId: user._id });
    console.log(`Found ${resumes.length} resumes for this user:`);
    resumes.forEach(r => console.log(`- ${r.title} (${r._id})`));

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

checkData();
