# 國泰世華銀行海外分行網站 Layout

## 專案結構 (Project Structure)

```
cathay/
├── index.html                    # 主頁面檔案
├── style/                        # 樣式檔案目錄
│   ├── header.css                # 頁首樣式
│   ├── footer.css                # 頁尾樣式
│   ├── oversea-components.css    # 海外據點組件樣式
│   └── original_style.css        # 原始樣式檔案
└── README.md                     # 專案說明檔案
```

## 技術規格 (Tech Stack)

- **HTML5** - 語意化標記
- **CSS3** - 現代化樣式設計
- **響應式設計** - 支援多種螢幕尺寸
- **無障礙設計** - 符合網頁可及性標準

## 開發環境設置 (Development Setup)

### 環境需求 (Prerequisites)

- 現代化網頁瀏覽器 (Chrome, Firefox, Safari, Edge)
- 本機伺服器工具 (推薦使用 Live Server)

### 安裝與運行 (Installation & Running)

#### 方法一：使用 VS Code Live Server 擴充功能

1. 在 VS Code 中安裝 [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) 擴充功能

2. 開啟專案資料夾

   ```bash
   cd cathay
   code .
   ```

3. 在 VS Code 中右鍵點擊 `index.html`，選擇 "Open with Live Server"

4. 瀏覽器會自動開啟，通常網址為：`http://127.0.0.1:5500/index.html`

#### 方法二：使用 Python 內建伺服器

```bash
# Python 3
cd cathay
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

然後在瀏覽器中開啟：`http://localhost:8000`

#### 方法三：使用 Node.js http-server

```bash
# 首先安裝 http-server
npm install -g http-server

# 在專案目錄中執行
cd cathay
http-server -p 8080

# 開啟瀏覽器訪問
# http://localhost:8080
```

#### 方法四：使用 PHP 內建伺服器

```bash
cd cathay
php -S localhost:8000
```

## 預覽說明 (Preview Instructions)

1. **首頁內容**：目前主要內容區域顯示 "Blank Content"，這是開發階段的佔位內容
2. **導航功能**：包含完整的服務項目導航、公告專區、常用表單、常見問題等連結
3. **網銀登入**：整合全球企網銀和私人銀行網銀登入功能
4. **語言切換**：支援繁體中文和英文介面切換
5. **響應式布局**：在不同裝置尺寸下測試頁面排版

## 開發注意事項 (Development Notes)

- 所有圖片資源目前連結到 `cathaybk.com.tw` 的外部資源
- 網銀登入連結指向正式環境的登入頁面
- 導航連結目前指向相對路徑，需要配合完整網站結構使用
- CSS 檔案採用模組化設計，分別處理不同組件的樣式

## 瀏覽器支援 (Browser Support)

- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)
- 支援響應式設計，適用於桌面、平板、手機

## 貢獻指南 (Contributing)

1. 遵循現有的程式碼風格
2. 確保響應式設計在各種裝置上正常運作
3. 測試多語言切換功能
4. 維持無障礙設計標準

## 授權 (License)

© 國泰世華商業銀行股份有限公司

---

## 快速開始 (Quick Start)

```bash
# 克隆或下載專案
cd cathay

# 使用 Live Server (推薦)
# 在 VS Code 中右鍵 index.html → "Open with Live Server"

# 或使用 Python 伺服器
python -m http.server 8000

# 在瀏覽器中開啟
# http://localhost:8000 (Python)
# http://127.0.0.1:5500 (Live Server)
```

開發愉快！ Happy coding! 🚀
