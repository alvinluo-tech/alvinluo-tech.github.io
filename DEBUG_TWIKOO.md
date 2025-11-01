# Twikoo 评论区语言切换调试指南

## 🔍 如何测试评论区语言切换

### 步骤 1：打开文章页面
1. 在浏览器中打开一个包含评论区的文章页面
2. 打开浏览器开发者工具（F12）
3. 切换到 Console（控制台）标签页

### 步骤 2：查看初始化日志
你应该看到类似以下的日志：
```
[Twikoo] initTwikoo called, checking requirements...
[Twikoo] 初始化配置: { envId: "...", lang: "zh-CN", ... }
[Twikoo] 初始化完成
[Twikoo] site-lang-change 监听器已注册
```

### 步骤 3：切换语言
1. 点击导航栏的语言切换器（如 "中文" -> "EN"）
2. 观察控制台输出

**预期日志**：
```
[Twikoo] 检测到 site-lang-change 事件, detail: { lang: "en" }
[Twikoo] 切换到新语言: en
[Twikoo] 开始重新初始化评论组件
[Twikoo] initTwikoo called, checking requirements...
[Twikoo] 初始化配置: { envId: "...", lang: "en", ... }
[Twikoo] 初始化完成
```

### 步骤 4：检查评论区 UI
- 评论框应该清空并重新加载
- 所有按钮文本（发送、预览、取消等）应该切换到新语言
- 时间格式应该根据语言变化（如 "1 day ago" / "1天前"）

## 🐛 常见问题排查

### 问题 1：看不到 [Twikoo] 日志
**原因**：可能控制台过滤器启用了
**解决**：确保控制台没有过滤 "Twikoo" 关键词

### 问题 2：切换语言后没有反应
**检查清单**：
1. 控制台是否有 "检测到 site-lang-change 事件" 日志？
   - ✅ 有：继续下一步
   - ❌ 没有：语言切换器可能没有正确触发事件

2. 是否有 "评论元素未找到" 错误？
   - ✅ 有：确认你在文章页面，不是首页或归档页
   - ❌ 没有：继续下一步

3. 是否有 "Twikoo库未加载" 错误？
   - ✅ 有：检查网络连接和 Twikoo CDN
   - ❌ 没有：继续下一步

4. 是否看到 "开始重新初始化评论组件" 日志？
   - ✅ 有：但评论区没变化，可能是 Twikoo 内部问题
   - ❌ 没有：检查 setTimeout 是否被阻止

### 问题 3：语言切换后评论区消失
**原因**：Twikoo 初始化失败
**解决**：
1. 检查 `envId` 配置是否正确
2. 检查网络连接到 Twikoo 服务器
3. 查看控制台是否有 Twikoo 错误

### 问题 4：在 Swup 页面切换后评论区不工作
**检查**：
1. 控制台是否有 "Swup 页面切换，检查是否需要初始化" 日志？
2. 控制台是否有 "在新页面中找到评论元素，重新初始化" 日志？

如果没有，可能 Swup hooks 没有正确注册。

## 🧪 手动测试命令

在控制台中执行以下命令进行手动测试：

### 1. 检查 Twikoo 是否已加载
```javascript
console.log(typeof twikoo);  // 应该输出 "object"
```

### 2. 检查评论元素是否存在
```javascript
console.log(document.getElementById("tcomment"));  // 应该输出 <div id="tcomment">
```

### 3. 检查当前语言设置
```javascript
console.log(localStorage.getItem('site-lang'));  // 输出当前语言代码
```

### 4. 手动触发语言切换
```javascript
// 切换到英文
localStorage.setItem('site-lang', 'en');
window.dispatchEvent(new CustomEvent('site-lang-change', { detail: { lang: 'en' } }));

// 切换回中文
localStorage.setItem('site-lang', 'zh_CN');
window.dispatchEvent(new CustomEvent('site-lang-change', { detail: { lang: 'zh_CN' } }));
```

### 5. 手动重新初始化评论区
```javascript
if (window.__reinitTwikoo) {
  window.__reinitTwikoo();
} else {
  console.error("__reinitTwikoo 函数未定义");
}
```

### 6. 检查事件监听器是否注册
```javascript
console.log('监听器已注册:', window.__twikooLangListenerRegistered);  // 应该输出 true
console.log('处理函数:', typeof window.__twikooLangChangeHandler);  // 应该输出 "function"
```

## 📊 诊断流程图

```
用户点击语言切换器
        ↓
LanguageSwitch.svelte 保存到 localStorage
        ↓
触发 site-lang-change 事件
        ↓
Twikoo 监听器捕获事件 → 有日志吗？
        ↓                   ↓ 没有
    有日志              检查监听器是否注册
        ↓
延迟 150ms（等待 localStorage 更新）
        ↓
检查评论元素 → 存在吗？
        ↓           ↓ 不存在
    存在         可能不在文章页
        ↓
检查 twikoo 库 → 已加载吗？
        ↓            ↓ 未加载
    已加载        检查网络和 CDN
        ↓
调用 initTwikoo()
        ↓
清空评论区 innerHTML
        ↓
使用新语言创建配置
        ↓
调用 twikoo.init(config)
        ↓
评论区重新渲染（新语言）✅
```

## 🎯 快速验证清单

执行以下步骤快速验证：

- [ ] 打开文章页面，看到评论区
- [ ] F12 打开控制台
- [ ] 看到 "[Twikoo] 初始化完成" 日志
- [ ] 切换语言（如 中文 → English）
- [ ] 看到 "[Twikoo] 检测到 site-lang-change 事件" 日志
- [ ] 看到 "[Twikoo] 切换到新语言: en" 日志
- [ ] 看到 "[Twikoo] 开始重新初始化评论组件" 日志
- [ ] 评论区 UI 显示英文
- [ ] 再切换回中文
- [ ] 评论区 UI 显示中文

如果以上全部通过，说明评论区语言同步功能正常！✅

## 🔧 高级调试

### 启用详细日志
在 Twikoo.astro 的 getTwikooLang() 函数中添加更多日志：

```javascript
function getTwikooLang() {
  const siteLang = localStorage.getItem('site-lang') || 'zh-CN';
  console.log('[Twikoo] Raw site-lang:', siteLang);
  
  const normalized = siteLang.toLowerCase();
  console.log('[Twikoo] Normalized:', normalized);
  
  let result = 'zh-CN';
  if (normalized.startsWith('en')) result = 'en';
  else if (normalized === 'zh_cn' || normalized === 'zh-cn') result = 'zh-CN';
  // ... 其他语言映射
  
  console.log('[Twikoo] Final lang:', result);
  return result;
}
```

### 检查 Twikoo 版本
```javascript
// 在控制台执行
console.log(twikoo.version);  // 查看 Twikoo 版本
```

### 查看 Twikoo 配置
```javascript
// 初始化后查看实际配置
console.log(window.__twikooConfig);  // 如果你存储了配置
```

---

**提示**：如果问题持续存在，请提供控制台完整日志截图，这样可以更精确地定位问题。
