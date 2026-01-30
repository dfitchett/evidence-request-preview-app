/**
 * Stub for @department-of-veterans-affairs/platform-utilities/api
 *
 * In vets-website, this provides authenticated API request utilities.
 * For the preview app, we provide a no-op implementation.
 */

export function apiRequest(url, options) {
  console.warn('[platform-stub] apiRequest called but not implemented in preview mode:', url);
  return Promise.reject(new Error('API requests not available in preview mode'));
}

export default { apiRequest };
