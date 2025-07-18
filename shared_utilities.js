function parseFileContent(content, format) {
  try {
    switch (format.toLowerCase()) {
      case 'csv':
        return Utilities.parseCsv(content);
      case 'json':
        return JSON.parse(content);
      case 'txt':
        return content.split('\n').map(line => line.trim());
      default:
        throw new Error('Unsupported format: ' + format);
    }
  } catch (e) {
    logError('Error parsing file content: ' + e.message);
    return null;
  }
}

/**
 * Validates data against a provided schema.
 * @param {Object|Array} data - The data to validate.
 * @param {Object} schema - The schema defining required structure (e.g., {field: {type: 'string', required: true}}).
 * @return {boolean} True if valid, false otherwise.
 */
function validateData(data, schema) {
  if (!data || typeof data !== 'object') {
    logError('Invalid data object for validation');
    return false;
  }

  if (Array.isArray(data)) {
    return data.every(item => validateData(item, schema));
  }

  for (let key in schema) {
    const fieldSchema = schema[key];
    const value = data[key];
    if (fieldSchema.required && (value === undefined || value === null)) {
      logError(`Missing required field: ${key}`);
      return false;
    }
    if (value !== undefined && fieldSchema.type && typeof value !== fieldSchema.type) {
      logError(`Type mismatch for field ${key}: expected ${fieldSchema.type}, got ${typeof value}`);
      return false;
    }
  }
  return true;
}

/**
 * Formats a cell value based on the specified type.
 * @param {*} value - The value to format.
 * @param {string} type - The type for formatting (e.g., 'date', 'number', 'currency').
 * @return {*} Formatted value.
 */
function formatCellValue(value, type) {
  switch (type.toLowerCase()) {
    case 'date':
      if (value instanceof Date) {
        return value;
      }
      try {
        return new Date(value);
      } catch (e) {
        return value;
      }
    case 'number':
      return typeof value === 'string' ? parseFloat(value) : value;
    case 'currency':
      return typeof value === 'number' ? value.toFixed(2) : value;
    default:
      return value;
  }
}

/**
 * Logs an error message to the console and optionally to a log sheet.
 * @param {string} message - The error message to log.
 */
function logError(message) {
  Logger.log('[ERROR] ' + message);
  try {
    var logSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Log');
    if (logSheet) {
      logSheet.appendRow([new Date(), message]);
    }
  } catch (e) {
    Logger.log('Failed to log to sheet: ' + e.message);
  }
}

/**
 * Gets the active sheet in the current spreadsheet.
 * @return {Sheet} The active sheet.
 */
function getActiveSheet() {
  return SpreadsheetApp.getActiveSheet();
}