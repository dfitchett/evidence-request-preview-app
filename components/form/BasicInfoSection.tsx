'use client';

import { EvidenceRequestFormData } from '@/lib/types';
import { FormSection } from './FormSection';

interface BasicInfoSectionProps {
  formData: EvidenceRequestFormData;
  onChange: (field: keyof EvidenceRequestFormData, value: unknown) => void;
}

export function BasicInfoSection({ formData, onChange }: BasicInfoSectionProps) {
  const handleAliasesChange = (value: string) => {
    const aliases = value.split('\n').filter((line) => line.trim() !== '');
    onChange('supportAliases', aliases);
  };

  return (
    <FormSection title="Basic Information">
      <div>
        <label
          htmlFor="displayName"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Display Name (API Key) <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          id="displayName"
          value={formData.displayName}
          onChange={(e) => onChange('displayName', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="e.g., request_for_medical_records"
          required
        />
        <p className="text-xs text-gray-500">
          This is the unique identifier used in the API
        </p>
      </div>

      <div>
        <label
          htmlFor="friendlyName"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Friendly Name <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          id="friendlyName"
          value={formData.friendlyName}
          onChange={(e) => onChange('friendlyName', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="e.g., Request for Medical Records"
          required
        />
        <p className="mt-1 text-xs text-gray-500">
          Human-readable name displayed to users
        </p>
      </div>

      <div>
        <label
          htmlFor="supportAliases"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Support Aliases
        </label>
        <textarea
          id="supportAliases"
          value={formData.supportAliases.join('\n')}
          onChange={(e) => handleAliasesChange(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter one alias per line"
        />
        <p className="mt-1 text-xs text-gray-500">
          Alternative names that map to this evidence request (one per line)
        </p>
      </div>
    </FormSection>
  );
}
