function onOpen(e) {
  createCustomMenu();
}

/**
 * Creates a custom menu in the Google Sheets UI.
 */
function createCustomMenu() {
  SpreadsheetApp.getUi()
    .createAddonMenu()
    .addItem('Import Files from Drive', 'showImportSidebar')
    .addToUi();
}

/**
 * Displays the import sidebar.
 */
function showImportSidebar() {
  var html = HtmlService.createHtmlOutputFromFile('uisidebar')
    .setTitle('Import Files from Drive')
    .setWidth(300);
  SpreadsheetApp.getUi().showSidebar(html);
}

/**
 * Handles the import request for the given file IDs.
 * @param {string[]} fileIds - Array of Google Drive file IDs to import.
 */
function handleImportRequest(fileIds) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var errors = [];
  fileIds.forEach(function(fileId) {
    var file;
    try {
      file = DriveApp.getFileById(fileId);
      var fileName = file.getName();
      var mimeType = file.getMimeType();
      
      // Skip images and disallowed types
      if (mimeType.startsWith('image/') || mimeType === MimeType.JAVASCRIPT || mimeType === MimeType.HTML) {
        throw new Error('Unsupported file type: ' + mimeType);
      }
      
      var baseName = fileName.replace(/\.[^/.]+$/, "");
      var sheetName = baseName;
      var counter = 1;
      while (ss.getSheetByName(sheetName)) {
        sheetName = baseName + " (" + counter + ")";
        counter++;
      }
      var sheet = ss.insertSheet(sheetName);
      
      if (mimeType === MimeType.CSV) {
        var blob = file.getBlob();
        var csvData = Utilities.parseCsv(blob.getDataAsString());
        sheet.getRange(1, 1, csvData.length, csvData[0].length).setValues(csvData);
      } else if (mimeType === MimeType.MICROSOFT_EXCEL || mimeType === MimeType.MICROSOFT_EXCEL_LEGACY) {
        // Convert to Google Sheets and copy data
        var resource = {
          title: sheetName,
          mimeType: MimeType.GOOGLE_SHEETS
        };
        var convertedFile = Drive.Files.insert(resource, file.getBlob(), { convert: true });
        var tempSs = SpreadsheetApp.openById(convertedFile.id);
        var tempSheet = tempSs.getSheets()[0];
        var data = tempSheet.getDataRange().getValues();
        sheet.getRange(1, 1, data.length, data[0].length).setValues(data);
        DriveApp.getFileById(convertedFile.id).setTrashed(true); // Clean up
      } else if (mimeType.startsWith('text/') || mimeType === MimeType.JSON || mimeType === MimeType.XML) {
        // For supported text-based files, import as plain text
        var content = file.getBlob().getDataAsString();
        sheet.getRange(1, 1).setValue(content);
      } else {
        throw new Error('Unsupported file type: ' + mimeType);
      }
    } catch (error) {
      var errMsg = 'Error importing file ' + (file ? file.getName() : fileId) + ': ' + error.message;
      Logger.log(errMsg);
      errors.push(errMsg);
    }
  });
  if (errors.length > 0) {
    SpreadsheetApp.getUi().alert('Import Errors:\n\n' + errors.join('\n\n'));
  }
}
