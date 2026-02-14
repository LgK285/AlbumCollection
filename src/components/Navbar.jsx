import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-40 border-b border-white/20 bg-white/70 backdrop-blur-xl shadow-lg shadow-pink-500/10 pt-[env(safe-area-inset-top)]">
      <div className="container mx-auto px-3 sm:px-4 py-2.5 sm:py-3">
        <div className="flex justify-between items-center gap-2 min-h-[44px]">
          <Link
            to="/"
            className="text-base sm:text-2xl font-bold text-love-gradient flex items-center gap-1.5 sm:gap-2 sparkle truncate min-w-0"
          >
            <span className="text-xl sm:text-3xl shrink-0" aria-hidden>💕</span>
            <span className="truncate">Album ảnh kỉ niệm</span>
          </Link>
          <div className="flex gap-2 sm:gap-6 shrink-0">
            <Link
              to="/"
              className="text-sm sm:text-base text-rose-600 font-semibold hover:text-pink-500 transition-colors py-2 px-2 sm:px-0 min-h-[44px] flex items-center"
            >
              Thêm Ảnh
            </Link>
            <Link
              to="/collection"
              className="text-sm sm:text-base text-rose-600 font-semibold hover:text-pink-500 transition-colors py-2 px-2 sm:px-0 min-h-[44px] flex items-center"
            >
              Bộ Sưu Tập
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
