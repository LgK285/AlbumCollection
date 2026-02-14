import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import memoriesRouter from './routes/memories.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: '100mb', extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/memories_db';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Kết nối MongoDB thành công');
  })
  .catch((err) => {
    console.error('❌ Lỗi kết nối MongoDB:', err);
    process.exit(1);
  });

// Routes
app.use('/api/memories', memoriesRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server đang chạy' });
});

// Server start
app.listen(PORT, () => {
  console.log(`🚀 Server chạy tại http://localhost:${PORT}`);
  console.log(`📚 MongoDB URI: ${MONGODB_URI}`);
});
