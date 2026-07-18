import { Server, Smartphone, Terminal, AppWindow, Droplet, ExternalLink } from 'lucide-react';
import Panel from '../components/Panel';
import { infra, rices, contributions } from '../data';

const iconMap: Record<string, typeof Server> = {
  server: Server,
  smartphone: Smartphone,
  terminal: Terminal,
  window: AppWindow,
  droplet: Droplet,
};

export default function Workspace2() {
  return (
    <div className="grid h-full min-h-0 grid-cols-1 gap-3 p-3 sm:grid-cols-6 sm:grid-rows-6">
      <Panel
        title="linux & infra"
        termId="homelab"
        accent="teal"
        className="sm:col-span-4 sm:row-span-6"
        bodyClassName="p-3"
        scroll
      >
        <div className="flex flex-col gap-3">
          {infra.map((node) => {
            const Icon = iconMap[node.icon] ?? Server;
            return (
              <div key={node.title} className="glass rounded-lg p-3">
                <div className="mb-2 flex items-center gap-2">
                  <Icon className="h-4 w-4 text-teal" />
                  <h3 className="text-[13px] font-semibold text-text">{node.title}</h3>
                  <span className="ml-auto text-[10px] text-overlay1">{node.subtitle}</span>
                </div>
                <div className="mb-2 grid grid-cols-2 gap-x-3 gap-y-1">
                  {node.specs.map((s) => (
                    <div key={s.key} className="flex gap-1 text-[10px]">
                      <span className="shrink-0 text-sky">{s.key}</span>
                      <span className="text-overlay0">:</span>
                      <span className="text-subtext">{s.val}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] leading-relaxed text-subtext">{node.desc}</p>
              </div>
            );
          })}

          <div className="mt-1 flex items-center gap-2">
            <span className="bar-dot bg-mauve" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-mauve">ricing · dotfiles</span>
          </div>

          {rices.map((r) => {
            const Icon = iconMap[r.icon] ?? Window;
            return (
              <div key={r.env} className="glass rounded-lg p-3">
                <div className="mb-2 flex items-center gap-2">
                  <Icon className="h-4 w-4 text-mauve" />
                  <h3 className="text-[13px] font-semibold text-text">{r.env}</h3>
                  <span className="ml-auto text-[10px] text-overlay1">{r.subtitle}</span>
                </div>
                <div className="mb-2 flex flex-col gap-0.5">
                  {r.specs.map((s) => (
                    <div key={s.key} className="flex gap-1.5 text-[10px]">
                      <span className="w-24 shrink-0 text-mauve">{s.key}</span>
                      <span className="text-overlay0">:</span>
                      <span className="text-subtext">{s.val}</span>
                    </div>
                  ))}
                </div>
                <a
                  href={r.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-md bg-mauve/10 px-2 py-1 text-[10px] text-mauve transition-colors hover:bg-mauve/20"
                >
                  <ExternalLink className="h-3 w-3" />
                  {r.linkLabel}
                </a>
              </div>
            );
          })}
        </div>
      </Panel>

      <Panel
        title="oss-contribs"
        termId="verified"
        accent="green"
        className="sm:col-span-2 sm:row-span-6"
        bodyClassName="p-3"
        scroll
      >
        <div className="flex flex-col gap-2.5">
          {contributions.map((c) => (
            <div key={c.id} className="glass glass-hover rounded-lg p-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="truncate text-[11px] font-semibold text-green">{c.repo}</span>
                <span className="shrink-0 rounded bg-mauve/15 px-1.5 py-0.5 text-[9px] text-mauve">{c.lang}</span>
              </div>
              <p className="mt-1 text-[10px] leading-relaxed text-subtext">{c.desc}</p>
              <a
                href={c.url}
                target="_blank"
                rel="noreferrer"
                className="mt-1.5 inline-flex items-center gap-1 text-[10px] text-teal underline-offset-2 transition-colors hover:text-green hover:underline"
              >
                <ExternalLink className="h-3 w-3" />
                {c.kind === 'pr' ? `PR ${c.id}` : `commit ${c.id}`}
              </a>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
