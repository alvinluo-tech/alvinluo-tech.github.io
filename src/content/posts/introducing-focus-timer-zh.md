---
title: FocusTimer - 现代化桌面专注计时应用
published: 2025-10-31
description: "一个基于 Tauri、React 和 Rust 开发的跨平台专注计时应用，帮助你高效管理时间，提升生产力。"
tags: ["项目", "tauri", "react", "rust", "效率工具", "开源"]
category: 项目
draft: false
pinned: true
image: https://i.ibb.co/FbmmdH2k/3292708-D-6920-4-B9-C-8-BFD-6-ECAB5-F1-AACE.png
---

> 🌏 **Language / 语言**: [English Version (英文版)](/posts/introducing-focus-timer/) | [中文](#)

## 🎯 项目介绍

我很高兴与大家分享我的最新项目 - **FocusTimer**，一款现代化的桌面专注计时应用，旨在帮助你保持高效并有效管理时间。这个跨平台应用采用 Tauri 2.0、React 19 和 Rust 等前沿技术构建，将番茄工作法和灵活的时间追踪功能带到你的桌面。

::github{repo="alvinluo-tech/tauri-FocusTimer"}

## 💡 为什么开发这个项目

作为一名软件开发者，我一直在时间管理和工作专注度方面遇到挑战。虽然市面上有很多计时应用，但我想要一款能够：

- **原生运行**，占用最少的系统资源
- **灵活追踪时间** - 支持倒计时和正向计时两种模式
- **有序组织任务**，将任务分组管理
- **提供详细统计**，帮助了解时间分配
- **离线工作**，无需依赖云服务
- **界面现代**，干净整洁且可定制

于是我决定使用 Tauri 来构建 FocusTimer - 一个将 Rust 的强大性能与 Web 技术的灵活性完美结合的框架。

## ✨ 核心功能

### 🎯 任务管理

FocusTimer 允许你将工作组织成**任务组**和**单个任务**。例如，你可以创建一个"工作项目"组，包含"代码审查"、"功能开发"和"Bug修复"等任务，或者创建一个"学习"组，包含不同学科的学习任务。

**任务创建选项：**
- **预设时间**：快速选择 25、30、45 分钟或 1 小时
- **自定义时长**：设置任意具体的分钟数
- **正向计时**：无限制计时，追踪实际花费的时间

### ⏰ 灵活的计时模式

应用支持两种不同的计时模式：

1. **倒计时模式**：设置固定时长，倒计时至零 - 非常适合番茄工作法
2. **正向计时模式**：启动无限制计时器，精确追踪任务花费的时间

两种模式都具有：
- 大字体、易读的时间显示
- 可视化进度条（倒计时模式）
- 暂停、继续、停止和重置控制
- 不同状态的可定制背景

### 📊 全面的统计功能

我最喜欢的功能之一是强大的统计系统。你可以：

- 查看**多个时间段**的统计：今天、本周、近 15 天、本月或自定义日期范围
- 按**任务**或按**任务组**进行分析
- 查看详细指标：总时长、会话数、完成率
- **在图表视图和列表视图之间切换**，获得不同视角
- 交互式饼图展示任务间的时间分布

统计功能帮助你了解时间的去向，并做出明智的时间分配决策。

### 🎨 个性化定制

让计时器成为你自己的：
- **背景选项**：纯色、渐变或自定义图片
- **分离背景**：运行和暂停状态使用不同背景
- **透明度控制**：营造精致优雅的效果
- **多语言支持**：完整的中英文界面

## 🛠️ 技术栈

构建 FocusTimer 是一次激动人心的技术之旅。以下是支撑它的技术：

### 前端
- **React 19**：最新特性，打造流畅响应式 UI
- **TypeScript**：类型安全和更好的开发体验
- **Vite**：闪电般快速的开发和优化构建
- **Recharts**：精美的数据可视化
- **Lucide React**：简洁一致的图标

### 后端
- **Rust**：内存安全、速度极快的后端逻辑
- **Tauri 2.0**：构建轻量级桌面应用的现代框架
- **SQLite + SQLx**：类型安全的数据库操作，零运行时开销
- **date-fns**：强大的日期处理

### 为什么选择 Tauri？

我选择 Tauri 而不是 Electron 等替代方案，因为：
- **更小的包体积**：约 3-5 MB，而 Electron 应用超过 100 MB
- **更低的内存占用**：使用系统 webview 而不是捆绑 Chromium
- **原生性能**：Rust 后端高效处理繁重任务
- **安全性**：内置安全特性和精心设计的 API
- **跨平台**：单一代码库支持 Windows、macOS 和 Linux

## 📸 应用截图

以下是 FocusTimer 的实际效果：

### 主界面

<!-- 📷 TODO: 添加主界面截图 -->
<!-- 建议图片路径: /assets/images/posts/focus-timer/main-interface.png -->
<!-- 或使用 GitHub 仓库图片: https://raw.githubusercontent.com/alvinluo-tech/tauri-FocusTimer/main/screenshots/main-interface.png -->

![主界面](https://raw.githubusercontent.com/alvinluo-tech/tauri-FocusTimer/main/screenshots/main-interface.png)

主界面一目了然地展示所有任务组和任务。你可以快速创建、编辑或启动任何任务，只需点击几次。

### 计时器界面

<!-- 📷 TODO: 添加计时器运行界面截图 -->
<!-- 建议图片路径: /assets/images/posts/focus-timer/timer-running.png -->

![计时器界面 - 运行中](https://raw.githubusercontent.com/alvinluo-tech/tauri-FocusTimer/main/screenshots/timer.png)

当任务运行时，计时器以大字体格式显示，配有进度条。简洁的界面让你专注于手头的任务。

<!-- 📷 TODO: 添加计时器暂停界面截图 -->
<!-- 建议图片路径: /assets/images/posts/focus-timer/timer-paused.png -->

![计时器界面 - 暂停](https://raw.githubusercontent.com/alvinluo-tech/tauri-FocusTimer/main/screenshots/timer-paused.png)

暂停状态的计时器，展示自定义背景效果。

### 统计面板

<!-- 📷 TODO: 添加统计报告列表视图截图 -->
<!-- 建议图片路径: /assets/images/posts/focus-timer/statistics-list.png -->

![统计 - 列表视图](https://raw.githubusercontent.com/alvinluo-tech/tauri-FocusTimer/main/screenshots/statistics-report.png)

统计视图提供交互式饼图和详细列表视图。切换不同时间段来分析你的生产力模式。

<!-- 📷 TODO: 添加统计报告图表视图截图 -->
<!-- 建议图片路径: /assets/images/posts/focus-timer/statistics-chart.png -->

![统计 - 图表视图](https://raw.githubusercontent.com/alvinluo-tech/tauri-FocusTimer/main/screenshots/statistics-chart.png)

交互式饼图展示任务间的时间分布和详细指标。

### 设置面板

<!-- 📷 TODO: 添加设置界面截图 -->
<!-- 建议图片路径: /assets/images/posts/focus-timer/settings.png -->

![设置界面](https://raw.githubusercontent.com/alvinluo-tech/tauri-FocusTimer/main/screenshots/settings-interface.png)

自定义背景、调整透明度和切换语言 - 一切都在直观的设置界面中完成。

## 🎓 我学到的东西

构建 FocusTimer 让我学到了很多：

1. **Rust 异步编程**：使用 SQLx 和 Rust 中的异步操作
2. **Tauri 架构**：理解 Rust 后端和 JavaScript 前端之间的 IPC 桥接
3. **状态管理**：处理计时器会话、任务和统计中的复杂状态
4. **数据可视化**：使用 Recharts 创建有意义的图表
5. **跨平台开发**：在不同操作系统上测试和优化
6. **数据库设计**：构建 SQLite 表以实现高效查询

## 🚀 快速开始

想试用 FocusTimer？以下是方法：

### 前置要求
- Node.js 18+
- Rust 1.70+
- Tauri CLI 2.0+

### 安装步骤

```bash
# 克隆仓库
git clone https://github.com/alvinluo-tech/tauri-FocusTimer.git
cd tauri-FocusTimer

# 安装依赖
npm install

# 开发模式运行
npm run tauri dev

# 构建生产版本
npm run tauri build
```

## 🔮 未来计划

我为未来版本规划了几个令人兴奋的功能：

- **声音通知**：计时器完成时发出提醒
- **休息提醒**：基于工作模式的自动休息建议
- **数据导出**：将统计数据导出为 CSV 或 JSON
- **云同步**：可选的云备份和多设备同步
- **键盘快捷键**：增强的键盘导航
- **主题**：为不同心情预设的配色主题
- **计时器预设**：保存并重用自定义计时器配置

## 🤝 参与贡献

FocusTimer 是基于 MIT 许可证的开源项目。如果你觉得它有用或有改进建议，我很乐意收到你的贡献！无论是：

- 报告 Bug
- 建议新功能
- 改进文档
- 提交 Pull Request
- 与他人分享项目

访问 [GitHub 仓库](https://github.com/alvinluo-tech/tauri-FocusTimer)参与进来。

## 💭 最后的想法

构建 FocusTimer 是一次不可思议的学习体验。通过 Tauri 将现代 Web 技术与原生能力相结合，创建强大高效的桌面应用，这真是太棒了。

我每天都在使用 FocusTimer 进行工作和学习，它确实帮助我更清楚地意识到时间是如何度过的。特别是统计功能，让我大开眼界 - 确切地看到我的时间都花在哪里，激励我更有意识地使用时间。

如果你对效率工具、时间管理感兴趣，或者只是对 Tauri 开发感到好奇，试试 FocusTimer 吧！我很想听到你的反馈和建议。

---

**相关链接：**

::github{repo="alvinluo-tech/tauri-FocusTimer"}

- 📖 [详细使用指南](https://github.com/alvinluo-tech/tauri-FocusTimer/blob/main/USAGE.md)
- 📸 [应用截图](https://github.com/alvinluo-tech/tauri-FocusTimer/tree/main/screenshots)


