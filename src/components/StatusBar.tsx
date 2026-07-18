import { useEffect, useState } from 'react';
import { Cpu, MemoryStick, Wifi, Activity, Clock } from 'lucide-react';
import { workspaces } from '../data';

type Props = {
  active: number;
  onSelect: (id: number) => void;
};

function useClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return now;
}

function useFauxStats() {
  const [stats, setStats] = useState({ cpu: 12, mem: 38, net: 4 });
  useEffect(() => {
    const t = setInterval(() => {
      setStats((s) => ({
        cpu: Math.max(4, Math.min(96, s.cpu + (Math.random() * 18 - 9))),
        mem: Math.max(20, Math.min(88, s.mem + (Math.random() * 8 - 4))),
        net: Math.max(0, Math.min(20, s.net + (Math.random() * 6 - 3))),
      }));
    }, 1400);
    return () => clearInterval(t);
  }, []);
  return stats;
}

export default function StatusBar({ active, onSelect }: Props) {
  const now = useClock();
  const stats = useFauxStats();
  const time = now.toLocaleTimeString('en-US', { hour12: false });
  const date = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    <header className="glass-strong relative z-30 flex h-9 items-center gap-3 border-b border-teal/10 px-3 text-[11px] text-subtext">
      <div className="flex items-center gap-2">
        <span className="bar-dot bg-red" />
        <span className="bar-dot bg-yellow" />
        <span className="bar-dot bg-green" />
      </div>
      <span className="ml-1 hidden font-semibold text-teal sm:inline">hyprland</span>
      <span className="text-overlay0">·</span>
      <div className="flex items-center gap-1">
        {workspaces.map((w) => (
          <button
            key={w.id}
            onClick={() => onSelect(w.id)}
            className={`group flex items-center gap-1 rounded-md px-2 py-0.5 transition-all duration-150 ${
              active === w.id
                ? 'bg-teal/15 text-teal shadow-[0_0_0_1px_rgba(148,226,213,0.35)]'
                : 'text-subtext/70 hover:bg-surface0/40 hover:text-text'
            }`}
          >
            <span className={`font-mono ${active === w.id ? 'text-green' : 'text-overlay1'}`}>[{w.id}]</span>
            <span className="hidden sm:inline">{w.label}</span>
          </button>
        ))}
      </div>

      <div className="ml-auto flex items-center gap-3">
        <div className="hidden items-center gap-1.5 md:flex">
          <Cpu size={12} className="text-sky" />
          <span className="tabular-nums text-subtext">{stats.cpu.toFixed(0)}%</span>
        </div>
        <div className="hidden items-center gap-1.5 md:flex">
          <MemoryStick size={12} className="text-mauve" />
          <span className="tabular-nums text-subtext">{stats.mem.toFixed(0)}%</span>
        </div>
        <div className="hidden items-center gap-1.5 lg:flex">
          <Activity size={12} className="text-green" />
          <span className="tabular-nums text-subtext">{stats.net.toFixed(1)}k</span>
        </div>
        <div className="hidden items-center gap-1.5 sm:flex">
          <Wifi size={12} className="text-green" />
          <span className="text-subtext">homelab</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock size={12} className="text-peach" />
          <span className="tabular-nums text-text">{time}</span>
          <span className="hidden text-overlay1 lg:inline">· {date}</span>
        </div>
      </div>
    </header>
  );
}
