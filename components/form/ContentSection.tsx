'use client';

import { EvidenceRequestFormData } from '@/lib/types';
import { FormSection } from './FormSection';

interface ContentSectionProps {
  formData: EvidenceRequestFormData;
  onChange: (field: keyof EvidenceRequestFormData, value: unknown) => void;
}

export function ContentSection({ formData, onChange }: ContentSectionProps) {
  return (
    <FormSection
      title="Content"
      description="Main content displayed to Veterans. Supports Markdown formatting."
    >
      <div>
        <label
          htmlFor="shortDescription"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Short Description
        </label>
        <input
          type="text"
          id="shortDescription"
          value={formData.shortDescription}
          onChange={(e) => onChange('shortDescription', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Brief summary of this evidence request"
        />
        <p className="mt-1 text-xs text-gray-500">
          A brief summary shown in compact views
        </p>
      </div>

      <div>
        <label
          htmlFor="activityDescription"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Activity Description
        </label>
        <textarea
          id="activityDescription"
          value={formData.activityDescription}
          onChange={(e) => onChange('activityDescription', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Describe what action the Veteran needs to take"
        />
        <p className="mt-1 text-xs text-gray-500">
          Describes what activity or action is requested
        </p>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <label
          htmlFor="longDescriptionContent"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Long Description Content
        </label>
        <textarea
          id="longDescriptionContent"
          value={formData.longDescriptionContent}
          onChange={(e) => onChange('longDescriptionContent', e.target.value)}
          rows={6}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
          placeholder="## What this means&#10;&#10;Describe what this evidence request means for the Veteran...&#10;&#10;- Item 1&#10;- Item 2"
        />
        <p className="mt-1 text-xs text-gray-500">
          Supports Markdown: **bold**, *italic*, [links](url), bullet lists, etc.
        </p>
      </div>

      <div>
        <label
          htmlFor="longDescriptionNotes"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Long Description Notes
        </label>
        <textarea
          id="longDescriptionNotes"
          value={formData.longDescriptionNotes}
          onChange={(e) => onChange('longDescriptionNotes', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Internal notes about this description (not shown to users)"
        />
        <p className="mt-1 text-xs text-gray-500">
          Internal notes for content editors (not displayed to Veterans)
        </p>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <label
          htmlFor="nextStepsContent"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Next Steps Content
        </label>
        <textarea
          id="nextStepsContent"
          value={formData.nextStepsContent}
          onChange={(e) => onChange('nextStepsContent', e.target.value)}
          rows={6}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
          placeholder="## What you can do&#10;&#10;1. First step&#10;2. Second step&#10;3. Third step"
        />
        <p className="mt-1 text-xs text-gray-500">
          Supports Markdown: numbered lists, links, formatting, etc.
        </p>
      </div>

      <div>
        <label
          htmlFor="nextStepsNotes"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Next Steps Notes
        </label>
        <textarea
          id="nextStepsNotes"
          value={formData.nextStepsNotes}
          onChange={(e) => onChange('nextStepsNotes', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Internal notes about these next steps (not shown to users)"
        />
        <p className="mt-1 text-xs text-gray-500">
          Internal notes for content editors (not displayed to Veterans)
        </p>
      </div>
    </FormSection>
  );
}
