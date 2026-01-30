/**
 * Stub for @department-of-veterans-affairs/platform-utilities/data/titleCase
 *
 * Converts a string to title case.
 */

export default function titleCase(str) {
  if (!str || typeof str !== 'string') return '';

  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
