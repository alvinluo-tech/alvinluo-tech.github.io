<script lang="ts">
  import { onMount } from 'svelte';
  import { getLanguageDisplayName } from '@/utils/language-utils';

  type LangCode = 'en' | 'zh_CN' | 'zh_TW' | 'ja' | 'ru';

  const supported: { code: LangCode; label: string }[] = [
    { code: 'en', label: getLanguageDisplayName('en') },
    { code: 'zh_CN', label: getLanguageDisplayName('zh_CN') },
    { code: 'zh_TW', label: getLanguageDisplayName('zh_TW') },
    { code: 'ja', label: getLanguageDisplayName('ja') },
    { code: 'ru', label: getLanguageDisplayName('ru') },
  ];

  let open = false;
  let current: LangCode = 'en';

  function detectInitial(): LangCode {
    const saved = (localStorage.getItem('site-lang') || '').toLowerCase();
    if (saved) {
      // normalize saved to supported codes
      if (saved.startsWith('en')) return 'en';
      if (saved === 'zh_cn' || saved === 'zh-cn' || saved === 'zh_hans') return 'zh_CN';
      if (saved === 'zh_tw' || saved === 'zh-tw' || saved === 'zh_hant') return 'zh_TW';
      if (saved.startsWith('ja')) return 'ja';
      if (saved.startsWith('ru')) return 'ru';
    }
    const htmlLang = (document.documentElement.getAttribute('lang') || '').toLowerCase();
    if (htmlLang.startsWith('zh')) return 'zh_CN';
    if (htmlLang.startsWith('ja')) return 'ja';
    if (htmlLang.startsWith('ru')) return 'ru';
    return 'en';
  }

  onMount(() => {
    current = detectInitial();
    // click outside to close
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-lang-switch]')) {
        open = false;
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  });

  function abbr(code: LangCode): string {
    switch (code) {
      case 'en': return 'EN';
      case 'zh_CN': return '中文';
      case 'zh_TW': return '繁體';
      case 'ja': return '日本語';
      case 'ru': return 'RU';
    }
  }

  function switchLanguage(code: LangCode) {
    current = code;
    // persist user preference
    const toSave = code === 'zh_CN' ? 'zh_CN' : code;
    localStorage.setItem('site-lang', toSave);

    // broadcast language change so UI can update without full reload
    try {
      window.dispatchEvent(new CustomEvent('site-lang-change', { detail: { lang: code } }));
    } catch {}

    // Close dropdown
    open = false;
  }
</script>

<div data-lang-switch class="relative">
  <button
    aria-label="Language Switch"
    class="btn-plain scale-animation rounded-lg h-11 px-3 active:scale-90 flex items-center gap-1"
    on:click={() => (open = !open)}
  >
    <span class="text-[0.9rem]">{abbr(current)}</span>
    <svg class="w-3 h-3 opacity-70" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clip-rule="evenodd" />
    </svg>
  </button>
  {#if open}
    <div class="absolute right-0 mt-2 w-40 z-50 rounded-lg shadow-lg bg-[var(--card-bg)] border border-[var(--card-border)] overflow-hidden">
      {#each supported as item}
        <button
          class="w-full text-left px-3 py-2 hover:bg-[var(--hover-bg)] text-sm text-black/90 dark:text-white/90"
          on:click={() => { open = false; switchLanguage(item.code); }}
        >
          {item.label}
        </button>
      {/each}
    </div>
  {/if}
</div>

<style>
  :global([data-theme="github-dark"]) .hover\:bg-\[var\(--hover-bg\)\]:hover { }
</style>
