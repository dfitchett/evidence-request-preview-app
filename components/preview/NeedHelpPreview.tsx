'use client';

import { EvidenceRequestFormData } from '@/lib/types';
import { getDisplayFriendlyName } from '@/lib/helpers';

interface NeedHelpPreviewProps {
  formData: EvidenceRequestFormData;
}

export function NeedHelpPreview({ formData }: NeedHelpPreviewProps) {
  const { friendlyName, supportAliases, isProperNoun } = formData;

  const displayFriendlyName = friendlyName
    ? getDisplayFriendlyName(friendlyName, isProperNoun)
    : 'this request';

  const renderAliases = () => {
    if (!supportAliases || supportAliases.length === 0) return null;

    return supportAliases.map((name, index) => {
      let separator = null;
      let displayName = name;

      if (index === supportAliases.length - 1) {
        displayName = `${name}.`;
      } else if (index === supportAliases.length - 2) {
        separator = ' or ';
      } else if (index < supportAliases.length - 2 && index >= 0) {
        separator = ', ';
      }

      return (
        <span key={index}>
          <span className="vads-u-font-weight--bold">&quot;{displayName}&quot;</span>
          {separator}
        </span>
      );
    });
  };

  const aliases = renderAliases();

  return (
    <div className="va-need-help vads-u-margin-top--4">
      <h2 className="vads-u-margin-top--0 vads-u-margin-bottom--2 vads-u-font-size--h3">
        Need help?
      </h2>
      <div>
        <p>
          Call the VA benefits hotline at{' '}
          <a href="tel:+18008271000" className="va-telephone">
            800-827-1000
          </a>
          . We&apos;re here Monday through Friday, 8:00 a.m. to 9:00 p.m. ET. If you
          have hearing loss,{' '}
          <a href="tel:711" className="va-telephone">
            TTY: 711
          </a>
          .
        </p>
        {aliases && (
          <p>
            The VA benefits hotline may refer to the &quot;{displayFriendlyName}&quot; request
            as {aliases}
          </p>
        )}
      </div>
    </div>
  );
}

export default NeedHelpPreview;
