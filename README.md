# PWA应用集合

一个极简的PWA（渐进式Web应用）项目集合，每个应用都提供原生应用般的体验。

## 🎯 应用列表

### 📷 摄像头PWA应用
- **功能**: 调用设备摄像头并显示非镜像视角
- **特性**: 
  - 非镜像视角显示（真实视角）
  - 响应式设计，支持移动设备
  - 完整的权限管理和错误处理
  - PWA支持，可安装到主屏幕
- **访问**: [camera-pwa/](./camera-pwa/)

## 🚀 项目结构

```
├── index.html              # 主页面（单文件，包含所有CSS和JS）
├── README.md              # 项目说明
└── camera-pwa/            # 摄像头PWA应用
    ├── index.html         # 摄像头应用（单文件，包含所有CSS和JS）
    ├── manifest.json      # PWA清单文件
    ├── sw.js             # Service Worker
    └── icons/            # PWA图标文件夹
        ├── icon-72x72.svg
        ├── icon-96x96.svg
        ├── icon-128x128.svg
        ├── icon-144x144.svg
        ├── icon-152x152.svg
        ├── icon-192x192.svg
        ├── icon-384x384.svg
        └── icon-512x512.svg
```

## 📱 PWA特性

- **可安装**: 支持添加到设备主屏幕
- **离线使用**: Service Worker提供离线缓存
- **响应式**: 适配各种设备尺寸
- **原生体验**: 像原生应用一样运行

## 🛠️ 技术栈

- **前端**: HTML5, CSS3, JavaScript (ES6+)
- **PWA**: Service Worker, Web App Manifest
- **摄像头**: WebRTC getUserMedia API
- **样式**: CSS Grid, Flexbox, 响应式设计

## 🌐 浏览器支持

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## 📝 使用说明

1. 在HTTPS环境下访问应用
2. 选择想要使用的PWA应用
3. 按照应用内的指引进行操作
4. 可以安装为PWA应用使用

## 🔧 开发说明

每个PWA应用都是独立的，包含完整的PWA功能：
- Service Worker用于离线缓存
- Web App Manifest定义应用元数据
- 响应式设计适配各种设备
- 完整的错误处理和用户体验

## 📄 许可证

MIT License - 可自由使用和修改