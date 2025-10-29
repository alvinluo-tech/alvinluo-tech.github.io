import {
  DARK_MODE,
  DEFAULT_THEME,
  LIGHT_MODE,
  SYSTEM_MODE,
  WALLPAPER_BANNER,
  WALLPAPER_OVERLAY,
  WALLPAPER_NONE,
} from "@constants/constants";
import { siteConfig } from "../config";
import type { LIGHT_DARK_MODE, WALLPAPER_MODE } from "@/types/config";

// Declare global functions
declare global {
	interface Window {
		initSemifullScrollDetection?: () => void;
		semifullScrollHandler?: () => void;
	}
}

export function getDefaultHue(): number {
  const fallback = "250";
  // 检查是否在浏览器环境中
  if (typeof document === 'undefined') {
    return Number.parseInt(fallback);
  }
  const configCarrier = document.getElementById("config-carrier");
  return Number.parseInt(configCarrier?.dataset.hue || fallback);
}

export function getDefaultTheme(): LIGHT_DARK_MODE {
  // 如果配置文件中设置了 defaultMode，使用配置的值
  // 否则使用 DEFAULT_THEME（向后兼容）
  return siteConfig.themeColor.defaultMode ?? DEFAULT_THEME;
}

// 获取系统主题
export function getSystemTheme(): LIGHT_DARK_MODE {
  if (typeof window === 'undefined') {
    return LIGHT_MODE;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK_MODE : LIGHT_MODE;
}

// 解析主题（如果是system模式，则获取系统主题）
export function resolveTheme(theme: LIGHT_DARK_MODE): LIGHT_DARK_MODE {
  if (theme === SYSTEM_MODE) {
    return getSystemTheme();
  }
  return theme;
}

export function getHue(): number {
  // 检查是否在浏览器环境中
  if (typeof localStorage === 'undefined') {
    return getDefaultHue();
  }
  const stored = localStorage.getItem("hue");
  return stored ? Number.parseInt(stored) : getDefaultHue();
}

export function setHue(hue: number): void {
  // 检查是否在浏览器环境中
  if (typeof localStorage === 'undefined' || typeof document === 'undefined') {
    return;
  }
  localStorage.setItem("hue", String(hue));
  const r = document.querySelector(":root") as HTMLElement;
  if (!r) {
    return;
  }
  r.style.setProperty("--hue", String(hue));
}

export function applyThemeToDocument(theme: LIGHT_DARK_MODE) {
  // 检查是否在浏览器环境中
  if (typeof document === 'undefined') {
    return;
  }
  
  // 解析主题
  const resolvedTheme = resolveTheme(theme);

  // 获取当前主题状态的完整信息
  const currentIsDark = document.documentElement.classList.contains("dark");
  const currentTheme = document.documentElement.getAttribute("data-theme");

  // 计算目标主题状态
  let targetIsDark: boolean = false; // 初始化默认值
  switch (resolvedTheme) {
    case LIGHT_MODE:
      targetIsDark = false;
      break;
    case DARK_MODE:
      targetIsDark = true;
      break;
    default:
      // 处理默认情况，使用当前主题状态
      targetIsDark = currentIsDark;
      break;
  }

  // 检测是否真的需要主题切换：
  // 1. dark类状态是否改变
  // 2. expressiveCode主题是否需要更新
  const needsThemeChange = currentIsDark !== targetIsDark;
  const expectedTheme = targetIsDark ? "github-dark" : "github-light";
  const needsCodeThemeUpdate = currentTheme !== expectedTheme;

  // 如果既不需要主题切换也不需要代码主题更新，直接返回
  if (!needsThemeChange && !needsCodeThemeUpdate) {
    return;
  }

  // 只在需要主题切换时添加过渡保护
  if (needsThemeChange) {
    document.documentElement.classList.add("is-theme-transitioning");
  }

  // 使用 requestAnimationFrame 确保在下一帧执行，避免闪屏
  requestAnimationFrame(() => {
    // 应用主题变化
    if (needsThemeChange) {
      if (targetIsDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }

    // Set the theme for Expressive Code based on current mode
    const expressiveTheme = targetIsDark ? "github-dark" : "github-light";
    document.documentElement.setAttribute("data-theme", expressiveTheme);

    // 强制重新渲染代码块 - 解决从首页进入文章页面时的渲染问题
    if (needsCodeThemeUpdate) {
      // 触发 expressice code 重新渲染
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent("theme-change"));
      }, 0);
    }

    // 在下一帧快速移除保护类，使用微任务确保DOM更新完成
    if (needsThemeChange) {
      // 使用 requestAnimationFrame 确保在下一帧移除过渡保护类
      requestAnimationFrame(() => {
        document.documentElement.classList.remove("is-theme-transitioning");
      });
    }
  });
}

