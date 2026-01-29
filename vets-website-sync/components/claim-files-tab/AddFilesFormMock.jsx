/**
 * Mock AddFilesForm for preview purposes
 *
 * This is a simplified version of the AddFilesForm component
 * that doesn't require all the platform dependencies.
 * It shows a placeholder file upload area for preview.
 */

import React from 'react';
import PropTypes from 'prop-types';

export default function AddFilesForm({
  progress,
  uploading,
  onCancel,
  onSubmit,
}) {
  return (
    <div className="add-files-form vads-u-margin-top--4">
      <h2 className="vads-u-margin-top--0 vads-u-margin-bottom--2">
        Upload your documents
      </h2>

      <div
        className="vads-u-padding--3 vads-u-background-color--gray-lightest vads-u-border--1px vads-u-border-color--gray-medium"
        style={{ borderStyle: 'dashed' }}
      >
        <p className="vads-u-margin--0 vads-u-text-align--center vads-u-color--gray-medium">
          <strong>[Preview Mode]</strong>
          <br />
          In the actual application, users can upload documents here.
        </p>
      </div>
    </div>
  );
}

AddFilesForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  progress: PropTypes.number,
  uploading: PropTypes.bool,
};
