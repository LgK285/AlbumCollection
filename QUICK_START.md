# ⚡ Quick Start (5 Phút)

## 1️⃣ Cấu Hình MongoDB (Chọn 1 trong 2)

### Local MongoDB
```bash
# Windows: Tải & cài từ https://www.mongodb.com/try/download/community
# Mặc định chạy tại: mongodb://localhost:27017
```

### MongoDB Atlas (Khuyên Dùng)
1. Vào https://account.mongodb.com/account/register
2. Tạo project → cluster (M0 Free)
3. Copy connection string
4. Cập nhật `server/.env`:
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/memories_db
```

---

## 2️⃣ Terminal 1 - Chạy Backend

```bash
cd server
npm run dev
```

Kết quả mong đợi:
```
✅ Kết nối MongoDB thành công
🚀 Server chạy tại http://localhost:5000
```

---

## 3️⃣ Terminal 2 - Chạy Frontend

```bash
npm run dev
```

Kết quả mong đợi:
```
Local: http://localhost:5173/
```

---

## 4️⃣ Mở Ứng Dụng

```
http://localhost:5173
```

---

## 📸 Sử Dụng

**Thêm Ảnh:**
1. Trang Chủ → Chọn Tháng → Chọn Ảnh → Upload

**Xem Ảnh:**
1. Bộ Sưu Tập → Click Tháng → Click Ảnh → Zoom/Xem

**Xóa Ảnh:**
1. Bộ Sưu Tập → Hover Ảnh → Click 🗑️

---

## ✅ Xong!

Backend: ✅ http://localhost:5000
Frontend: ✅ http://localhost:5173

---

## 💡 Troubleshooting Nhanh

| Lỗi | Giải Pháp |
|-----|----------|
| MongoDB lỗi | Chạy MongoDB Service hoặc dùng Atlas |
| Port 5000 occupied | Đổi PORT trong `server/.env` |
| CORS error | Kiểm tra backend chạy chưa |
| File upload lỗi | Kiểm tra định dạng & kích thước |

---

**Enjoy! 💕**