// 系统主题监听器引用
let systemThemeListener: ((e: MediaQueryListEvent | MediaQueryList) => void) | null = null;

export function setTheme(theme: LIGHT_DARK_MODE): void {
  // 检查是否在浏览器环境中
  if (typeof localStorage === 'undefined') {
    return;
  }
  
  // 先应用主题
  applyThemeToDocument(theme);
  
  // 保存到localStorage
  localStorage.setItem("theme", theme);
  
  // 如果切换到 system 模式，需要监听系统主题变化
  if (theme === SYSTEM_MODE) {
    setupSystemThemeListener();
  } else {
    // 如果切换其他模式，移除系统主题监听
    cleanupSystemThemeListener();
  }
}

// 设置系统主题监听器
export function setupSystemThemeListener() {
  // 先清理之前的监听器
  cleanupSystemThemeListener();
  
  if (typeof window === 'undefined') {
    return;
  }
  
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  // 处理系统主题变化的回调
  const handleSystemThemeChange = (e: MediaQueryListEvent | MediaQueryList) => {
    const isDark = e.matches;
    
    // 添加过渡保护以避免闪屏
    document.documentElement.classList.add("is-theme-transitioning");
    
    // 应用系统主题，但不保存到 localStorage
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    
    // Set the theme for Expressive Code
    const expressiveTheme = isDark ? "github-dark" : "github-light";
    document.documentElement.setAttribute("data-theme", expressiveTheme);
    
    // 移除过渡保护
    requestAnimationFrame(() => {
      document.documentElement.classList.remove("is-theme-transitioning");
    });
    
    // 触发自定义事件通知其他组件
    window.dispatchEvent(new CustomEvent("theme-change"));
  };
  
  // 立即调用一次以设置初始状态
  handleSystemThemeChange(mediaQuery);
  
  // 监听系统主题变化（现代浏览器）
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', handleSystemThemeChange);
  } else {
    // 兼容旧浏览器
    (mediaQuery as any).addListener(handleSystemThemeChange);
  }
  
  systemThemeListener = handleSystemThemeChange;
}

// 清理系统主题监听器
function cleanupSystemThemeListener() {
  if (typeof window === 'undefined' || !systemThemeListener) {
    return;
  }
  
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  if (mediaQuery.removeEventListener) {
    mediaQuery.removeEventListener('change', systemThemeListener);
  } else {
    // 兼容旧浏览器
    (mediaQuery as any).removeListener(systemThemeListener);
  }
  
  systemThemeListener = null;
}


export function getStoredTheme(): LIGHT_DARK_MODE {
  // 检查是否在浏览器环境中
  if (typeof localStorage === 'undefined') {
    return getDefaultTheme();
  }
  return (
    (localStorage.getItem("theme") as LIGHT_DARK_MODE) || getDefaultTheme()
  );
}

// 初始化主题监听器（用于页面加载后）
export function initThemeListener() {
  if (typeof localStorage === 'undefined') {
    return;
  }
  
  const theme = getStoredTheme();
  
  // 如果主题是 system 模式，需要监听系统主题变化
  if (theme === SYSTEM_MODE) {
    setupSystemThemeListener();
  }
}

