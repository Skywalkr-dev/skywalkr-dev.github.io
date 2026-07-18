import { useEffect, useState } from 'react';
import { leetcodeFallback } from '../data';

type Props = { className?: string };

type Stats = {
  total: number;
  easy: number;
  medium: number;
  hard: number;
  streak: number;
};

function useAnimatedBar(target: number, duration = 900) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setVal(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return val;
}

function MiniBar({ pct, color }: { pct: number; color: string }) {
  const v = useAnimatedBar(pct);
  const bars = 14;
  const filled = Math.round((v / 100) * bars);
  return (
    <span className={`font-mono tracking-tighter ${color}`}>
      {'|'.repeat(filled)}
      <span className="text-overlay0/40">{'|'.repeat(bars - filled)}</span>
    </span>
  );
}

const EASY_TOTAL = 875;
const MED_TOTAL = 1830;
const HARD_TOTAL = 820;

export default function HtopTerminal({ className = '' }: Props) {
  const [stats, setStats] = useState<Stats>(leetcodeFallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [cpu, setCpu] = useState(34);
  const [ram, setRam] = useState(58);
  const [swap, setSwap] = useState(12);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4500);

    (async () => {
      try {
        const res = await fetch('https://leetcode.com/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query:
              '{ matchedUser(username: "Skywalkr-dev") { username submitStats: submitStatsGlobal { acSubmissionNum { difficulty count submissions } } } }',
          }),
          signal: controller.signal,
        });
        if (!res.ok) throw new Error('bad response');
        const d = await res.json();
        if (cancelled) return;
        const arr: { difficulty: string; count: number }[] =
          d?.data?.matchedUser?.submitStats?.acSubmissionNum ?? [];
        const find = (diff: string) =>
          arr.find((x) => x.difficulty === diff)?.count ?? 0;
        const easy = find('Easy');
        const medium = find('Medium');
        const hard = find('Hard');
        setStats({
          total: easy + medium + hard,
          easy,
          medium,
          hard,
          streak: leetcodeFallback.streak,
        });
        setLoading(false);
        setError(false);
      } catch {
        if (cancelled) return;
        setStats(leetcodeFallback);
        setLoading(false);
        setError(true);
      } finally {
        clearTimeout(timeout);
      }
    })();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      const j = (base: number, range: number) =>
        Math.max(0, Math.min(100, Math.round(base + (Math.random() - 0.5) * range)));
      setCpu(j(34, 18));
      setRam(j(58, 8));
      setSwap(j(12, 6));
    }, 2000);
    return () => clearInterval(id);
  }, []);

  const easyPct = Math.min(100, Math.round((stats.easy / EASY_TOTAL) * 100));
  const medPct = Math.min(100, Math.round((stats.medium / MED_TOTAL) * 100));
  const hardPct = Math.min(100, Math.round((stats.hard / HARD_TOTAL) * 100));

  const rows: { pid: string; label: string; val: string; bar?: { pct: number; color: string }; accent: string }[] = [
    { pid: '101', label: 'leet_total', val: `${stats.total} Problems Completed`, accent: 'text-teal' },
    { pid: '102', label: 'leet_easy', val: `${stats.easy} / ${EASY_TOTAL}`, bar: { pct: easyPct, color: 'text-green' }, accent: 'text-green' },
    { pid: '103', label: 'leet_med', val: `${stats.medium} / ${MED_TOTAL}`, bar: { pct: medPct, color: 'text-yellow' }, accent: 'text-yellow' },
    { pid: '104', label: 'leet_hard', val: `${stats.hard} / ${HARD_TOTAL}`, bar: { pct: hardPct, color: 'text-red' }, accent: 'text-red' },
    { pid: '105', label: 'STREAK_DAEMON', val: `-> ${stats.streak} Days Active`, accent: 'text-peach' },
  ];

  return (
    <div className={`glass glass-ripple scanlines relative flex min-h-0 flex-col overflow-hidden rounded-xl ${className}`}>
      <div className="flex items-center gap-2 border-b border-teal/10 bg-mantle/40 px-3 py-1.5">
        <span className="bar-dot bg-green" />
        <span className="truncate text-[11px] font-medium text-text">
          <span className="text-green">htop</span>
          <span className="ml-2 text-overlay1">— skywalkr-dev @ homelab</span>
        </span>
        <span className="ml-auto text-[10px] text-overlay0">
          {loading ? 'fetching…' : error ? 'cached' : 'live'}
        </span>
      </div>

      <div className="min-h-0 flex-1 p-2.5 font-mono">
        <div className="mb-1.5 flex flex-col gap-1 text-[10px]">
          <div className="flex items-center gap-2">
            <span className="w-8 shrink-0 text-overlay1">CPU</span>
            <MiniBar pct={cpu} color="text-green" />
            <span className="w-10 shrink-0 text-right text-subtext">{cpu}%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-8 shrink-0 text-overlay1">RAM</span>
            <MiniBar pct={ram} color="text-teal" />
            <span className="w-10 shrink-0 text-right text-subtext">{ram}%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-8 shrink-0 text-overlay1">SWP</span>
            <MiniBar pct={swap} color="text-sky" />
            <span className="w-10 shrink-0 text-right text-subtext">{swap}%</span>
          </div>
        </div>

        <div className="border-t border-overlay0/15 pt-1.5 text-[10px] text-overlay1">
          <div className="flex items-center justify-between">
            <span>PID · USER · CPU% · MEM% · COMMAND</span>
          </div>
          <div className="mt-1 flex flex-col gap-0.5">
            {rows.map((r) => (
              <div key={r.pid} className="flex items-center gap-1.5">
                <span className="w-8 shrink-0 text-green">{r.pid}</span>
                <span className="w-16 shrink-0 text-overlay1">skywalkr</span>
                <span className="w-8 shrink-0 text-subtext">0.1</span>
                <span className="w-8 shrink-0 text-subtext">0.2</span>
                <span className={`shrink-0 ${r.accent}`}>{r.label}</span>
                {r.bar && <MiniBar pct={r.bar.pct} color={r.bar.color} />}
                <span className={`ml-auto truncate text-right ${r.accent}`}>{r.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
