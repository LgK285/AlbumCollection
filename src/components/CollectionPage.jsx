import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import ImageViewer from './ImageViewer';

import { API_BASE } from '../config';

function monthToLabel(monthValue) {
  if (!monthValue) return '';
  const [y, m] = monthValue.split('-');
  const mNum = parseInt(m, 10);
  const names = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  return `Tháng ${names[mNum - 1]} - ${y}`;
}

export default function CollectionPage() {
  const [list, setList] = useState([]);
  const [viewMode, setViewMode] = useState('month');
  const [activeKey, setActiveKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchMemories();
  }, []);

  const fetchMemories = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE}/api/memories`);
      setList(response.data);
    } catch (error) {
      console.error('Lỗi tải ảnh:', error);
    } finally {
      setLoading(false);
    }
  };

  const { byMonth, monthKeys, byAlbum, albumKeys } = useMemo(() => {
    const byMonth = {};
    const byAlbum = {};
    list.forEach((memory) => {
      const m = memory.month;
      if (!byMonth[m]) byMonth[m] = [];
      byMonth[m].push(memory);

      const albumName = (memory.album && memory.album.trim()) || 'Chung';
      if (!byAlbum[albumName]) byAlbum[albumName] = [];
      byAlbum[albumName].push(memory);
    });
    const sortDesc = (a, b) => (a < b ? 1 : a > b ? -1 : 0);
    return {
      byMonth,
      monthKeys: Object.keys(byMonth).sort(sortDesc),
      byAlbum,
      albumKeys: Object.keys(byAlbum).sort((a, b) => {
        if (a === 'Chung') return 1;
        if (b === 'Chung') return -1;
        return a.localeCompare(b);
      }),
    };
  }, [list]);

  const handleConfirmDelete = () => {
    if (!deleteConfirm) return;
    setDeleting(true);
    axios
      .delete(`${API_BASE}/api/memories/${deleteConfirm.id}`)
      .then(() => {
        setDeleteConfirm(null);
        fetchMemories();
      })
      .catch((err) => {
        console.error('Lỗi xóa ảnh:', err);
        alert('Không thể xóa. Vui lòng thử lại.');
      })
      .finally(() => setDeleting(false));
  };

  const handleRequestDelete = (e, memory) => {
    e.stopPropagation();
    setDeleteConfirm({ id: memory._id, memory });
  };

  const renderGrid = (memories) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4">
      {memories.map((memory) => (
        <div
          key={memory._id}
          className="relative group cursor-pointer rounded-xl overflow-hidden bg-gray-100 h-36 sm:h-48 flex items-center justify-center ring-2 ring-transparent hover:ring-pink-300 active:ring-pink-300 hover:shadow-lg hover:shadow-pink-500/20 transition-all duration-300"
          onClick={() => setSelectedMedia(memory)}
        >
          {memory.fileType.startsWith('image') ? (
            <img
              src={`${API_BASE}/${memory.filePath}`}
              alt="memory"
              className="w-full h-full object-cover group-hover:scale-110 group-active:scale-105 transition-transform duration-300"
            />
          ) : (
            <video
              src={`${API_BASE}/${memory.filePath}`}
              className="w-full h-full object-cover group-hover:scale-110 group-active:scale-105 transition-transform duration-300"
            />
          )}

          {/* Overlay: luôn hiện nhẹ trên mobile (touch), hover trên desktop */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 md:opacity-0 md:group-hover:opacity-100 transition-opacity flex items-end justify-center gap-2 p-2 sm:p-0 sm:items-center sm:from-black/60 sm:via-transparent">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedMedia(memory);
              }}
              className="min-h-[40px] min-w-[40px] sm:min-h-0 sm:min-w-0 btn-love opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity bg-white/95 hover:bg-white text-rose-600 px-3 py-2 rounded-lg font-semibold text-sm shadow-lg"
              title="Xem chi tiết"
            >
              👁️ Xem
            </button>
            <button
              onClick={(e) => handleRequestDelete(e, memory)}
              className="min-h-[40px] min-w-[40px] sm:min-h-0 sm:min-w-0 btn-love opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity bg-rose-500 hover:bg-rose-600 text-white px-3 py-2 rounded-lg font-semibold text-sm shadow-lg"
              title="Xóa ảnh"
            >
              🗑️ Xóa
            </button>
          </div>

          {memory.fileType.startsWith('video') && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const isEmpty = list.length === 0;

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50 py-6 sm:py-12">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-32 w-96 h-96 rounded-full bg-fuchsia-300/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-pink-300/25 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-3 sm:px-4">
        <h1 className="text-2xl sm:text-5xl font-bold text-love-gradient text-center mb-6 sm:mb-8 flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
          <span className="sparkle">📸</span>
          Bộ Sưu Tập Kỉ Niệm
          <span className="sparkle sparkle-delay-2">💖</span>
        </h1>

        {!loading && !isEmpty && (
          <div className="flex flex-wrap justify-center gap-2 mb-6 sm:mb-8">
            <button
              type="button"
              onClick={() => setViewMode('month')}
              className={`min-h-[44px] px-4 sm:px-5 py-2.5 rounded-xl font-semibold transition text-sm sm:text-base ${
                viewMode === 'month'
                  ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/25'
                  : 'bg-white/80 text-rose-700 hover:bg-white border border-pink-200'
              }`}
            >
              📅 Theo tháng
            </button>
            <button
              type="button"
              onClick={() => setViewMode('album')}
              className={`min-h-[44px] px-4 sm:px-5 py-2.5 rounded-xl font-semibold transition text-sm sm:text-base ${
                viewMode === 'album'
                  ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/25'
                  : 'bg-white/80 text-rose-700 hover:bg-white border border-pink-200'
              }`}
            >
              📁 Theo album
            </button>
          </div>
        )}

        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block w-14 h-14 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin" />
            <p className="mt-4 text-rose-700 font-medium">Đang tải ảnh...</p>
          </div>
        ) : isEmpty ? (
          <div className="text-center py-16 rounded-2xl bg-white/70 border border-pink-200/60 max-w-xl mx-auto">
            <p className="text-rose-700 text-lg font-medium">Chưa có ảnh nào</p>
            <p className="text-rose-600/90 mt-1">Thêm ảnh từ Trang Chủ để bắt đầu</p>
          </div>
        ) : viewMode === 'month' ? (
          <div className="space-y-4 sm:space-y-6 max-w-5xl mx-auto">
            {monthKeys.map((monthValue) => (
              <div
                key={monthValue}
                className="rounded-xl sm:rounded-2xl overflow-hidden shadow-xl border border-pink-200/60 bg-white/85 backdrop-blur-sm"
              >
                <button
                  type="button"
                  onClick={() =>
                    setActiveKey(activeKey === monthValue ? null : monthValue)
                  }
                  className="w-full min-h-[52px] px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-500 text-white font-bold text-base sm:text-lg hover:opacity-95 transition flex justify-between items-center gap-2 shadow-lg shadow-pink-500/20"
                >
                  <span className="truncate text-left">{monthToLabel(monthValue)}</span>
                  <span className="text-sm bg-white/90 text-rose-600 px-3 py-1.5 rounded-full font-semibold shadow">
                    {byMonth[monthValue].length} ảnh
                  </span>
                </button>
                {activeKey === monthValue && (
                  <div className="p-3 sm:p-6 bg-gradient-to-b from-white/95 to-pink-50/50">
                    {renderGrid(byMonth[monthValue])}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6 max-w-5xl mx-auto">
            {albumKeys.map((albumName) => (
              <div
                key={albumName}
                className="rounded-xl sm:rounded-2xl overflow-hidden shadow-xl border border-pink-200/60 bg-white/85 backdrop-blur-sm"
              >
                <button
                  type="button"
                  onClick={() =>
                    setActiveKey(activeKey === albumName ? null : albumName)
                  }
                  className="w-full min-h-[52px] px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-500 text-white font-bold text-base sm:text-lg hover:opacity-95 transition flex justify-between items-center gap-2 shadow-lg shadow-pink-500/20"
                >
                  <span className="truncate text-left">{albumName === 'Chung' ? '📂 Chung' : `📁 ${albumName}`}</span>
                  <span className="text-sm bg-white/90 text-rose-600 px-3 py-1.5 rounded-full font-semibold shadow">
                    {byAlbum[albumName].length} ảnh
                  </span>
                </button>
                {activeKey === albumName && (
                  <div className="p-3 sm:p-6 bg-gradient-to-b from-white/95 to-pink-50/50">
                    {renderGrid(byAlbum[albumName])}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {selectedMedia && (
          <ImageViewer
            media={selectedMedia}
            onClose={() => setSelectedMedia(null)}
          />
        )}

        {deleteConfirm && (
          <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => !deleting && setDeleteConfirm(null)}
          >
            <div
              className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl border border-rose-200 w-full sm:max-w-md max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 sm:p-6">
                <div className="flex items-center gap-3 text-rose-800 font-bold text-lg mb-2">
                  <span className="text-2xl">⚠️</span>
                  Xác nhận xóa
                </div>
                <p className="text-gray-700 mb-4">
                 Sao em bé lại xóa ảnh này hảaaa🫵
                </p>
                {deleteConfirm.memory?.fileType?.startsWith('image') ? (
                  <img
                    src={`${API_BASE}/${deleteConfirm.memory.filePath}`}
                    alt="Xem trước"
                    className="w-full h-40 object-cover rounded-xl border border-pink-200 mb-4"
                  />
                ) : (
                  <div className="w-full h-40 rounded-xl border border-pink-200 bg-gray-100 flex items-center justify-center text-gray-500 mb-4">
                    🎬 Video
                  </div>
                )}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => !deleting && setDeleteConfirm(null)}
                    disabled={deleting}
                    className="flex-1 min-h-[48px] py-2.5 rounded-xl font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition"
                  >
                    Hoy hong xóa nựa
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmDelete}
                    disabled={deleting}
                    className="flex-1 min-h-[48px] py-2.5 rounded-xl font-semibold bg-rose-500 hover:bg-rose-600 text-white disabled:opacity-70 transition shadow-lg shadow-rose-500/25"
                  >
                    {deleting ? 'Đang xóa...' : 'Xóa'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
