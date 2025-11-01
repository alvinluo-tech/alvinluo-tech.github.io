import { en } from '@/i18n/languages/en';
import { zh_CN } from '@/i18n/languages/zh_CN';
import { zh_TW } from '@/i18n/languages/zh_TW';
import { ja } from '@/i18n/languages/ja';
import { ru } from '@/i18n/languages/ru';

// Supported language codes aligned with existing i18n
export type LangCode = 'en' | 'zh_CN' | 'zh_TW' | 'ja' | 'ru';

type Dict = Record<string, string>;

function normalize(code?: string | null): LangCode {
  const s = (code || '').toLowerCase();
  if (s.startsWith('en')) return 'en';
  if (s === 'zh_cn' || s === 'zh-cn' || s === 'zh_hans') return 'zh_CN';
  if (s === 'zh_tw' || s === 'zh-tw' || s === 'zh_hant') return 'zh_TW';
  if (s.startsWith('ja')) return 'ja';
  if (s.startsWith('ru')) return 'ru';
  // fallback by <html lang>
  const htmlLang = (document.documentElement.getAttribute('lang') || '').toLowerCase();
  if (htmlLang.startsWith('zh')) return 'zh_CN';
  if (htmlLang.startsWith('ja')) return 'ja';
  if (htmlLang.startsWith('ru')) return 'ru';
  return 'en';
}

function getDict(lang: LangCode): Dict {
  switch (lang) {
    case 'zh_CN':
      return zh_CN as unknown as Dict;
    case 'zh_TW':
      return zh_TW as unknown as Dict;
    case 'ja':
      return ja as unknown as Dict;
    case 'ru':
      return ru as unknown as Dict;
    default:
      return en as unknown as Dict;
  }
}

function pathToKey(path: string): string | null {
  // Normalize to end with '/'
  try {
    if (!path) return null;
    // ensure leading slash and trailing slash
    let p = path;
    if (!p.startsWith('/')) p = '/' + p;
    if (!p.endsWith('/')) p = p + '/';
    switch (p) {
      case '/':
        return 'home';
      case '/archive/':
        return 'archive';
      case '/anime/':
        return 'anime';
      case '/friends/':
        return 'friends';
      case '/links/':
        return 'links';
      case '/content/':
        return 'about';
      case '/about/':
        return 'about';
      case '/rss/':
        return 'rss';
      default:
        return null;
    }
  } catch {
    return null;
  }
}

function updateHtmlLang(lang: LangCode) {
  const htmlCode = lang.replace('_', '-');
  document.documentElement.setAttribute('lang', htmlCode);
}

function updateNavLabels(lang: LangCode) {
  const dict = getDict(lang);
  const elements = document.querySelectorAll('[data-link-url]');
  elements.forEach((el) => {
    if (!(el instanceof HTMLElement)) return;
    const path = el.getAttribute('data-link-url') || '';
    const key = pathToKey(path);
    if (!key) return;
    const label = dict[key];
    if (!label) return;

    // Look for our injected label span first
    const labelSpan = el.querySelector('.dropdown-link-label') as HTMLElement | null;
    if (labelSpan) {
      labelSpan.textContent = label;
    } else {
      // Fallback: replace first text node inside
      const textNodes = Array.from(el.childNodes).filter(n => n.nodeType === Node.TEXT_NODE);
      if (textNodes.length > 0) {
        textNodes[0].textContent = label;
      }
    }

    // Keep aria-label in sync when applicable
    if (el.hasAttribute('aria-label')) {
      el.setAttribute('aria-label', label);
    }
  });
}

export default function initLangManager() {
  const saved = localStorage.getItem('site-lang');
  const current = normalize(saved);
  updateHtmlLang(current);
  // update labels on ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => updateNavLabels(current));
  } else {
    updateNavLabels(current);
  }

  // respond to switcher events
  window.addEventListener('site-lang-change' as any, (e: Event) => {
    try {
      const detail = (e as CustomEvent).detail || {};
      const lang = normalize(detail.lang);
      updateHtmlLang(lang);
      updateNavLabels(lang);
    } catch {}
  });

  // cross-tab sync
  window.addEventListener('storage', (e: StorageEvent) => {
    if (e.key === 'site-lang') {
      const lang = normalize(e.newValue || '');
      updateHtmlLang(lang);
      updateNavLabels(lang);
    }
  });
}
