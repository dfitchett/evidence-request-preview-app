'use client';

import { EvidenceRequestFormData } from '@/lib/types';
import { FormSection } from './FormSection';

interface DescriptionSectionProps {
  formData: EvidenceRequestFormData;
  onChange: (field: keyof EvidenceRequestFormData, value: unknown) => void;
}

export function DescriptionSection({
  formData,
  onChange,
}: DescriptionSectionProps) {
  return (
    <FormSection title="Description">
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
    </FormSection>
  );
}
