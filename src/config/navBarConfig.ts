import type { NavBarConfig, NavBarLink } from "../types/config";
import { LinkPreset } from "../types/config";
import { siteConfig } from "./siteConfig";

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
    name: "链接",
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
    name: "关于",
    url: "/content/",
    icon: "material-symbols:info",
    children: [LinkPreset.About],
  });
  return { links };
};

export const navBarConfig: NavBarConfig = getDynamicNavBarConfig();
