'use client';

/**
 * Adapter component that wraps the DocumentRequestPage container from vets-website.
 *
 * This adapter:
 * 1. Maps form data from our app to the TrackedItem structure expected by DocumentRequestPage
 * 2. Injects form data into the evidenceDictionary so DefaultPage can find it
 * 3. Provides stub functions for actions not needed in preview mode
 * 4. Renders the full page structure including breadcrumbs and NeedHelp
 *
 * Usage:
 * ```tsx
 * import DefaultPageAdapter from '@/vets-website-sync/adapters/DefaultPageAdapter';
 *
 * <DefaultPageAdapter formData={formData} settings={settings} />
 * ```
 */

import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { subDays, format } from 'date-fns';
import { EvidenceRequestFormData, PreviewSettings } from '@/lib/types';

// Import the evidenceDictionary so we can inject our preview content
import { evidenceDictionary } from '../utils/evidenceDictionary';

// Import the preview-friendly DocumentRequestPage container
import DocumentRequestPagePreview from '../containers/DocumentRequestPagePreview';

interface DefaultPageAdapterProps {
  formData: EvidenceRequestFormData;
  settings: PreviewSettings;
}

/**
 * Convert markdown string to React elements for the evidenceDictionary
 */
function MarkdownContent({ content }: { content: string }) {
  if (!content) return null;

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ href, children }) => (
          <a href={href} className="va-link">
            {children}
          </a>
        ),
        ul: ({ children }) => <ul className="bullet-disc">{children}</ul>,
        ol: ({ children }) => (
          <ol style={{ paddingLeft: '1.5rem', listStyleType: 'decimal' }}>
            {children}
          </ol>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

/**
 * Transform our form data and settings into the TrackedItem structure
 * expected by the vets-website components.
 */
function transformToTrackedItem(
  formData: EvidenceRequestFormData,
  settings: PreviewSettings
) {
  // When simulatePastDue is true, set suspenseDate to yesterday so the alert shows
  const suspenseDate = settings.simulatePastDue
    ? format(subDays(new Date(), 1), 'yyyy-MM-dd')
    : settings.suspenseDate;

  return {
    id: 1,
    displayName: formData.displayName || 'preview_evidence_request',
    friendlyName: formData.friendlyName || null,
    description: formData.shortDescription || formData.activityDescription || '',
    status: settings.viewMode,
    suspenseDate,
    requestedDate: settings.requestedDate,
    canUploadFile: formData.canUploadFile,
    // Used by getDisplayFriendlyName() helper
    isProperNoun: formData.isProperNoun,
    // Support aliases for NeedHelp component
    supportAliases: formData.supportAliases || [],
    // Legacy field names that might be expected
    uploadsAllowed: formData.canUploadFile,
  };
}

/**
 * Inject our form data into the evidenceDictionary.
 * This allows DefaultPage to look up our preview content by displayName.
 */
function injectPreviewContent(formData: EvidenceRequestFormData) {
  const displayName = formData.displayName || 'preview_evidence_request';

  // Create the dictionary entry from form data
  const entry = {
    longDescription: formData.longDescriptionContent ? (
      <MarkdownContent content={formData.longDescriptionContent} />
    ) : null,
    nextSteps: formData.nextStepsContent ? (
      <MarkdownContent content={formData.nextStepsContent} />
    ) : null,
    noActionNeeded: formData.noActionNeeded,
    isDBQ: formData.isDBQ,
    isSensitive: formData.isSensitive,
    isProperNoun: formData.isProperNoun,
    noProvidePrefix: formData.noProvidePrefix,
  };

  // Inject into the dictionary (mutating for simplicity in preview)
  // @ts-expect-error - evidenceDictionary may be typed as readonly
  evidenceDictionary[displayName] = entry;

  return displayName;
}

export default function DefaultPageAdapter({
  formData,
  settings,
}: DefaultPageAdapterProps) {
  // Inject preview content into evidenceDictionary before rendering
  const displayName = useMemo(() => {
    return injectPreviewContent(formData);
  }, [formData]);

  // Transform form data to TrackedItem structure
  const trackedItem = useMemo(() => {
    const item = transformToTrackedItem(formData, settings);
    // Ensure displayName matches what we injected
    item.displayName = displayName;
    return item;
  }, [formData, settings, displayName]);

  // Stub functions for preview mode
  const handleSubmit = (files: File[]) => {
    console.log('Preview mode: Submit files', files);
  };

  const handleCancel = () => {
    console.log('Preview mode: Cancel upload');
  };

  // Render the DocumentRequestPage container with the full page structure
  return (
    <DocumentRequestPagePreview
      trackedItem={trackedItem}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      progress={0}
      uploading={false}
      message={null}
      type1UnknownErrors={null}
      claimType="disability compensation"
    />
  );
}
