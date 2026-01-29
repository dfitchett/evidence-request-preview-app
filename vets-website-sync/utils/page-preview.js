/**
 * Page utilities for preview mode
 *
 * These are simplified versions of the vets-website page utilities.
 * They provide the same interface but work without platform dependencies.
 */

export function setFocus(selector) {
  if (typeof document === 'undefined') return;

  const el =
    typeof selector === 'string' ? document.querySelector(selector) : selector;
  if (el) {
    el.setAttribute('tabIndex', -1);
    el.focus();
  }
}

export function setPageFocus(selector = 'h1') {
  if (typeof document === 'undefined') return;

  const el = document.querySelector(selector);
  if (el) {
    el.scrollIntoView({ behavior: 'instant' });
    el.setAttribute('tabIndex', -1);
    el.focus();
  } else {
    setFocus('#main h1');
  }
}

export function setUpPage(scroll = true, focusSelector = 'h1') {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  if (scroll) {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
  const el = document.querySelector(focusSelector);
  if (el) {
    el.setAttribute('tabIndex', -1);
    el.focus();
  }
}

export function isTab(url) {
  return (
    url &&
    (url.endsWith('status') ||
      url.endsWith('files') ||
      url.endsWith('details') ||
      url.endsWith('overview'))
  );
}

export const focusNotificationAlert = () => {
  if (typeof document === 'undefined') return;

  const alert = document.querySelector('.claims-alert');
  if (alert) {
    // Focus headline to preserve SHIFT+TAB navigation to alert's interactive elements
    const headline = alert.querySelector('h2');
    if (headline) {
      setFocus(headline);
    } else {
      setFocus(alert);
    }
  }
};
