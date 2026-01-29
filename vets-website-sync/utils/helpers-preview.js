/**
 * Minimal helpers for preview mode
 *
 * This file contains only the helper functions needed by DefaultPage,
 * without the platform dependencies that don't work in Next.js.
 *
 * Functions included:
 * - formatDescription
 * - buildDateFormatter
 * - getDisplayFriendlyName
 */

import React from 'react';
import { format, isValid, parseISO } from 'date-fns';
import { evidenceDictionary } from './evidenceDictionary';

// Date format constant
const DATE_FORMATS = {
  LONG_DATE: 'MMMM d, yyyy',
};

/**
 * Formats description text from VBMS/vets-api by converting special formatting codes
 * to React elements:
 * - \n → separate paragraphs (<p>) for text-only content
 * - [*] or {*} → unordered list items (<ul><li>)
 * - {b}...{/b} → bold text (<strong>)
 *
 * @param {string} text - The raw description text from the API
 * @returns {React.ReactNode} - Formatted React elements, or null if no text
 */
export function formatDescription(text) {
  if (!text || typeof text !== 'string') return null;

  const trimmedText = text.trim();
  if (!trimmedText) return null;

  // Normalize inline list markers by inserting a newline before any [*] or {*}
  // that doesn't already have one (handles cases where markers appear mid-line)
  const normalizedText = trimmedText.replace(
    /(?<!^)(?<!\n)(\[\*\]|\{\*\})/g,
    '\n$1',
  );

  // Helper to process bold tags within a text segment
  const processBoldTags = (segment, keyPrefix) => {
    const boldPattern = /\{b\}([\s\S]*?)\{\/b\}/g;
    const parts = [];
    let lastIndex = 0;
    let match;
    let partIndex = 0;

    // eslint-disable-next-line no-cond-assign
    while ((match = boldPattern.exec(segment)) !== null) {
      if (match.index > lastIndex) {
        parts.push(segment.slice(lastIndex, match.index));
      }
      parts.push(
        <strong key={`${keyPrefix}-bold-${partIndex}`}>{match[1]}</strong>,
      );
      lastIndex = match.index + match[0].length;
      partIndex += 1;
    }

    if (lastIndex < segment.length) {
      parts.push(segment.slice(lastIndex));
    }

    return parts.length > 0 ? parts : [segment];
  };

  // Helper to add regular text line to paragraph content
  const addTextLine = (content, line, lineIndex) => {
    if (content.length > 0) {
      content.push(<br key={`br-${lineIndex}`} />);
    }
    content.push(...processBoldTags(line, `line-${lineIndex}`));
  };

  // Split text into lines for processing
  const lines = normalizedText.split('\n');

  // Check if we have list items
  const listItemPattern = /^[\s]*(?:\[\*\]|\{\*\})[\s]*/;
  const hasListItems = lines.some(line => listItemPattern.test(line));

  // Unified processing approach
  const result = [];
  let currentListItems = [];
  let paragraphContent = [];
  let elementIndex = 0;

  const flushParagraph = () => {
    if (paragraphContent.length > 0) {
      result.push(<p key={`p-${elementIndex}`}>{paragraphContent}</p>);
      paragraphContent = [];
      elementIndex += 1;
    }
  };

  const flushList = () => {
    if (currentListItems.length > 0) {
      result.push(<ul key={`ul-${elementIndex}`}>{currentListItems}</ul>);
      currentListItems = [];
      elementIndex += 1;
    }
  };

  lines.forEach((line, lineIndex) => {
    if (listItemPattern.test(line)) {
      // This is a list item
      flushParagraph();
      const itemText = line.replace(listItemPattern, '').trim();
      currentListItems.push(
        <li key={`li-${lineIndex}`}>
          {processBoldTags(itemText, `li-${lineIndex}`)}
        </li>,
      );
    } else if (line.trim() === '' && hasListItems) {
      // Empty line - only flush when we have lists (otherwise ignore)
      flushList();
      flushParagraph();
    } else if (line.trim() !== '') {
      // Regular text line
      flushList();
      addTextLine(paragraphContent, line, lineIndex);
      // When there are no list items, each line gets its own paragraph
      if (!hasListItems) {
        flushParagraph();
      }
    }
  });

  // Flush any remaining content
  flushList();
  flushParagraph();

  // Return single paragraph or array of elements
  return result.length === 1 ? result[0] : result;
}

/**
 * Takes a format string and returns a function that formats the given date
 * `date` must be in ISO format ex. 2020-01-28
 */
export const buildDateFormatter = (formatString = DATE_FORMATS.LONG_DATE) => {
  return date => {
    const parsedDate = parseISO(date);

    return isValid(parsedDate)
      ? format(parsedDate, formatString)
      : 'Invalid date';
  };
};

/**
 * Get the display-friendly name for a tracked item.
 * If the item is not a proper noun, lowercase the first character.
 */
export const getDisplayFriendlyName = item => {
  if (!evidenceDictionary[item.displayName]?.isProperNoun) {
    let updatedFriendlyName = item.friendlyName;
    updatedFriendlyName =
      updatedFriendlyName.charAt(0).toLowerCase() +
      updatedFriendlyName.slice(1);
    return updatedFriendlyName;
  }
  return item.friendlyName;
};