// Wallpaper mode functions
export function applyWallpaperModeToDocument(mode: WALLPAPER_MODE) {
	// 检查是否允许切换壁纸模式
	const isSwitchable = siteConfig.backgroundWallpaper.switchable ?? true;
	if (!isSwitchable) {
		// 如果不允许切换，直接返回，不执行任何操作
		return;
	}

	// 获取当前的壁纸模式
	const currentMode = document.documentElement.getAttribute('data-wallpaper-mode') as WALLPAPER_MODE || siteConfig.backgroundWallpaper.mode;

	// 如果模式没有变化，直接返回
	if (currentMode === mode) {
		// 即使是相同模式，也要确保UI状态正确
		ensureWallpaperState(mode);
		return;
	}

	// 添加过渡保护类
	document.documentElement.classList.add('is-wallpaper-transitioning');

	// 更新数据属性
	document.documentElement.setAttribute('data-wallpaper-mode', mode);

	// 使用 requestAnimationFrame 确保在下一帧执行，避免闪屏
	requestAnimationFrame(() => {
		const body = document.body;

		// 移除所有壁纸相关的CSS类
		body.classList.remove('enable-banner', 'wallpaper-transparent');

		// 根据模式添加相应的CSS类
		switch (mode) {
			case WALLPAPER_BANNER:
				body.classList.add('enable-banner');
				showBannerMode();
				break;
			case WALLPAPER_OVERLAY:
				body.classList.add('wallpaper-transparent');
				showOverlayMode();
				break;
			case WALLPAPER_NONE:
				hideAllWallpapers();
				break;
			default:
				hideAllWallpapers();
				break;
		}

		// 更新导航栏透明模式
		updateNavbarTransparency(mode);

		// 在下一帧移除过渡保护类
		requestAnimationFrame(() => {
			document.documentElement.classList.remove('is-wallpaper-transitioning');
		});
	});
}

// 确保壁纸状态正确
function ensureWallpaperState(mode: WALLPAPER_MODE) {
	const body = document.body;
	
	// 移除所有壁纸相关的CSS类
	body.classList.remove('enable-banner', 'wallpaper-transparent');
	
	// 根据模式添加相应的CSS类
	switch (mode) {
		case WALLPAPER_BANNER:
			body.classList.add('enable-banner');
			showBannerMode();
			break;
		case WALLPAPER_OVERLAY:
			body.classList.add('wallpaper-transparent');
			showOverlayMode();
			break;
		case WALLPAPER_NONE:
			hideAllWallpapers();
			break;
	}
	
	// 更新导航栏透明模式
	updateNavbarTransparency(mode);
}

function showBannerMode() {
	// 隐藏全屏壁纸（通过CSS类和display控制）
	const fullscreenContainer = document.querySelector('[data-fullscreen-wallpaper]') as HTMLElement;
	if (fullscreenContainer) {
		fullscreenContainer.style.display = 'none';
		fullscreenContainer.classList.add('hidden');
		fullscreenContainer.classList.add('opacity-0');
		fullscreenContainer.classList.remove('opacity-100');
	}

	// 显示banner壁纸（通过CSS类和display控制）
	const bannerWrapper = document.getElementById('banner-wrapper');
	if (bannerWrapper) {
		// 先设置display，然后使用requestAnimationFrame确保渲染
		bannerWrapper.style.display = 'block';
		bannerWrapper.style.setProperty('display', 'block', 'important');
		requestAnimationFrame(() => {
			bannerWrapper.classList.remove('hidden');
			bannerWrapper.classList.remove('opacity-0');
			bannerWrapper.classList.add('opacity-100');
		});
	}

	// 显示横幅图片来源文本
	const creditDesktop = document.getElementById('banner-credit-desktop');
	const creditMobile = document.getElementById('banner-credit-mobile');
	if (creditDesktop) creditDesktop.style.display = '';
	if (creditMobile) creditMobile.style.display = '';

	// 显示横幅首页文本（如果启用且是首页）
	const bannerTextOverlay = document.querySelector('.banner-text-overlay');
	if (bannerTextOverlay) {
		// 检查是否启用 homeText
		const homeTextEnabled = siteConfig.backgroundWallpaper.banner?.homeText?.enable;
		
		// 检查当前是否为首页
		const isHomePage = window.location.pathname === '/' || window.location.pathname === '';
		
		// 只有在启用且在首页时才显示
		if (homeTextEnabled && isHomePage) {
			bannerTextOverlay.classList.remove('hidden');
		} else {
			bannerTextOverlay.classList.add('hidden');
		}
	}

	// 调整主内容位置
	adjustMainContentPosition('banner');

	// 移除透明效果（横幅模式不使用半透明）
	adjustMainContentTransparency(false);

	// 调整导航栏透明度
	const navbar = document.getElementById('navbar');
	if (navbar) {
		// 获取导航栏透明模式配置（banner模式）
		const transparentMode = siteConfig.backgroundWallpaper.banner?.navbar?.transparentMode || 'semi';
		navbar.setAttribute('data-transparent-mode', transparentMode);

		// 重新初始化半透明模式滚动检测（如果需要）
		if (transparentMode === 'semifull' && typeof window.initSemifullScrollDetection === 'function') {
			window.initSemifullScrollDetection();
		}
	}
}

