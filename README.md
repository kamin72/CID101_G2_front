# Silken Sip Vineyard 葡萄酒電商平台

## 專案概述

Silken Sip Vineyard 是一個專業的葡萄酒電商平台，提供葡萄酒銷售、品酒課程預約、會員管理等功能。平台針對一般會員和公司行號提供不同的購物流程和會員管理系統，並設有互動遊戲增加用戶參與度。

本專案是為了練習前端技術而開發的作品，旨在展示 Vue 3 與相關技術的實際應用，並提供一個完整的電商平台開發經驗。

## 功能特點

### 電商功能
- 產品展示與詳情頁面
- 購物車系統（支援一般會員和公司行號不同流程）
- 訂單管理與歷史記錄查詢
- 多種付款方式支援

### 會員系統
- 會員註冊與登入（一般會員/公司行號）
- 會員中心與個人資料管理
- 訂單歷史紀錄
- 折價券管理

### 課程預約系統
- 品酒課程展示與詳情
- 課程預約流程
- 預約紀錄管理
- 付款流程整合

### 互動功能
- 品酒達人遊戲
- 遊戲獎勵（優惠券）

### 其他功能
- 最新消息發佈與閱讀
- 關於我們介紹

## 技術架構

### 前端技術
- **框架**：Vue 3 + Vite
- **狀態管理**：Pinia
- **路由管理**：Vue Router
- **樣式處理**：SASS/SCSS
- **HTTP 請求**：Axios
- **動畫效果**：GSAP
- **輪播元件**：Swiper
- **工具函式庫**：Lodash

### 開發工具
- **程式碼檢查**：ESLint
- **程式碼格式化**：Prettier
- **建議開發環境**：VSCode + Volar 擴充功能

## 安裝指南

### 環境需求
- Node.js (建議使用最新 LTS 版本)
- npm 或 yarn 套件管理工具

### 安裝步驟

1. 複製專案到本地
```sh
git clone [專案 Git 倉庫 URL]
cd CID101_G2_front
```

2. 安裝相依套件
```sh
npm install
```

3. 設定環境變數
- 複製 `.env.development` 檔案並根據需要進行修改

## 使用方法

### 開發環境

啟動開發伺服器：
```sh
npm run dev
```

### 生產環境

建置生產版本：
```sh
npm run build
```

使用生產模式建置：
```sh
npm run prod
```

預覽生產版本：
```sh
npm run preview
```

### 程式碼品質管理

執行程式碼檢查：
```sh
npm run lint
```

格式化程式碼：
```sh
npm run format
```

## 專案結構

```
├── public/              # 靜態資源目錄
├── src/                 # 原始碼目錄
│   ├── assets/          # 資源檔案（圖片、樣式等）
│   ├── components/      # 共用元件
│   ├── router/          # 路由配置
│   ├── stores/          # Pinia 狀態管理
│   ├── views/           # 頁面元件
│   ├── App.vue          # 根元件
│   └── main.js          # 應用程式入口
├── .env.development     # 開發環境變數
├── .eslintrc.cjs        # ESLint 配置
├── .prettierrc.json     # Prettier 配置
├── index.html           # HTML 入口
├── jsconfig.json        # JavaScript 配置
├── package.json         # 專案依賴與腳本
├── vite.config.js       # Vite 配置
└── vercel.json          # Vercel 部署配置
```

## 部署說明

本專案已配置 Vercel 部署設定，可直接部署到 Vercel 平台。