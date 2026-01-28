'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface PreviewDescriptionProps {
  frontendDescription: string | null;
  apiDescription: string | null;
  isFirstParty: boolean;
}

/**
 * Renders the "What we need from you" or "What we're notifying you about" section
 * Displays content in this priority order:
 * 1. frontendDescription (from evidenceDictionary / longDescriptionContent)
 * 2. apiDescription (from API description field)
 * 3. Empty state with link to claim letters (first-party only)
 */
export default function PreviewDescription({
  frontendDescription,
  apiDescription,
  isFirstParty,
}: PreviewDescriptionProps) {
  const sectionTitle = isFirstParty
    ? 'What we need from you'
    : "What we're notifying you about";

  const renderContent = () => {
    // Priority 1: Frontend description from form (markdown rendered)
    if (frontendDescription) {
      return (
        <div
          className="vads-u-margin-bottom--4 markdown-content"
          data-testid="frontend-description"
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              a: ({ href, children }) => (
                <a href={href} className="va-link">
                  {children}
                </a>
              ),
              ul: ({ children }) => (
                <ul className="bullet-disc">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol style={{ paddingLeft: '1.5rem', listStyleType: 'decimal' }}>{children}</ol>
              ),
            }}
          >
            {frontendDescription}
          </ReactMarkdown>
        </div>
      );
    }

    // Priority 2: API description (markdown rendered)
    if (apiDescription) {
      return (
        <div
          className="vads-u-margin-bottom--4 markdown-content"
          data-testid="api-description"
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              a: ({ href, children }) => (
                <a href={href} className="va-link">
                  {children}
                </a>
              ),
              ul: ({ children }) => (
                <ul className="bullet-disc">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol style={{ paddingLeft: '1.5rem', listStyleType: 'decimal' }}>{children}</ol>
              ),
            }}
          >
            {apiDescription}
          </ReactMarkdown>
        </div>
      );
    }

    // Priority 3: Empty state (first-party only)
    if (isFirstParty) {
      return (
        <div
          className="vads-u-margin-bottom--4"
          data-testid="empty-state-description"
        >
          <p>
            We&apos;re unable to provide more information about the request on this
            page. To learn more about it, review your claim letter.
          </p>
          <a
            href="/track-claims/your-claim-letters"
            className="va-link va-link--active"
          >
            Access your claim letters
          </a>
        </div>
      );
    }

    // Third-party with no description shows nothing
    return null;
  };

  return (
    <>
      <h2 className="vads-u-margin-top--2 vads-u-margin-bottom--2">
        {sectionTitle}
      </h2>
      {renderContent()}
    </>
  );
}
