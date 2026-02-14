# Deploy cả Frontend + Backend lên Render

## Tổng quan
- **Backend** (Node.js): Render **Web Service**
- **Frontend** (React + Vite): Render **Static Site**
- **Database**: MongoDB Atlas (đã có)

---

## Chuẩn bị: Đẩy code lên GitHub

```bash
cd d:\valentinecuakhanh
git init
git add .
git commit -m "Prepare for deploy"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

---

## Bước 1: Deploy Backend trước

1. Vào [render.com](https://render.com) → đăng nhập (GitHub)

2. **New** → **Web Service**

3. Kết nối repo GitHub → chọn repo

4. Cấu hình:
   | Mục | Giá trị |
   |-----|---------|
   | **Name** | `valentine-backend` (tùy chọn) |
   | **Root Directory** | `server` |
   | **Runtime** | Node |
   | **Build Command** | `npm install` |
   | **Start Command** | `npm start` |
   | **Instance Type** | Free |

5. **Environment Variables** → Add:
   | Key | Value |
   |-----|-------|
   | `MONGODB_URI` | `mongodb+srv://...` (copy từ `.env`) |

6. **Create Web Service** → đợi deploy xong

7. **Copy URL backend** (vd: `https://valentine-backend-xxxx.onrender.com`) – cần cho bước sau

---

## Bước 2: Deploy Frontend

1. Trên Render: **New** → **Static Site**

2. Chọn cùng repo GitHub

3. Cấu hình:
   | Mục | Giá trị |
   |-----|---------|
   | **Name** | `valentine-frontend` (tùy chọn) |
   | **Root Directory** | *(để trống)* |
   | **Build Command** | `npm install && npm run build` |
   | **Publish Directory** | `dist` |

4. **Environment Variables** → Add:
   | Key | Value |
   |-----|-------|
   | `VITE_API_URL` | `https://valentine-backend-xxxx.onrender.com` *(URL backend bước 1)* |

   ⚠️ **Không** thêm `/` cuối URL.

5. **Create Static Site** → đợi deploy xong

6. Copy URL frontend (vd: `https://valentine-frontend-xxxx.onrender.com`)

---

## Bước 3: CORS (Backend)

Backend đang dùng `cors()` mặc định nên cho phép mọi origin. Frontend trên Render sẽ gọi được.

Nếu sau này muốn giới hạn origin, sửa `server/server.js`:

```js
app.use(cors({
  origin: ['https://valentine-frontend-xxxx.onrender.com']
}));
```

---

## Bước 4: MongoDB Atlas

1. Vào [cloud.mongodb.com](https://cloud.mongodb.com)
2. **Network Access** → **Add IP Address**
3. Chọn **Allow Access from Anywhere** (`0.0.0.0/0`) để Render kết nối được

---

## Kết quả

- **Frontend**: `https://valentine-frontend-xxxx.onrender.com`
- **Backend**: `https://valentine-backend-xxxx.onrender.com`

---

## Lưu ý

1. **Backend Free**: Server sleep sau ~15 phút không có request. Lần gọi đầu sau khi sleep có thể mất 30–60 giây.

2. **File upload**: Ảnh/video upload sẽ mất khi backend restart (filesystem tạm). Metadata vẫn lưu trong MongoDB.

3. **Đổi URL backend**: Vào Static Site → Environment → sửa `VITE_API_URL` → **Save Changes** → **Manual Deploy** để build lại.
