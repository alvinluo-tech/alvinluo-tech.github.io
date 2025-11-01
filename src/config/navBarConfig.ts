import type { NavBarConfig, NavBarLink } from "../types/config";
import { LinkPreset } from "../types/config";
import { siteConfig } from "./siteConfig";
// Avoid importing i18n here to prevent circular deps. Compute simple defaults based on site language.

function tLinks(): string {
  const lang = (siteConfig.lang || 'en').toLowerCase();
  if (lang.startsWith('zh')) return '链接';
  if (lang.startsWith('ja')) return 'リンク';
  if (lang.startsWith('ru')) return 'Ссылки';
  return 'Links';
}

function tAbout(): string {
  const lang = (siteConfig.lang || 'en').toLowerCase();
  if (lang.startsWith('zh')) return '关于我';
  if (lang.startsWith('ja')) return 'について';
  if (lang.startsWith('ru')) return 'О нас';
  return 'About';
}

// 根据页面开关动态生成导航栏配置
const getDynamicNavBarConfig = (): NavBarConfig => {
  const links: (NavBarLink | LinkPreset)[] = [
    LinkPreset.Home,
    LinkPreset.Archive,
  ];

  // 根据配置决定是否添加追番页面
  if (siteConfig.pages.anime) {
    links.push(LinkPreset.Anime);
  }

  // 支持自定义导航栏链接,并且支持多级菜单
  links.push({
    name: tLinks(),
    url: "/links/",
    icon: "material-symbols:link",
    children: [
      {
        name: "GitHub",
        url: "https://github.com/alvinluo-tech",
        external: true,
        icon: "fa6-brands:github",
      },
        {
      name: "Instagram",
      url: "https://www.instagram.com/louyaosheng16",
      icon: "instagram",
      external: true,
    },
       {
        name: "Redbook",
        url: "https://www.xiaohongshu.com/user/profile/5fa793ed00000000010038a3",
        external: true,
        icon: "redbook",
      },
      {
        name: "Tiktok",
        url: "https://www.tiktok.com/@alvinluo86",
        external: true,
        icon: "tiktok",
      }
      
      
    ],
  });

  // links.push(LinkPreset.Friends);

  links.push({
    name: tAbout(),
    url: "/content/",
    icon: "material-symbols:info",
    children: [LinkPreset.About],
  });
  return { links };
};

export const navBarConfig: NavBarConfig = getDynamicNavBarConfig();