function showOverlayMode() {
	// 显示全屏壁纸（通过CSS类和display控制）
	const fullscreenContainer = document.querySelector('[data-fullscreen-wallpaper]') as HTMLElement;
	if (fullscreenContainer) {
		// 先设置display，然后使用requestAnimationFrame确保渲染
		fullscreenContainer.style.display = 'block';
		fullscreenContainer.style.setProperty('display', 'block', 'important');
		requestAnimationFrame(() => {
			fullscreenContainer.classList.remove('hidden');
			fullscreenContainer.classList.remove('opacity-0');
			fullscreenContainer.classList.add('opacity-100');
		});
	}

	// 隐藏banner壁纸（通过CSS类和display控制）
	const bannerWrapper = document.getElementById('banner-wrapper');
	if (bannerWrapper) {
		bannerWrapper.style.display = 'none';
		bannerWrapper.classList.add('hidden');
		bannerWrapper.classList.add('opacity-0');
		bannerWrapper.classList.remove('opacity-100');
	}

	// 隐藏横幅图片来源文本
	const creditDesktop = document.getElementById('banner-credit-desktop');
	const creditMobile = document.getElementById('banner-credit-mobile');
	if (creditDesktop) creditDesktop.style.display = 'none';
	if (creditMobile) creditMobile.style.display = 'none';

	// 隐藏横幅首页文本
	const bannerTextOverlay = document.querySelector('.banner-text-overlay');
	if (bannerTextOverlay) {
		bannerTextOverlay.classList.add('hidden');
	}

	// 调整主内容透明度
	adjustMainContentTransparency(true);

	// 调整布局为紧凑模式
	adjustMainContentPosition('overlay');
}

function hideAllWallpapers() {
	// 隐藏所有壁纸（通过CSS类和display控制）
	const bannerWrapper = document.getElementById('banner-wrapper');
	const fullscreenContainer = document.querySelector('[data-fullscreen-wallpaper]') as HTMLElement;

	if (bannerWrapper) {
		bannerWrapper.style.display = 'none';
		bannerWrapper.classList.add('hidden');
		bannerWrapper.classList.add('opacity-0');
	}

	if (fullscreenContainer) {
		fullscreenContainer.style.display = 'none';
		fullscreenContainer.classList.add('hidden');
		fullscreenContainer.classList.add('opacity-0');
		fullscreenContainer.classList.remove('opacity-100');
	}

	// 隐藏横幅图片来源文本
	const creditDesktop = document.getElementById('banner-credit-desktop');
	const creditMobile = document.getElementById('banner-credit-mobile');
	if (creditDesktop) creditDesktop.style.display = 'none';
	if (creditMobile) creditMobile.style.display = 'none';

	// 隐藏横幅首页文本
	const bannerTextOverlay = document.querySelector('.banner-text-overlay');
	if (bannerTextOverlay) {
		bannerTextOverlay.classList.add('hidden');
	}

	// 调整主内容位置和透明度
	adjustMainContentPosition('none');
	adjustMainContentTransparency(false);
}

