import { mastery } from '../data';

type Props = { className?: string };

const accentText: Record<string, string> = {
  'text-green': 'text-green',
  'text-sky': 'text-sky',
  'text-mauve': 'text-mauve',
  'text-peach': 'text-peach',
};

const paneTitles = ['0:languages', '1:backend', '2:systems', '3:cloud-sre'];

export default function TmuxSkills({ className = '' }: Props) {
  const [tl, tr, bl, br] = mastery;

  const Pane = ({ group, idx }: { group: typeof mastery[number]; idx: number }) => (
    <div className="flex min-h-0 flex-col gap-1 p-1.5">
      <div className="flex items-center gap-1 text-[9px]">
        <span className="text-green">●</span>
        <span className="text-overlay1">{paneTitles[idx]}</span>
        <span className="ml-auto text-overlay0">{group.items.length}</span>
      </div>
      <div className="flex flex-wrap gap-1">
        {group.items.map((it) => (
          <span
            key={it}
            className={`rounded bg-surface0/50 px-1.5 py-0.5 text-[9px] ${accentText[group.accent] ?? 'text-subtext'} ring-1 ring-inset ring-overlay0/15`}
          >
            {it}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <div className={`glass glass-ripple scanlines relative flex min-h-0 flex-col overflow-hidden rounded-xl ${className}`}>
      <div className="flex items-center gap-2 border-b border-teal/10 bg-mantle/40 px-3 py-1.5">
        <span className="bar-dot bg-mauve" />
        <span className="truncate text-[11px] font-medium text-text">
          <span className="text-mauve">tmux</span>
          <span className="ml-2 text-overlay1">— skills · 4 panes</span>
        </span>
        <span className="ml-auto text-[10px] text-overlay0">Ctrl-b [</span>
      </div>

      <div className="min-h-0 flex-1 p-1.5 font-mono">
        <div className="grid h-full grid-cols-2 grid-rows-2">
          <div className="border border-overlay0/30">
            <Pane group={tl} idx={0} />
          </div>
          <div className="border border-l-0 border-overlay0/30">
            <Pane group={tr} idx={1} />
          </div>
          <div className="border border-t-0 border-overlay0/30">
            <Pane group={bl} idx={2} />
          </div>
          <div className="border border-l-0 border-t-0 border-overlay0/30">
            <Pane group={br} idx={3} />
          </div>
        </div>
      </div>
    </div>
  );
}
