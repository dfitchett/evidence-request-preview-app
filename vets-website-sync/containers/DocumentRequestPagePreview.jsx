/**
 * Preview-friendly version of DocumentRequestPage
 *
 * This renders the same structure as the vets-website DocumentRequestPage
 * but without Redux, react-router, or other platform dependencies.
 *
 * Structure:
 * - Breadcrumbs (mocked)
 * - DefaultPage or Default5103EvidenceNotice
 * - NeedHelp
 */

import React from 'react';
import PropTypes from 'prop-types';

import DefaultPage from '../components/claim-document-request-pages/DefaultPage';
import Default5103EvidenceNotice from '../components/claim-document-request-pages/Default5103EvidenceNoticeMock';
import NeedHelp from '../components/NeedHelp';

// Check if this is an automated 5103 notice
const isAutomated5103Notice = displayName => {
  return displayName === 'Automated 5103 Notice Response';
};

export default function DocumentRequestPagePreview({
  trackedItem,
  onSubmit,
  onCancel,
  progress = 0,
  uploading = false,
  message = null,
  type1UnknownErrors = null,
  claimType = 'disability compensation',
}) {
  // Determine breadcrumb label based on status
  const statusLabel = trackedItem?.status === 'NEEDED_FROM_YOU'
    ? 'needed from you'
    : 'needed from others';

  const breadcrumbLabel = trackedItem?.friendlyName || trackedItem?.displayName || 'Document Request';

  return (
    <div>
      <div name="topScrollElement" />
      <div className="row">
        <div className="usa-width-two-thirds medium-8 columns">
          {/* Simplified breadcrumbs for preview */}
          <nav aria-label="Breadcrumb" className="va-nav-breadcrumbs vads-u-margin-bottom--2">
            <ul className="row va-nav-breadcrumbs-list columns">
              <li>
                <a href="#" onClick={e => e.preventDefault()}>
                  Your claims and appeals
                </a>
              </li>
              <li>
                <a href="#" onClick={e => e.preventDefault()}>
                  Status of your {claimType} claim
                </a>
              </li>
              <li>
                <a href="#" onClick={e => e.preventDefault()} aria-current="page">
                  {breadcrumbLabel}
                </a>
              </li>
            </ul>
          </nav>

          {/* Main content */}
          <div>
            {isAutomated5103Notice(trackedItem?.displayName) ? (
              <Default5103EvidenceNotice item={trackedItem} />
            ) : (
              <DefaultPage
                item={trackedItem}
                message={message}
                onCancel={onCancel}
                onSubmit={onSubmit}
                progress={progress}
                type1UnknownErrors={type1UnknownErrors}
                uploading={uploading}
              />
            )}
          </div>

          {/* Need Help section */}
          <NeedHelp item={trackedItem} />
        </div>
      </div>
    </div>
  );
}

DocumentRequestPagePreview.propTypes = {
  trackedItem: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  claimType: PropTypes.string,
  message: PropTypes.object,
  progress: PropTypes.number,
  type1UnknownErrors: PropTypes.array,
  uploading: PropTypes.bool,
};
