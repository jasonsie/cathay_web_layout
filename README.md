# 國泰世華銀行海外分行網站 Layout

## 專案概述 (Project Overview)

此專案包含國泰世華銀行海外分行網站的前端布局設計，提供兩種運行方式：
- **靜態 HTML 版本** - 適用於前端開發與設計預覽
- **.NET MVC 應用程式** - 完整的後端整合方案

## 專案結構 (Project Structure)

```
cathay_web_layout/
├── index.html                     # 靜態版本主頁面
├── README.md                      # 專案說明文件
├── SPEC.md                        # 技術規格文件
├── style/                         # 靜態版本樣式檔案
│   ├── header.css
│   ├── footer.css
│   └── oversea-components.css
├── context/                       # 原始檔案與參考資料
│   ├── aboard/                    # 海外據點相關檔案
│   └── liao/                      # 廖氏相關檔案
└── CathayWebApp/                  # .NET MVC 應用程式
    ├── Controllers/               # MVC 控制器
    ├── Views/                     # Razor 視圖檔案
    ├── wwwroot/                   # 靜態資源 (CSS, JS, Images)
    ├── Models/                    # 資料模型
    ├── Program.cs                 # 應用程式進入點
    └── CathayWebApp.csproj        # 專案檔案
```

## 技術規格 (Tech Stack)

### 前端技術
- **HTML5** - 語意化標記
- **CSS3** - 現代化樣式設計，使用 Flexbox 和 Grid 布局
- **JavaScript** - 互動功能與表單處理
- **響應式設計** - 支援桌面、平板、手機等多種裝置
- **無障礙設計** - 符合 WCAG 2.1 標準

### 後端技術 (.NET 版本)
- **.NET 9.0** - 最新的 .NET 框架
- **ASP.NET Core MVC** - 模型-視圖-控制器架構
- **Razor Pages** - 動態網頁生成
- **Entity Framework** (可選) - 資料庫存取

## 快速開始 (Quick Start)

### 選項 1：運行靜態 HTML 版本 🌐

適用於前端開發、設計預覽和快速原型製作。

#### 使用 VS Code Live Server (推薦)

1. 安裝 [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) 擴充功能

2. 開啟專案並啟動伺服器：
   ```bash
   cd /path/to/cathay_web_layout
   code .
   ```

3. 右鍵點擊 `index.html` → 選擇 "Open with Live Server"

4. 瀏覽器自動開啟：`http://127.0.0.1:5500/index.html`

#### 使用 Python 內建伺服器

```bash
cd /path/to/cathay_web_layout
python3 -m http.server 8000
# 開啟瀏覽器訪問：http://localhost:8000
```

#### 使用 Node.js http-server

```bash
# 安裝 http-server (僅需一次)
npm install -g http-server

# 啟動伺服器
cd /path/to/cathay_web_layout
http-server -p 8080
# 開啟瀏覽器訪問：http://localhost:8080
```

### 選項 2：運行 .NET MVC 應用程式 🚀

適用於完整的後端整合、動態內容和生產環境部署。

#### 環境需求 (Prerequisites)

