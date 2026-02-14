import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { API_BASE } from '../config';
const MAX_FILES = 50;

export default function HomePage() {
  const [files, setFiles] = useState([]);
  const [month, setMonth] = useState('');
  const [album, setAlbum] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const chosen = e.target.files;
    if (!chosen?.length) return;
    const list = Array.from(chosen).slice(0, MAX_FILES);
    setFiles((prev) => [...prev, ...list].slice(0, MAX_FILES));
    e.target.value = '';
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const clearFiles = () => {
    setFiles([]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (files.length === 0 || !month) {
      setMessage('Vui lòng chọn tháng/năm và ít nhất một file');
      return;
    }

    const formData = new FormData();
    formData.append('month', month);
    if (album.trim()) formData.append('album', album.trim());
    files.forEach((file) => formData.append('files', file));

    try {
      setLoading(true);
      const res = await axios.post(`${API_BASE}/api/memories/upload`, formData);
      const count = res.data?.count ?? files.length;
      setMessage(`✅ Đã thêm ${count} ảnh/video!`);
      clearFiles();
      setMonth('');
      setAlbum('');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('❌ Lỗi: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50">
      {/* Nền trang trí nhẹ: vòng sáng */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-pink-300/20 blur-3xl" />
        <div className="absolute top-1/2 -left-32 w-80 h-80 rounded-full bg-rose-300/25 blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-64 h-64 rounded-full bg-fuchsia-300/20 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-3 sm:px-4 py-6 sm:py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-5xl font-bold text-love-gradient mb-3 sm:mb-4 flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
              <span className="sparkle">❤️</span>
              Trang Chủ
              <span className="sparkle sparkle-delay-1">💕</span>
            </h1>
            <p className="text-rose-700/90 text-base sm:text-lg font-medium">
              Những kỉ niệm đẹp cùng nhau
            </p>
          </div>

          {/* Upload Form Card */}
          <div className="card-love-glow bg-white/85 backdrop-blur-sm rounded-2xl shadow-xl border border-pink-200/60 p-4 sm:p-8 mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-rose-800 mb-4 sm:mb-6 flex items-center gap-2">
              <span className="text-xl sm:text-2xl">📷</span>
              Thêm Ảnh/Video Mới
            </h2>

            <form onSubmit={handleUpload} className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-rose-800 font-semibold mb-2">
                  Tháng / năm <span className="text-rose-500">*</span>
                </label>
                <input
                  type="month"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="input-love w-full px-4 py-3 min-h-[48px] border-2 border-pink-200 rounded-xl bg-white/90 text-rose-900 font-medium focus:ring-2 focus:ring-pink-300/50 transition text-base"
                />
                <p className="text-sm text-rose-600/80 mt-1">
                  Chọn tháng năm gắn với kỉ niệm (bất kỳ thời điểm nào).
                </p>
              </div>

              <div>
                <label className="block text-rose-800 font-semibold mb-2">
                  Tên album <span className="text-gray-400 font-normal">(tùy chọn)</span>
                </label>
                <input
                  type="text"
                  value={album}
                  onChange={(e) => setAlbum(e.target.value)}
                  placeholder="VD: 20/10, Kỉ Niệm đi biển..."
                  maxLength={100}
                  className="input-love w-full px-4 py-3 min-h-[48px] border-2 border-pink-200 rounded-xl bg-white/90 text-rose-900 font-medium focus:ring-2 focus:ring-pink-300/50 transition placeholder:text-rose-300 text-base"
                />
                <p className="text-sm text-rose-600/80 mt-1">
                  Gộp ảnh theo bộ sưu tập; để trống sẽ xếp vào &quot;Chung&quot;.
                </p>
              </div>

              <div>
                <label className="block text-rose-800 font-semibold mb-2">
                  Chọn Ảnh/Video <span className="text-rose-500">*</span>
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                  className="input-love w-full px-3 sm:px-4 py-3 min-h-[48px] border-2 border-pink-200 rounded-xl bg-white/90 text-rose-800 file:mr-2 sm:file:mr-4 file:py-2 file:px-3 sm:file:px-4 file:rounded-lg file:border-0 file:bg-gradient-to-r file:from-pink-500 file:to-rose-500 file:text-white file:font-semibold file:cursor-pointer file:text-sm sm:file:text-base hover:file:opacity-90 transition text-base"
                />
                <p className="text-sm text-rose-600/80 mt-1">
                  Có thể chọn nhiều ảnh/video cùng lúc (tối đa {MAX_FILES} file).
                </p>
                {files.length > 0 && (
                  <div className="mt-3 rounded-xl border border-pink-200 bg-pink-50/50 max-h-40 overflow-y-auto">
                    <div className="flex items-center justify-between px-3 py-2 border-b border-pink-200/60">
                      <span className="text-sm font-semibold text-rose-800">
                        Đã chọn {files.length} file
                      </span>
                      <button
                        type="button"
                        onClick={clearFiles}
                        className="text-sm font-medium text-rose-600 hover:text-rose-700"
                      >
                        Xóa hết
                      </button>
                    </div>
                    <ul className="divide-y divide-pink-200/60 px-3 py-2">
                      {files.map((file, index) => (
                        <li
                          key={`${file.name}-${index}`}
                          className="flex items-center justify-between py-1.5 text-sm text-rose-800"
                        >
                          <span className="truncate flex-1 min-w-0" title={file.name}>
                            {file.name}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="ml-2 text-rose-500 hover:text-rose-700 shrink-0"
                            title="Bỏ chọn"
                          >
                            ✕
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading || files.length === 0}
                className="btn-love w-full min-h-[48px] bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-pink-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-base"
              >
                {loading ? '⏳ Đang tải...' : `📤 Thêm ${files.length > 0 ? files.length + ' ảnh/video' : 'ảnh'}`}
              </button>
            </form>

            {message && (
              <div
                className={`mt-4 p-4 rounded-xl border-l-4 font-medium ${
                  message.startsWith('✅')
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                    : 'bg-rose-50 border-rose-500 text-rose-800'
                }`}
              >
                {message}
              </div>
            )}
          </div>

          {/* Guide */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-4 sm:p-6 border border-amber-200/60 shadow-lg shadow-amber-500/10">
            <h3 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
              <span className="text-xl sparkle">💡</span>
              Hướng dẫn
            </h3>
            <ul className="text-amber-800 space-y-2 font-medium">
              <li className="flex items-center gap-2">
                <span className="text-rose-500">✓</span> Chọn tháng/năm và (tùy chọn) đặt tên album
              </li>
              <li className="flex items-center gap-2">
                <span className="text-rose-500">✓</span> Chọn nhiều ảnh/video cùng lúc, upload một lần (JPG, PNG, MP4, ...)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-rose-500">✓</span> Xem theo tháng hoặc theo album trong Bộ Sưu Tập
              </li>
              <li className="flex items-center gap-2">
                <span className="text-rose-500">✓</span> Click vào ảnh để phóng to
              </li>
            </ul>
          </div>

          {/* Quick Link */}
          <div className="text-center mt-8 sm:mt-10">
            <button
              onClick={() => navigate('/collection')}
              className="btn-love w-full sm:w-auto min-h-[48px] bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-500 text-white font-bold py-3.5 px-6 sm:px-10 rounded-xl shadow-lg shadow-fuchsia-500/30"
            >
              👉 Xem Bộ Sưu Tập
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
