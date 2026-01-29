'use client';

import { useEffect } from 'react';

/**
 * Initializes VA Design System web components on the client side.
 * This must be a client component because defineCustomElements only works in the browser.
 */
export function WebComponentsInit() {
  useEffect(() => {
    // Dynamically import and initialize web components from the loader
    import('@department-of-veterans-affairs/web-components/loader')
      .then(({ defineCustomElements }) => {
        defineCustomElements();
      })
      .catch((error) => {
        console.warn('Failed to initialize VA web components:', error);
      });
  }, []);

  return null;
}

export default WebComponentsInit;
