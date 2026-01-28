'use client';

import { EvidenceRequestFormData } from '@/lib/types';
import { INITIAL_FORM_DATA } from '@/lib/constants';
import { BasicInfoSection } from './BasicInfoSection';
import { DescriptionSection } from './DescriptionSection';
import { FlagsSection } from './FlagsSection';
import { ContentSection } from './ContentSection';
import { MetadataSection } from './MetadataSection';
import { AcceptanceCriteriaSection } from './AcceptanceCriteriaSection';

interface EvidenceRequestFormProps {
  formData: EvidenceRequestFormData;
  onChange: (field: keyof EvidenceRequestFormData, value: unknown) => void;
  onReset?: () => void;
}

export function EvidenceRequestForm({
  formData,
  onChange,
  onReset,
}: EvidenceRequestFormProps) {
  const handleReset = () => {
    if (onReset) {
      onReset();
    } else {
      // Default reset behavior - reset each field to initial value
      Object.keys(INITIAL_FORM_DATA).forEach((key) => {
        onChange(
          key as keyof EvidenceRequestFormData,
          INITIAL_FORM_DATA[key as keyof EvidenceRequestFormData]
        );
      });
    }
  };

  return (
    <div className="evidence-request-form space-y-2">

      <BasicInfoSection formData={formData} onChange={onChange} />
      <DescriptionSection formData={formData} onChange={onChange} />
      <FlagsSection formData={formData} onChange={onChange} />
      <ContentSection formData={formData} onChange={onChange} />
      <MetadataSection formData={formData} onChange={onChange} />
      <AcceptanceCriteriaSection formData={formData} onChange={onChange} />

      <div className="border-t border-gray-200 pt-2">
        <button
          type="button"
          onClick={handleReset}
          className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          Reset Form
        </button>
      </div>
    </div>
  );
}
