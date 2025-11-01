# FocusTimer 博客文章图片准备清单

## 📋 图片清单

### 1. 封面图片（可选）
- **位置**: Front matter `img` 字段
- **建议路径**: `/assets/images/focus-timer-cover.png`
- **说明**: 文章封面图，会显示在博客列表和文章顶部
- **建议尺寸**: 1200x630px（适合社交媒体分享）
- **内容建议**: FocusTimer 的主界面或 Logo

---

### 2. 项目 Logo（可选）
- **位置**: Introduction 章节开头
- **建议路径**: `/assets/images/posts/focus-timer/logo.png`
- **说明**: 项目标识图标
- **建议尺寸**: 200x200px 或更大
- **内容**: FocusTimer 应用图标

---

### 3. 主界面截图 ⭐ 必需
- **位置**: Screenshots 章节 - Main Interface
- **当前使用**: GitHub 仓库图片（已配置）
- **本地路径建议**: `/assets/images/posts/focus-timer/main-interface.png`
- **GitHub 路径**: `https://raw.githubusercontent.com/alvinluo-tech/tauri-FocusTimer/main/screenshots/main-interface.png`
- **说明**: 展示任务组和任务管理功能

---

### 4. 计时器运行界面截图 ⭐ 必需
- **位置**: Screenshots 章节 - Timer Interface (Running)
- **当前使用**: GitHub 仓库图片（已配置）
- **本地路径建议**: `/assets/images/posts/focus-timer/timer-running.png`
- **GitHub 路径**: `https://raw.githubusercontent.com/alvinluo-tech/tauri-FocusTimer/main/screenshots/timer.png`
- **说明**: 计时器运行中的大字体显示和进度条

---

### 5. 计时器暂停界面截图
- **位置**: Screenshots 章节 - Timer Interface (Paused)
- **当前使用**: GitHub 仓库图片（已配置）
- **本地路径建议**: `/assets/images/posts/focus-timer/timer-paused.png`
- **GitHub 路径**: `https://raw.githubusercontent.com/alvinluo-tech/tauri-FocusTimer/main/screenshots/timer-paused.png`
- **说明**: 暂停状态的计时器，展示自定义背景

---

### 6. 统计报告列表视图截图 ⭐ 必需
- **位置**: Screenshots 章节 - Statistics (List View)
- **当前使用**: GitHub 仓库图片（已配置）
- **本地路径建议**: `/assets/images/posts/focus-timer/statistics-list.png`
- **GitHub 路径**: `https://raw.githubusercontent.com/alvinluo-tech/tauri-FocusTimer/main/screenshots/statistics-report.png`
- **说明**: 详细的统计指标列表

---

### 7. 统计报告图表视图截图 ⭐ 必需
- **位置**: Screenshots 章节 - Statistics (Chart View)
- **当前使用**: GitHub 仓库图片（已配置）
- **本地路径建议**: `/assets/images/posts/focus-timer/statistics-chart.png`
- **GitHub 路径**: `https://raw.githubusercontent.com/alvinluo-tech/tauri-FocusTimer/main/screenshots/statistics-chart.png`
- **说明**: 交互式饼图展示时间分布

---

### 8. 设置界面截图
- **位置**: Screenshots 章节 - Settings
- **当前使用**: GitHub 仓库图片（已配置）
- **本地路径建议**: `/assets/images/posts/focus-timer/settings.png`
- **GitHub 路径**: `https://raw.githubusercontent.com/alvinluo-tech/tauri-FocusTimer/main/screenshots/settings-interface.png`
- **说明**: 背景自定义和语言设置界面

---

## 🔄 图片替换方式

### 方案 1: 使用 GitHub 图片（当前方案）
✅ **优点**: 
- 无需上传到博客仓库
- 图片更新自动同步
- 节省博客仓库空间

❌ **缺点**: 
- 依赖外部链接
- GitHub 服务受限时可能加载慢

**当前状态**: 已配置完成，可直接使用

---

### 方案 2: 使用本地图片（推荐用于重要图片）
✅ **优点**: 
- 加载速度快
- 完全控制
- 不依赖外部服务

❌ **缺点**: 
- 需要手动上传
- 增加仓库大小

**操作步骤**:
1. 创建目录: `public/assets/images/posts/focus-timer/`
2. 从 GitHub 仓库下载截图到该目录
3. 修改文章中的图片路径，例如:
   ```markdown
   ![Main Interface](/assets/images/posts/focus-timer/main-interface.png)
   ```

---

## 📝 Markdown 图片语法

### 基本语法
```markdown
![图片描述](图片路径)
```

### 带标题的图片
```markdown
![图片描述](图片路径 "鼠标悬停时显示的标题")
```

### HTML 方式（可控制尺寸）
```markdown
<img src="图片路径" alt="图片描述" width="800" />
```

---

## ✅ 当前状态

- ✅ 已配置 8 个图片占位符
- ✅ 所有截图都使用 GitHub 仓库图片（临时方案）
- ⏳ 待定: 是否需要添加封面图片
- ⏳ 待定: 是否替换为本地图片

---

## 🎨 图片优化建议

1. **文件格式**: 
   - 截图使用 PNG（保持清晰度）
   - 装饰性图片可用 WebP（更小）

2. **文件大小**: 
   - 单张图片建议 < 500KB
   - 可使用工具压缩: TinyPNG, Squoosh

3. **命名规范**: 
   - 使用小写字母和连字符
   - 描述性命名: `timer-running.png` 而非 `img1.png`

4. **Alt 文本**: 
   - 已为所有图片添加描述性 alt 文本
   - 有助于 SEO 和无障碍访问

---

## 🚀 下一步操作

1. **预览文章**: 启动开发服务器查看效果
2. **检查图片**: 确认 GitHub 图片是否正常加载
3. **决定方案**: 
   - 保持使用 GitHub 图片
   - 或下载到本地替换路径
4. **添加封面**: 如需封面图，取消注释并添加图片路径

---

**注意**: 当前配置已可正常使用，图片来自 GitHub 仓库。如需更改，参考上述说明操作即可。
