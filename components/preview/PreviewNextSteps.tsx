'use client';

import { createMarkup } from '@/lib/helpers';

interface PreviewNextStepsProps {
  frontendNextSteps: string | null;
  hasDescription: boolean;
  isFirstParty: boolean;
}

/**
 * Renders the "Next steps" section
 * - Shows custom frontendNextSteps if provided
 * - Otherwise shows generic first-party next steps with bullet list
 * - Third-party requests without custom next steps show nothing
 */
export default function PreviewNextSteps({
  frontendNextSteps,
  hasDescription,
  isFirstParty,
}: PreviewNextStepsProps) {
  // Custom next steps from the form
  if (frontendNextSteps) {
    return (
      <div className="vads-u-margin-y--4">
        <h2 className="vads-u-margin-top--0 vads-u-margin-bottom--2">
          Next steps
        </h2>
        <div
          data-testid="frontend-next-steps"
          dangerouslySetInnerHTML={createMarkup(frontendNextSteps)}
        />
      </div>
    );
  }

  // Generic next steps for first-party requests without custom next steps
  if (isFirstParty) {
    return (
      <div className="vads-u-margin-y--4">
        <h2 className="vads-u-margin-top--0 vads-u-margin-bottom--2">
          Next steps
        </h2>
        <p>To respond to this request:</p>
        <ul className="bullet-disc">
          {hasDescription ? (
            <li data-testid="next-steps-in-what-we-need-from-you">
              Gather and submit any documents or forms listed in the{' '}
              <strong>What we need from you</strong> section
            </li>
          ) : (
            <li data-testid="next-steps-in-claim-letter">
              Gather and submit any documents or forms listed in the claim
              letter
            </li>
          )}
          <li>You can upload documents online or mail them to us</li>
        </ul>
        {hasDescription && (
          <p>
            If you need help understanding this request, check your claim
            letter online.
            <br />
            <a
              href="/track-claims/your-claim-letters"
              className="va-link va-link--active"
            >
              Access your claim letters
            </a>
          </p>
        )}
        <p>
          You can find blank copies of many VA forms online.
          <br />
          <a href="/find-forms" className="va-link va-link--active">
            Find a VA form
          </a>
        </p>
      </div>
    );
  }

  // Third-party requests without custom next steps show nothing
  return null;
}
