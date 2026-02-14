# Kỉ Niệm Của Chúng Mình - Ứng Dụng Quản Lý Bộ Sưu Tập Ảnh/Video

Ứng dụng web cho phép bạn tổ chức, lưu trữ và xem những ảnh/video kỉ niệm từ tháng 6 2025 đến tháng 2 2026.

## 🎯 Tính Năng Chính

✅ **Thanh NavBar** - Điều hướng dễ dàng giữa Trang Chủ và Bộ Sưu Tập
✅ **Thêm Ảnh/Video** - Upload ảnh hoặc video với lựa chọn tháng
✅ **Bộ Sưu Tập Có Tổ Chức** - Các ảnh được sắp xếp theo tháng (6/2025 - 2/2026)
✅ **Xem Chi Tiết** - Click vào ảnh để phóng to và xem rõ hơn
✅ **Phóng To Ảnh** - Chức năng zoom in/out và xem video toàn màn hình
✅ **Xóa Ảnh** - Quản lý bộ sưu tập của bạn

## 🏗️ Cấu Trúc Dự Án

```
valentinecuakhanh/
├── src/                          # Frontend (React + Vite)
│   ├── components/
│   │   ├── Navbar.jsx           # Thanh điều hướng
│   │   ├── HomePage.jsx         # Trang chủ - Thêm ảnh
│   │   ├── CollectionPage.jsx   # Bộ sưu tập - Xem ảnh
│   │   └── ImageViewer.jsx      # Modal xem ảnh phóng to
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── server/                       # Backend (Express + MongoDB)
│   ├── server.js                # Main server
│   ├── package.json
│   ├── .env                     # Cấu hình
│   ├── models/
│   │   └── Memory.js            # MongoDB schema
│   ├── routes/
│   │   └── memories.js          # API routes
│   ├── uploads/                 # Thư mục lưu file
│   └── README.md                # Hướng dẫn backend
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 Hướng Dẫn Sử Dụng

### 1. Cài Đặt Dependencies Frontend

```bash
npm install
```

### 2. Cài Đặt MongoDB

**Cách 1: MongoDB Server (Cài trên máy)**
```bash
# Windows
# Tải từ https://www.mongodb.com/try/download/community
# Cài đặt và MongoDB sẽ chạy tại mongodb://localhost:27017
```

**Cách 2: MongoDB Atlas (Cloud - Khuyên Dùng)**
- Truy cập https://www.mongodb.com/cloud/atlas
- Đăng ký tài khoản miễn phí
- Tạo Project và Cluster
- Lấy Connection String
- Đặt vào `server/.env`: `MONGODB_URI=<connection_string>`

### 3. Chạy Backend

```bash
cd server
npm install
npm run dev
```

Server sẽ chạy tại: **http://localhost:5000**

### 4. Chạy Frontend (Terminal mới)

```bash
npm run dev
```

Mở trình duyệt tại: **http://localhost:5173**

## 📱 Cách Sử Dụng Ứng Dụng

### Thêm Ảnh Mới
1. Truy cập **Trang Chủ**
2. Chọn **Tháng** (từ 6/2025 đến 2/2026)
3. Chọn **Ảnh/Video** từ máy
4. Nhấn **Thêm Ảnh**

### Xem Bộ Sưu Tập
1. Truy cập **Bộ Sưu Tập**
2. Nhấn vào **Tháng** để xem ảnh
3. Nhấn vào **Ảnh/Video** để phóng to
4. Dùng nút **Zoom** để phóng to/lùi
5. Nhấn **X** để đóng

### Xóa Ảnh
1. Vào **Bộ Sưu Tập**
2. Di chuột vào ảnh
3. Nhấn **🗑️ Xóa**

## 🔌 API Endpoints

### Upload Ảnh
```
POST http://localhost:5000/api/memories/upload
Body: FormData { file, month }
```

### Lấy Tất Cả Ảnh
```
GET http://localhost:5000/api/memories
```

### Xóa Ảnh
```
DELETE http://localhost:5000/api/memories/:id
```

## 💡 Troubleshooting

### Lỗi kết nối MongoDB
- Kiểm tra MongoDB có chạy không
- Nếu dùng Atlas, kiểm tra connection string trong `.env`
- Kiểm tra IP whitelist trong MongoDB Atlas

### Lỗi upload file
- Kiểm tra kích thước file (tối đa 100MB)
- Kiểm tra định dạng file (ảnh: JPG, PNG; video: MP4)
- Kiểm tra folder `server/uploads` có tồn tại

### Port 5000 đã có sử dụng
- Đổi port trong `server\.env`: `PORT=3000`
- Cập nhật frontend API URL

## 📦 Dependencies

**Frontend:**
- React 19.2.0
- React Router DOM 6.20.0
- Axios 1.6.0
- Tailwind CSS 4.1.18

**Backend:**
- Express 4.18.2
- Mongoose 7.5.0
- Multer 1.4.5
- CORS 2.8.5

## 📝 License

Made with ❤️ for you

---

**Lưu ý:** Hãy đảm bảo cả Frontend và Backend đều đang chạy để ứng dụng hoạt động đầy đủ!
