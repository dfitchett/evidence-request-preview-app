/**
 * Stub for vets-website constants
 * These are claim-related constants used in the claims-status app.
 * For the preview app, we provide minimal stubs for the values used by helpers.js.
 */

export const ANCHOR_LINKS = {
  filesReceived: 'files-received',
  documentsFiled: 'documents-filed',
};

export const DATE_FORMATS = {
  LONG_DATE: 'MMMM d, yyyy',
  SHORT_DATE: 'MM/dd/yyyy',
};

// Claim type codes - empty arrays for preview (not used in preview functionality)
export const disabilityCompensationClaimTypeCodes = [];
export const pensionClaimTypeCodes = [];
export const addOrRemoveDependentClaimTypeCodes = [];
export const survivorsPensionClaimTypeCodes = [];
export const DICClaimTypeCodes = [];
export const veteransPensionClaimTypeCodes = [];

// Standard 5103 item
export const standard5103Item = {
  displayName: '5103 Evidence Reminder',
};
