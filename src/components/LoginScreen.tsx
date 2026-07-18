import { useEffect, useState } from 'react';
import { ChevronRight, User } from 'lucide-react';
import { profile } from '../data';

type Props = { onLogin: () => void };

export default function LoginScreen({ onLogin }: Props) {
  const [authing, setAuthing] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter') submit();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const submit = () => {
    if (authing) return;
    setAuthing(true);
    setTimeout(() => setFading(true), 650);
    setTimeout(onLogin, 1350);
  };

  return (
    <div
      className={`absolute inset-0 z-50 flex items-center justify-center overflow-hidden ${fading ? 'fade-out' : ''}`}
      style={{
        background:
          'radial-gradient(120% 90% at 50% 18%, #1a2b28 0%, #0f1a17 38%, #0a0e0d 72%, #060807 100%)',
      }}
    >
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            'linear-gradient(115deg, rgba(30,40,36,0.5) 0%, rgba(10,14,13,0) 45%, rgba(20,28,24,0.6) 100%)',
        }}
      />
      <div
        className="absolute left-1/2 top-[8%] h-[55%] w-[80%] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(closest-side, rgba(148,226,213,0.12), transparent 70%)' }}
      />
      <div className="absolute inset-x-0 bottom-0 h-1/3 opacity-50" style={{ background: 'linear-gradient(to top, rgba(6,8,7,0.9), transparent)' }} />

      <div className="relative w-full max-w-sm px-4">
        <div className="mb-5 text-center">
          <div className="text-[11px] tracking-[0.3em] text-overlay1">SDDM · HYPRLAND</div>
          <div className="mt-1 text-[10px] text-overlay0">welcome back</div>
        </div>

        <button
          onClick={submit}
          disabled={authing}
          className="sddm-card group w-full cursor-pointer rounded-2xl p-6 text-left transition-transform duration-200 hover:scale-[1.02] disabled:cursor-default"
        >
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal/15 ring-2 ring-teal/30 transition-colors group-hover:bg-teal/25 group-hover:ring-teal/50">
              <User className="h-8 w-8 text-teal" />
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold text-text">{profile.name}</div>
              <div className="text-[11px] text-overlay1">@{profile.alias}</div>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-center gap-2 rounded-lg bg-crust/70 px-3 py-2.5 ring-1 ring-inset ring-teal/15">
            <span className="text-[12px] text-subtext">
              {authing ? 'authenticating…' : 'click to enter'}
            </span>
            <ChevronRight className="h-4 w-4 text-teal transition-transform duration-200 group-hover:translate-x-1" />
          </div>

          <div className="mt-3 flex items-center justify-between text-[10px] text-overlay0">
            <span>Session: Hyprland</span>
            <span>{authing ? 'launching…' : 'or press enter'}</span>
          </div>
        </button>

        <div className="mt-4 text-center text-[10px] text-overlay0">
          {profile.tagline}
        </div>
      </div>
    </div>
  );
}
