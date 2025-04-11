function doGet(e) {
  try {
    const { message, fileNames } = exportAllSheetsToPDF();
    const folderId = "你的資料夾ID"; // ← 替换为你的资料夹 ID
    const folderUrl = `https://drive.google.com/drive/folders/${folderId}`;

    // 取得目前時間（+8時區）
    const now = new Date();
    const formattedTime = Utilities.formatDate(now, "GMT+8", "yyyy-MM-dd HH:mm:ss");

    // 組合完整訊息
    const fullMessage =
      `✅ 所有工作表已成功匯出為 PDF！\n` +
      `🕐 匯出時間：${formattedTime}\n\n` +
      `🧾 已匯出檔案：\n` +
      fileNames.map(name => `• ${name}`).join('\n') +
      `\n\n📂 查看 PDF 資料夾：\n👉 ${folderUrl}`;

    return ContentService.createTextOutput(fullMessage);
  } catch (error) {
    return ContentService.createTextOutput("❌ 執行失敗：" + error.message);
  }
}

// 將所有 Sheets 匯出為 PDF，儲存至指定 Google Drive 資料夾
function exportAllSheetsToPDF() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const spreadsheetId = spreadsheet.getId();
    
  // 📁 替換為你的 Google Drive 資料夾 ID
  // 取得方式：https://drive.google.com/drive/folders/abc123XYZ → ID 為 abc123XYZ
  const folder = DriveApp.getFolderById("你的資料夾ID");
  
  // 🔎 可以過濾不匯出的工作表（例如說明頁 Control）
  const sheets = spreadsheet.getSheets().filter(sheet => sheet.getName() !== "Control");
    
  const baseName = spreadsheet.getName();
  const token = ScriptApp.getOAuthToken();

  const fileNames = [];

  sheets.forEach(sheet => {
    const sheetName = sheet.getName();
    const gid = sheet.getSheetId();
    const pdfName = `${baseName} - ${sheetName}.pdf`;
    const totalColumns = sheet.getMaxColumns();
      
    // 匯出前只顯示 A~K 欄
    sheet.showColumns(1, totalColumns);
    if (totalColumns >= 12) {
      sheet.hideColumns(12, totalColumns - 11);
    }

    SpreadsheetApp.flush(); // 確保隱藏生效

    // 構建 PDF 匯出連結
    const exportUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?` +
      `format=pdf&` +
      `size=A4&` +
      `portrait=true&` +
      `fitw=true&` +
      `sheetnames=false&` +
      `printtitle=false&` +
      `pagenumbers=false&` +
      `gridlines=false&` +
      `fzr=false&` +
      `gid=${gid}`;

    const response = UrlFetchApp.fetch(exportUrl, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    const blob = response.getBlob().setName(pdfName);
    folder.createFile(blob);
      
    // 匯出後恢復所有欄位
    sheet.showColumns(1, totalColumns);
    fileNames.push(pdfName);
  });

  return {
    message: "成功",
    fileNames: fileNames
  };
}

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('🔽 自定義導出')
    .addItem('導出 PDF（顯示結果）', 'exportAndShowResult')
    .addToUi();
}

function exportAndShowResult() {
  const ui = SpreadsheetApp.getUi();
  try {
    const { message, fileNames } = exportAllSheetsToPDF();
    const folderUrl = "https://drive.google.com/drive/folders/你的資料夾ID"; // ← 替换为你的资料夹 ID
    const now = new Date();
    const formattedTime = Utilities.formatDate(now, "GMT+8", "yyyy-MM-dd HH:mm:ss");

    const fullMessage =
      `✅ 所有工作表已成功匯出為 PDF！\n` +
      `🕐 匯出時間：${formattedTime}\n\n` +
      `🧾 已匯出檔案：\n` +
      fileNames.map(name => `• ${name}`).join('\n') +
      `\n\n📂 查看 PDF 資料夾：\n👉 ${folderUrl}`;

    ui.alert(fullMessage);
  } catch (error) {
    ui.alert("❌ 錯誤：" + error.message);
  }
}