- **.NET 9.0 SDK** - [下載連結](https://dotnet.microsoft.com/download/dotnet/9.0)
- **Visual Studio 2022** 或 **Visual Studio Code** (推薦安裝 C# 擴充功能)
- **Git** (版本控制)

#### 安裝與運行步驟

1. **確認 .NET 環境**
   ```bash
   dotnet --version
   # 應顯示 9.x.x 版本
   ```

2. **導航至 .NET 應用程式目錄**
   ```bash
   cd /path/to/cathay_web_layout/CathayWebApp
   ```

3. **還原套件依賴**
   ```bash
   dotnet restore
   ```

4. **建置應用程式**
   ```bash
   dotnet build
   ```

5. **運行應用程式**
   ```bash
   dotnet run
   ```

6. **訪問應用程式**
   - **HTTPS**: https://localhost:5001
   - **HTTP**: http://localhost:5000
   - **海外據點頁面**: https://localhost:5001/aboard
   - **廖氏頁面**: https://localhost:5001/liao

#### 開發模式運行

```bash
# 啟用熱重載，檔案變更時自動重新載入
dotnet watch run
```

## 頁面結構與路由 (Page Structure & Routing)

### 靜態版本路由
- **首頁**: `/index.html`
- **樣式檔案**: `/style/`

### .NET 版本路由
- **首頁**: `/` 或 `/Home/Index`
- **海外據點**: `/aboard` 或 `/Aboard/Index`
- **廖氏頁面**: `/liao` 或 `/Liao/Index`
- **隱私政策**: `/Home/Privacy`
- **錯誤頁面**: `/Home/Error`

## 開發指南 (Development Guide)

### CSS 開發原則
- 遵循 **BEM 命名規範** (Block__Element--Modifier)
- 使用 **CSS 自定義屬性** (CSS Variables) 維持一致性
- 採用 **Mobile-First** 響應式設計策略
- 模組化 CSS 檔案，依組件分離樣式

### JavaScript 開發原則
- 使用現代 ES6+ 語法
- 採用事件委派處理動態內容
- 確保無障礙性，支援鍵盤導航
- 優化效能，避免記憶體洩漏

### .NET MVC 開發指南

#### 新增頁面
1. **建立控制器動作**
   ```csharp
   public class AboardController : Controller
   {
       public IActionResult NewPage()
       {
           return View();
       }
   }
   ```

2. **建立對應視圖**
   ```bash
   mkdir Views/Aboard
   touch Views/Aboard/NewPage.cshtml
   ```

3. **配置路由** (如需自定義)
   ```csharp
   app.MapControllerRoute(
       name: "custom",
       pattern: "custom/{action=Index}",
       defaults: new { controller = "Aboard" });
   ```

#### 整合靜態資源
- **CSS 檔案** → `wwwroot/css/`
- **JavaScript 檔案** → `wwwroot/js/`
- **圖片檔案** → `wwwroot/images/`
- **第三方庫** → `wwwroot/lib/`

## 測試與除錯 (Testing & Debugging)

### 靜態版本測試
```bash
# 驗證 HTML 語法
npm install -g html-validate
html-validate index.html

# 驗證 CSS 語法
npm install -g stylelint
stylelint "style/*.css"
```

### .NET 版本測試
```bash
# 運行單元測試（如有）
dotnet test

# 檢查程式碼品質
dotnet format --verify-no-changes

# 建置發佈版本
dotnet publish -c Release
```

### 常見問題排除
1. **靜態檔案無法載入** → 檢查 `wwwroot` 目錄結構和檔案路徑
2. **路由無法正常運作** → 確認控制器名稱與路由設定一致
3. **CSS 樣式異常** → 檢查檔案載入順序和選擇器優先級
4. **JavaScript 錯誤** → 開啟瀏覽器開發者工具檢查主控台

## 瀏覽器支援 (Browser Support)

- **Chrome** 90+ ✅
- **Firefox** 88+ ✅
- **Safari** 14+ ✅
- **Edge** 90+ ✅
- **手機瀏覽器** 支援完整響應式功能 📱

## 效能優化 (Performance Optimization)

### 前端優化
- CSS 和 JavaScript 檔案壓縮
- 圖片格式優化 (WebP, AVIF)
- 啟用瀏覽器快取
- 使用 CDN 加速靜態資源

### 後端優化
- 啟用回應壓縮 (Gzip)
- 配置靜態檔案快取
- 資料庫查詢優化
- 非同步操作處理

## 部署指南 (Deployment Guide)

### 靜態版本部署
適合部署至 GitHub Pages、Netlify、Vercel 等靜態網站託管服務。

```bash
# 建立生產版本
cp -r style/ dist/
cp index.html dist/
# 上傳 dist/ 目錄至託管服務
```

### .NET 版本部署
適合部署至 Azure App Service、IIS、Docker 等環境。

```bash
# 建立發佈版本
cd CathayWebApp
dotnet publish -c Release -o ./publish

# 部署至 Azure (需安裝 Azure CLI)
az webapp deployment source config-zip \
  --resource-group myResourceGroup \
  --name myAppName \
  --src ./publish.zip
```

## 貢獻指南 (Contributing)

1. **程式碼風格** - 遵循現有的格式和命名慣例
2. **測試覆蓋** - 新功能需包含對應測試
3. **文件更新** - 修改功能時更新相關文件
4. **無障礙性** - 確保所有功能支援無障礙存取
5. **響應式設計** - 在多種裝置尺寸下測試功能

## 授權與聯絡 (License & Contact)

此專案為國泰世華銀行內部開發專案，僅供內部使用。

---

## 開發流程建議 (Development Workflow)

1. **前端開發階段** - 使用靜態 HTML 版本進行設計和布局開發
2. **功能整合階段** - 將完成的前端程式碼整合至 .NET MVC 應用程式
3. **測試階段** - 在兩種環境下進行功能測試
4. **部署階段** - 依需求選擇適當的部署方案

**開發愉快！Happy Coding! 🚀**
