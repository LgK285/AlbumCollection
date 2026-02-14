import { useEffect, useState } from 'react';

function HeartIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={className}
      fill="currentColor"
    >
      <path d="M12 21s-7.2-4.7-9.7-8.8C.4 8.9 2.3 5.8 5.6 5.4c1.9-.2 3.7.7 4.7 2.2 1-1.5 2.8-2.4 4.7-2.2 3.3.4 5.2 3.5 3.3 6.8C19.2 16.3 12 21 12 21z" />
    </svg>
  );
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const id = crypto.randomUUID?.() ?? Date.now() + Math.random();
      const left = Math.random() * 100;
      const size = 12 + Math.random() * 20;
      const duration = 6 + Math.random() * 6;
      const drift = (Math.random() - 0.5) * 120;
      const x = (Math.random() - 0.5) * 50;
      const scale = 0.8 + Math.random() * 0.6;
      const hue = 330 + Math.round(Math.random() * 40);
      const opacity = 0.5 + Math.random() * 0.4;

      setHearts((prev) => [
        ...prev.slice(-25),
        {
          id,
          left,
          size,
          duration,
          drift,
          x,
          scale,
          color: `hsla(${hue}, 85%, 65%, ${opacity})`,
        },
      ]);

      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== id));
      }, duration * 1000 + 300);
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden z-0"
      aria-hidden
    >
      {hearts.map((h) => (
        <div
          key={h.id}
          className="heart-float absolute bottom-[-50px]"
          style={{
            left: `${h.left}%`,
            width: `${h.size}px`,
            height: `${h.size}px`,
            color: h.color,
            ['--d']: `${h.duration}s`,
            ['--drift']: `${h.drift}px`,
            ['--x']: `${h.x}px`,
            ['--s']: String(h.scale),
          }}
        >
          <HeartIcon className="h-full w-full" />
        </div>
      ))}
    </div>
  );
}
