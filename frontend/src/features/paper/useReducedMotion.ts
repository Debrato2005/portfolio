import { useSyncExternalStore } from 'react';
const query = '(prefers-reduced-motion: reduce)';
function subscribe(callback: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
}
export function useReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
  );
}

const fine = '(hover: hover) and (pointer: fine)';
function subscribeFine(callback: () => void) {
  const media = window.matchMedia(fine);
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
}
/** True for a mouse or trackpad; hover-only flourishes check this. */
export function useFinePointer() {
  return useSyncExternalStore(
    subscribeFine,
    () => window.matchMedia(fine).matches,
  );
}
