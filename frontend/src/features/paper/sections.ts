/** The divider tabs of the file, in order. Each owns one paper colour. */
export const sections = [
  { id: 'work', label: 'Work', tone: 'cobalt' },
  { id: 'experience', label: 'Experience', tone: 'tomato' },
  { id: 'skills', label: 'Skills', tone: 'mustard' },
  { id: 'beyond', label: 'Beyond code', tone: 'sage' },
  { id: 'github', label: 'GitHub', tone: 'lilac' },
  { id: 'contact', label: 'Contact', tone: 'rose' },
] as const;
export type SectionId = (typeof sections)[number]['id'];

export function goTo(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  target.querySelector<HTMLElement>('h2')?.focus({ preventScroll: true });
  history.replaceState(null, '', `#${id}`);
}
