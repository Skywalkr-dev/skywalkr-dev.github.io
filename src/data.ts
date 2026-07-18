export type Link = { label: string; href: string; icon: string };
export type Experience = { role: string; org: string; period: string; bullets: string[] };
export type Position = { role: string; org: string; period: string };
export type Contribution = {
  repo: string;
  lang: string;
  desc: string;
  id: string;
  url: string;
  kind: 'pr' | 'commit';
};

export const contributions: Contribution[] = [
  {
    repo: 'containerd / nerdctl',
    lang: 'Go',
    desc: 'Authored core patch resolving low-level container instantiation failures occurring when extensive volume definitions exceeded containerd\'s strict 4096-byte protocol buffer payload limits. Wrapped via a high-performance dynamic chunking and split-allocation buffer array strategy.',
    id: '#4945',
    url: 'https://github.com/containerd/nerdctl/pull/4945#event-26465058887',
    kind: 'pr',
  },
  {
    repo: 'google/gVisor',
    lang: 'Go',
    desc: 'Co-authored kernel-sandbox stabilization patch handling complex terminal window modifications inside secure microkernels. Debugged and mapped the host-to-guest execution path for the TIOCSWINSZ ioctl instruction sequence, ensuring the asynchronous SIGWINCH signal reliably transits across isolated TTY passthrough virtualization layers.',
    id: 'cfb7c06',
    url: 'https://github.com/google/gvisor/commit/cfb7c0629521099eb14d7bd86e9fbfa47287a640',
    kind: 'commit',
  },
  {
    repo: 'google/go-github',
    lang: 'Go',
    desc: 'Engineered a custom abstract syntax tree (AST) code analysis tool using core go/ast and go/parser frameworks to traverse external client repositories and dynamically inject standardized Go deprecation tags; patched the main REST API client payload module to align directly with core up-stream rate-limit pooling modifications.',
    id: '#4286',
    url: 'https://github.com/google/go-github/pull/4286#event-26467355974',
    kind: 'pr',
  },
];
export type Project = { name: string; lang: string; desc: string };
export type MasteryGroup = { label: string; items: string[]; accent: string };
export type InfraSpec = { key: string; val: string };
export type InfraNode = { icon: string; title: string; subtitle: string; specs: InfraSpec[]; desc: string };
export type RiceSpec = { key: string; val: string };
export type Rice = { icon: string; env: string; subtitle: string; specs: RiceSpec[]; href: string; linkLabel: string };

export const profile = {
  name: 'S Naveen Bharath',
  alias: 'skywalkr-dev',
  role: 'Backend & Systems Engineer',
  prompt: 'skywalkr-dev@homelab:~$ ./fetch_portfolio.sh',
  location: 'VITC, Chennai',
  kernel: 'Linux void-homelab 6.12.4',
  uptime: 'always shipping',
  tagline: 'Specializing in kernel internals, container runtimes, distributed systems and low-level optimization.',
  signoff: 'May the force be with you',
};

