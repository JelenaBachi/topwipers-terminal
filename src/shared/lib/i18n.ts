import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

let inited = false;

async function loadDict(lang: string) {
  const res = await fetch(`/i18n/${lang}.json`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`i18n: cannot load /i18n/${lang}.json`);
  return res.json();
}

export async function setupI18n(lang: string) {
  const dict = await loadDict(lang);

  if (!inited) {
    await i18n.use(initReactI18next).init({
      lng: lang,
      resources: { [lang]: { translation: dict } },
      fallbackLng: 'en',
      interpolation: { escapeValue: false },
    });
    inited = true;
  } else {
    i18n.removeResourceBundle(lang, 'translation');
    i18n.addResources(lang, 'translation', dict as any);
    await i18n.changeLanguage(lang);
  }
  return i18n;
}
