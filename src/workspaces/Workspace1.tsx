import Panel from '../components/Panel';
import LinkIcon from '../components/LinkIcon';
import { profile, links, experiences, positions } from '../data';

export default function Workspace1() {
  return (
    <div className="grid h-full min-h-0 grid-cols-1 gap-3 p-3 sm:grid-cols-6 sm:grid-rows-6">
      <Panel
        title="whoami"
        termId="skywalkr-dev@homelab"
        accent="green"
        className="sm:col-span-4 sm:row-span-3"
        bodyClassName="p-4"
      >
        <div className="flex h-full flex-col gap-3">
          <div className="rounded-lg bg-crust/60 px-3 py-2 text-[12px] text-green">
            <span className="text-overlay1">skywalkr-dev@homelab</span>
            <span className="text-text">:~$ </span>
            <span className="text-teal">./fetch_portfolio.sh</span>
            <span className="ml-1 inline-block h-3 w-2 translate-y-0.5 animate-blink bg-green" />
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold tracking-tight text-text sm:text-3xl">
              {profile.name}
            </h1>
            <p className="text-sm text-teal">
              <span className="text-overlay1">alias:</span> {profile.alias}
              <span className="mx-2 text-overlay0">·</span>
              <span className="text-subtext">{profile.role}</span>
            </p>
          </div>
          <p className="max-w-md text-[12px] leading-relaxed text-subtext">
            {profile.tagline}
          </p>
          <div className="mt-auto grid grid-cols-2 gap-2 text-[10px] text-overlay1 sm:grid-cols-4">
            <div><span className="text-overlay0">host</span> <span className="text-subtext">{profile.location}</span></div>
            <div><span className="text-overlay0">kernel</span> <span className="text-subtext truncate">{profile.kernel}</span></div>
            <div><span className="text-overlay0">uptime</span> <span className="text-green">{profile.uptime}</span></div>
            <div><span className="text-overlay0">shell</span> <span className="text-subtext">zsh + tmux</span></div>
          </div>
          <div className="text-[11px] italic text-overlay1">
            {profile.signoff}
          </div>
        </div>
      </Panel>

      <Panel
        title="links"
        termId="quick-connect"
        accent="sky"
        className="sm:col-span-2 sm:row-span-3"
        bodyClassName="p-3"
      >
        <div className="flex h-full flex-col gap-2">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="glass glass-hover flex items-center gap-2 rounded-lg px-2.5 py-2 text-[11px]"
            >
              <LinkIcon name={l.icon} className="h-4 w-4 text-sky" />
              <span className="text-subtext group-hover:text-text">{l.label}</span>
              <span className="ml-auto text-overlay0">↗</span>
            </a>
          ))}
        </div>
      </Panel>

      <Panel
        title="exp.log"
        termId="professional"
        accent="mauve"
        className="sm:col-span-3 sm:row-span-3"
        bodyClassName="p-3"
        scroll
      >
        <div className="flex flex-col gap-3">
          {experiences.map((e) => (
            <div key={e.org} className="glass rounded-lg p-3">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-[13px] font-semibold text-text">{e.role}</h3>
                <span className="text-[10px] text-peach">{e.period}</span>
              </div>
              <p className="mb-2 text-[11px] text-mauve">{e.org}</p>
              <ul className="flex flex-col gap-1">
                {e.bullets.map((b) => (
                  <li key={b} className="flex gap-1.5 text-[11px] text-subtext">
                    <span className="text-green">▸</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Panel>

      <Panel
        title="orgs"
        termId="student-chapters"
        accent="yellow"
        className="sm:col-span-3 sm:row-span-3"
        bodyClassName="p-3"
        scroll
      >
        <div className="flex flex-col gap-2">
          {positions.map((p) => (
            <div key={p.role + p.org} className="glass rounded-lg px-3 py-2">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-[12px] font-medium text-yellow">{p.role}</span>
                <span className="text-[10px] text-overlay1">{p.period}</span>
              </div>
              <p className="text-[11px] text-subtext">{p.org}</p>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
