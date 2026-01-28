'use client';

import { EvidenceRequestFormData } from '@/lib/types';
import { FLAG_OPTIONS } from '@/lib/constants';
import { FormSection } from './FormSection';

interface FlagsSectionProps {
  formData: EvidenceRequestFormData;
  onChange: (field: keyof EvidenceRequestFormData, value: unknown) => void;
}

type BooleanFlagKey = keyof typeof FLAG_OPTIONS;

const FLAG_LABELS: Record<BooleanFlagKey, { label: string; hint: string }> = {
  canUploadFile: {
    label: 'Can Upload File',
    hint: 'Whether Veterans can upload files for this request',
  },
  noActionNeeded: {
    label: 'Action Required from Veteran',
    hint: 'Whether the Veteran needs to take action',
  },
  isDBQ: {
    label: 'Is DBQ (Disability Benefits Questionnaire)',
    hint: 'Mark as a DBQ form request',
  },
  isProperNoun: {
    label: 'Is Proper Noun',
    hint: 'Display name should not be lowercased',
  },
  isSensitive: {
    label: 'Is Sensitive',
    hint: 'Contains sensitive information requiring special handling',
  },
  noProvidePrefix: {
    label: 'No "Provide" Prefix',
    hint: 'Omit "Provide" prefix when displaying the request',
  },
};

function booleanToSelectValue(key: BooleanFlagKey, value: boolean): string {
  if (key === 'canUploadFile') {
    return value ? 'yes' : 'no';
  }
  if (key === 'noActionNeeded') {
    return value ? 'true' : 'false';
  }
  return value ? 'yes' : 'no';
}

function selectValueToBoolean(key: BooleanFlagKey, value: string): boolean {
  if (key === 'canUploadFile') {
    return value === 'yes';
  }
  if (key === 'noActionNeeded') {
    return value === 'true';
  }
  return value === 'yes';
}

export function FlagsSection({ formData, onChange }: FlagsSectionProps) {
  const handleFlagChange = (key: BooleanFlagKey, selectValue: string) => {
    const boolValue = selectValueToBoolean(key, selectValue);
    onChange(key, boolValue);
  };

  return (
    <FormSection
      title="Configuration Flags"
      description="These flags control how the evidence request is displayed and processed."
    >
      <div className="grid grid-cols-1 gap-4">
        {(Object.keys(FLAG_OPTIONS) as BooleanFlagKey[]).map((key) => (
          <div key={key}>
            <label
              htmlFor={key}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {FLAG_LABELS[key].label}
            </label>
            <select
              id={key}
              value={booleanToSelectValue(key, formData[key])}
              onChange={(e) => handleFlagChange(key, e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              {FLAG_OPTIONS[key].map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs text-gray-500">{FLAG_LABELS[key].hint}</p>
          </div>
        ))}
      </div>
    </FormSection>
  );
}
