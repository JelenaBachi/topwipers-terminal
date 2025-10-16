export function scrollToId(id: string, offsetTop = 0) {
  const el = document.getElementById(id);
  if (!el) return;

  const rect = el.getBoundingClientRect();
  const absoluteTop = window.pageYOffset + rect.top;
  const target = Math.max(absoluteTop - offsetTop, 0);

  window.scrollTo({ top: target, behavior: 'smooth' });

  try {
    history.replaceState(null, '', `#${id}`);
  } catch {
    // Silently ignore if history API isn't available or throws
  }
}
