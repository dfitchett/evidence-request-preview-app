/**
 * Stub for @department-of-veterans-affairs/platform-utilities/environment
 *
 * In vets-website, this provides environment-specific configuration.
 * For the preview app, we provide minimal defaults.
 */

const environment = {
  API_URL: '',
  BASE_URL: '',
  isProduction: () => false,
  isLocalhost: () => true,
};

export default environment;
