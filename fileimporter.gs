function importFiles(fileIds) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  fileIds.forEach(function(fileId) {
    try {
      var file = DriveApp.getFileById(fileId);
      var mime = file.getMimeType();
      if (mime.startsWith('image/') || mime.startsWith('application/vnd.google-apps.') || !(mime.startsWith('text/') || mime === 'application/json')) {
        Logger.log('Skipping unsupported file type: ' + mime + ' for file: ' + file.getName());
        return;
      }
      var dataObj = readFileFromDrive(fileId);
      var processed = processFileData(dataObj);
      var baseName = dataObj.name.replace(/\.[^/.]+$/, "");
      var sheetName = baseName;
      var sheet = ss.getSheetByName(sheetName);
      if (sheet) {
        var timestamp = Utilities.formatDate(new Date(), "GMT", "yyyyMMdd_HHmmss");
        sheetName = baseName + '_' + timestamp;
      }
      sheet = ss.insertSheet(sheetName);
      populateWorksheet(sheet, processed);
    } catch (e) {
      Logger.log('Error importing file ' + fileId + ': ' + e.message);
    }
  });
}

function readFileFromDrive(fileId) {
  try {
    var file = DriveApp.getFileById(fileId);
    var blob = file.getBlob();
    return {
      content: blob.getDataAsString(),
      mimeType: blob.getContentType(),
      name: file.getName()
    };
  } catch (e) {
    throw new Error('Error reading file: ' + e.message);
  }
}

function processFileData(dataObj) {
  try {
    var content = dataObj.content;
    var mime = dataObj.mimeType;
    var extension = dataObj.name.split('.').pop().toLowerCase();
    var processAs = '';
    if (mime === 'application/json') {
      processAs = 'json';
    } else if (mime === 'text/csv') {
      processAs = 'csv';
    } else if (mime.startsWith('text/')) {
      processAs = 'txt';
    } else {
      // Fallback to extension
      if (extension === 'csv') {
        processAs = 'csv';
      } else if (extension === 'json') {
        processAs = 'json';
      } else if (extension === 'txt') {
        processAs = 'txt';
      } else {
        processAs = 'txt';
      }
    }
    if (processAs === 'csv') {
      return Utilities.parseCsv(content);
    } else if (processAs === 'json') {
      var json = JSON.parse(content);
      if (Array.isArray(json) && json.length > 0 && typeof json[0] === 'object') {
        var keys = Object.keys(json[0]);
        var arr = [keys];
        json.forEach(function(obj) {
          arr.push(keys.map(function(k) { return obj[k] || ''; }));
        });
        return arr;
      } else if (Array.isArray(json)) {
        return json.map(function(item) { return [item]; });
      } else if (typeof json === 'object') {
        var arr = [];
        for (var k in json) {
          arr.push([k, json[k]]);
        }
        return arr;
      } else {
        return [[json]];
      }
    } else if (processAs === 'txt') {
      return content.split('\n').map(function(line) { return [line]; });
    } else {
      return [[content]];
    }
  } catch (e) {
    throw new Error('Error processing file data: ' + e.message);
  }
}

function populateWorksheet(sheet, data) {
  var numRows = data.length;
  if (numRows === 0) return;
  var numCols = data[0].length;
  if (numCols === 0) return;
  sheet.getRange(1, 1, numRows, numCols).setValues(data);
}