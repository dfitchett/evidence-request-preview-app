import { format, parseISO, isValid, isBefore } from 'date-fns';
import {
  EvidenceRequestFormData,
  TrackedItem,
  PreviewSettings,
} from './types';

/**
 * Formats a date string in the format "MMMM d, yyyy" (e.g., "January 27, 2026")
 * @param dateString - ISO date string (e.g., "2026-01-27")
 * @returns Formatted date string or the original string if invalid
 */
export function formatDate(dateString: string): string {
  try {
    const parsedDate = parseISO(dateString);
    return isValid(parsedDate)
      ? format(parsedDate, 'MMMM d, yyyy')
      : dateString;
  } catch {
    return dateString;
  }
}

/**
 * Returns the friendly name with proper casing
 * If isProperNoun is false, lowercases the first character
 * @param friendlyName - The friendly name to format
 * @param isProperNoun - Whether the name is a proper noun (keeps original casing)
 * @returns Formatted friendly name
 */
export function getDisplayFriendlyName(
  friendlyName: string,
  isProperNoun: boolean
): string {
  if (!friendlyName) return '';
  if (isProperNoun) return friendlyName;
  return friendlyName.charAt(0).toLowerCase() + friendlyName.slice(1);
}

/**
 * Converts markdown-style formatting to HTML
 * Supports: **bold**, links [text](url), line breaks
 * @param markdown - The markdown string to convert
 * @returns HTML string
 */
export function markdownToHtml(markdown: string): string {
  if (!markdown) return '';

  const html = markdown
    // Convert **bold** to <strong>
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Convert [text](url) to anchor tags
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="va-link">$1</a>'
    )
    // Convert line breaks
    .replace(/\n/g, '<br />');

  return html;
}

/**
 * Converts markdown content to React-safe HTML for dangerouslySetInnerHTML
 * @param markdown - The markdown string
 * @returns Object with __html property
 */
export function createMarkup(markdown: string): { __html: string } {
  return { __html: markdownToHtml(markdown) };
}

/**
 * Transform form data and preview settings into a TrackedItem for preview.
 *
 * @param formData - The evidence request form data
 * @param settings - The preview settings
 * @returns A TrackedItem object for the preview component
 */
export function transformToTrackedItem(
  formData: EvidenceRequestFormData,
  settings: PreviewSettings
): TrackedItem {
  return {
    displayName: formData.displayName || 'Display Name',
    friendlyName: formData.friendlyName || null,
    description:
      formData.shortDescription || formData.activityDescription || '',
    status: settings.viewMode,
    suspenseDate: settings.suspenseDate,
    requestedDate: settings.requestedDate,
    canUploadFile: formData.canUploadFile,
  };
}

/**
 * Check if a suspense date is in the past.
 *
 * @param suspenseDate - The suspense date string (YYYY-MM-DD)
 * @returns True if the date is in the past
 */
export function isPastDue(suspenseDate: string): boolean {
  try {
    return isBefore(parseISO(suspenseDate), new Date());
  } catch {
    return false;
  }
}

/**
 * Calculate days remaining until suspense date.
 *
 * @param suspenseDate - The suspense date string (YYYY-MM-DD)
 * @returns Number of days remaining (negative if past due)
 */
export function getDaysRemaining(suspenseDate: string): number {
  try {
    const suspense = parseISO(suspenseDate);
    const now = new Date();
    const diffTime = suspense.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  } catch {
    return 0;
  }
}

/**
 * Generate a unique ID for acceptance criteria items.
 *
 * @param prefix - Optional prefix for the ID
 * @returns A unique ID string
 */
export function generateUniqueId(prefix: string = 'item'): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Validate that a display name follows the expected format.
 * Display names should be in PascalCase or contain underscores.
 *
 * @param displayName - The display name to validate
 * @returns True if the display name is valid
 */
export function isValidDisplayName(displayName: string): boolean {
  if (!displayName || displayName.length === 0) return false;
  // Allow alphanumeric characters and underscores
  return /^[A-Za-z][A-Za-z0-9_]*$/.test(displayName);
}

/**
 * Truncate a string to a maximum length with ellipsis.
 *
 * @param text - The text to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated text with ellipsis if needed
 */
export function truncateText(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text;
  return `${text.substring(0, maxLength - 3)}...`;
}
