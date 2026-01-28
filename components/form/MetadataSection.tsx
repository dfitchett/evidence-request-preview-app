'use client';

import { EvidenceRequestFormData } from '@/lib/types';
import { FormSection } from './FormSection';

interface MetadataSectionProps {
  formData: EvidenceRequestFormData;
  onChange: (field: keyof EvidenceRequestFormData, value: unknown) => void;
}

export function MetadataSection({ formData, onChange }: MetadataSectionProps) {
  return (
    <FormSection
      title="Metadata"
      description="Additional context and resources for this evidence request."
    >
      <div>
        <label
          htmlFor="additionalContext"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Additional Context
        </label>
        <textarea
          id="additionalContext"
          value={formData.additionalContext}
          onChange={(e) => onChange('additionalContext', e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Any additional context or background information about this evidence request"
        />
        <p className="mt-1 text-xs text-gray-500">
          Background information or context for content editors
        </p>
      </div>

      <div>
        <label
          htmlFor="linksResources"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Links & Resources
        </label>
        <textarea
          id="linksResources"
          value={formData.linksResources}
          onChange={(e) => onChange('linksResources', e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Related links, documentation, or resources (one per line)&#10;https://va.gov/example&#10;https://va.gov/forms"
        />
        <p className="mt-1 text-xs text-gray-500">
          Related VA.gov pages, forms, or external resources
        </p>
      </div>
    </FormSection>
  );
}
