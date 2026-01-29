# Vets-Website Component Sync

This directory contains components copied from vets-website and adapters to make them work in this preview app.

## Quick Start

```bash
# Sync all components from vets-website
pnpm sync

# Or sync a specific component
./vets-website-sync/sync.sh DefaultPage
```

## Directory Structure

```
vets-website-sync/
├── README.md                    # This file
├── components/                  # Copied components from vets-website
│   ├── claim-document-request-pages/
│   │   ├── DefaultPage.jsx
│   │   └── Default5103EvidenceNotice.jsx
│   ├── claim-files-tab/
│   │   └── AddFilesForm.jsx
│   ├── NeedHelp.jsx
│   ├── Notification.jsx
│   ├── ClaimsBreadcrumbs.jsx
│   └── Type1UnknownUploadError.jsx
├── utils/                       # Copied utility functions
│   ├── helpers.js
│   ├── evidenceDictionary.jsx
│   └── page.js
├── adapters/                    # Adapter components for this app
│   └── DefaultPageAdapter.tsx
└── containers/
    └── DocumentRequestPage.jsx  # Copied container (reference only)
```

## How to Sync Components

### 1. Copy Components from vets-website

Copy the following files from `vets-website/src/applications/claims-status/`:

```bash
# From vets-website repo root
VETS_WEB=/Users/derek.fitchett/Documents/dev/va/vets-website/src/applications/claims-status
SYNC_DIR=/Users/derek.fitchett/Documents/dev/va/temp/evidence-request-preview-app/vets-website-sync

# Copy main page components
cp $VETS_WEB/components/claim-document-request-pages/DefaultPage.jsx $SYNC_DIR/components/claim-document-request-pages/
cp $VETS_WEB/components/claim-document-request-pages/Default5103EvidenceNotice.jsx $SYNC_DIR/components/claim-document-request-pages/

# Copy supporting components
cp $VETS_WEB/components/NeedHelp.jsx $SYNC_DIR/components/
cp $VETS_WEB/components/Notification.jsx $SYNC_DIR/components/
cp $VETS_WEB/components/ClaimsBreadcrumbs.jsx $SYNC_DIR/components/
cp $VETS_WEB/components/Type1UnknownUploadError.jsx $SYNC_DIR/components/
cp $VETS_WEB/components/claim-files-tab/AddFilesForm.jsx $SYNC_DIR/components/claim-files-tab/

# Copy utilities
cp $VETS_WEB/utils/helpers.js $SYNC_DIR/utils/
cp $VETS_WEB/utils/evidenceDictionary.jsx $SYNC_DIR/utils/
cp $VETS_WEB/utils/page.js $SYNC_DIR/utils/

# Copy container (for reference)
cp $VETS_WEB/containers/DocumentRequestPage.jsx $SYNC_DIR/containers/
```

### 2. Import Updates (Automatic)

The sync script automatically updates imports in copied files using sed. It handles:

- `../../utils/` → `../utils/` (for nested component directories)
- `../utils/` → `./utils/` (for top-level components)
- `~/applications/claims-status/` path aliases
- `platform/` → `@department-of-veterans-affairs/platform-` (may still need manual stubs)

If you need to manually update imports:

**Original import:**
```js
import { formatDescription } from '../../utils/helpers';
```

**Updated import:**
```js
import { formatDescription } from '../utils/helpers';
```

### 3. Using the Adapter

The adapter (`adapters/DefaultPageAdapter.tsx`) wraps the copied DefaultPage component and:
- Provides mock data from the form state
- Stubs out functions that aren't needed for preview (onSubmit, onCancel)
- Maps form data to the expected `item` prop structure

## Key Dependencies

The vets-website components use:

1. **VA Component Library** - Already installed in this app
   - `VaLink`, `va-alert`, `va-telephone`, `va-loading-indicator`

2. **date-fns** - Already installed
   - `isBefore`, `parseISO`, `format`

3. **Redux** - NOT needed for preview
   - The adapter bypasses Redux by providing props directly

## Updating the Preview

When vets-website components change:

1. Re-copy the changed files using the commands above
2. Check for new imports or dependencies
3. Update the adapter if the prop interface changed
4. Test the preview to ensure it still works

## Troubleshooting

### Import Errors
- Check that all relative imports are updated for the new directory structure
- Ensure VA component library imports use the correct path

### Missing Components
- Some components may have additional dependencies not listed here
- Check the import statements in the copied file and add missing components

### Styling Issues
- Ensure VADS CSS is loaded in the app layout
- Check for component-specific SCSS that may need to be copied
