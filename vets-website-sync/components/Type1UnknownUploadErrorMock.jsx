/**
 * Mock Type1UnknownUploadError for preview purposes
 *
 * This component is used to display upload errors, which won't occur
 * in preview mode. This mock satisfies the import without router dependencies.
 */

import PropTypes from 'prop-types';
import React from 'react';

export default function Type1UnknownUploadError({ errorFiles }) {
  if (!errorFiles || errorFiles.length === 0) {
    return null;
  }

  const fileText = errorFiles.length === 1 ? 'File' : 'Files';

  return (
    <>
      <p className="vads-u-margin-top--0">
        We're sorry. There was a problem with our system, and we couldn't
        process the files you tried to submit. You can submit these files by
        mail or in person instead.
      </p>
      <p className="vads-u-margin-bottom--0">
        <strong>{fileText} we couldn't process:</strong>
      </p>
      <ul className="vads-u-margin-y--2">
        {errorFiles.map(file => (
          <li key={file.fileName}>
            <strong>{file.fileName}</strong>
            <br />
            File type: {file.docType || 'Unknown'}
          </li>
        ))}
      </ul>
      <p className="vads-u-color--gray-medium">
        [Preview Mode: Navigation links disabled]
      </p>
    </>
  );
}

Type1UnknownUploadError.propTypes = {
  errorFiles: PropTypes.arrayOf(
    PropTypes.shape({
      fileName: PropTypes.string.isRequired,
      docType: PropTypes.string,
    }),
  ),
};
