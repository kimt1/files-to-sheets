# UX Notes for File Importer Tool

## Overview
This document outlines the user experience (UX) guidelines, design requirements, and interactive flows for the Google Apps Script tool that imports files from Google Drive into Google Sheets. The goal is to create an intuitive, efficient, and error-resistant interface that enhances productivity for users managing data imports.

## Key Design Principles
- **Simplicity**: Minimize steps and cognitive load. Use clear labels, tooltips, and progressive disclosure for advanced options.
- **Feedback**: Provide immediate visual cues for actions (e.g., loading spinners, success notifications, error alerts).
- **Accessibility**: Ensure compatibility with screen readers, keyboard navigation, and high-contrast modes.
- **Consistency**: Align with Google Workspace UI patterns (e.g., Material Design elements in HTML sidebars).
- **Error Handling**: Gracefully manage failures like invalid file types or permissions issues with user-friendly messages and recovery options.

## User Personas
- **Primary User**: Data analysts or admins who frequently import CSV, JSON, or text files into Sheets for reporting.
- **Secondary User**: Casual users needing occasional imports, requiring minimal learning curve.

## Interactive Flows

### 1. Initiation Flow
- **Trigger**: User accesses the tool via a custom menu in Google Sheets (e.g., "Extensions" > "File Importer" > "Open Sidebar").
- **Alternative**: Direct sidebar invocation for power users.
- **UX Notes**:
  - Menu items should be concise: "Open Importer", "Import Files", "Help".
  - On first use, display a welcome tooltip or modal explaining the tool's purpose.

### 2. File Selection Flow
- **Steps**:
  1. Sidebar opens with a "Select Files" button, integrating Google Drive Picker API.
  2. User browses and selects one or multiple files (supported types: CSV, JSON, TXT, etc.).
  3. Selected files display in a list with previews (e.g., file name, size, type, truncated content snippet).
- **UX Notes**:
  - Limit selections to 10 files to prevent overload; warn if exceeded.
  - Include search/filter options in the picker for large Drives.
  - Real-time validation: Highlight incompatible files in red with reasons (e.g., "Unsupported MIME type").

### 3. Data Preview and Configuration Flow
- **Steps**:
  1. After selection, show a collapsible preview pane for each file's parsed content (e.g., table for CSV, tree view for JSON).
  2. Options: Choose target worksheet (active, new, or existing), set import mode (append, overwrite), and configure parsing (e.g., delimiter for CSV).
  3. Validate data against schemas (if applicable) and display warnings for issues like missing fields.
- **UX Notes**:
  - Use responsive tables for previews to handle varying screen sizes.
  - Provide undo/refresh buttons for reselection.
  - Tooltips on options: e.g., "Append mode adds data below existing content without overwriting."

### 4. Import and Completion Flow
- **Steps**:
  1. User clicks "Import" button.
  2. Progress indicator shows (e.g., "Importing 3/5 files...").
  3. On success: Notification "Import complete! Data added to Sheet1." with a link to view.
  4. On error: Detailed alert (e.g., "Failed to import file X: Invalid JSON format. Retry?") with logs accessible via a "View Details" button.
- **UX Notes**:
  - Disable buttons during import to prevent duplicate actions.
  - Post-import: Offer "Import Another" or "Close Sidebar" options.
  - Log successes/errors subtly in the Sheet (e.g., a hidden "Logs" tab).

### 5. Edge Case Flows
- **No Files Selected**: Prompt "Please select at least one file to proceed."
- **Large Files**: Warn "File exceeds 10MB ? import may take time. Continue?"
- **Permissions Issues**: Guide user: "Grant Drive access in the authorization prompt."
- **Offline Mode**: Disable features with a message: "Internet required for Drive access."

## UI Components
- **Sidebar Layout** (uisidebar.html):
  - Header: Tool title and close button.
  - Body: Sections for selection, preview, options, and actions.
  - Footer: Import button, cancel, and help link.
- **Styling**: Use Google Fonts, primary colors (blue for actions, green for success), and ample padding for readability.
- **HTML Elements**:
  - Buttons: `<button class="primary">Select Files</button>`
  - Lists: `<ul>` for file selections with checkboxes for multi-select.
  - Modals: For confirmations using `google.script.run` callbacks.

## Testing and Iteration
- **Usability Testing**: Simulate flows with 5-10 users; measure time-to-complete and error rates.
- **Metrics**: Track abandonment rates, successful imports, and user satisfaction via optional feedback form.
- **Iterations**: Based on feedback, add features like drag-and-drop file upload or batch processing.

## References
- Google Workspace UI Guidelines: [Link to official docs](https://developers.google.com/workspace/add-ons/concepts/ui)
- Accessibility Best Practices: Ensure ARIA labels and focus management.

This document should be updated as the project evolves to reflect new features or user feedback.
