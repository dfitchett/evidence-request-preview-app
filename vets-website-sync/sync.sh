#!/bin/bash

# Sync script for copying components from vets-website
# Usage: ./sync.sh [options] [component-name]
#
# Options:
#   --local           Use local vets-website repository instead of remote
#   --commit=<hash>   Sync from a specific commit (default: main branch for remote, HEAD for local)
#
# Examples:
#   ./sync.sh                          # Sync all from remote main branch
#   ./sync.sh --local                  # Sync all from local repo
#   ./sync.sh --commit=abc123          # Sync all from specific remote commit
#   ./sync.sh --local --commit=abc123  # Sync all from specific local commit
#   ./sync.sh DefaultPage              # Sync single component from remote main
#   ./sync.sh --local DefaultPage      # Sync single component from local repo

SYNC_DIR="$(dirname "$0")"

# GitHub repository information
GITHUB_REPO="department-of-veterans-affairs/vets-website"
GITHUB_RAW_BASE="https://raw.githubusercontent.com/$GITHUB_REPO"
CLAIMS_STATUS_PATH="src/applications/claims-status"

# Local repository path (used with --local flag)
LOCAL_VETS_WEB="${VETS_WEBSITE_PATH:-/Users/derek.fitchett/Documents/dev/va/vets-website}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default values
USE_LOCAL=false
TARGET_REF=""
COMPONENT=""

# Parse command line arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --)
      # Skip argument separator (used by npm/pnpm)
      shift
      ;;
    --local)
      USE_LOCAL=true
      shift
      ;;
    --commit=*)
      TARGET_REF="${1#*=}"
      shift
      ;;
    --help|-h)
      echo "Usage: ./sync.sh [options] [component-name]"
      echo ""
      echo "Options:"
      echo "  --local           Use local vets-website repository instead of remote"
      echo "  --commit=<hash>   Sync from a specific commit (default: main branch for remote, HEAD for local)"
      echo ""
      echo "Examples:"
      echo "  ./sync.sh                          # Sync all from remote main branch"
      echo "  ./sync.sh --local                  # Sync all from local repo"
      echo "  ./sync.sh --commit=abc123          # Sync all from specific remote commit"
      echo "  ./sync.sh --local --commit=abc123  # Sync all from specific local commit"
      echo "  ./sync.sh DefaultPage              # Sync single component from remote main"
      exit 0
      ;;
    -*)
      echo -e "${RED}Unknown option: $1${NC}"
      echo "Use --help for usage information"
      exit 1
      ;;
    *)
      COMPONENT="$1"
      shift
      ;;
  esac
done

# Set default ref based on mode
if [ -z "$TARGET_REF" ]; then
  if [ "$USE_LOCAL" = true ]; then
    TARGET_REF="HEAD"
  else
    TARGET_REF="main"
  fi
fi

# Display sync source information
if [ "$USE_LOCAL" = true ]; then
  echo -e "${YELLOW}Mode:${NC} Local repository"
  echo -e "${YELLOW}Source:${NC} $LOCAL_VETS_WEB"
  echo -e "${YELLOW}Ref:${NC} $TARGET_REF"

  # Check if local vets-website path exists
  if [ ! -d "$LOCAL_VETS_WEB" ]; then
    echo -e "${RED}Error: vets-website path not found at $LOCAL_VETS_WEB${NC}"
    echo "Set VETS_WEBSITE_PATH environment variable to your vets-website repo location"
    exit 1
  fi
else
  echo -e "${YELLOW}Mode:${NC} Remote repository"
  echo -e "${YELLOW}Source:${NC} github.com/$GITHUB_REPO"
  echo -e "${YELLOW}Ref:${NC} $TARGET_REF"
fi
echo -e "${YELLOW}Destination:${NC} $SYNC_DIR"
echo ""

# Function to get file content from local repo at specific ref
get_local_file() {
  local file_path="$1"
  local ref="$2"

  git -C "$LOCAL_VETS_WEB" show "$ref:$file_path" 2>/dev/null
}

# Function to get file content from remote repo
get_remote_file() {
  local file_path="$1"
  local ref="$2"

  local url="$GITHUB_RAW_BASE/$ref/$file_path"
  curl -sfL "$url" 2>/dev/null
}

# Function to get file content (dispatches to local or remote)
get_file_content() {
  local file_path="$1"

  if [ "$USE_LOCAL" = true ]; then
    get_local_file "$file_path" "$TARGET_REF"
  else
    get_remote_file "$file_path" "$TARGET_REF"
  fi
}

