/**
 * Stub for @department-of-veterans-affairs/platform-utilities/scroll
 *
 * In vets-website, this provides scroll and focus utilities.
 * For the preview app, we provide basic implementations.
 */

export function scrollToTop(options = {}) {
  if (typeof window !== 'undefined') {
    window.scrollTo({
      top: 0,
      behavior: options.behavior || 'smooth',
    });
  }
}

export function scrollAndFocus(element, options = {}) {
  if (typeof window === 'undefined' || !element) return;

  element.scrollIntoView({
    behavior: options.behavior || 'smooth',
    block: 'start',
  });

  // Set focus after scroll
  if (element.setAttribute) {
    element.setAttribute('tabindex', '-1');
  }
  if (element.focus) {
    element.focus({ preventScroll: true });
  }
}

export function scrollTo(element, options = {}) {
  if (typeof window === 'undefined' || !element) return;

  element.scrollIntoView({
    behavior: options.behavior || 'smooth',
    block: 'start',
  });
}

export default { scrollToTop, scrollAndFocus, scrollTo };
