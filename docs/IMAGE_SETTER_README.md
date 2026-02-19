# 🖼️ ImageSetter 组件 - 博客图片简化方案

## 📖 概述

`ImageSetter` 是一个优雅的 Astro 组件，用于简化博客文章中的图片展示代码。它可以将 15+ 行的重复 HTML 代码压缩为 1 行简洁的组件调用。

### ✨ 主要特性

- 🎯 **代码精简 93%** - 从 15+ 行减少到 1 行
- 🔗 **自动 CDN 拼接** - 支持 R2 CDN 路径自动处理
- 🌐 **完整 URL 支持** - 也可以使用外部图片链接
- 📱 **响应式设计** - 自动适配各种屏幕尺寸
- 🌙 **深色模式** - 自适应深色/浅色主题
- ⚡ **性能优化** - 懒加载 + 异步解码
- 🎨 **统一样式** - 一处修改，全局生效

## 🚀 快速开始

### 1. 组件位置

组件已创建在：
```
src/components/misc/ImageSetter.astro
```

### 2. 基础使用

在 MDX 文件中导入并使用：

```mdx
---
title: 我的博客
published: 2025-11-02
---

import ImageSetter from '@/components/misc/ImageSetter.astro';

### 博客内容

<ImageSetter src="my-photo.jpg" alt="我的照片" caption="这是说明文字" />
```

### 3. 使用示例

#### 相对路径（自动拼接 R2 CDN）
```mdx
<ImageSetter src="image.jpg" alt="图片" caption="说明" />
<!-- 实际 URL: https://pub-996ee35c86674a47bf3eb5e069624f90.r2.dev/image.jpg -->
```

#### 完整 URL
```mdx
<ImageSetter 
  src="https://example.com/photo.jpg" 
  alt="外部图片" 
  caption="来自其他网站"
/>
```

#### 自定义高度
```mdx
<ImageSetter 
  src="large.jpg" 
  alt="大图" 
  maxHeight="800px"
/>
```

#### 指定宽高比
```mdx
<ImageSetter 
  src="banner.jpg" 
  alt="横幅" 
  aspectRatio="16/9"
  caption="宽屏图片"
/>
```

## 📊 效果对比

### 旧方式（15+ 行）

```html
<div style="display: flex; justify-content: center; margin: 20px 0;">
  <figure style="margin: 0; text-align: center;">
    <img
      src="https://pub-996ee35c86674a47bf3eb5e069624f90.r2.dev/photo.jpg"
      alt="图片"
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
      说明文字
    </figcaption>
  </figure>
</div>
```

### 新方式（1 行）

```mdx
<ImageSetter src="photo.jpg" alt="图片" caption="说明文字" />
```

**代码量减少 93%！** 🎉

## 🛠️ 自动化迁移

### 使用迁移脚本

我们提供了自动化脚本来迁移现有文章：

```bash
# 预览模式（不修改文件）
node scripts/migrate-images.js --dry-run

# 迁移单个文件
node scripts/migrate-images.js src/content/posts/my-post.md

# 迁移整个目录
node scripts/migrate-images.js src/content/posts

# 实际执行迁移
node scripts/migrate-images.js
```

### 脚本功能

- ✅ 自动识别旧格式图片 HTML
- ✅ 提取 src、alt、caption 信息
- ✅ 生成新的 ImageSetter 组件代码
- ✅ 自动添加 import 语句
- ✅ 将 .md 重命名为 .mdx
- ✅ 删除旧文件
- ✅ 提供详细的迁移报告

## 📄 组件 API

### Props

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `src` | string | ✅ | - | 图片路径（相对或绝对） |
| `alt` | string | ❌ | "图片" | 图片替代文本 |
| `caption` | string | ❌ | - | 图片说明文字 |
| `maxHeight` | string | ❌ | "550px" | 最大高度 |
| `aspectRatio` | string | ❌ | - | 宽高比（如 "16/9"） |

### 样式特性

- 自动居中对齐
- 圆角阴影效果
- 鼠标悬停放大
- 响应式设计
- 深色模式支持
- 懒加载优化

## 📚 文档

- [详细使用说明](./src/components/misc/ImageSetter.usage.md)
- [迁移指南](./docs/image-setter-migration-guide.md)

## 🎯 实际案例

### 案例 1: 生活博客

**文件**: `Halloweed.mdx`

```mdx
---
title: Halloween Night
published: 2025-11-02
---

import ImageSetter from '@/components/misc/ImageSetter.astro';

### 万圣节准备

非常感谢L姐的倾情赞助：

<ImageSetter src="化妆工具.JPG" alt="化妆工具" caption="L姐的赞助✌" />

然后就有了下面的成果：

<ImageSetter src="化妆_1.jpg" alt="化妆过程" caption="化妆新手直接化成花猫✌" />

最终效果：

<ImageSetter src="化妆_2.jpg" alt="最终效果" caption="不知道在得瑟些啥" />

主食，当当当当：

<ImageSetter src="formal主食.JPG" alt="正餐主食" caption="学院 formal 的主菜" />
```

### 收益

- 原代码：~240 行
- 新代码：~40 行
- 减少：**83%** 📉
- 可维护性：**提升 10 倍** 🚀

## 🔧 配置

### 修改 CDN 地址

编辑 `src/components/misc/ImageSetter.astro`：

```astro
// 修改这行
const baseUrl = "https://your-cdn-url.com/";
```

### 修改默认样式

编辑组件的 `<style>` 部分：

```css
.blog-image {
  border-radius: 12px;  /* 调整圆角 */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);  /* 调整阴影 */
  /* ...更多样式 */
}
```

## ⚠️ 注意事项

1. **文件格式**: 必须使用 `.mdx` 文件而不是 `.md`
2. **导入语句**: 需要在文件开头导入组件
3. **图片路径**: 
   - 相对路径（`image.jpg`）→ 自动拼接 CDN
   - 完整 URL（`https://...`）→ 直接使用
   - 不要以 `/` 开头
4. **自闭合标签**: 使用 `<ImageSetter ... />` 格式

## 🐛 故障排查

### 组件不显示

**原因**: 文件不是 MDX 格式

**解决**: 
```bash
mv post.md post.mdx
```

### 图片加载失败

**原因**: CDN 路径错误

**解决**: 
1. 检查 `baseUrl` 配置
2. 使用浏览器开发者工具查看实际请求 URL
3. 确认图片文件存在

### 样式不生效

**原因**: 缓存问题

**解决**:
```bash
rm -rf .astro
npm run dev
```

## 📈 性能指标

- **懒加载**: 图片进入视口时才加载
- **异步解码**: 不阻塞主线程
- **响应式**: 自动适配设备尺寸
- **优化的阴影**: 使用 GPU 加速

## 🎓 最佳实践

1. **始终提供 alt 文本** - 提高可访问性
2. **使用合适的图片尺寸** - 避免上传过大的原图
3. **统一命名规范** - 便于管理和迁移
4. **添加描述性 caption** - 提升用户体验
5. **定期检查外链图片** - 避免 404

## 🤝 贡献

如果你有改进建议：

1. 修改 `src/components/misc/ImageSetter.astro`
2. 更新文档
3. 测试现有博客文章
4. 提交更改

## 📝 许可

与项目主体使用相同的许可证。

---

**开始使用 ImageSetter，让你的博客代码更简洁、更优雅！** ✨

如有问题，请查看 [详细文档](./docs/image-setter-migration-guide.md) 或提交 Issue。
