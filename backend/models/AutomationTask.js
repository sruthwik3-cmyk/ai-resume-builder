import mongoose from 'mongoose';

const AutomationTaskSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  command: {
    type: String,
    required: true
  },
  parsedCommand: {
    platform: String,
    jobRole: String,
    location: String,
    limit: Number,
    taskType: String
  },
  status: {
    type: String,
    enum: ['pending', 'running', 'completed', 'failed'],
    default: 'pending'
  },
  results: {
    type: Array,
    default: []
  },
  error: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const AutomationTask = mongoose.model('AutomationTask', AutomationTaskSchema);
export default AutomationTask;
