import mongoose from 'mongoose';

const memorySchema = new mongoose.Schema({
  month: {
    type: String,
    required: true,
    index: true
  },
  album: {
    type: String,
    default: '',
    index: true
  },
  filePath: {
    type: String,
    required: true
  },
  fileType: {
    type: String,
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
    index: true
  }
});

export default mongoose.model('Memory', memorySchema);
