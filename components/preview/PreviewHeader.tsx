'use client';

import { formatDate, getDisplayFriendlyName } from '@/lib/helpers';
import { EvidenceRequestFormData, PreviewSettings } from '@/lib/types';

interface PreviewHeaderProps {
  formData: EvidenceRequestFormData;
  settings: PreviewSettings;
}

export default function PreviewHeader({
  formData,
  settings,
}: PreviewHeaderProps) {
  const isFirstParty = settings.viewMode === 'NEEDED_FROM_YOU';

  const { displayName, friendlyName, isDBQ, isSensitive, isProperNoun } = formData;

  /**
   * Get the display name for third-party requests
   * Matches DefaultPage.jsx getItemDisplayName()
   */
  const getItemDisplayName = (): string => {
    // Check if displayName contains 'dbq' or isDBQ flag is set
    if (displayName.toLowerCase().includes('dbq') || isDBQ) {
      return 'Request for an exam';
    }
    if (friendlyName) {
      return `Your ${getDisplayFriendlyName(friendlyName, isProperNoun)}`;
    }
    return 'Request for evidence outside VA';
  };

  /**
   * Get the display name for first-party requests
   * Matches DefaultPage.jsx getFirstPartyDisplayName()
   */
  const getFirstPartyDisplayName = (): string => {
    if (isSensitive) {
      return 'Request for evidence';
    }
    return friendlyName || 'Request for evidence';
  };

  /**
   * Get the request text for first-party requests
   * Matches DefaultPage.jsx getFirstPartyRequestText()
   */
  const getFirstPartyRequestText = (): string => {
    const formattedDate = formatDate(settings.suspenseDate);

    if (friendlyName && isSensitive) {
      return `Respond by ${formattedDate} for: ${getDisplayFriendlyName(friendlyName, isProperNoun)}`;
    }
    if (friendlyName) {
      return `Respond by ${formattedDate}`;
    }
    return `Respond by ${formattedDate} for: ${displayName}`;
  };

  /**
   * Get the request text for third-party requests
   * Matches DefaultPage.jsx getRequestText()
   */
  const getRequestText = (): string => {
    const formattedDate = formatDate(settings.requestedDate);

    if (isDBQ) {
      return `We made a request on ${formattedDate} for: ${
        friendlyName
          ? getDisplayFriendlyName(friendlyName, isProperNoun)
          : displayName
      }`;
    }
    if (friendlyName) {
      return `We made a request outside VA on ${formattedDate}`;
    }
    return `We made a request outside VA on ${formattedDate} for: ${displayName}`;
  };

  return (
    <div className="vads-u-margin-bottom--4">
      <h1 className="claims-header">
        {isFirstParty ? (
          <>
            {getFirstPartyDisplayName()}
            <span className="vads-u-font-family--sans vads-u-margin-top--0p5">
              {getFirstPartyRequestText()}
            </span>
          </>
        ) : (
          <>
            {getItemDisplayName()}
            <span className="vads-u-font-family--sans vads-u-margin-top--1">
              {getRequestText()}
            </span>
          </>
        )}
      </h1>
    </div>
  );
}
