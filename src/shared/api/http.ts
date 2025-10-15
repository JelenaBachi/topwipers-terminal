import { useAppStore } from '@/shared/store/useAppStore';

type Query = Record<string, string | number | boolean | undefined | null>;

function buildUrl(path: string, q: Query = {}) {
  const { partnerId, terminalId, lang } = useAppStore.getState();
  const base = import.meta.env.VITE_API_BASE_URL || '';
  const url = new URL(path.startsWith('http') ? path : `${base}${path}`, window.location.origin);

  const params = new URLSearchParams(url.search);
  params.set('lang', String(lang));
  params.set('partnerId', partnerId);
  params.set('terminalId', terminalId);

  Object.entries(q).forEach(([k, v]) => {
    if (v !== undefined && v !== null) params.set(k, String(v));
  });

  url.search = params.toString();
  return url.toString();
}

export async function getJson<T>(path: string, q?: Query): Promise<T> {
  const res = await fetch(buildUrl(path, q), { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const text = await res.text();
  try { return JSON.parse(text) as T; }
  catch { throw new Error('Invalid JSON from API'); }
}
