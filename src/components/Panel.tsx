import { type ReactNode } from 'react';

type Props = {
  title: string;
  termId?: string;
  accent?: 'teal' | 'green' | 'sky' | 'mauve' | 'peach' | 'yellow';
  className?: string;
  bodyClassName?: string;
  scroll?: boolean;
  children: ReactNode;
};

const accentMap: Record<string, string> = {
  teal: 'text-teal',
  green: 'text-green',
  sky: 'text-sky',
  mauve: 'text-mauve',
  peach: 'text-peach',
  yellow: 'text-yellow',
};

const dotMap: Record<string, string> = {
  teal: 'bg-teal',
  green: 'bg-green',
  sky: 'bg-sky',
  mauve: 'bg-mauve',
  peach: 'bg-peach',
  yellow: 'bg-yellow',
};

export default function Panel({
  title,
  termId,
  accent = 'teal',
  className = '',
  bodyClassName = '',
  scroll = false,
  children,
}: Props) {
  return (
    <section
      className={`glass glass-ripple scanlines relative flex min-h-0 flex-col overflow-hidden rounded-xl bg-base/85 ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-teal/10 bg-mantle/80 px-3 py-1.5">
        <span className={`bar-dot ${dotMap[accent]}`} />
        <span className="truncate text-[11px] font-medium text-text">
          <span className={accentMap[accent]}>{title}</span>
          {termId && <span className="ml-2 text-overlay1">— {termId}</span>}
        </span>
        <span className="ml-auto hidden text-[10px] text-overlay0 sm:inline">⌘ {accent}</span>
      </div>
      <div className={`relative min-h-0 flex-1 ${scroll ? 'overflow-y-auto scroll-thin' : ''} ${bodyClassName}`}>
        {children}
      </div>
    </section>
  );
}