export const links: Link[] = [
  { label: 'GitHub', href: 'https://github.com/skywalkr-dev', icon: 'github' },
  { label: 'LeetCode', href: 'https://leetcode.com/skywalkr-dev', icon: 'code' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/s-naveen-bharath', icon: 'linkedin' },
  { label: 'Email', href: 'mailto:skywalkr.dev@protonmail.com', icon: 'mail' },
];

export const experiences: Experience[] = [
  {
    role: 'Backend & Systems Engineer',
    org: 'Trivent Systems',
    period: 'May 2026 — Present',
    bullets: [
      'Self-managed GitLab upgrades (v15 → v19) with zero downtime.',
      'Event-driven Go daemon for container orchestration across the fleet.',
    ],
  },
  {
    role: 'Mobile / Backend Engineer',
    org: 'Integrity-IT',
    period: 'Sept 2025 — Nov 2025',
    bullets: [
      'Cross-platform mobile modules and API cache optimization.',
      'Rendering bottleneck resolution; smoothed frame pacing.',
    ],
  },
];

export const positions: Position[] = [
  { role: 'Technical Secretary', org: 'Open Source Programming Club VITC', period: 'Jul 2025 — Apr 2026' },
  { role: 'Cybersecurity Lead', org: 'Open Source Programming Club VITC', period: 'Jan 2025 — Jun 2025' },
  { role: 'Secretary', org: 'IEEE Robotics & Automation Society VITC', period: 'Jan 2025 — Apr 2026' },
  { role: 'Web/App Dev Member', org: 'IEEE RAS VITC', period: 'Jan 2024 — Dec 2024' },
];

export const infra: InfraNode[] = [
  {
    icon: 'server',
    title: 'Void Linux Server',
    subtitle: 'headless / TTY',
    specs: [
      { key: 'distro', val: 'Void Linux (runit)' },
      { key: 'desktop', val: 'lxqt (headless cfg)' },
      { key: 'db', val: 'PostgreSQL :5432' },
      { key: 'web', val: 'Nginx' },
    ],
    desc: 'Repurposed legacy hardware as headless server. Real-time remote file sharing, PostgreSQL over port 5432, Nginx web serving, multi-language compiler env (Go, Rust, Python, Node, GCC), and LAN-local Minecraft server over VPN subnet.',
  },
  {
    icon: 'smartphone',
    title: 'Arm64 AOSP Rig',
    subtitle: 'Samsung Tab — 3GB',
    specs: [
      { key: 'rom', val: 'LineageOS (stripped)' },
      { key: 'rootfs', val: 'Arch Linux (proot)' },
      { key: 'terminal', val: 'Termux + tmux' },
      { key: 'remote', val: 'KDE Connect' },
    ],
    desc: 'Revived legacy tablet via stripped LineageOS ROM. Unlocked bootloader, rooted, established Arch Linux rootfs via proot/Termux. tmux sessions managed remotely for arm64 native build testing.',
  },
  {
    icon: 'terminal',
    title: 'Linux From Scratch',
    subtitle: 'LFS 12.x',
    specs: [
      { key: 'kernel', val: 'custom config' },
      { key: 'toolchain', val: 'GCC + glibc' },
      { key: 'init', val: 'sysvinit' },
      { key: 'packages', val: 'zero (from source)' },
    ],
    desc: 'Custom Linux OS built entirely from source. Total control over kernel configurations, toolchain geometry, and init system. Every binary compiled from scratch — zero package manager dependency.',
  },
];

export const rices: Rice[] = [
  {
    icon: 'window',
    env: 'Arch Linux X11 Environment',
    subtitle: 'i3-wm Setup',
    href: 'https://github.com/Skywalkr-dev/i3-rice',
    linkLabel: 'github.com/Skywalkr-dev/i3-rice',
    specs: [
      { key: 'Window Manager', val: 'i3-gaps composed with picom for animations/blur' },
      { key: 'Terminal', val: 'kitty injected with starship prompt' },
      { key: 'Shell & Mux', val: 'fish shell orchestrated via tmux' },
      { key: 'Widgets', val: 'eww for custom SCSS system telemetry' },
      { key: 'Monitoring', val: 'btop alongside legacy conky pipes' },
      { key: 'Utilities', val: 'rofi, cava, ranger' },
      { key: 'Core Stack', val: 'Neovim (NvChad), Spotify-TUI, Firefox' },
    ],
  },
  {
    icon: 'droplet',
    env: 'Arch Linux Wayland Environment',
    subtitle: 'Hyprland Setup',
    href: 'https://github.com/Skywalkr-dev/dotfiles',
    linkLabel: 'github.com/Skywalkr-dev/dotfiles',
    specs: [
      { key: 'Window Manager', val: 'Hyprland (Dynamic tiling & smooth compositor)' },
      { key: 'Login / Lock', val: 'SDDM, Hyprlock governed by Hypridle' },
      { key: 'Status Bar', val: 'Custom Waybar layout' },
      { key: 'Fonts', val: 'JetBrains Mono + Nerd Fonts' },
      { key: 'Text Editor', val: 'Neovim / AstroNvim (Sonokai)' },
      { key: 'Environment', val: 'Bash, Nautilus, Rofi, KDE Connect' },
      { key: 'Media', val: 'Spotify via Spicetify (Catppuccin), Cava' },
      { key: 'Browser', val: 'Firefox' },
    ],
  },
];

export const projects: Project[] = [
  {
    name: 'Stateful Audio Watermarking System',
    lang: 'Rust',
    desc: 'High-performance DSP framework executing multi-layer LSB and echo-hiding algorithmic patterns into raw PCM streams. Cryptographic defense mechanics resistant to frequency-domain manipulation and lossy compression attacks. Concurrent thread-safe buffering pools and optimized FFT routines. (Patent Pending)',
  },
  {
    name: 'Chiliz Testnet Node Automation',
    lang: 'Go · Ansible',
    desc: 'Infrastructure-as-code automation pipeline for deterministic Chiliz Spicy Testnet validation nodes. systemd lifecycle orchestration with self-healing daemon states. Prometheus exporters tracking peer saturation, block height, memory pools; Grafana alerting.',
  },
  {
    name: 'TankMQ',
    lang: 'Go',
    desc: 'High-throughput distributed message queue on a custom Write-Ahead Log (WAL) architecture with memory-mapped lookups. Thread-safe broker topology, async topic-based pub/sub, zero-copy TCP socket I/O, concurrent consumer-group partitioning.',
  },
  {
    name: 'CHIP-8',
    lang: 'Rust',
    desc: 'Cycle-accurate monolithic virtual machine emulator for the CHIP-8 CPU. Low-level instruction decoding across 35 opcodes, optimized memory-mapping matrix, strict 60Hz system/delay timers, input event pooling, pixel-accurate monochromatic frame buffer.',
  },
  {
    name: 'lfs-pkg-manager',
    lang: 'C',
    desc: 'Zero-dependency source package manager in POSIX-compliant C. Solves install, dependency-trees and removal via graph-based topological sort. Isolated sysroot extraction through native chroot, custom tarball/metadata filesystem parsing.',
  },
  {
    name: 'archpass',
    lang: 'C',
    desc: 'Lightweight CLI virtualization engine orchestrating raw Arch Linux kernel images. Native QEMU/KVM interfaces via direct CLI mappings, dynamic raw block-device storage, bridge network tap layers, headless virt-io graphic threads.',
  },
  {
    name: 'reload-go',
    lang: 'Go',
    desc: 'Zero-dependency dev daemon with a low-latency recursive directory watcher on syscall event loops (inotify wrappers). Atomized debouncing eliminates CPU thrashing, triggers SIGKILL then rebuilds and re-executes hot Go binaries sub-millisecond.',
  },
];

export const mastery: MasteryGroup[] = [
  { label: 'languages', items: ['Go', 'Rust', 'C', 'C++', 'Python', 'TypeScript', 'Bash', 'Lua'], accent: 'text-green' },
  { label: 'backend architecture', items: ['Distributed Systems', 'System Design', 'FastAPI', 'Flask', 'gRPC', 'REST APIs', 'PostgreSQL', 'Redis', 'Apache Kafka'], accent: 'text-sky' },
  { label: 'systems programming', items: ['io_uring', 'cgroups v2', 'Linux Namespaces', 'container runtimes', 'OCI', 'Virtualization (QEMU/KVM)', 'Kernel Architecture'], accent: 'text-mauve' },
  { label: 'cloud infrastructure & sre', items: ['AWS', 'Kubernetes', 'Docker', 'Ansible', 'Terraform', 'Nginx', 'Linux SysAdmin', 'CI/CD (GitHub Actions)', 'Prometheus', 'Grafana'], accent: 'text-peach' },
];

export const marqueeRow1 = [
  'go', 'rust', 'c', 'cpp', 'py', 'bash', 'astro', 'ts', 'lua', 'tailwind', 'fastapi', 'flask', 'neovim', 'tmux',
];
export const marqueeRow2 = [
  'aws', 'docker', 'kubernetes', 'ansible', 'terraform', 'nginx', 'linux', 'git', 'githubactions', 'jenkins', 'postgres', 'redis', 'kafka', 'mongodb', 'sqlite', 'cmake', 'prometheus', 'grafana',
];

export const skillIcons: string[] = [
  'c', 'cpp', 'rust', 'go', 'python', 'bash',
  'linux', 'docker', 'kubernetes', 'ansible', 'nginx', 'aws',
  'git', 'gitlab', 'postgres', 'redis', 'kafka', 'grafana',
  'prometheus', 'terraform', 'vite', 'react', 'typescript', 'figma',
];

export const techStackBadges: string[] = [
  'C', 'C++', 'Rust', 'Go', 'Python', 'Bash',
  'Docker', 'Kubernetes', 'Ansible', 'Nginx', 'CI/CD', 'AWS',
  'Distributed Systems', 'gRPC', 'PostgreSQL', 'Redis', 'Apache Kafka',
];

export const leetcodeFallback = {
  total: 303,
  easy: 116,
  medium: 176,
  hard: 11,
  streak: 53,
};

export const leetcodeUsername = 'skywalkr-dev';

export const bootLines: { text: string; kind: 'ok' | 'info' | 'warn' | 'accent' }[] = [
  { text: '[    0.000000] Linux version 6.12.4-arch1-1 (skywalkr-dev@homelab) (gcc 14.2.1) #1 SMP PREEMPT_DYNAMIC', kind: 'info' },
  { text: '[    0.000312] Command line: BOOT_IMAGE=/vmlinuz-linux root=/dev/sda2 rw loglevel=3 quiet', kind: 'info' },
  { text: '[    0.012844] x86/cpu: SGX enabled by BIOS; SGX1 supported', kind: 'info' },
  { text: '[    0.029120] ACPI: PM-Timer v2.0-OEM.14000000', kind: 'info' },
  { text: '[    0.041882] systemd[1]: System Management', kind: 'accent' },
  { text: '[    0.052210] Mounting /dev/sda2 at / ...', kind: 'info' },
  { text: '[  OK  ] Mounted /dev/sda2 at /.', kind: 'ok' },
  { text: '[    0.064331] Reached target Local File Systems.', kind: 'ok' },
  { text: '[    0.071200] Starting Load Kernel Modules...', kind: 'info' },
  { text: '[  OK  ] Finished Load Kernel Modules.', kind: 'ok' },
  { text: '[    0.084512] Starting Network Manager...', kind: 'info' },
  { text: '[  OK  ] Started Network Manager.', kind: 'ok' },
  { text: '[    0.097120] Reached target Network is Online.', kind: 'ok' },
  { text: '[    0.103844] Starting OpenSSH Daemon...', kind: 'info' },
  { text: '[  OK  ] Started OpenSSH Daemon.', kind: 'ok' },
  { text: '[    0.115200] Starting PostgreSQL Server...', kind: 'info' },
  { text: '[  OK  ] Started PostgreSQL Server.', kind: 'ok' },
  { text: '[    0.127844] Starting Nginx Web Server...', kind: 'info' },
  { text: '[  OK  ] Started Nginx Web Server.', kind: 'ok' },
  { text: '[    0.139120] Reached target Multi-User System.', kind: 'ok' },
  { text: '[    0.145200] Reached target Graphical Interface.', kind: 'ok' },
  { text: '[    0.151844] Starting Simple Desktop Display Manager (sddm)...', kind: 'info' },
  { text: '[  OK  ] Started Simple Desktop Display Manager (sddm).', kind: 'ok' },
  { text: '[    0.163200] Arch Linux 6.12.4-arch1-1 (tty1)', kind: 'accent' },
  { text: '', kind: 'info' },
  { text: 'homelab login: skywalkr-dev', kind: 'accent' },
];

export const workspaces = [
  { id: 1, term: 'whoami', label: 'whoami', title: 'Profile & Leadership' },
  { id: 2, term: 'sys_core', label: 'sys_core', title: 'Linux & Open Source' },
  { id: 3, term: 'builds', label: 'builds', title: 'Projects & Mastery' },
];
