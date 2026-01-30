/**
 * Preview-friendly version of Default5103EvidenceNotice
 *
 * This renders the same UI as the vets-website component
 * but without Redux, react-router, or other platform dependencies.
 */

import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  VaCheckbox,
  VaButton,
} from '@department-of-veterans-affairs/component-library/dist/react-bindings';
import { buildDateFormatter } from '../../utils/helpers';

// Check functions for 5103 notices
const isStandard5103Notice = displayName => {
  return displayName === '5103 Notice Response' || displayName === 'standard_5103_notice';
};

const isAutomated5103Notice = displayName => {
  return displayName === 'Automated 5103 Notice Response';
};

const is5103Notice = displayName => {
  return isAutomated5103Notice(displayName) || isStandard5103Notice(displayName);
};

export default function Default5103EvidenceNotice({ item }) {
  const [addedEvidence, setAddedEvidence] = useState(false);
  const [checkboxErrorMessage, setCheckboxErrorMessage] = useState(undefined);

  const dateFormatter = buildDateFormatter();

  if (!is5103Notice(item?.displayName)) {
    return null;
  }

  const handleSubmit = () => {
    if (addedEvidence) {
      console.log('Preview mode: Submit 5103 evidence waiver');
      // In preview, just log the action
    } else {
      setCheckboxErrorMessage(
        `You must confirm you're done adding evidence before submitting the evidence waiver`,
      );
    }
  };

  return (
    <div id="default-5103-notice-page" className="vads-u-margin-bottom--3">
      <h1 className="vads-u-margin-top--0 vads-u-margin-bottom--2">
        Review evidence list (5103 notice)
      </h1>
      {isStandard5103Notice(item.displayName) ? (
        <p>
          We sent you a "List of evidence we may need (5103 notice)" letter.
          This letter lets you know about different types of additional evidence
          that could help your claim.
        </p>
      ) : (
        <p>
          On <strong>{dateFormatter(item.requestedDate)}</strong>, we sent you a
          "List of evidence we may need (5103 notice)" letter. This letter lets
          you know about different types of additional evidence that could help
          your claim.
        </p>
      )}
      <h2>Read your 5103 notice letter</h2>
      <p>
        You can read your "List of evidence we may need (5103 notice)" letter on
        the claim letters page.
      </p>
      <a className="active-va-link" href="/your-claim-letters" onClick={e => e.preventDefault()}>
        Find this letter on the claim letters page
        <va-icon icon="chevron_right" size={3} aria-hidden="true" />
      </a>
      <h2 className="vads-u-margin-top--4 vads-u-margin-bottom--2">
        Submit additional evidence, if applicable
      </h2>
      <p>
        If you'd like to submit additional evidence based on information in your
        "List of evidence we may need (5103 notice)" letter, you can submit that
        evidence here.
      </p>
      <a
        className="active-va-link"
        data-testid="upload-evidence-link"
        href="../files#add-files"
        onClick={e => e.preventDefault()}
      >
        Upload additional evidence
        <va-icon icon="chevron_right" size={3} aria-hidden="true" />
      </a>
      <h2 className="vads-u-margin-top--4 vads-u-margin-bottom--2">
        Submit an evidence waiver
      </h2>
      <p>
        Submitting this waiver will let VA know that as of now, you're done
        submitting additional evidence. This allows your claim to move into the
        review stage as quickly as possible.
      </p>
      <p>
        {' '}
        <strong>Note:</strong> You can add evidence to support your claim at any
        time. However, if you add evidence later, your claim will move back to
        this step, so we encourage you to add all your evidence now.
      </p>
      <VaCheckbox
        label="As of now, I'm finished adding evidence to support my claim"
        className="vads-u-margin-y--3"
        checked={addedEvidence}
        error={checkboxErrorMessage}
        required
        onVaChange={event => {
          setAddedEvidence(event.detail.checked);
          if (event.detail.checked) {
            setCheckboxErrorMessage(undefined);
          }
        }}
      />
      <VaButton
        id="submit"
        text="Submit evidence waiver"
        onClick={handleSubmit}
      />

      {isAutomated5103Notice(item.displayName) && (
        <p data-testid="due-date-information">
          <strong>Note:</strong> If you don't submit the evidence waiver, we'll
          wait for you to add evidence until{' '}
          <strong>{dateFormatter(item.suspenseDate)}</strong>. Then we'll
          continue processing your claim.
        </p>
      )}
    </div>
  );
}

Default5103EvidenceNotice.propTypes = {
  item: PropTypes.object,
};
