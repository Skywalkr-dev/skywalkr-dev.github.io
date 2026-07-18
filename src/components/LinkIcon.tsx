import { Github, Code2, Linkedin, Mail, type LucideIcon } from 'lucide-react';

const map: Record<string, LucideIcon> = {
  github: Github,
  code: Code2,
  linkedin: Linkedin,
  mail: Mail,
};

export default function LinkIcon({ name, className }: { name: string; className?: string }) {
  const Icon = map[name] ?? Code2;
  return <Icon className={className} />;
}
