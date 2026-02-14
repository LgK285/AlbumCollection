# ✨ Kỉ Niệm Của Chúng Mình - Backend

Backend cho ứng dụng quản lý bộ sưu tập ảnh/video kỉ niệm.

## 🚀 Cài Đặt

### 1. Cài đặt MongoDB

**Tùy chọn 1: Cài đặt MongoDB Server trên máy**
- Tải từ https://www.mongodb.com/try/download/community
- Sau khi cài, MongoDB sẽ chạy tại `mongodb://localhost:27017`

**Tùy chọn 2: Dùng MongoDB Atlas (Cloud)**
- Đăng ký tại https://www.mongodb.com/cloud/atlas
- Tạo cluster và lấy connection string
- Đặt vào biến môi trường `MONGODB_URI`

### 2. Cài đặt Dependencies

```bash
cd server
npm install
```

### 3. Chạy Server

```bash
npm run dev
```

Server sẽ chạy tại `http://localhost:5000`

## 📡 API Endpoints

### 1. Upload Ảnh/Video
**POST** `/api/memories/upload`
- **Body:** FormData với `file` và `month`
- **Response:** Memory object

```javascript
const formData = new FormData();
formData.append('file', file);
formData.append('month', '2025-06');
await axios.post('http://localhost:5000/api/memories/upload', formData);
```

### 2. Lấy Tất Cả Memories
**GET** `/api/memories`
- **Response:** Array of memory objects

```javascript
const response = await axios.get('http://localhost:5000/api/memories');
console.log(response.data);
```

### 3. Lấy Memories Theo Tháng
**GET** `/api/memories/month/:month`
- **Response:** Array of memory objects for that month

```javascript
const response = await axios.get('http://localhost:5000/api/memories/month/2025-06');
```

### 4. Xóa Memory
**DELETE** `/api/memories/:id`
- **Response:** Success message

```javascript
await axios.delete('http://localhost:5000/api/memories/:id');
```

## 🗂️ Cấu Trúc Thư Mục

```
server/
├── server.js           # Main server file
├── package.json        # Dependencies
├── models/
│   └── Memory.js       # MongoDB schema
├── routes/
│   └── memories.js     # API routes
└── uploads/            # Uploaded files
```

## 🔧 Biến Môi Trường

Tạo file `.env` trong thư mục `server/` (nếu cần):

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/memories_db
```

## 🎯 Ghi Chú

- File tải lên được lưu trong thư mục `uploads/`
- Hỗ trợ ảnh (JPG, PNG, GIF, WebP) và video (MP4, WebM)
- Kích thước tối đa: 100MB
- Tất cả data được lưu trong MongoDB

---
Made with ❤️
