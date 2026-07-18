import Panel from '../components/Panel';
import HtopTerminal from '../components/HtopTerminal';
import TmuxSkills from '../components/TmuxSkills';
import TechMarquee from '../components/TechMarquee';
import { projects } from '../data';

const langColor: Record<string, string> = {
  Rust: 'text-peach',
  Go: 'text-sky',
  'Go · Ansible': 'text-sky',
  C: 'text-blue',
  'C++': 'text-pink',
  Python: 'text-yellow',
  Bash: 'text-green',
};

export default function Workspace3() {
  return (
    <div className="grid h-full min-h-0 grid-cols-1 gap-3 p-3 sm:grid-cols-6 sm:grid-rows-6">
      <Panel
        title="builds"
        termId="projects"
        accent="peach"
        className="sm:col-span-4 sm:row-span-6"
        bodyClassName="p-3"
        scroll
      >
        <div className="flex flex-col gap-2.5">
          {projects.map((p, i) => (
            <div key={p.name} className="glass glass-hover rounded-lg p-3">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-[13px] font-semibold text-text">
                  <span className="mr-1.5 text-overlay0">{String(i + 1).padStart(2, '0')}</span>
                  {p.name}
                </h3>
                <span className={`shrink-0 text-[10px] font-medium ${langColor[p.lang] ?? 'text-mauve'}`}>
                  {p.lang}
                </span>
              </div>
              <p className="mt-1 text-[11px] leading-relaxed text-subtext">{p.desc}</p>
            </div>
          ))}
        </div>
      </Panel>

      <div className="flex min-h-0 flex-col gap-3 sm:col-span-2 sm:row-span-6">
        <HtopTerminal className="flex-[3] min-h-0" />
        <TmuxSkills className="flex-[4] min-h-0" />
        <TechMarquee className="flex-[2] min-h-0" />
      </div>
    </div>
  );
}
