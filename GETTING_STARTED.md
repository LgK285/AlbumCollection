# 🚀 Hướng Dẫn Chạy Ứng Dụng Kỉ Niệm

## ⚠️ Yêu Cầu Trước

✅ Node.js đã cài (phiên bản 14 trở lên)
✅ NPM đã cài
✅ MongoDB đã cài hoặc đã đăng ký MongoDB Atlas

---

## 📋 Bước 1: Cài Đặt MongoDB

### Cách 1️⃣ - Dùng MongoDB Server (Máy Local)

**Windows:**
1. Tải MongoDB Community từ: https://www.mongodb.com/try/download/community
2. Chọn phiên bản Windows
3. Cài đặt và chọn "Run MongoDB as a Windows Service"
4. MongoDB sẽ tự động chạy khi khởi động máy

**Kiểm tra MongoDB chạy:**
```bash
mongosh
# Nếu thành công sẽ vào MongoDB shell
```

### Cách 2️⃣ - Dùng MongoDB Atlas (Cloud - Khuyên Dùng)

1. Truy cập https://www.mongodb.com/cloud/atlas
2. Đăng ký tài khoản miễn phí
3. Tạo Project và Organization
4. Nhấn "Create a Deployment" → Chọn "M0 Free"
5. Chọn Cloud Provider (AWS, Google Cloud, hoặc Azure)
6. Nhấn "Create Cluster"
7. Đợi cluster được tạo (khoảng 1-2 phút)
8. Nhấn "Connect" → "Drivers" → Copy connection string
9. Connection string sẽ giống như:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/memories_db
   ```

**Cập nhật Connection String:**
- Mở file `server/.env`
- Thay đổi:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/memories_db
```

---

## 📦 Bước 2: Dependencies Đã Được Cài

✅ Frontend dependencies cài xong
✅ Backend dependencies cài xong

Nếu cần cài lại:
```bash
# Frontend
npm install

# Backend
cd server && npm install
```

---

## ▶️ Bước 3: Chạy Backend

**Terminal 1 (Backend):**
```bash
cd server
npm run dev
```

Bạn sẽ thấy:
```
✅ Kết nối MongoDB thành công
🚀 Server chạy tại http://localhost:5000
```

⚠️ **Để Terminal này chạy**, đừng đóng nó

---

## ▶️ Bước 4: Chạy Frontend

**Terminal 2 (mở Terminal mới):**
```bash
npm run dev
```

Bạn sẽ thấy:
```
VITE v7.3.1 ready in 1 ms

Local:    http://localhost:5173/
```

---

## 🌐 Bước 5: Truy Cập Ứng Dụng

Mở trình duyệt và truy cập:
```
http://localhost:5173
```

---

## 📸 Cách Sử Dụng

### 1️⃣ Thêm Ảnh Mới
1. Nhấn "Trang Chủ" trên thanh navbar
2. Chọn **Tháng** (6/2025 - 2/2026)
3. Chọn **Ảnh hoặc Video** từ máy
4. Nhấn **📤 Thêm Ảnh**
5. Chờ thông báo "✅ Thêm ảnh thành công!"

### 2️⃣ Xem Bộ Sưu Tập
1. Nhấn "Bộ Sưu Tập" trên thanh navbar
2. Nhấn vào tháng để xem ảnh
3. Nhấn vào ảnh để xem chi tiết
4. Sử dụng nút zoom (🔍) để phóng to/lùi
5. Nhấn **✕** để đóng

### 3️⃣ Xóa Ảnh
1. Vào "Bộ Sưu Tập"
2. Mở tháng chứa ảnh
3. Di chuột vào ảnh → Nhấn **🗑️ Xóa**
4. Xác nhận xóa

---

## 🔧 Troubleshooting

### ❌ Lỗi: "Không thể kết nối MongoDB"

**Giải pháp:**
1. Nếu dùng Server: Đảm bảo MongoDB Service đang chạy
2. Nếu dùng Atlas: 
   - Kiểm tra connection string trong `server/.env`
   - Kiểm tra IP whitelist (thêm 0.0.0.0/0 để cho tất cả IP)
   - Kiểm tra username/password

### ❌ Lỗi: "Port 5000 already in use"

**Giải pháp:**
- Đổi port trong `server/.env`:
```
PORT=3000
```
- Cập nhật frontend API URL nếu cần

### ❌ Lỗi: "Cannot find module"

**Giải pháp:**
```bash
# Backend
cd server && npm install

# Frontend
npm install
```

### ❌ Upload file lỗi

**Kiểm tra:**
- Kích thước file < 100MB
- Định dạng: JPG, PNG, GIF, WebP (ảnh) hoặc MP4, WebM (video)
- Folder `server/uploads` tồn tại

---

## 💡 Mẹo

✅ Giữ cả 2 terminal (Frontend + Backend) mở khi sử dụng
✅ Nếu làm việc lại, chỉ cần nạp lại trang (F5)
✅ Video phải là định dạng H.264 codec để hoạt động tốt
✅ Ảnh PNG hoặc JPG có tốc độ load nhanh hơn

---

## 📞 Cần Giúp?

- Kiểm tra console của trình duyệt (F12) xem có lỗi gì
- Kiểm tra Terminal backend xem có thông báo lỗi
- Đảm bảo MongoDB đang chạy
- Xóa `node_modules` và cài lại dependencies

---

**Chúc bạn sử dụng vui vẻ! 💕**
