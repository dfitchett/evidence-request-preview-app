import { EvidenceRequestFormData } from './types';

/**
 * Format aliases array for GitHub issue template.
 */
function formatAliases(aliases: string[]): string {
  return aliases.length > 0 ? aliases.join('\n') : '_No response_';
}

/**
 * Format a string field for GitHub issue template.
 */
function formatField(value: string): string {
  return value || '_No response_';
}

/**
 * Format a boolean field for GitHub issue template.
 * Handles the special cases for dropdown values.
 */
function formatBoolean(field: string, value: boolean): string {
  switch (field) {
    case 'canUploadFile':
    case 'isDBQ':
    case 'isProperNoun':
    case 'isSensitive':
    case 'noProvidePrefix':
      return value ? 'yes' : 'no';
    case 'noActionNeeded':
      return value ? 'no (noActionNeeded = true)' : 'yes (noActionNeeded = false)';
    default:
      return value ? 'yes' : 'no';
  }
}

/**
 * Format acceptance criteria for GitHub issue template.
 */
function formatAcceptanceCriteria(
  criteria: EvidenceRequestFormData['acceptanceCriteria']
): string {
  return criteria || '_No response_';
}

/**
 * Generate GitHub issue markdown from form data.
 * This generates the body content that matches the VA GitHub issue template.
 *
 * @param formData - The evidence request form data
 * @returns Markdown string for GitHub issue body
 */
export function generateGitHubIssueMarkdown(
  formData: EvidenceRequestFormData
): string {
  return `### Display Name (API Key)

${formatField(formData.displayName)}

### Friendly Name

${formatField(formData.friendlyName)}

### Support Aliases

${formatAliases(formData.supportAliases)}

### Short Description

${formatField(formData.shortDescription)}

### Activity Description

${formatField(formData.activityDescription)}

### canUploadFile

${formatBoolean('canUploadFile', formData.canUploadFile)}

### noActionNeeded

${formatBoolean('noActionNeeded', formData.noActionNeeded)}

### isDBQ

${formatBoolean('isDBQ', formData.isDBQ)}

### isProperNoun

${formatBoolean('isProperNoun', formData.isProperNoun)}

### isSensitive

${formatBoolean('isSensitive', formData.isSensitive)}

### noProvidePrefix

${formatBoolean('noProvidePrefix', formData.noProvidePrefix)}

### Long Description Content

\`\`\`markdown
${formatField(formData.longDescriptionContent)}
\`\`\`

### Long Description Notes

${formatField(formData.longDescriptionNotes)}

### Next Steps Content

\`\`\`markdown
${formatField(formData.nextStepsContent)}
\`\`\`

### Next Steps Notes

${formatField(formData.nextStepsNotes)}

### Additional Context

${formatField(formData.additionalContext)}

### Links & Resources

${formatField(formData.linksResources)}

### Acceptance Criteria

${formatAcceptanceCriteria(formData.acceptanceCriteria)}`;
}

/**
 * Generate URL to create GitHub issue with pre-filled template.
 * Note: GitHub's issue template URL parameters are limited,
 * so the full body should be copied to clipboard instead.
 *
 * @param formData - The evidence request form data
 * @returns URL string for creating a new GitHub issue
 */
export function generateGitHubIssueUrl(formData: EvidenceRequestFormData): string {
  const title = encodeURIComponent(
    `Evidence Request Improvement: [${formData.displayName || 'Display Name'}]`
  );
  const baseUrl =
    'https://github.com/department-of-veterans-affairs/va.gov-team/issues/new';
  const template = 'benefits-management-tools-improved-evidence-requests.yml';

  return `${baseUrl}?template=${template}&title=${title}`;
}

/**
 * Copy text to clipboard with fallback for older browsers.
 *
 * @param text - The text to copy
 * @returns Promise that resolves when copy is complete
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    }
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}