function updateNavbarTransparency(mode: WALLPAPER_MODE) {
	const navbar = document.getElementById('navbar');
	if (!navbar) return;

	let transparentMode: string;
	
	// 根据当前壁纸模式设置导航栏透明模式
	if (mode === WALLPAPER_OVERLAY) {
		// 全屏壁纸模式：固定使用半透明
		transparentMode = 'semi';
	} else if (mode === WALLPAPER_NONE) {
		// 纯色背景模式：完全不透明，使用默认背景
		transparentMode = 'none';
	} else {
		// Banner模式：使用配置的透明模式
		transparentMode = siteConfig.backgroundWallpaper.banner?.navbar?.transparentMode || 'semi';
	}

	// 更新导航栏的透明模式属性
	navbar.setAttribute('data-transparent-mode', transparentMode);

	// 移除现有的透明模式类
	navbar.classList.remove('navbar-transparent-semi', 'navbar-transparent-full', 'navbar-transparent-semifull');

	// 移除scrolled类
	navbar.classList.remove('scrolled');

	// 滚动检测功能
	if (transparentMode === 'semifull' && mode === WALLPAPER_BANNER && typeof window.initSemifullScrollDetection === 'function') {
		// 仅在Banner模式的semifull下启用滚动检测
		window.initSemifullScrollDetection();
	} else if (window.semifullScrollHandler) {
		// 移除滚动监听器
		window.removeEventListener('scroll', window.semifullScrollHandler);
		delete window.semifullScrollHandler;
	}
}

function adjustMainContentPosition(mode: WALLPAPER_MODE | 'banner' | 'none' | 'overlay') {
	const mainContent = document.querySelector('.absolute.w-full.z-30') as HTMLElement;
	if (!mainContent) return;

	// 移除现有的位置类
	mainContent.classList.remove('mobile-main-no-banner', 'no-banner-layout');

	switch (mode) {
		case 'banner':
			// Banner模式：主内容在banner下方
			mainContent.style.top = 'calc(var(--banner-height) - 3rem)';
			break;
		case 'overlay':
			// Overlay模式：使用紧凑布局，主内容从导航栏下方开始
			mainContent.classList.add('no-banner-layout');
			mainContent.style.top = '5.5rem';
			break;
		case 'none':
			// 无壁纸模式：主内容从导航栏下方开始
			mainContent.classList.add('no-banner-layout');
			mainContent.style.top = '5.5rem';
			break;
		default:
			mainContent.style.top = '5.5rem';
			break;
	}
}

function adjustMainContentTransparency(enable: boolean) {
	const mainContent = document.querySelector('.absolute.w-full.z-30');
	const body = document.body;
	
	if (!mainContent || !body) return;

	if (enable) {
		mainContent.classList.add('wallpaper-transparent');
		body.classList.add('wallpaper-transparent');
	} else {
		mainContent.classList.remove('wallpaper-transparent');
		body.classList.remove('wallpaper-transparent');
	}
}

export function setWallpaperMode(mode: WALLPAPER_MODE): void {
	// 检查是否在浏览器环境中
	if (typeof localStorage === 'undefined') {
		return;
	}
	localStorage.setItem('wallpaperMode', mode);
	applyWallpaperModeToDocument(mode);
}

export function initWallpaperMode(): void {
	const storedMode = getStoredWallpaperMode();
	applyWallpaperModeToDocument(storedMode);
}

export function getStoredWallpaperMode(): WALLPAPER_MODE {
	// 检查是否在浏览器环境中
	if (typeof localStorage === 'undefined') {
		return siteConfig.backgroundWallpaper.mode;
	}
	return (localStorage.getItem('wallpaperMode') as WALLPAPER_MODE) || siteConfig.backgroundWallpaper.mode;
}
