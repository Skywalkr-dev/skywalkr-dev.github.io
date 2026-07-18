import { useMemo } from 'react';

export default function Wallpaper() {
  const drops = useMemo(
    () =>
      Array.from({ length: 90 }, () => ({
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 0.5 + Math.random() * 0.7,
        height: 50 + Math.random() * 60,
        opacity: 0.2 + Math.random() * 0.4,
      })),
    [],
  );

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <img
        src="/wallpaper.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(10,12,18,0.38)' }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-1/4"
        style={{ background: 'linear-gradient(to top, rgba(8,10,16,0.55), transparent)' }}
      />
      <div className="rain-layer">
        {drops.map((d, i) => (
          <span
            key={i}
            className="raindrop"
            style={{
              left: `${d.left}%`,
              height: `${d.height}px`,
              animationDelay: `${d.delay}s`,
              animationDuration: `${d.duration}s`,
              opacity: d.opacity,
            }}
          />
        ))}
      </div>
    </div>
  );
}
