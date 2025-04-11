# sheets-pdf-exporter

**A Google Apps Script tool to convert each Google Sheets tab to individual PDF files.**  
📁 All PDFs will be backed up to your specified Google Drive folder.  
🛠️ 用於將 Google Sheets 自動匯出為 PDF，並備份到指定資料夾。

---

## ✅ 功能特色
- 自動將每個分頁（Sheet）轉成獨立 PDF
- 支援手機與電腦操作
- 匯出檔名為：`試算表名稱 - 分頁名稱.pdf`
- 可自行指定備份資料夾
- 附操作選單、手機 Web App 連結
- 附中文教學與初始化腳本

---

## 📦 安裝教學

### 🔹 第一步：將 Excel 上傳並轉換為 Google Sheet  
1. 開啟 [Google Drive](https://drive.google.com/)
2. 上傳 `.xlsx` 檔案
3. 右鍵點擊該檔 → 選擇「使用 Google Sheets 開啟」
4. 系統會自動轉換格式並儲存副本

---

### 🔹 第二步：貼上 Apps Script，自動導出 PDF  

#### 📄 1. 開啟 Apps Script
1. 打開你剛轉換好的 Google Sheet
2. 點上方「擴充功能 → Apps Script」
3. 刪除原始代碼，貼上 `/scripts/` 目錄下的所有腳本

#### 🛠️ 2. 替換 Google Drive 資料夾 ID
1. 在 Google Drive 建立一個報表備份用的資料夾（例如：`PDF報表備份`）
2. 打開該資料夾，網址格式為：https://drive.google.com/drive/folders/XXXXXXXXXXXX
3. 將這段 ID 替換到腳本中的：
```javascript
const folder = DriveApp.getFolderById("你的資料夾ID");
```

📲 手機操作 / Mobile Access
使用 Web App（需部署一次）：
1. 部署此 Script 成 Web App（選擇「以使用者身份執行」+「任何知道連結者」）
2. 打開該網址即可執行 PDF 匯出
3. 推薦將網址加為手機捷徑

🖥️ 電腦操作 / Desktop Access
使用上方自訂選單：
1. 點選「🔽 自定義導出 → 📄 導出 PDF（顯示結果）」
2. 系統將每張分頁匯出為 PDF 並提示完成訊息
3. 自動儲存至預設備份資料夾

📁 檔案結構
sheets-pdf-exporter/
├── scripts/                ← Google Apps Script 程式碼（.gs 檔）
├── template/               ← Sheet 模板與示意圖
└── README.md               ← 本說明文件（中英雙語）

🔒 注意事項
- 第一次使用 Web App 需點選授權（Google OAuth 提示）
- 所有腳本都以使用者身份執行，僅能操作自己的 Sheet & Drive
