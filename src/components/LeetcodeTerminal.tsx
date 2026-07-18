import { useEffect, useState } from 'react';
import { leetcodeFallback, leetcodeUsername } from '../data';

type Props = { className?: string };

type Stats = {
  total: number;
  easy: number;
  medium: number;
  hard: number;
  streak: number;
};

const EASY_TOTAL = 875;
const MED_TOTAL = 1830;
const HARD_TOTAL = 820;
const GRAND_TOTAL = EASY_TOTAL + MED_TOTAL + HARD_TOTAL;

function useAnimatedBar(target: number, duration = 1000) {
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

function MicroBar({ count, total, color }: { count: number; total: number; color: string }) {
  const pct = total > 0 ? Math.min(100, Math.round((count / total) * 100)) : 0;
  const v = useAnimatedBar(pct);
  const bars = 32;
  const filled = Math.round((v / 100) * bars);
  return (
    <span className={`font-mono tracking-tighter ${color}`}>
      {'|'.repeat(filled)}
      <span className="text-overlay0/40">{'|'.repeat(bars - filled)}</span>
    </span>
  );
}

export default function LeetcodeTerminal({ className = '' }: Props) {
  const [stats, setStats] = useState<Stats>(leetcodeFallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4500);

    (async () => {
      try {
        const res = await fetch(
          `https://alfa-leetcode-api.onrender.com/${leetcodeUsername}/solved`,
          { signal: controller.signal },
        );
        if (!res.ok) throw new Error('bad response');
        const d = await res.json();
        if (cancelled) return;
        setStats({
          total: d.solvedProblem ?? leetcodeFallback.total,
          easy: d.easySolved ?? leetcodeFallback.easy,
          medium: d.mediumSolved ?? leetcodeFallback.medium,
          hard: d.hardSolved ?? leetcodeFallback.hard,
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

  return (
    <div className={`glass glass-ripple scanlines relative flex min-h-0 flex-col overflow-hidden rounded-xl ${className}`}>
      <div className="flex items-center gap-2 border-b border-teal/10 bg-mantle/40 px-3 py-1.5">
        <span className="bar-dot bg-yellow" />
        <span className="truncate text-[11px] font-medium text-text">
          <span className="text-yellow">leetcode</span>
          <span className="ml-2 text-overlay1">— skywalkr-dev@homelab:~$ ./leetcode --watch</span>
        </span>
        <span className="ml-auto text-[10px] text-overlay0">
          {loading ? 'fetching…' : error ? 'cached' : 'live'}
        </span>
      </div>

      <div className="min-h-0 flex-1 p-2.5 font-mono text-[10px]">
        <div className="mb-1.5 text-overlay1">
          <span className="text-green">skywalkr-dev</span>@homelab:~$ ./leetcode --watch
        </div>
        <div className="mb-2 text-overlay0">fetching profile: {leetcodeUsername} …</div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="w-16 shrink-0 text-overlay1">Total</span>
            <MicroBar count={stats.total} total={GRAND_TOTAL} color="text-teal" />
            <span className="w-20 shrink-0 text-right text-text">
              {stats.total} / {GRAND_TOTAL}+
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-16 shrink-0 text-overlay1">Easy</span>
            <MicroBar count={stats.easy} total={EASY_TOTAL} color="text-green" />
            <span className="w-20 shrink-0 text-right text-green">
              {stats.easy} / {EASY_TOTAL}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-16 shrink-0 text-overlay1">Medium</span>
            <MicroBar count={stats.medium} total={MED_TOTAL} color="text-yellow" />
            <span className="w-20 shrink-0 text-right text-yellow">
              {stats.medium} / {MED_TOTAL}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-16 shrink-0 text-overlay1">Hard</span>
            <MicroBar count={stats.hard} total={HARD_TOTAL} color="text-red" />
            <span className="w-20 shrink-0 text-right text-red">
              {stats.hard} / {HARD_TOTAL}
            </span>
          </div>

          <div className="mt-1.5 flex items-center gap-2 border-t border-overlay0/15 pt-1.5">
            <span className="w-16 shrink-0 text-overlay1">Streak</span>
            <span className="flex items-center gap-1 text-peach">
              <span className="font-bold">{stats.streak}</span>
              <span className="text-overlay1">days active</span>
            </span>
          </div>
        </div>

        {error && (
          <div className="mt-2 text-[9px] text-overlay0">
            (api unreachable — showing cached stats)
          </div>
        )}
      </div>
    </div>
  );
}
