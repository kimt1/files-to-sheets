# files-to-sheets

## Description
A Google Apps Script tool that allows users to select files from Google Drive and import their contents into Google Sheets worksheets. The project is structured with modular components for reusability, including data schemas, utilities, and user interface elements. (Note: Original project description was not available; this is derived from the project summary.)

## Overview
This project is a Google Apps Script-based tool designed to streamline the process of importing file contents from Google Drive directly into Google Sheets. It features a modular architecture that separates concerns for file handling, data processing, and user interaction, making it easy to maintain and extend.

### Key Features
- File selection and import from Google Drive
- Data parsing and validation utilities
- Worksheet population and formatting
- Custom menu and sidebar UI for user interaction
- Error handling and logging

### Architecture
The project uses a modular setup in Google Apps Script:
- `.gs` files for core logic
- HTML for UI elements
- JSON for data structures
- MD files for documentation

This ensures separation of concerns across file handling, data processing, and user interaction.

### Flow
1. User initiates the script via a custom menu or sidebar in Google Sheets.
2. Select files from Google Drive.
3. The script reads and parses file contents using utility functions.
4. Data is validated against predefined schemas.
5. Valid data is populated into the active worksheet.

## Installation
Since this is a Google Apps Script project, follow these steps to set it up:

1. **Create a new Google Sheet**: Open Google Sheets and create a new spreadsheet.
2. **Open the Script Editor**: Go to `Extensions > Apps Script`.
3. **Add Files**: In the Apps Script editor, create the following files by copying the provided code or structure:
   - `data_schemas.json`
   - `shared_constants.js`
   - `shared_utilities.js`
   - `api_integrations.md`
   - `ux_notes.md`
   - `fileimporter.gs`
   - `menuhandler.gs`
   - `uisidebar.html`
4. **Copy Code**: Paste the relevant code into each file based on the component details (code not provided here; refer to source files).
5. **Save and Deploy**: Save the project. You may need to authorize permissions for Google Drive and Sheets access.
6. **Run onOpen**: In the Script Editor, run the `onOpen` function from `menuhandler.gs` to set up the custom menu. Grant necessary permissions.

Note: This project requires access to Google Drive API and Sheets API. Ensure your Google account has the necessary scopes enabled.

## Usage
Once installed, the tool integrates into your Google Sheet:

1. **Open the Custom Menu**: Refresh your Google Sheet. A custom menu (e.g., "File Importer") should appear.
2. **Show Sidebar**: Select an option like "Show Import Sidebar" to open the UI.
3. **Select Files**: Use the sidebar to browse and select files from Google Drive.
4. **Import Data**: Click the import button. The script will read the file, parse and validate the data, and populate the active sheet.

### Example Usage
- **Initiate Import**:
  - From the menu: `File Importer > Import Files`
  - Sidebar will appear for file selection.

- **Code Snippet (from Script Editor)**:
  ```javascript
  // Example call in fileimporter.gs
  function importFiles(fileIds) {
    // Logic to import files
    var sheet = getActiveSheet();
    // ... (full implementation in source)
  }
  ```

If errors occur, check the logs via `View > Logs` in the Script Editor.

## Components
The project consists of the following modular components. Each includes its purpose, file type, status (Pass/Fail based on validation), and pseudocode signatures where applicable. Note: Components marked as "Fail" may require fixes or incomplete implementations.

- **data_schemas** (.json)  
  Status: Pass  
  Purpose: Defines schema structures, key fields, and data formats for consistency across the project.  
  Pseudocode: (None detected)  
  Dependencies: None

- **shared_constants** (.js)  
  Status: Pass  
  Purpose: Holds global constants and reusable values to be imported into other components.  
  Pseudocode: (None detected)  
  Dependencies: data_schemas

- **shared_utilities** (.js)  
  Status: Pass  
  Purpose: Contains utility functions, shared handlers, and cross-component logic modules.  
  Pseudocode:  
  ```
  parseFileContent(content, format)
  validateData(data, schema)
  formatCellValue(value, type)
  logError(message)
  getActiveSheet()
  ```  
  Dependencies: shared_constants

- **api_integrations** (.md)  
  Status: Pass  
  Purpose: Lists APIs, endpoints, headers, authentication methods, and token formats.  
  Pseudocode: (None detected)  
  Dependencies: shared_constants

- **ux_notes** (.md)  
  Status: Pass  
  Purpose: Provides UX guidance, layout notes, interactive flows, and design inspirations.  
  Pseudocode: (None detected)  
  Dependencies: api_integrations

- **fileimporter** (.gs)  
  Status: Fail (may require debugging)  
  Purpose: Core script for handling file selection, reading contents, and importing data into the worksheet.  
  Pseudocode:  
  ```
  importFiles(fileIds)
  readFileFromDrive(fileId)
  processFileData(data)
  populateWorksheet(sheet, data)
  ```  
  Dependencies: shared_utilities.js

- **menuhandler** (.gs)  
  Status: Fail (may require debugging)  
  Purpose: Script to create custom menu and handle UI triggers for the file import process.  
  Pseudocode:  
  ```
  onOpen(e)
  createCustomMenu()
  showImportSidebar()
  handleImportRequest(fileIds)
  ```  
  Dependencies: shared_constants.js

- **uisidebar** (.html)  
  Status: Fail (may require debugging)  
  Purpose: HTML file for the sidebar UI, including file selection interface and import button.  
  Pseudocode:  
  ```
  initSidebar()
  onFileSelect(fileId)
  triggerImport()
  displayError(message)
  ```  
  Dependencies: None

## Dependencies
- **Google Apps Script Environment**: Requires access to DriveApp, SpreadsheetApp, and HtmlService.
- **Internal Dependencies**: As listed per component (e.g., shared_utilities depends on shared_constants).
- **External**: Google Drive and Sheets APIs (enabled automatically via Apps Script).
- No external libraries are required, but ensure your script has permissions for Drive and Sheets.

## Additional Notes
- **Project Type**: General (Auto-Detect).
- **Status**: Some components (fileimporter.gs, menuhandler.gs, uisidebar.html) have a "Fail" status, indicating potential issues in implementation or validation. Review and test these thoroughly.
- **Error Handling**: Built-in logging via `logError(message)`. Check execution logs for issues.
- **Customization**: Modify `data_schemas.json` to support different file formats (e.g., CSV, JSON).
- **Contributing**: Fork the project and submit pull requests for improvements, especially for failed components.
- **License**: (Not specified; assume MIT or add your own).
- For more details, refer to `api_integrations.md` for API usage and `ux_notes.md` for UI design notes.

If you encounter issues, ensure all files are correctly placed in the Apps Script project and permissions are granted. Happy importing!
