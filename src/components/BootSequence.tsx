import { useEffect, useRef, useState } from 'react';
import { bootLines } from '../data';

type Props = { onComplete: () => void };

const archLogo = `⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣶⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠀⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⠀⠀⠀⠀⠆⠀⠀⠀⠀⠀⠀⣰⣿⣿⣿⣧⠀⠀⠠⠀⠀⠀⠐⠀⠀⠀⠀⠀⠀⠀⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠰⠀⠀⠀⠀
⠀⠀⠀⠀⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠠⠀⠀⢀⠀⠡⠄⠀⡄⠀⠀⠤⠄⠀⢠⣿⣿⣿⣿⣿⣆⠀⢠⠤⠁⠀⠠⠀⠠⠌⠀⠁⠀⠀⡄⠀⠀⠀⠀⠀⠀⠀⠈⠀⠀⢠⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀⠀⢀⣿⣿⣿⣿⣿⣿⣿⡆⠀⠀⠄⠀⠀⠀⠀⠠⠀⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⠀⠀⠈⠀⠀⠀⠀
⠀⠀⠀⠀⠇⠀⠀⠀⠀⠀⠀⠐⠀⠀⠀⠀⠀⠀⠐⠀⡀⢀⠀⠃⠀⢀⠀⢀⣾⣿⣿⣿⣿⣿⣿⣿⣿⡌⠀⡀⠀⠸⠀⠀⢀⠀⠀⠀⠀⠂⠀⠀⠀⠀⠀⠀⠀⢀⠀⠀⠘⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⠀⠀⠀⡄⠀⠀⢀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡄⠁⠀⢀⠀⠀⠈⠀⠁⠀⠀⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠀⠀⠀⠀
⠀⠀⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠁⠀⠀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡀⡀⠀⡀⠀⠠⠀⠆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠃⠀⠀⠀⠀⠀⠀⠸⠀⠀⠀⠘⠀⠀⠠⠀⠀⠀⠀⠇⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⠀⠸⠀⠀⠀⠀⠀⠀⠀⠃⠀⠀⠀⠃⠀⠀⠀⠀⠀⠀⠸⠀⠀⠀⠀
⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⠁⠀⠀⡄⠰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⢠⠀⠀⠘⠀⠁⠀⠀⡀⠀⠀⠀⠀⠀⠀⠀⠈⠀⠀⢠⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⢳⡀⠈⠛⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣇⠀⠀⠠⠀⡄⠀⠀⠁⠀⠀⠀⠀⠀⠀⠀⢠⠀⠀⠈⠀⠀⠀⠀
⠀⠀⠀⠀⠇⠀⠀⡀⠀⠀⠀⡐⠀⠀⡀⠀⡀⠀⠐⠀⡀⠀⢠⣿⣿⣷⣤⡀⠛⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣇⠀⢀⠀⡀⠀⢀⠆⠀⠀⠀⢀⠀⠀⠀⢀⠀⠀⠸⠀⠀⠀⠀
⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⢀⠀⠀⠀⠀⠀⠀⢠⠀⠁⢠⣿⣿⣿⣿⣿⣿⣷⣦⣍⡻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣇⠈⠀⠁⠀⠀⡀⠀⠀⠀⠀⠀⠀⠀⠈⠀⠀⢠⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣇⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠁⠀⠀⠀⠀⠀⠀⠈⠀⠀⠀⠈⠀⠀⠈⢠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣆⠁⠀⠀⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠀⠀⠀⠀
⠀⠀⠀⠀⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⠀⠀⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠀⠀⠀⠀
⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⢠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣇⠀⡀⠀⠀⠀⠀⠀⠀⠀⠰⠀⠀⢀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠀⠀⠀⠀⣰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠀⠀⠀⠀
⠀⠀⠀⠀⡄⠀⠀⠀⠀⠀⠀⠠⠀⠀⠀⣰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⠀⠀⠀⠀
⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⢀⠀⠀⣰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠋⠉⠉⠉⠙⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⠠⠀⡀⠀⠀⠀⠘⠀⠀⢀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠁⠀⠃⠀⠀⠄⠀⠀⠈⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⠀⠀⠀⠀⠀⢀⠀⠀⠈⠀⠀⠀⠀
⠀⠀⠀⠀⠆⠀⠀⠀⠀⠀⠀⠀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠀⠉⠀⠆⠀⠀⠀⠀⠀⠀⢀⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡈⠁⠀⠀⠀⠀⠀⠰⠀⠀⠀⠀
⠀⠀⠀⠀⡄⠀⠀⠁⠈⠀⠀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠁⠄⠀⠀⡀⠀⠀⠁⠀⠀⠀⢠⠈⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡀⠄⠀⠘⠀⠀⢠⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠂⢀⠀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣺⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡀⠂⢠⠀⠀⠈⠀⠀⠀⠀
⠀⠀⠀⠀⡆⠀⠀⠀⠀⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠂⠀⠀⠀⠀⠀⠀⢠⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣦⠉⠛⠛⣿⣷⡄⠀⠀⠀⠐⠀⠀⠀⠀
⠀⠀⠀⠀⡀⠀⡀⠀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡏⣀⡈⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⠫⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣤⠈⠉⠳⠼⢀⠀⢀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣄⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⣄⠠⠀⠀⠈⠀⠀⠀⠀
⠀⠀⠀⠀⠆⢁⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⡿⠿⠛⠋⠀⠀⠀⠀⠄⠀⠀⠀⠀⠀⠀⠐⠀⠘⠛⠿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣦⡈⠱⠀⠀⠀⠀
⠀⠀⠀⠀⢀⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠟⠛⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠃⠀⢀⠀⠀⠈⠉⠛⠻⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡀⠄⠀⠀⠀
⠀⠀⠀⢠⣿⣿⣿⣿⣿⣿⣿⣿⠟⠛⡉⠀⠀⠀⠐⠀⠄⠀⠀⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠀⠀⠀⠈⠀⠀⠰⠀⡄⠀⠀⠀⠉⠛⠻⣿⣿⣿⣿⣿⣿⣿⣿⡄⠂⠀⠀
⠀⠀⢠⣿⣿⣿⣿⣿⠟⠛⢁⡠⠀⠀⡀⠀⡀⠀⠐⠀⡀⢀⠀⠆⠀⢀⠀⢀⠀⠀⠂⠀⠀⠀⠀⠀⠀⠠⠀⡀⠀⠰⡀⠀⢀⠀⡀⠀⠀⠆⢀⠀⠀⢀⡈⠙⠻⢿⣿⣿⣿⣿⡆⠀⠀
⠀⣰⣿⣿⠟⠋⠁⠀⠐⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⠀⠀⠀⡄⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⢀⠀⠀⠈⠀⠁⠀⠀⠄⠀⠀⠀⠀⠀⠀⠀⠐⠈⠛⠻⣿⣿⣆⠀
⡰⠟⠉⠁⠀⠀⠀⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠀⠀⠀⠀⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠰⠀⠀⠀⠀⠉⠻⢆`;

