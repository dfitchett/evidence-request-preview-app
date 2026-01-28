/**
 * Utilities for markdown handling in the Evidence Request Preview App.
 */

/**
 * Simple markdown to text conversion for previews.
 * Strips common markdown syntax while preserving readability.
 *
 * @param markdown - The markdown string to strip
 * @returns Plain text version of the markdown
 */
export function stripMarkdown(markdown: string): string {
  if (!markdown) return '';

  return markdown
    // Remove links, keep link text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove bold/italic markers
    .replace(/[*_]{1,2}([^*_]+)[*_]{1,2}/g, '$1')
    // Remove headers
    .replace(/^#+\s+/gm, '')
    // Convert unordered list items to bullets
    .replace(/^[-*]\s+/gm, '- ')
    // Remove numbered list markers
    .replace(/^\d+\.\s+/gm, '')
    // Remove inline code
    .replace(/`([^`]+)`/g, '$1')
    // Remove code blocks (simplified)
    .replace(/```[\s\S]*?```/g, '')
    // Remove blockquotes
    .replace(/^>\s+/gm, '')
    // Normalize multiple newlines
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/**
 * Parse markdown links to structured format.
 *
 * @param markdown - The markdown string to parse
 * @returns Array of link objects with text and href
 */
export function parseMarkdownLinks(
  markdown: string
): { text: string; href: string }[] {
  if (!markdown) return [];

  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const links: { text: string; href: string }[] = [];
  let match;

  while ((match = linkRegex.exec(markdown)) !== null) {
    links.push({ text: match[1], href: match[2] });
  }

  return links;
}

/**
 * Check if a string contains markdown formatting.
 *
 * @param text - The text to check
 * @returns True if the text contains markdown formatting
 */
export function containsMarkdown(text: string): boolean {
  if (!text) return false;

  const markdownPatterns = [
    /\[([^\]]+)\]\([^)]+\)/, // Links
    /[*_]{1,2}[^*_]+[*_]{1,2}/, // Bold/italic
    /^#+\s+/m, // Headers
    /^[-*]\s+/m, // Unordered lists
    /^\d+\.\s+/m, // Ordered lists
    /`[^`]+`/, // Inline code
    /```[\s\S]*?```/, // Code blocks
    /^>\s+/m, // Blockquotes
  ];

  return markdownPatterns.some((pattern) => pattern.test(text));
}

/**
 * Escape special markdown characters in text.
 * Useful when you want to display text literally without formatting.
 *
 * @param text - The text to escape
 * @returns Text with markdown characters escaped
 */
export function escapeMarkdown(text: string): string {
  if (!text) return '';

  return text
    .replace(/\\/g, '\\\\')
    .replace(/\*/g, '\\*')
    .replace(/_/g, '\\_')
    .replace(/\[/g, '\\[')
    .replace(/\]/g, '\\]')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/`/g, '\\`')
    .replace(/#/g, '\\#')
    .replace(/>/g, '\\>');
}

/**
 * Convert plain text to basic markdown formatting.
 * Handles URL detection and basic paragraph formatting.
 *
 * @param text - The plain text to convert
 * @returns Text with basic markdown formatting
 */
export function textToMarkdown(text: string): string {
  if (!text) return '';

  // Convert URLs to markdown links
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  let result = text.replace(urlRegex, (url) => `[${url}](${url})`);

  // Normalize paragraph spacing
  result = result.replace(/\n{3,}/g, '\n\n');

  return result;
}

/**
 * Extract the first paragraph from markdown content.
 * Useful for generating previews or summaries.
 *
 * @param markdown - The markdown content
 * @returns The first paragraph as plain text
 */
export function extractFirstParagraph(markdown: string): string {
  if (!markdown) return '';

  // Split by double newlines and get first non-empty paragraph
  const paragraphs = markdown.split(/\n\n+/);
  const firstParagraph = paragraphs.find((p) => p.trim().length > 0) || '';

  // Strip markdown from the paragraph
  return stripMarkdown(firstParagraph);
}
