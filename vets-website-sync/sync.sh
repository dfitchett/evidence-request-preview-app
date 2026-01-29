#!/bin/bash

# Sync script for copying components from vets-website
# Usage: ./sync.sh [component-name]
#   Without arguments: syncs all components
#   With component name: syncs only that component

VETS_WEB="${VETS_WEBSITE_PATH:-/Users/derek.fitchett/Documents/dev/va/vets-website}/src/applications/claims-status"
SYNC_DIR="$(dirname "$0")"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Syncing from:${NC} $VETS_WEB"
echo -e "${YELLOW}Syncing to:${NC} $SYNC_DIR"
echo ""

# Check if vets-website path exists
if [ ! -d "$VETS_WEB" ]; then
  echo -e "${RED}Error: vets-website path not found at $VETS_WEB${NC}"
  echo "Set VETS_WEBSITE_PATH environment variable to your vets-website repo location"
  exit 1
fi

# Function to copy a file and report status
copy_file() {
  local src="$1"
  local dest="$2"

  if [ -f "$src" ]; then
    mkdir -p "$(dirname "$dest")"
    cp "$src" "$dest"
    echo -e "${GREEN}✓${NC} Copied: $(basename "$src")"
    return 0
  else
    echo -e "${RED}✗${NC} Not found: $src"
    return 1
  fi
}

# Function to update imports in a file
update_imports() {
  local file="$1"
  local file_location="$2"  # "claim-document-request-pages", "components", "utils", "containers"

  if [ ! -f "$file" ]; then
    return
  fi

  echo -e "  ${BLUE}→${NC} Updating imports in $(basename "$file")"

  # Create a temporary file for sed operations
  local temp_file="${file}.tmp"

  case "$file_location" in
    "claim-document-request-pages")
      # Files in components/claim-document-request-pages/
      # Keep ../../utils/ as-is (matches our directory structure)
      # Only transform path aliases and platform imports
      sed -e "s|from '~/applications/claims-status/utils/|from '../../utils/|g" \
          -e "s|from \"~/applications/claims-status/utils/|from \"../../utils/|g" \
          -e "s|from 'platform/|from '@department-of-veterans-affairs/platform-|g" \
          -e "s|from \"platform/|from \"@department-of-veterans-affairs/platform-|g" \
          "$file" > "$temp_file"
      mv "$temp_file" "$file"
      ;;
    "components")
      # Files in components/
      # Keep ../utils/ as-is (matches our directory structure)
      # Only transform path aliases and platform imports
      sed -e "s|from '~/applications/claims-status/utils/|from '../utils/|g" \
          -e "s|from \"~/applications/claims-status/utils/|from \"../utils/|g" \
          -e "s|from 'platform/|from '@department-of-veterans-affairs/platform-|g" \
          -e "s|from \"platform/|from \"@department-of-veterans-affairs/platform-|g" \
          "$file" > "$temp_file"
      mv "$temp_file" "$file"
      ;;
    "claim-files-tab")
      # Files in components/claim-files-tab/
      # Keep ../../utils/ as-is (matches our directory structure)
      # Only transform path aliases and platform imports
      sed -e "s|from '~/applications/claims-status/utils/|from '../../utils/|g" \
          -e "s|from \"~/applications/claims-status/utils/|from \"../../utils/|g" \
          -e "s|from 'platform/|from '@department-of-veterans-affairs/platform-|g" \
          -e "s|from \"platform/|from \"@department-of-veterans-affairs/platform-|g" \
          "$file" > "$temp_file"
      mv "$temp_file" "$file"
      ;;
    "utils")
      # Files in utils/
      # platform imports need updating
      sed -e "s|from 'platform/|from '@department-of-veterans-affairs/platform-|g" \
          -e "s|from \"platform/|from \"@department-of-veterans-affairs/platform-|g" \
          "$file" > "$temp_file"
      mv "$temp_file" "$file"
      ;;
    "containers")
      # Files in containers/
      # ../utils/ → ./utils/ (or we keep as reference)
      sed -e "s|from '\.\./utils/|from '../utils/|g" \
          -e "s|from \"\.\./utils/|from \"../utils/|g" \
          -e "s|from '\.\./components/|from '../components/|g" \
          -e "s|from \"\.\./components/|from \"../components/|g" \
          -e "s|from '~/applications/claims-status/|from '../|g" \
          -e "s|from \"~/applications/claims-status/|from \"../|g" \
          -e "s|from 'platform/|from '@department-of-veterans-affairs/platform-|g" \
          -e "s|from \"platform/|from \"@department-of-veterans-affairs/platform-|g" \
          "$file" > "$temp_file"
      mv "$temp_file" "$file"
      ;;
  esac
}

# Function to copy and update a file
copy_and_update() {
  local src="$1"
  local dest="$2"
  local location="$3"

  if copy_file "$src" "$dest"; then
    update_imports "$dest" "$location"
  fi
}

