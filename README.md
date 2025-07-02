# 國泰世華銀行海外分行網站 - .NET MVC 應用程式

## 專案概述 (Project Overview)

此專案為國泰世華銀行海外分行網站的 .NET MVC 應用程式，提供完整的後端整合方案，支援海外據點資訊展示與相關功能。專案採用現代化的 HTML5 與 CSS3 技術，遵循語意化標記和響應式設計原則。

## 專案結構 (Project Structure)

```
cathay_web_layout/
└── CathayWebApp/                  # .NET MVC 應用程式
    ├── Controllers/               # MVC 控制器
    ├── Views/                     # Razor 視圖檔案
    ├── wwwroot/                   # 靜態資源 (CSS, JS, Images)
    ├── Models/                    # 資料模型
    ├── Program.cs                 # 應用程式進入點
    └── CathayWebApp.csproj        # 專案檔案
```

## 技術規格 (Tech Stack)

-  **.NET 9.0** - 最新的 .NET 框架
-  **ASP.NET Core MVC** - 模型 - 視圖 - 控制器架構
-  **Razor Pages** - 動態網頁生成
-  **HTML5** - 語意化標記結構
-  **CSS3** - 現代化樣式設計，使用 Flexbox 和 Grid 布局
-  **JavaScript** - 互動功能與表單處理
-  **響應式設計** - 支援多種裝置尺寸，採用 Mobile-First 策略
-  **無障礙設計** - 符合 WCAG 2.1 標準

## 如何開啟專案 (How to Open)

### 環境需求 (Prerequisites)