# Function to fetch and save a file
fetch_file() {
  local src_path="$1"  # Path relative to claims-status in vets-website
  local dest="$2"

  local full_src_path="$CLAIMS_STATUS_PATH/$src_path"
  local content

  content=$(get_file_content "$full_src_path")

  if [ -n "$content" ]; then
    mkdir -p "$(dirname "$dest")"
    echo "$content" > "$dest"
    echo -e "${GREEN}✓${NC} Fetched: $(basename "$dest")"
    return 0
  else
    echo -e "${RED}✗${NC} Not found: $full_src_path"
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
      sed -e "s|from '~/applications/claims-status/utils/|from '../../utils/|g" \
          -e "s|from \"~/applications/claims-status/utils/|from \"../../utils/|g" \
          -e "s|from 'platform/|from '@department-of-veterans-affairs/platform-|g" \
          -e "s|from \"platform/|from \"@department-of-veterans-affairs/platform-|g" \
          "$file" > "$temp_file"
      mv "$temp_file" "$file"
      ;;
    "components")
      # Files in components/
      sed -e "s|from '~/applications/claims-status/utils/|from '../utils/|g" \
          -e "s|from \"~/applications/claims-status/utils/|from \"../utils/|g" \
          -e "s|from 'platform/|from '@department-of-veterans-affairs/platform-|g" \
          -e "s|from \"platform/|from \"@department-of-veterans-affairs/platform-|g" \
          "$file" > "$temp_file"
      mv "$temp_file" "$file"
      ;;
    "claim-files-tab")
      # Files in components/claim-files-tab/
      sed -e "s|from '~/applications/claims-status/utils/|from '../../utils/|g" \
          -e "s|from \"~/applications/claims-status/utils/|from \"../../utils/|g" \
          -e "s|from 'platform/|from '@department-of-veterans-affairs/platform-|g" \
          -e "s|from \"platform/|from \"@department-of-veterans-affairs/platform-|g" \
          "$file" > "$temp_file"
      mv "$temp_file" "$file"
      ;;
    "utils")
      # Files in utils/
      sed -e "s|from 'platform/|from '@department-of-veterans-affairs/platform-|g" \
          -e "s|from \"platform/|from \"@department-of-veterans-affairs/platform-|g" \
          "$file" > "$temp_file"
      mv "$temp_file" "$file"
      ;;
    "containers")
      # Files in containers/
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

# Function to fetch and update a file
fetch_and_update() {
  local src_path="$1"
  local dest="$2"
  local location="$3"

  if fetch_file "$src_path" "$dest"; then
    update_imports "$dest" "$location"
  fi
}

# Function to apply preview-specific customizations
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
  fetch_and_update "components/claim-document-request-pages/DefaultPage.jsx" "$SYNC_DIR/components/claim-document-request-pages/DefaultPage.jsx" "claim-document-request-pages"
  # NOTE: Default5103EvidenceNotice.jsx is NOT synced - has custom import modifications
  echo ""

  # Supporting components
  echo -e "${YELLOW}Supporting components:${NC}"
  fetch_and_update "components/NeedHelp.jsx" "$SYNC_DIR/components/NeedHelp.jsx" "components"
  fetch_and_update "components/Notification.jsx" "$SYNC_DIR/components/Notification.jsx" "components"
  fetch_and_update "components/ClaimsBreadcrumbs.jsx" "$SYNC_DIR/components/ClaimsBreadcrumbs.jsx" "components"
  # NOTE: Type1UnknownUploadError.jsx is NOT synced - we use Type1UnknownUploadErrorMock.jsx instead
  echo ""

  # Claim files tab components
  # NOTE: AddFilesForm.jsx is NOT synced - we use AddFilesFormMock.jsx instead
  echo ""

  # Utilities
  echo -e "${YELLOW}Utilities:${NC}"
  fetch_and_update "utils/helpers.js" "$SYNC_DIR/utils/helpers.js" "utils"
  fetch_and_update "utils/evidenceDictionary.jsx" "$SYNC_DIR/utils/evidenceDictionary.jsx" "utils"
  fetch_and_update "utils/page.js" "$SYNC_DIR/utils/page.js" "utils"
  echo ""

  # Container (for reference)
  echo -e "${YELLOW}Container (reference):${NC}"
  fetch_and_update "containers/DocumentRequestPage.jsx" "$SYNC_DIR/containers/DocumentRequestPage.jsx" "containers"
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
      fetch_and_update "components/claim-document-request-pages/DefaultPage.jsx" "$SYNC_DIR/components/claim-document-request-pages/DefaultPage.jsx" "claim-document-request-pages"
      apply_preview_customizations
      ;;
    "Default5103EvidenceNotice")
      echo -e "${YELLOW}Skipping Default5103EvidenceNotice - has custom import modifications${NC}"
      ;;
    "NeedHelp")
      fetch_and_update "components/NeedHelp.jsx" "$SYNC_DIR/components/NeedHelp.jsx" "components"
      apply_preview_customizations
      ;;
    "Notification")
      fetch_and_update "components/Notification.jsx" "$SYNC_DIR/components/Notification.jsx" "components"
      ;;
    "AddFilesForm")
      echo -e "${YELLOW}Skipping AddFilesForm - use AddFilesFormMock.jsx instead${NC}"
      ;;
    "helpers")
      fetch_and_update "utils/helpers.js" "$SYNC_DIR/utils/helpers.js" "utils"
      ;;
    "evidenceDictionary")
      fetch_and_update "utils/evidenceDictionary.jsx" "$SYNC_DIR/utils/evidenceDictionary.jsx" "utils"
      ;;
    "DocumentRequestPage")
      fetch_and_update "containers/DocumentRequestPage.jsx" "$SYNC_DIR/containers/DocumentRequestPage.jsx" "containers"
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