# Sync all components
sync_all() {
  echo "Syncing all components..."
  echo ""

  # Main page components
  echo -e "${YELLOW}Claim document request pages:${NC}"
  copy_and_update "$VETS_WEB/components/claim-document-request-pages/DefaultPage.jsx" "$SYNC_DIR/components/claim-document-request-pages/DefaultPage.jsx" "claim-document-request-pages"
  copy_and_update "$VETS_WEB/components/claim-document-request-pages/Default5103EvidenceNotice.jsx" "$SYNC_DIR/components/claim-document-request-pages/Default5103EvidenceNotice.jsx" "claim-document-request-pages"
  echo ""

  # Supporting components
  echo -e "${YELLOW}Supporting components:${NC}"
  copy_and_update "$VETS_WEB/components/NeedHelp.jsx" "$SYNC_DIR/components/NeedHelp.jsx" "components"
  copy_and_update "$VETS_WEB/components/Notification.jsx" "$SYNC_DIR/components/Notification.jsx" "components"
  copy_and_update "$VETS_WEB/components/ClaimsBreadcrumbs.jsx" "$SYNC_DIR/components/ClaimsBreadcrumbs.jsx" "components"
  copy_and_update "$VETS_WEB/components/Type1UnknownUploadError.jsx" "$SYNC_DIR/components/Type1UnknownUploadError.jsx" "components"
  echo ""

  # Claim files tab components
  echo -e "${YELLOW}Claim files tab:${NC}"
  copy_and_update "$VETS_WEB/components/claim-files-tab/AddFilesForm.jsx" "$SYNC_DIR/components/claim-files-tab/AddFilesForm.jsx" "claim-files-tab"
  echo ""

  # Utilities
  echo -e "${YELLOW}Utilities:${NC}"
  copy_and_update "$VETS_WEB/utils/helpers.js" "$SYNC_DIR/utils/helpers.js" "utils"
  copy_and_update "$VETS_WEB/utils/evidenceDictionary.jsx" "$SYNC_DIR/utils/evidenceDictionary.jsx" "utils"
  copy_and_update "$VETS_WEB/utils/page.js" "$SYNC_DIR/utils/page.js" "utils"
  echo ""

  # Container (for reference)
  echo -e "${YELLOW}Container (reference):${NC}"
  copy_and_update "$VETS_WEB/containers/DocumentRequestPage.jsx" "$SYNC_DIR/containers/DocumentRequestPage.jsx" "containers"
  echo ""
}

# Sync specific component
sync_component() {
  local component="$1"
  echo "Syncing component: $component"
  echo ""

  case "$component" in
    "DefaultPage")
      copy_and_update "$VETS_WEB/components/claim-document-request-pages/DefaultPage.jsx" "$SYNC_DIR/components/claim-document-request-pages/DefaultPage.jsx" "claim-document-request-pages"
      ;;
    "Default5103EvidenceNotice")
      copy_and_update "$VETS_WEB/components/claim-document-request-pages/Default5103EvidenceNotice.jsx" "$SYNC_DIR/components/claim-document-request-pages/Default5103EvidenceNotice.jsx" "claim-document-request-pages"
      ;;
    "NeedHelp")
      copy_and_update "$VETS_WEB/components/NeedHelp.jsx" "$SYNC_DIR/components/NeedHelp.jsx" "components"
      ;;
    "Notification")
      copy_and_update "$VETS_WEB/components/Notification.jsx" "$SYNC_DIR/components/Notification.jsx" "components"
      ;;
    "AddFilesForm")
      copy_and_update "$VETS_WEB/components/claim-files-tab/AddFilesForm.jsx" "$SYNC_DIR/components/claim-files-tab/AddFilesForm.jsx" "claim-files-tab"
      ;;
    "helpers")
      copy_and_update "$VETS_WEB/utils/helpers.js" "$SYNC_DIR/utils/helpers.js" "utils"
      ;;
    "evidenceDictionary")
      copy_and_update "$VETS_WEB/utils/evidenceDictionary.jsx" "$SYNC_DIR/utils/evidenceDictionary.jsx" "utils"
      ;;
    "DocumentRequestPage")
      copy_and_update "$VETS_WEB/containers/DocumentRequestPage.jsx" "$SYNC_DIR/containers/DocumentRequestPage.jsx" "containers"
      ;;
    *)
      echo -e "${RED}Unknown component: $component${NC}"
      echo "Available components:"
      echo "  - DefaultPage"
      echo "  - Default5103EvidenceNotice"
      echo "  - NeedHelp"
      echo "  - Notification"
      echo "  - AddFilesForm"
      echo "  - helpers"
      echo "  - evidenceDictionary"
      echo "  - DocumentRequestPage"
      exit 1
      ;;
  esac
}

# Main
if [ $# -eq 0 ]; then
  sync_all
else
  sync_component "$1"
fi

echo -e "${GREEN}Sync complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Check for any remaining import issues (platform/* imports may need manual stubs)"
echo "2. Uncomment the DefaultPage import in adapters/DefaultPageAdapter.tsx"
echo "3. Test the preview"