-  **.NET 9.0 SDK** - [下載連結](https://dotnet.microsoft.com/download/dotnet/9.0)
-  **Visual Studio 2022** 或 **Visual Studio Code** (推薦安裝 C# 擴充功能)
-  **Git** (版本控制)

### 開啟步驟

#### 選項 1：使用 Visual Studio 2022

1. 開啟 Visual Studio 2022
2. 選擇 "開啟專案或解決方案"
3. 導航至 `CathayWebApp/CathayWebApp.csproj` 並開啟
4. 等待專案載入完成
5. 按下 `F5` 或點擊 "開始偵錯" 執行應用程式

#### 選項 2：使用 Visual Studio Code

1. 開啟 Visual Studio Code
2. 選擇 "開啟資料夾"
3. 選擇整個 `CathayWebApp` 資料夾
4. 安裝建議的 C# 擴充功能 (如果尚未安裝)
5. 開啟終端機 (Ctrl+\`)
6. 執行 `dotnet run` 啟動應用程式

#### 選項 3：使用命令列

```bash
# 1. 確認 .NET 環境
dotnet --version
# 應顯示 9.x.x 版本

# 2. 導航至應用程式目錄
cd /path/to/cathay_web_layout/CathayWebApp

# 3. 還原套件依賴
dotnet restore

# 4. 建置應用程式
dotnet build

# 5. 運行應用程式
dotnet run

# 6. 開發模式運行(支援熱重載)
dotnet watch run
```

### 訪問應用程式

應用程式啟動後，可透過以下網址訪問：

-  **HTTPS**: <https://localhost:5001>
-  **HTTP**: <http://localhost:5000>
-  **海外據點頁面**: <https://localhost:5001/aboard>
-  **廖氏頁面**: <https://localhost:5001/liao>

## 資料夾結構說明 (Folder Structure Usage)

```
CathayWebApp/                          # .NET MVC 應用程式根目錄
├── Program.cs                         # 應用程式進入點與設定
├── CathayWebApp.csproj               # 專案檔案，定義依賴套件與建置設定
├── appsettings.json                  # 應用程式設定檔(生產環境)
├── appsettings.Development.json      # 開發環境專用設定檔
│
├── Controllers/                      # MVC 控制器目錄
│   ├── HomeController.cs            # 首頁控制器，處理主要頁面路由
│   ├── AboardController.cs          # 海外據點控制器
│   └── LiaoController.cs            # 廖氏頁面控制器
│
├── Models/                          # 資料模型目錄
│   ├── IndexViewModel.cs           # 首頁視圖模型
│   └── ErrorViewModel.cs           # 錯誤頁面視圖模型
│
├── Views/                           # Razor 視圖檔案目錄
│   ├── _ViewStart.cshtml           # 視圖啟動檔案，設定預設布局
│   ├── _ViewImports.cshtml         # 全域視圖匯入，引用命名空間與標籤協助程式
│   │
│   ├── Home/                       # 首頁視圖
│   │   ├── Index.cshtml           # 主頁面視圖
│   │   └── Privacy.cshtml         # 隱私政策頁面
│   │
│   ├── Aboard/                     # 海外據點視圖
│   │   └── Index.cshtml           # 海外據點主頁面
│   │
│   ├── Liao/                       # 廖氏頁面視圖
│   │   └── Index.cshtml           # 廖氏主頁面
│   │
│   └── Shared/                     # 共用視圖組件
│       ├── _Layout.cshtml          # 主要頁面布局模板
│       ├── _Layout.cshtml.css      # 布局專用樣式
│       ├── _ValidationScriptsPartial.cshtml  # 表單驗證腳本
│       └── Error.cshtml            # 錯誤頁面模板
│
├── wwwroot/                        # 靜態資源目錄(對外公開)
│   ├── favicon.ico                 # 網站圖示
│   │
│   ├── css/                        # CSS 樣式檔案
│   │   ├── site.css               # 主要網站樣式
│   │   ├── header.css             # 頁首樣式
│   │   ├── footer.css             # 頁尾樣式
│   │   └── oversea-components.css  # 海外組件樣式
│   │
│   ├── js/                         # JavaScript 檔案
│   │   ├── site.js                # 主要網站腳本
│   │   ├── app.js                 # 應用程式邏輯
│   │   ├── base.js                # 基礎功能腳本
│   │   └── [其他功能腳本]          # 各種功能專用腳本
│   │
│   └── lib/                        # 第三方程式庫
│       ├── bootstrap/             # Bootstrap 框架
│       ├── jquery/                # jQuery 程式庫
│       ├── jquery-validation/     # jQuery 驗證外掛
│       └── jquery-validation-unobtrusive/  # ASP.NET Core 無侵入式驗證
│
├── Properties/                     # 專案屬性設定
│   └── launchSettings.json        # 開發環境啟動設定
│
├── bin/                           # 編譯輸出目錄(自動生成)
└── obj/                           # 建置過程暫存檔案(自動生成)
```

### 關鍵檔案說明

#### 應用程式核心檔案

-  **`Program.cs`**: 應用程式進入點，設定服務、中介軟體和路由
-  **`appsettings.json`**: 應用程式設定，包含連接字串、日誌設定等
-  **`CathayWebApp.csproj`**: 專案檔案，定義 .NET 版本、套件依賴和建置設定

#### MVC 架構組件

-  **`Controllers/`**: 處理 HTTP 請求，協調模型和視圖之間的互動
-  **`Models/`**: 定義資料結構和業務邏輯
-  **`Views/`**: 使用 Razor 語法的 HTML 模板，負責呈現用戶介面

#### 靜態資源管理

-  **`wwwroot/`**: 所有靜態檔案 (CSS、JavaScript、圖片) 的根目錄
-  **`wwwroot/css/`**: 樣式檔案，採用模組化設計
-  **`wwwroot/js/`**: 前端腳本，支援表單處理和互動功能
-  **`wwwroot/lib/`**: 第三方前端程式庫

## 頁面路由 (Page Routing)

-  **首頁**: `/` 或 `/Home/Index`
-  **海外據點**: `/aboard` 或 `/Aboard/Index`
-  **廖氏頁面**: `/liao` 或 `/Liao/Index`
-  **隱私政策**: `/Home/Privacy`
-  **錯誤頁面**: `/Home/Error`

## 開發指南 (Development Guide)

### 前端開發原則

#### HTML 結構

-  使用語意化 HTML5 元素 (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
-  確保適當的文件結構和層次
-  包含適當的 meta 標籤和無障礙屬性
-  使用有意義的 class 名稱和 ID

#### CSS 開發原則

-  遵循 **BEM 命名規範** (Block\_\_Element--Modifier)
-  使用 **CSS 自定義屬性** (CSS Variables) 維持一致性
-  採用 **Mobile-First** 響應式設計策略
-  模組化 CSS 檔案，依組件分離樣式
-  使用 CSS Grid 和 Flexbox 進行現代化布局
-  利用 `clamp()`, `min()`, `max()` 實現響應式尺寸

#### JavaScript 開發原則

-  使用現代 ES6+ 語法
-  採用事件委派處理動態內容
-  確保無障礙性，支援鍵盤導航
-  優化效能，避免記憶體洩漏

### .NET MVC 開發指南

#### 新增頁面流程

1. **建立控制器動作**

   ```csharp
   public class NewController : Controller
   {
       public IActionResult Index()
       {
           return View();
       }
   }
   ```

2. **建立對應視圖**
   在 `Views/New/` 目錄下建立 `Index.cshtml`

3. **更新路由設定** (如需自定義路由)
   在 `Program.cs` 中配置路由規則

#### 整合靜態資源

-  **CSS 檔案** → `wwwroot/css/`
-  **JavaScript 檔案** → `wwwroot/js/`
-  **圖片檔案** → `wwwroot/images/`
-  **第三方庫** → `wwwroot/lib/`

### 建置與測試

```bash
# 建置專案
dotnet build

# 運行測試(如有)
dotnet test

# 發佈生產版本
dotnet publish -c Release -o ./publish
```

## 常見問題排除 (Troubleshooting)

1. **應用程式無法啟動**

   -  確認 .NET 9.0 SDK 已正確安裝
   -  檢查專案檔案是否完整
   -  執行 `dotnet restore` 還原套件

2. **靜態檔案無法載入**

   -  確認檔案位於 `wwwroot` 目錄下
   -  檢查檔案路徑大小寫是否正確
   -  確認 `Program.cs` 中已啟用靜態檔案服務

3. **路由無法正常運作**

   -  檢查控制器和動作方法命名
   -  確認視圖檔案位置和命名正確
   -  檢查路由設定

4. **CSS 樣式異常**

   -  檢查檔案載入順序和選擇器優先級
   -  確認 BEM 命名規範的正確使用
   -  驗證響應式斷點設定

5. **JavaScript 錯誤**
   -  開啟瀏覽器開發者工具檢查主控台
   -  確認腳本載入順序正確
   -  檢查事件委派和 DOM 操作

## 瀏覽器支援 (Browser Support)

-  **Chrome** 90+ ✅
-  **Firefox** 88+ ✅
-  **Safari** 14+ ✅
-  **Edge** 90+ ✅
-  **手機瀏覽器** 完整響應式支援 📱

## 效能優化 (Performance Optimization)

### 前端優化

-  CSS 和 JavaScript 檔案壓縮
-  圖片格式優化 (WebP, AVIF)
-  啟用瀏覽器快取
-  使用 CDN 加速靜態資源

### 後端優化

-  啟用回應壓縮 (Gzip)
-  配置靜態檔案快取
-  資料庫查詢優化
-  非同步操作處理

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

## 授權與聯絡 (License & Contact)

此專案為國泰世華銀行內部開發專案，僅供內部使用。

---

**開發愉快！Happy Coding! 🚀**
