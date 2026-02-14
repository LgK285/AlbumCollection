# 💻 Cấu Trúc Dự Án Chi Tiết

## 📂 Cây Thư Mục

```
d:\valentinecuakhanh\
│
├── 📄 package.json                 # Frontend dependencies
├── 📄 vite.config.js              # Cấu hình Vite
├── 📄 eslint.config.js            # Cấu hình ESLint
├── 📄 index.html                  # HTML chính
├── 📄 README.md                   # Hướng dẫn chính
├── 📄 GETTING_STARTED.md          # Hướng dẫn chi tiết
│
├── 📁 src/                        # 📱 FRONTEND (React)
│   ├── 📄 main.jsx                # Entry point
│   ├── 📄 App.jsx                 # App component với Router
│   ├── 📄 index.css               # Global CSS
│   │
│   ├── 📁 components/             # React components
│   │   ├── 📄 Navbar.jsx          # Thanh điều hướng
│   │   ├── 📄 HomePage.jsx        # Trang chủ - Upload ảnh
│   │   ├── 📄 CollectionPage.jsx  # Bộ sưu tập - Xem ảnh
│   │   └── 📄 ImageViewer.jsx     # Modal xem ảnh phóng to
│   │
│   └── 📁 assets/                 # Ảnh, icon,...
│
├── 📁 server/                     # 🖥️ BACKEND (Express)
│   ├── 📄 server.js               # Main server file
│   ├── 📄 package.json            # Backend dependencies
│   ├── 📄 .env                    # Biến môi trường
│   ├── 📄 README.md               # Hướng dẫn backend
│   │
│   ├── 📁 models/                 # MongoDB schemas
│   │   └── 📄 Memory.js           # Memory schema
│   │
│   ├── 📁 routes/                 # API routes
│   │   └── 📄 memories.js         # Memories API routes
│   │
│   └── 📁 uploads/                # 📸 Thư mục lưu file upload
│       └── (ảnh/video uploaded)
│
└── 📁 public/                     # Static files
```

---

## 🎨 Frontend Components

### 1️⃣ Navbar.jsx
**Chức năng:** Thanh điều hướng chính
```
Navbar
├── Logo "💕 Kỉ Niệm Của Chúng Mình"
├── Link "Trang Chủ" → /
└── Link "Bộ Sưu Tập" → /collection
```

**Style:** 
- Background gradient (Pink → Red)
- Responsive design
- Hover effect

---

### 2️⃣ HomePage.jsx
**Chức năng:** Trang chủ - Thêm ảnh/video
```
HomePage
├── Header "❤️ Trang Chủ"
├── Upload Form
│   ├── Dropdown Select Tháng (6/2025 - 2/2026)
│   ├── File Input (ảnh/video)
│   ├── Upload Button
│   └── Message Display
├── Guide Section
└── Link to Collection
```

**State Management:**
- `file`: File đã chọn
- `selectedMonth`: Tháng được chọn
- `loading`: Trạng thái upload
- `message`: Thông báo kết quả

**API Call:**
```javascript
POST http://localhost:5000/api/memories/upload
Body: FormData { file, month }
```

---

### 3️⃣ CollectionPage.jsx
**Chức năng:** Bộ sưu tập - Xem ảnh theo tháng
```
CollectionPage
├── Title "📸 Bộ Sưu Tập Kỉ Niệm"
├── Month Sections (9 tháng)
│   ├── Month Header (Collapsible)
│   │   └── "Tháng X - 20XX" + Count
│   └── Images Grid (4 columns)
│       ├── Image 1
│       ├── Image 2
│       ├── Image 3
│       └── Image 4
│           (Hover → Show Delete Button)
└── ImageViewer Modal (conditionally)
```

**State Management:**
- `memories`: Object containing arrays per month
- `activeMonth`: Currently expanded month
- `selectedMedia`: Media to display in viewer
- `loading`: Loading state

**API Calls:**
```javascript
GET http://localhost:5000/api/memories
DELETE http://localhost:5000/api/memories/:id
```

---

### 4️⃣ ImageViewer.jsx
**Chức năng:** Modal xem ảnh chi tiết
```
ImageViewer Modal
├── Overlay (Dark background)
├── Media Container
│   ├── Image (with zoom)
│   └── Video (with controls)
├── Controls Bar (for images)
│   ├── 🔍 Lùi Button (zoom out)
│   ├── 🔄 Reset Button
│   └── 🔍 Phóng Button (zoom in)
└── Close Button (X)
```

