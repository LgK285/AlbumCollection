import express from 'express';
import multer from 'multer';
import path from 'path';
import Memory from '../models/Memory.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Cấu hình multer cho upload ảnh/video
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Chỉ cho phép ảnh và video'));
    }
  }
});

// Upload một hoặc nhiều ảnh/video (cùng tháng, cùng album)
const MAX_FILES = 50;

router.post('/upload', (req, res, next) => {
  upload.array('files', MAX_FILES)(req, res, (err) => {
    if (err && err.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({
        message: `Field không hợp lệ: "${err.field}". Server chỉ chấp nhận field tên "files".`,
      });
    }
    if (err) {
      console.error('Multer error:', err);
      return res.status(500).json({ message: err.message || 'Lỗi upload' });
    }
    next();
  });
}, async (req, res) => {
  try {
    const { month, album } = req.body;
    const files = Array.isArray(req.files) ? req.files : [];

    if (files.length === 0) {
      return res.status(400).json({ message: 'Không tìm thấy file nào' });
    }

    if (!month) {
      return res.status(400).json({ message: 'Vui lòng chọn tháng / năm' });
    }

    const albumValue = (album && String(album).trim()) || '';
    const memories = [];

    for (const file of files) {
      const memory = new Memory({
        month,
        album: albumValue,
        filePath: `uploads/${file.filename}`,
        fileType: file.mimetype,
        fileName: file.originalname
      });
      await memory.save();
      memories.push(memory);
    }

    res.status(201).json({
      message: `Đã thêm ${memories.length} ảnh/video`,
      count: memories.length,
      memories
    });
  } catch (error) {
    console.error('Lỗi upload:', error);
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
});

// Lấy tất cả memories
router.get('/', async (req, res) => {
  try {
    const memories = await Memory.find().sort({ uploadedAt: -1 });
    res.json(memories);
  } catch (error) {
    console.error('Lỗi lấy dữ liệu:', error);
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
});

// Lấy memories theo tháng
router.get('/month/:month', async (req, res) => {
  try {
    const { month } = req.params;
    const memories = await Memory.find({ month }).sort({ uploadedAt: -1 });
    res.json(memories);
  } catch (error) {
    console.error('Lỗi lấy dữ liệu:', error);
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
});

// Xóa memory
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const memory = await Memory.findByIdAndDelete(id);
    
    if (!memory) {
      return res.status(404).json({ message: 'Không tìm thấy ảnh' });
    }

    // Xóa file từ server
    // Có thể thêm logic xóa file ở đây nếu cần

    res.json({ message: 'Xóa ảnh thành công' });
  } catch (error) {
    console.error('Lỗi xóa:', error);
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
});

export default router;
