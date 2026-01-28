'use client';

interface PreviewAlertProps {
  show: boolean;
}

/**
 * Renders the past due date warning alert
 * Only shown for first-party requests when the suspense date has passed
 * Matches the va-alert in DefaultPage.jsx
 */
export default function PreviewAlert({ show }: PreviewAlertProps) {
  if (!show) return null;

  return (
    <div className="va-alert va-alert--warning vads-u-margin-y--4">
      <div className="va-alert__body">
        <h2 className="va-alert__headline vads-u-margin-top--0 vads-u-margin-bottom--2">
          Deadline passed for requested information
        </h2>
        <p className="vads-u-margin-y--0">
          We haven&apos;t received the information we asked for. You can still
          send it, but we may review your claim without it.
        </p>
        <p>
          If you have questions, call the VA benefits hotline at{' '}
          <a href="tel:8008271000" className="va-telephone">
            800-827-1000
          </a>{' '}
          (
          <a href="tel:711" className="va-telephone">
            TTY: 711
          </a>
          ).
        </p>
      </div>
    </div>
  );
}
