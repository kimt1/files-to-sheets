const PROJECT_NAME = 'Drive File Importer';
const PROJECT_VERSION = '1.0.0';

// UI constants
const UI_DIALOG_TITLE = 'Select Files from Google Drive';
const UI_BUTTON_IMPORT = 'Import Selected Files';
const UI_BUTTON_CANCEL = 'Cancel';
const UI_SHEET_NAME_IMPORTED_DATA = 'Imported Data';

// File handling constants
const MAX_FILES_TO_IMPORT = 10;
const MAX_FILE_SIZE_MB = 50;

// Disallowed MIME types based on project notes: exclude images and certain code/docs
const DISALLOWED_MIME_TYPES = [
  // Images
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/bmp',
  'image/webp',
  'image/tiff',
  'image/svg+xml',
  
  // Code and scripts
  'application/javascript',
  'application/x-javascript',
  'text/javascript',
  'text/x-python',
  'application/x-sh',
  'application/x-bat',
  
  // Disallowed docs (e.g., executables or sensitive formats)
  'application/pdf', // If PDFs are disallowed; adjust as needed
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.google-apps.script' // Google Apps Script files
];

// Allowed wildcard: all except disallowed (handled in logic)

// Data schema constants
const SCHEMA_COLUMNS = [
  'File Name',
  'File ID',
  'Mime Type',
  'Size (Bytes)',
  'Import Date',
  'Content Preview'
];

// Export for modular use (in Google Apps Script, this can be used via inclusion)
const SHARED_CONSTANTS = {
  PROJECT_NAME,
  PROJECT_VERSION,
  UI_DIALOG_TITLE,
  UI_BUTTON_IMPORT,
  UI_BUTTON_CANCEL,
  UI_SHEET_NAME_IMPORTED_DATA,
  MAX_FILES_TO_IMPORT,
  MAX_FILE_SIZE_MB,
  DISALLOWED_MIME_TYPES,
  SCHEMA_COLUMNS
};