**Features:**
- Zoom in/out (1x to 3x)
- Video with built-in controls
- Click outside to close
- Prevent body scroll when open

---

## 🔌 Backend API

### Models

**Memory Schema:**
```javascript
{
  _id: ObjectId,
  month: String,           // "2025-06" format
  filePath: String,        // "uploads/filename.jpg"
  fileType: String,        // "image/jpeg", "video/mp4"
  fileName: String,        // Original file name
  uploadedAt: Date         // Timestamp
}
```

### API Endpoints

#### 1. Upload Memory
```
POST /api/memories/upload

Request:
- Content-Type: multipart/form-data
- Body:
  - file: File (Image or Video)
  - month: String ("2025-06" format)

Response (201):
{
  message: "Upload ảnh thành công",
  memory: { ... }
}
```

#### 2. Get All Memories
```
GET /api/memories

Response (200):
[
  {
    _id: "...",
    month: "2025-06",
    filePath: "uploads/...",
    fileType: "image/jpeg",
    fileName: "photo.jpg",
    uploadedAt: "2025-02-14T10:30:00Z"
  },
  ...
]
```

#### 3. Get Memories by Month
```
GET /api/memories/month/:month

Example: /api/memories/month/2025-06

Response (200):
[ { ... memories for 2025-06 ... } ]
```

#### 4. Delete Memory
```
DELETE /api/memories/:id

Example: /api/memories/507f1f77bcf86cd799439011

Response (200):
{
  message: "Xóa ảnh thành công"
}
```

---

## 🗄️ MongoDB Structure

### Database: memories_db
### Collection: memories

```
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  month: "2025-06",
  filePath: "uploads/1644812400000-123456789.jpg",
  fileType: "image/jpeg",
  fileName: "sunset.jpg",
  uploadedAt: ISODate("2025-02-14T10:30:00Z")
}
```

---

## 🔄 Data Flow

### Upload Ảnh Flow:
```
User (Frontend)
    ↓
[HomePage - Upload Form]
    ↓
Select Month + File
    ↓
POST /api/memories/upload
    ↓
[Backend - memories.js route]
    ↓
multer middleware
    ↓
Save file to /uploads
    ↓
Create MongoDB document
    ↓
Return success message
    ↓
[Frontend - Show success message]
```

### Xem Bộ Sưu Tập Flow:
```
User (Frontend)
    ↓
[CollectionPage - mounted]
    ↓
GET /api/memories
    ↓
[Backend - Memory.find()]
    ↓
Return all memories from DB
    ↓
[Frontend - Group by month]
    ↓
Display in grid format
    ↓
User clicks month → Expand
    ↓
User clicks image → Show ImageViewer
    ↓
[ImageViewer - Display & Zoom]
```

---

## 🎨 Styling Approach

### Tailwind CSS Classes Used:

**Colors:**
- `bg-pink-*` - Pink variants
- `bg-red-*` - Red variants
- `text-white` - White text
- `text-gray-*` - Gray variants

**Layout:**
- `grid` - Grid layouts
- `flex` - Flexbox layouts
- `container` - Max-width container
- `px-4, py-2` - Padding

**Effects:**
- `hover:*` - Hover states
- `transition` - Smooth transitions
- `shadow-lg` - Drop shadows
- `rounded-lg` - Border radius

**Responsive:**
- `sm:`, `md:`, `lg:` - Breakpoints
- `w-full` - Full width
- `max-w-*` - Max width limits

---

## ⚙️ Configuration Files

### vite.config.js
```javascript
- React plugin enabled
- Tailwind CSS integration
- HMR (Hot Module Replacement)
```

### server/.env
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/memories_db
```

### package.json (Frontend)
```json
{
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-router-dom": "^6.20.0",
    "axios": "^1.6.0"
  }
}
```

### server/package.json
```json
{
  "type": "module",
  "scripts": {
    "dev": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.5.0",
    "multer": "^1.4.5",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1"
  }
}
```

---

## 🔐 Notes

- ✅ CORS enabled để Frontend có thể gọi Backend API
- ✅ File upload limit 100MB
- ✅ Supported formats: JPG, PNG, GIF, WebP (ảnh), MP4, WebM (video)
- ✅ Files lưu trong `/server/uploads` thư mục
- ✅ MongoDB indexes on `month` và `uploadedAt` để query nhanh
- ✅ Responsive design cho mobile, tablet, desktop

---

**Made with ❤️**
