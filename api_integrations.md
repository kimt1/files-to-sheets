## API INTEGRATIONS

This section documents the APIs integrated into the Google Apps Script tool for file selection from Google Drive and content import into Google Sheets. The tool primarily leverages Google Workspace APIs via built-in Apps Script services and advanced services. Authentication is handled automatically through Google's OAuth 2.0 mechanism in Apps Script, using the user's credentials. No manual token management is required for these integrations.

### 1. Google Drive API (v3)
- **Purpose**: Enables file selection, metadata retrieval, and content access from Google Drive.
- **Endpoints**:
  - `GET /drive/v3/files`: List files in Drive.
  - `GET /drive/v3/files/{fileId}`: Retrieve file metadata.
  - `GET /drive/v3/files/{fileId}/export`: Export file content (e.g., for Docs, Sheets).
- **Required Headers**:
  - `Authorization: Bearer {access_token}` (handled automatically in Apps Script).
- **Authentication Method**: OAuth 2.0 (implicitly managed by Apps Script's Drive advanced service or DriveApp).
- **Token Format**: Bearer token, obtained via `ScriptApp.getOAuthToken()` if needed for custom fetches.
- **Usage in Project**: Integrated via `DriveApp` for basic operations and `Drive` advanced service for advanced queries.

### 2. Google Sheets API (v4)
- **Purpose**: Imports file contents into Google Sheets worksheets, including creating/updating sheets and inserting data.
- **Endpoints**:
  - `GET /v4/spreadsheets/{spreadsheetId}`: Retrieve spreadsheet metadata.
  - `POST /v4/spreadsheets/{spreadsheetId}/values/{range}:append`: Append data to a sheet.
  - `PUT /v4/spreadsheets/{spreadsheetId}/values/{range}`: Update values in a range.
  - `POST /v4/spreadsheets/{spreadsheetId}:batchUpdate`: Batch operations like adding sheets or formatting.
- **Required Headers**:
  - `Authorization: Bearer {access_token}` (handled automatically).
  - `Content-Type: application/json`.
- **Authentication Method**: OAuth 2.0 (via Apps Script's Spreadsheet advanced service or SpreadsheetApp).
- **Token Format**: Bearer token, accessible via `ScriptApp.getOAuthToken()`.
- **Usage in Project**: Used for structuring imported data into worksheets with modular schemas.

### 3. Google Apps Script URL Fetch Service (UrlFetchApp)
- **Purpose**: Handles any custom HTTP requests to Google APIs or external services if needed (e.g., for non-built-in endpoints).
- **Endpoints**: Varies based on the target API (e.g., direct calls to Drive/Sheets REST endpoints).
- **Required Headers**:
  - `Authorization: Bearer {ScriptApp.getOAuthToken()}`.
  - Custom headers as per API requirements.
- **Authentication Method**: OAuth 2.0, with token manually included in headers.
- **Token Format**: Bearer token.
- **Usage in Project**: Fallback for advanced or custom API interactions not covered by built-in services.

### Additional Notes
- **Scopes**: Ensure the Apps Script project includes necessary OAuth scopes in `appsscript.json`, such as:
  - `https://www.googleapis.com/auth/drive`
  - `https://www.googleapis.com/auth/spreadsheets`
- **Error Handling**: Implement try-catch blocks for API calls, logging errors via `Logger.log()` or custom utilities.
- **Rate Limits**: Adhere to Google's API quotas (e.g., 100 requests/second/user for Drive API).
- **External APIs**: Currently none integrated; the tool supports wildcard file types (excluding images and disallowed formats) via Drive API, but extensions for external APIs can be added modularly.
