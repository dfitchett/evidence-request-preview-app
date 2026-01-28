'use client';

interface PreviewThirdPartyNoticeProps {
  show: boolean;
  noActionNeeded: boolean;
}

/**
 * Renders the notice shown for third-party requests
 * "This is just a notice. No action is needed by you."
 * Conditionally shows optional upload text based on noActionNeeded flag
 */
export default function PreviewThirdPartyNotice({
  show,
  noActionNeeded,
}: PreviewThirdPartyNoticeProps) {
  if (!show) return null;

  return (
    <div className="optional-upload">
      <p className="vads-u-margin-y--2">
        <strong>This is just a notice. No action is needed by you.</strong>
        {!noActionNeeded && (
          <>
            {' '}
            But, if you have documents related to this request, uploading
            them on this page may help speed up the evidence review for your
            claim.
          </>
        )}
      </p>
    </div>
  );
}
