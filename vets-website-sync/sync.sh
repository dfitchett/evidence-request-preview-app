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

# Function to apply preview-specific customizations
# These replace production imports with mock/preview versions that work in Next.js
apply_preview_customizations() {
  echo ""
  echo -e "${YELLOW}Applying preview customizations:${NC}"

  # DefaultPage.jsx customizations
  local default_page="$SYNC_DIR/components/claim-document-request-pages/DefaultPage.jsx"

  if [ -f "$default_page" ]; then
    echo -e "  ${BLUE}→${NC} Customizing DefaultPage.jsx imports for preview"

    local temp_file="${default_page}.tmp"

    sed -e "s|from '../../utils/helpers';|from '../../utils/helpers-preview'; // Use preview helpers that don't have platform dependencies|g" \
        -e "s|from '../claim-files-tab/AddFilesForm';|from '../claim-files-tab/AddFilesFormMock'; // Use mock for preview|g" \
        -e "s|from '../Type1UnknownUploadError';|from '../Type1UnknownUploadErrorMock'; // Use mock for preview|g" \
        -e "s|from '../../utils/page';|from '../../utils/page-preview'; // Use preview page utils|g" \
        "$default_page" > "$temp_file"
    mv "$temp_file" "$default_page"

    echo -e "${GREEN}✓${NC} Applied preview customizations to DefaultPage.jsx"
  fi

  # NeedHelp.jsx customizations
  local need_help="$SYNC_DIR/components/NeedHelp.jsx"

  if [ -f "$need_help" ]; then
    echo -e "  ${BLUE}→${NC} Customizing NeedHelp.jsx imports for preview"

    local temp_file="${need_help}.tmp"

    sed -e "s|from '../utils/helpers';|from '../utils/helpers-preview';|g" \
        "$need_help" > "$temp_file"
    mv "$temp_file" "$need_help"

    echo -e "${GREEN}✓${NC} Applied preview customizations to NeedHelp.jsx"
  fi
}

# Sync all components
sync_all() {
  echo "Syncing all components..."
  echo ""

  # Main page components
  echo -e "${YELLOW}Claim document request pages:${NC}"
  copy_and_update "$VETS_WEB/components/claim-document-request-pages/DefaultPage.jsx" "$SYNC_DIR/components/claim-document-request-pages/DefaultPage.jsx" "claim-document-request-pages"
  # NOTE: Default5103EvidenceNotice.jsx is NOT synced - has custom import modifications
  echo ""

  # Supporting components
  echo -e "${YELLOW}Supporting components:${NC}"
  copy_and_update "$VETS_WEB/components/NeedHelp.jsx" "$SYNC_DIR/components/NeedHelp.jsx" "components"
  copy_and_update "$VETS_WEB/components/Notification.jsx" "$SYNC_DIR/components/Notification.jsx" "components"
  copy_and_update "$VETS_WEB/components/ClaimsBreadcrumbs.jsx" "$SYNC_DIR/components/ClaimsBreadcrumbs.jsx" "components"
  # NOTE: Type1UnknownUploadError.jsx is NOT synced - we use Type1UnknownUploadErrorMock.jsx instead
  echo ""

  # Claim files tab components
  # NOTE: AddFilesForm.jsx is NOT synced - we use AddFilesFormMock.jsx instead
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

  # Apply preview-specific customizations
  apply_preview_customizations
}

# Sync specific component
sync_component() {
  local component="$1"
  echo "Syncing component: $component"
  echo ""

  case "$component" in
    "DefaultPage")
      copy_and_update "$VETS_WEB/components/claim-document-request-pages/DefaultPage.jsx" "$SYNC_DIR/components/claim-document-request-pages/DefaultPage.jsx" "claim-document-request-pages"
      apply_preview_customizations
      ;;
    "Default5103EvidenceNotice")
      echo -e "${YELLOW}Skipping Default5103EvidenceNotice - has custom import modifications${NC}"
      ;;
    "NeedHelp")
      copy_and_update "$VETS_WEB/components/NeedHelp.jsx" "$SYNC_DIR/components/NeedHelp.jsx" "components"
      apply_preview_customizations
      ;;
    "Notification")
      copy_and_update "$VETS_WEB/components/Notification.jsx" "$SYNC_DIR/components/Notification.jsx" "components"
      ;;
    "AddFilesForm")
      echo -e "${YELLOW}Skipping AddFilesForm - use AddFilesFormMock.jsx instead${NC}"
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
      echo "  - NeedHelp"
      echo "  - Notification"
      echo "  - helpers"
      echo "  - evidenceDictionary"
      echo "  - DocumentRequestPage"
      echo ""
      echo "Not synced (use mock versions instead):"
      echo "  - AddFilesForm (use AddFilesFormMock)"
      echo "  - Default5103EvidenceNotice (custom imports)"
      echo "  - Type1UnknownUploadError (use Type1UnknownUploadErrorMock)"
      exit 1
      ;;
  esac
}

# Function to log sync information
log_sync() {
  local log_file="$SYNC_DIR/sync.log"
  local vets_website_root="${VETS_WEBSITE_PATH:-/Users/derek.fitchett/Documents/dev/va/vets-website}"
  local timestamp=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
  local commit_hash=""
  local branch_name=""

  # Get git info from vets-website
  if [ -d "$vets_website_root/.git" ]; then
    commit_hash=$(git -C "$vets_website_root" rev-parse HEAD 2>/dev/null)
    branch_name=$(git -C "$vets_website_root" rev-parse --abbrev-ref HEAD 2>/dev/null)
  fi

  if [ -n "$commit_hash" ]; then
    echo -e "${YELLOW}Logging sync info...${NC}"

    # Create or update sync.log
    cat > "$log_file" << EOF
# vets-website sync log
# This file is auto-generated by sync.sh

last_sync: $timestamp
branch: $branch_name
commit: $commit_hash
commit_short: ${commit_hash:0:7}
source_path: $vets_website_root
EOF

    echo -e "${GREEN}✓${NC} Updated sync.log (commit: ${commit_hash:0:7})"
  else
    echo -e "${YELLOW}⚠${NC} Could not determine vets-website commit hash"
  fi
}

# Main
if [ $# -eq 0 ]; then
  sync_all
else
  sync_component "$1"
fi

# Log sync information
log_sync

echo ""
echo -e "${GREEN}Sync complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Check for any remaining import issues (platform/* imports may need manual stubs)"
echo "2. Uncomment the DefaultPage import in adapters/DefaultPageAdapter.tsx"
echo "3. Test the preview"
