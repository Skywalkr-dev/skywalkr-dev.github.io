import { useEffect, useState } from 'react';
import Wallpaper from './components/Wallpaper';
import StatusBar from './components/StatusBar';
import BootSequence from './components/BootSequence';
import LoginScreen from './components/LoginScreen';
import Workspace1 from './workspaces/Workspace1';
import Workspace2 from './workspaces/Workspace2';
import Workspace3 from './workspaces/Workspace3';
import { workspaces } from './data';

const wsViews: Record<number, () => JSX.Element> = {
  1: Workspace1,
  2: Workspace2,
  3: Workspace3,
};

type Phase = 'boot' | 'login' | 'desktop';

export default function App() {
  const [phase, setPhase] = useState<Phase>('boot');
  const [active, setActive] = useState(1);
  const [renderKey, setRenderKey] = useState(0);

  useEffect(() => {
    setRenderKey((k) => k + 1);
  }, [active]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (phase !== 'desktop') return;
      if (['1', '2', '3'].includes(e.key) && (e.metaKey || e.ctrlKey || e.altKey)) {
        e.preventDefault();
        setActive(Number(e.key));
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [phase]);

  const View = wsViews[active];
  const current = workspaces.find((w) => w.id === active);

  if (phase === 'boot') return <BootSequence onComplete={() => setPhase('login')} />;
  if (phase === 'login') return <LoginScreen onLogin={() => setPhase('desktop')} />;

  return (
    <div className="relative flex h-screen w-screen flex-col overflow-hidden">
      <Wallpaper />
      <StatusBar active={active} onSelect={setActive} />

      <main className="relative min-h-0 flex-1">
        <div key={renderKey} className="absolute inset-0 animate-slide-up wm-init">
          <View />
        </div>
      </main>

      <footer className="glass-strong relative z-30 flex h-6 items-center gap-3 border-t border-teal/10 px-3 text-[10px] text-overlay1">
        <span className="text-green">●</span>
        <span className="text-subtext">workspace [{active}]</span>
        <span className="text-overlay0">·</span>
        <span className="hidden sm:inline">{current?.title}</span>
        <span className="ml-auto hidden text-overlay0 sm:inline">
          mod + [1/2/3] to switch · static build · github pages ready
        </span>
        <span className="ml-auto text-overlay0 sm:hidden">tap workspaces above</span>
      </footer>
    </div>
  );
}