# Function to resolve the actual commit hash
resolve_commit_hash() {
  if [ "$USE_LOCAL" = true ]; then
    git -C "$LOCAL_VETS_WEB" rev-parse "$TARGET_REF" 2>/dev/null
  else
    # For remote, we need to get the commit hash from GitHub API
    if [[ "$TARGET_REF" =~ ^[0-9a-f]{40}$ ]]; then
      # Already a full commit hash
      echo "$TARGET_REF"
    elif [[ "$TARGET_REF" =~ ^[0-9a-f]{7,}$ ]]; then
      # Short commit hash - try to use it as-is (GitHub will resolve it)
      echo "$TARGET_REF"
    else
      # Branch name - get the commit hash from GitHub API
      local api_url="https://api.github.com/repos/$GITHUB_REPO/commits/$TARGET_REF"
      local commit_hash
      commit_hash=$(curl -sf "$api_url" 2>/dev/null | grep -m1 '"sha"' | sed 's/.*"sha": *"\([^"]*\)".*/\1/')
      echo "$commit_hash"
    fi
  fi
}

# Function to get branch name for a commit
get_branch_name() {
  if [ "$USE_LOCAL" = true ]; then
    git -C "$LOCAL_VETS_WEB" rev-parse --abbrev-ref "$TARGET_REF" 2>/dev/null || echo "$TARGET_REF"
  else
    # For remote, use the target ref as the branch name
    echo "$TARGET_REF"
  fi
}

# Function to log sync information
log_sync() {
  local log_file="$SYNC_DIR/sync.log"
  local timestamp=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
  local commit_hash=""
  local branch_name=""
  local source_type=""

  # Resolve the actual commit hash
  commit_hash=$(resolve_commit_hash)
  branch_name=$(get_branch_name)

  if [ "$USE_LOCAL" = true ]; then
    source_type="local"
  else
    source_type="remote"
  fi

  if [ -n "$commit_hash" ]; then
    # Check if this commit has already been synced
    if [ -f "$log_file" ] && grep -q "$commit_hash" "$log_file"; then
      echo -e "${YELLOW}⚠${NC} Already synced from commit ${commit_hash:0:7}, skipping log update"
      return 0
    fi

    echo -e "${YELLOW}Logging sync info...${NC}"

    local header="# vets-website sync log
# This file is auto-generated by sync.sh
# Format: timestamp | source | branch | commit_short | commit_full
# ---------------------------------------------------------"
    local new_entry="$timestamp | $source_type | $branch_name | ${commit_hash:0:7} | $commit_hash"

    if [ -f "$log_file" ]; then
      # Read existing entries (skip header lines starting with #), add new entry, sort by timestamp descending
      local all_entries=$(grep -v "^#" "$log_file" | grep -v "^$"; echo "$new_entry")
      local sorted_entries=$(echo "$all_entries" | sort -r)
      # Write header + sorted entries (most recent first)
      printf "%s\n%s\n" "$header" "$sorted_entries" > "$log_file"
    else
      # Create new file with header and first entry
      printf "%s\n%s\n" "$header" "$new_entry" > "$log_file"
    fi

    echo -e "${GREEN}✓${NC} Updated sync.log (commit: ${commit_hash:0:7})"
  else
    echo -e "${YELLOW}⚠${NC} Could not determine commit hash"
  fi
}

# Main
if [ -z "$COMPONENT" ]; then
  sync_all
else
  sync_component "$COMPONENT"
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
