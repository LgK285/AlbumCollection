import { useState, useEffect, useRef } from 'react';

import { API_BASE } from '../config';

export default function ImageViewer({ media, onClose }) {
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleZoom = (direction) => {
    if (direction === 'in') {
      setZoom((z) => Math.min(z + 0.5, 5));
    } else {
      setZoom((z) => Math.max(z - 0.5, 1));
    }
  };

  const handleDoubleClick = () => {
    if (zoom === 1) {
      setZoom(2.5);
    } else {
      setZoom(1);
    }
  };

  const handleWheel = (e) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      handleZoom('in');
    } else {
      handleZoom('out');
    }
  };

  const isImage = media.fileType.startsWith('image');
  const mediaUrl = `${API_BASE}/${media.filePath}`;

  const btnIcon =
    'rounded-xl w-11 h-11 sm:w-10 sm:h-10 flex items-center justify-center text-lg font-semibold transition-colors bg-white/10 hover:bg-white/20 active:bg-white/25 text-white border border-white/20 min-w-[44px] min-h-[44px]';

  // ---------- Fullscreen ----------
  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center">
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/80 to-transparent">
          <span className="text-white/90 font-semibold">
            {isImage ? 'Ảnh' : 'Video'} kỉ niệm
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFullscreen(false)}
              className={btnIcon}
              title="Thoát toàn màn hình"
            >
              ⛶
            </button>
            <button
              onClick={onClose}
              className={btnIcon}
              aria-label="Đóng"
            >
              ✕
            </button>
          </div>
        </div>

        {isImage ? (
          <img
            src={mediaUrl}
            alt="fullscreen"
            className="max-w-full max-h-full w-auto h-auto object-contain"
            onDoubleClick={() => setIsFullscreen(false)}
          />
        ) : (
          <video
            src={mediaUrl}
            controls
            autoPlay
            playsInline
            className="w-full h-full max-h-screen object-contain"
          />
        )}
      </div>
    );
  }

  // ---------- Modal thường ----------
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-neutral-900 rounded-none sm:rounded-2xl overflow-hidden w-full h-full sm:h-auto sm:max-h-[90vh] max-w-5xl flex flex-col shadow-2xl border-0 sm:border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-3 sm:px-4 py-3 bg-neutral-800/90 border-b border-white/10 min-h-[56px]">
          <span className="text-white font-medium flex items-center gap-2">
            {isImage ? (
              <>
                <span className="text-lg opacity-90">🖼️</span>
                Xem ảnh
              </>
            ) : (
              <>
                <span className="text-lg opacity-90">🎬</span>
                Xem video
              </>
            )}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFullscreen(true)}
              className={`${btnIcon} ${!isImage ? 'bg-rose-500/20 hover:bg-rose-500/30 border-rose-400/30' : ''}`}
              title="Toàn màn hình"
            >
              ⛶
            </button>
            <button
              onClick={onClose}
              className={btnIcon}
              aria-label="Đóng"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Nội dung */}
        <div
          ref={containerRef}
          className="flex-1 flex items-center justify-center min-h-[280px] bg-black overflow-auto"
          onWheel={isImage ? handleWheel : undefined}
        >
          {isImage ? (
            <img
              src={mediaUrl}
              alt="view"
              onDoubleClick={handleDoubleClick}
              style={{
                width: `${100 * zoom}%`,
                height: 'auto',
                cursor: zoom > 1 ? 'grab' : 'zoom-in',
                userSelect: 'none',
                minWidth: 'auto',
              }}
              draggable={false}
              className="max-w-full"
            />
          ) : (
            <div className="w-full aspect-video max-h-[70vh] bg-black flex items-center justify-center">
              <video
                src={mediaUrl}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
          )}
        </div>

        {/* Thanh công cụ (chỉ ảnh) */}
        {isImage && (
          <div className="px-3 sm:px-4 py-3 bg-neutral-800/90 border-t border-white/10 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => handleZoom('out')}
              disabled={zoom <= 1}
              className="min-h-[44px] px-4 py-2 rounded-xl text-sm font-medium bg-white/10 hover:bg-white/20 text-white disabled:opacity-40 disabled:cursor-not-allowed transition border border-white/10"
            >
              🔍 Thu nhỏ
            </button>
            <button
              onClick={() => setZoom(1)}
              className="min-h-[44px] px-4 py-2 rounded-xl text-sm font-medium bg-white/10 hover:bg-white/20 text-white transition border border-white/10"
            >
              🔄 1x
            </button>
            <button
              onClick={() => handleZoom('in')}
              disabled={zoom >= 5}
              className="min-h-[44px] px-4 py-2 rounded-xl text-sm font-medium bg-white/10 hover:bg-white/20 text-white disabled:opacity-40 disabled:cursor-not-allowed transition border border-white/10"
            >
              🔍 Phóng to
            </button>
            <button
              onClick={() => setIsFullscreen(true)}
              className="min-h-[44px] px-4 py-2 rounded-xl text-sm font-medium bg-rose-500/80 hover:bg-rose-500 text-white transition"
            >
              ⛶ Toàn màn hình
            </button>
          </div>
        )}

        {/* Gợi ý cho video */}
        {!isImage && (
          <p className="px-4 py-2.5 text-center text-neutral-400 text-sm border-t border-white/5">
            Dùng nút ⛶ để xem toàn màn hình · Điều khiển phát ở thanh dưới video
          </p>
        )}
      </div>
    </div>
  );
}
