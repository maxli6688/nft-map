# kvm Tile Map

kvm Tile Map 是一个基于 Web 的交互式地图组件库，专为 kvm 虚拟世界或 NFT 土地系统设计，支持缩放、拖拽、虚拟化渲染等交互功能。

## 项目结构

本项目采用 monorepo 架构，包含以下主要部分：

- `packages/kvm-tile-map`: 地图组件库核心代码
- `apps/kvm-map`: 基于地图组件库的示例应用

## 技术栈

- React 18 + TypeScript
- Vite 6 构建工具
- Less 样式预处理器
- react-virtualized 虚拟化渲染
- touch-pinch、touch-position、mouse-wheel、impetus 手势控制库
- Recoil 状态管理
- Ant Design UI 组件库
- Swiper 轮播组件

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 开发模式

启动所有包的开发服务器：

```bash
pnpm dev
```

仅启动组件库开发服务器：

```bash
pnpm dev:lib
```

仅启动应用开发服务器：

```bash
pnpm dev:app
```

### 构建

构建所有包：

```bash
pnpm build
```

仅构建组件库：

```bash
pnpm build:lib
```

仅构建应用：

```bash
pnpm build:app
```

### 预览

构建并预览应用：

```bash
pnpm serve
```

## 组件库

组件库位于 `packages/kvm-tile-map`，包含以下核心组件：

- `TileMap`: 核心地图渲染组件，支持动态加载瓦片
- `ResizableTileMap`: 可调整大小的地图容器
- `TileMapLite`: 轻量级地图版本，适用于性能敏感场景

### 特性

- 可缩放和平移的地图视图（pan & zoom）
- 响应式瓦片地图渲染（支持虚拟化）
- 桌面端鼠标滚轮 + 拖拽控制
- 移动端双指缩放（pinch）与触摸移动
- 支持 React 框架集成
- 提供 UMD 和 ES 模块格式供多种环境使用

## 示例应用

示例应用位于 `apps/kvm-map`，展示了如何使用地图组件库构建完整的地图应用。

### 功能

- [x] 地图浏览与交互
- [ ] 土地信息展示
- [ ]多语言支持
- [ ]响应式设计

## 浏览器兼容性

- 现代浏览器（Chrome, Firefox, Safari, Edge）
- 不兼容 IE 浏览器

## Node.js 版本要求

- Node.js >= 10

## 许可证

MIT