const kindClass: Record<string, string> = {
  ok: 'text-green',
  info: 'text-overlay1',
  warn: 'text-yellow',
  accent: 'text-teal',
};

export default function BootSequence({ onComplete }: Props) {
  const [visible, setVisible] = useState(0);
  const [fading, setFading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visible >= bootLines.length) {
      const t = setTimeout(() => setFading(true), 550);
      return () => clearTimeout(t);
    }
    const line = bootLines[visible];
    const delay = line.text === '' ? 120 : 70 + Math.random() * 90;
    const t = setTimeout(() => setVisible((v) => v + 1), delay);
    return () => clearTimeout(t);
  }, [visible]);

  useEffect(() => {
    if (fading) {
      const t = setTimeout(onComplete, 720);
      return () => clearTimeout(t);
    }
  }, [fading, onComplete]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [visible]);

  return (
    <div
      className={`absolute inset-0 z-50 bg-crust font-mono text-text ${fading ? 'fade-out' : ''}`}
    >
      <div className="flex h-full flex-col items-center px-4 py-6">
        <pre className="mb-4 select-none whitespace-pre text-[8px] leading-tight text-sky sm:text-[10px]">
{archLogo}
        </pre>
        <div className="mb-2 text-[11px] tracking-widest text-overlay1 sm:text-xs">
          ARCH LINUX · 6.12.4-arch1-1 · x86_64
        </div>
        <div
          ref={scrollRef}
          className="h-full w-full max-w-3xl overflow-y-auto no-scrollbar text-[10px] leading-relaxed sm:text-[11px]"
        >
          {bootLines.slice(0, visible).map((l, i) => (
            <div key={i} className={kindClass[l.kind]}>
              {l.text === '' ? '\u00A0' : l.text}
            </div>
          ))}
          {visible < bootLines.length && <span className="boot-cursor" />}
        </div>
      </div>
    </div>
  );
}
