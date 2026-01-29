/**
 * Stub for @department-of-veterans-affairs/platform-forms-system
 * These functions are stubbed for preview purposes.
 */

export const readAndCheckFile = async (file, checks) => {
  // Return empty results for preview
  const results = {};
  Object.keys(checks).forEach(key => {
    results[key] = false;
  });
  return results;
};

export const checkIsEncryptedPdf = () => false;
