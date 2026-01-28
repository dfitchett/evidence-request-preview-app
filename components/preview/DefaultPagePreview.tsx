'use client';

import { EvidenceRequestFormData, PreviewSettings } from '@/lib/types';
import { formatDate, isPastDue } from '@/lib/helpers';
import PreviewHeader from './PreviewHeader';
import PreviewAlert from './PreviewAlert';
import PreviewDescription from './PreviewDescription';
import PreviewNextSteps from './PreviewNextSteps';
import PreviewThirdPartyNotice from './PreviewThirdPartyNotice';
import MockUploadForm from './MockUploadForm';
import NeedHelpPreview from './NeedHelpPreview';

interface DefaultPagePreviewProps {
  formData: EvidenceRequestFormData;
  settings: PreviewSettings;
}

/**
 * Main preview container that assembles all preview components.
 * Replicates the rendering logic from DefaultPage.jsx in vets-website.
 */
export default function DefaultPagePreview({
  formData,
  settings,
}: DefaultPagePreviewProps) {
  // Determine request type
  const isFirstParty = settings.viewMode === 'NEEDED_FROM_YOU';
  const isThirdParty = settings.viewMode === 'NEEDED_FROM_OTHERS';

  // Check if past due date (for first-party warning alert)
  const pastDueDate = isPastDue(settings.suspenseDate, settings.simulatePastDue);

  // Check for content overrides (equivalent to evidenceDictionary lookup)
  const hasFrontendContentOverride = Boolean(
    formData.longDescriptionContent || formData.nextStepsContent
  );

  // Description content (priority: longDescriptionContent > shortDescription)
  const frontendDescription = formData.longDescriptionContent || null;
  const apiDescription = formData.shortDescription || null;

  // Next steps content
  const frontendNextSteps = formData.nextStepsContent || null;

  // Whether we have any description to show
  const hasDescription = Boolean(frontendDescription || apiDescription);

  return (
    <div id="default-page" className="vads-u-margin-y--3" style={{ maxWidth: '648px', margin: '0 auto' }}>
      {/* Header section with title and request text */}
      <PreviewHeader formData={formData} settings={settings} />

      {/* Past due date warning alert (first-party only) */}
      {isFirstParty && (
        <>
          {pastDueDate ? (
            <PreviewAlert show={true} />
          ) : (
            // Show "We requested this evidence" text when no friendlyName and not past due
            !formData.friendlyName && (
              <div className="vads-u-margin-top--4 vads-u-margin-bottom--2">
                <p>
                  We requested this evidence from you on{' '}
                  {formatDate(settings.requestedDate)}. You can still send the
                  evidence after the &quot;respond by&quot; date, but it may delay your
                  claim.
                </p>
              </div>
            )
          )}
        </>
      )}

      {/* What we need from you / What we're notifying you about section */}
      <PreviewDescription
        frontendDescription={frontendDescription}
        apiDescription={apiDescription}
        isFirstParty={isFirstParty}
      />

      {/* Third-party notice */}
      <PreviewThirdPartyNotice
        show={isThirdParty}
        noActionNeeded={formData.noActionNeeded}
      />

      {/* Learn about this request in your claim letter (first-party with content override) */}
      {isFirstParty && hasFrontendContentOverride && (
        <div
          className="vads-u-margin-y--4"
          data-testid="learn-about-request-section"
        >
          <h3 className="vads-u-margin-top--0 vads-u-margin-bottom--2">
            Learn about this request in your claim letter
          </h3>
          <p className="vads-u-margin-y--2">
            On {formatDate(settings.requestedDate)}, we mailed you a letter
            titled &quot;Request for Specific Evidence or Information,&quot; which may
            include more details about this request.
          </p>
          <p className="vads-u-margin-top--2 vads-u-margin-bottom--0">
            You can access this and all your claim letters online.
          </p>
          <a
            href="/track-claims/your-claim-letters"
            className="va-link va-link--active"
          >
            Access your claim letters
          </a>
        </div>
      )}

      {/* Next steps section */}
      <PreviewNextSteps
        frontendNextSteps={frontendNextSteps}
        hasDescription={hasDescription}
        isFirstParty={isFirstParty}
      />

      {/* Mock upload form (when canUploadFile is true) */}
      <MockUploadForm show={formData.canUploadFile} />

      {/* Need Help section */}
      <NeedHelpPreview formData={formData} />
    </div>
  );
}
