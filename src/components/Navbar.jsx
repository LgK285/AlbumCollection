import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-40 border-b border-white/20 bg-white/70 backdrop-blur-xl shadow-lg shadow-pink-500/10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="text-xl sm:text-2xl font-bold text-love-gradient flex items-center gap-2 sparkle"
          >
            <span className="text-2xl sm:text-3xl" aria-hidden>💕</span>
            Albul ảnh kỉ niệm
          </Link>
          <div className="flex gap-4 sm:gap-6">
            <Link
              to="/"
              className="text-rose-600 font-semibold hover:text-pink-500 transition-colors relative after:absolute after:left-0 after:bottom-[-2px] after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-pink-500 after:to-rose-500 after:transition-all hover:after:w-full"
            >
              Thêm Ảnh/Video
            </Link>
            <Link
              to="/collection"
              className="text-rose-600 font-semibold hover:text-pink-500 transition-colors relative after:absolute after:left-0 after:bottom-[-2px] after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-pink-500 after:to-rose-500 after:transition-all hover:after:w-full"
            >
              Bộ Sưu Tập
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
