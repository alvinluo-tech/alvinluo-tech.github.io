# ImageSetter 组件使用说明

## 概述

`ImageSetter.astro` 是一个用于在博客文章中显示图片的组件，它可以自动处理 R2 CDN 链接，提供美观的样式和悬停效果，减少重复代码。

## 特性

- ✅ 自动拼接 R2 CDN 基础 URL
- ✅ 支持完整的外部图片链接
- ✅ 懒加载和异步解码
- ✅ 响应式设计
- ✅ 深色模式支持
- ✅ 可自定义最大高度和宽高比
- ✅ 可选的图片说明文字
- ✅ 优雅的悬停效果

## Props 属性

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `src` | string | ✅ | - | 图片路径（相对路径或完整 URL） |
| `alt` | string | ❌ | "图片" | 图片的替代文本 |
| `caption` | string | ❌ | - | 图片下方的说明文字 |
| `maxHeight` | string | ❌ | "550px" | 图片的最大高度 |
| `aspectRatio` | string | ❌ | - | 图片的宽高比（如 "16/9"） |

## 使用方法

### 1. 在 MDX 文件中导入组件

```mdx
---
title: 我的博客文章
---

import ImageSetter from '@/components/misc/ImageSetter.astro';

### 文章内容

<ImageSetter src="formal合照.JPG" alt="万圣节formal合照" caption="万圣节晚宴合照 🎃" />
```

### 2. 基础用法 - 使用相对路径（自动拼接 R2 CDN）

```astro
<ImageSetter 
  src="化妆工具.JPG" 
  alt="化妆工具" 
  caption="L姐的赞助✌" 
/>
```

等同于：
```
https://pub-996ee35c86674a47bf3eb5e069624f90.r2.dev/化妆工具.JPG
```

### 3. 使用完整 URL

```astro
<ImageSetter 
  src="https://example.com/image.jpg" 
  alt="外部图片" 
  caption="来自外部的图片" 
/>
```

### 4. 自定义最大高度

```astro
<ImageSetter 
  src="化妆_1.jpg" 
  alt="化妆效果" 
  maxHeight="400px"
/>
```

### 5. 指定宽高比

```astro
<ImageSetter 
  src="banner.jpg" 
  alt="横幅图片" 
  aspectRatio="16/9"
  caption="16:9 宽屏图片"
/>
```

### 6. 不带说明文字

```astro
<ImageSetter 
  src="simple.jpg" 
  alt="简单图片" 
/>
```

## 迁移示例

### 旧代码（冗余）

```html
<div style="display: flex; justify-content: center; margin: 20px 0;">
  <figure style="margin: 0; text-align: center;">
    <img
      src="https://pub-996ee35c86674a47bf3eb5e069624f90.r2.dev/化妆工具.JPG"
      alt="示例图片"
      style="
        width: auto;
        max-width: 100%;
        max-height: 480px;
        border-radius: 12px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.15);
        cursor: zoom-in;
      "
    />
    <figcaption style="font-size: 14px; color: #777; margin-top: 3px;">
      L姐的赞助✌
    </figcaption>
  </figure>
</div>
```

### 新代码（简洁）

```astro
<ImageSetter src="化妆工具.JPG" alt="化妆工具" caption="L姐的赞助✌" />
```

## 与 ImageWrapper 的区别

- **ImageWrapper**: 用于页面布局中的背景图片、封面图等，支持本地图片导入
- **ImageSetter**: 专门用于博客文章内容中的图片展示，优化了 CDN 链接处理和内容样式

## 技术细节

- 使用 `loading="lazy"` 实现懒加载
- 使用 `decoding="async"` 实现异步解码
- CSS 变量确保深色模式适配
- 响应式设计适配移动端
- 平滑的悬停动画效果

## 注意事项

1. 确保 R2 CDN 基础 URL 正确（当前设置为 `https://pub-996ee35c86674a47bf3eb5e069624f90.r2.dev/`）
2. 如果需要修改 CDN 地址，请编辑组件内的 `baseUrl` 常量
3. 图片路径不要以 `/` 开头，除非是完整 URL
4. 建议为所有图片提供 `alt` 文本以提高可访问性
