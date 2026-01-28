'use client';

import { EvidenceRequestFormData, AcceptanceCriteriaItem } from '@/lib/types';
import { FormSection } from './FormSection';

interface AcceptanceCriteriaSectionProps {
  formData: EvidenceRequestFormData;
  onChange: (field: keyof EvidenceRequestFormData, value: unknown) => void;
}

export function AcceptanceCriteriaSection({
  formData,
  onChange,
}: AcceptanceCriteriaSectionProps) {
  const handleCheckboxChange = (itemId: string, checked: boolean) => {
    const updatedCriteria = formData.acceptanceCriteria.map((item) =>
      item.id === itemId ? { ...item, checked } : item
    );
    onChange('acceptanceCriteria', updatedCriteria);
  };

  const completedCount = formData.acceptanceCriteria.filter(
    (item) => item.checked
  ).length;
  const totalCount = formData.acceptanceCriteria.length;
  const allComplete = completedCount === totalCount;

  return (
    <FormSection
      title="Acceptance Criteria"
      description="Checklist of requirements that must be met before this content can be deployed."
    >
      <div className="mb-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">
            Progress: {completedCount} of {totalCount} complete
          </span>
          {allComplete && (
            <span className="text-green-600 font-medium">All criteria met</span>
          )}
        </div>
        <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              allComplete ? 'bg-green-500' : 'bg-blue-500'
            }`}
            style={{ width: `${(completedCount / totalCount) * 100}%` }}
          />
        </div>
      </div>

      <div className="space-y-3">
        {formData.acceptanceCriteria.map((item: AcceptanceCriteriaItem) => (
          <label
            key={item.id}
            className="flex items-start gap-3 cursor-pointer group"
          >
            <input
              type="checkbox"
              checked={item.checked}
              onChange={(e) => handleCheckboxChange(item.id, e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
            <span
              className={`text-sm ${
                item.checked
                  ? 'text-gray-500 line-through'
                  : 'text-gray-700 group-hover:text-gray-900'
              }`}
            >
              {item.label}
            </span>
          </label>
        ))}
      </div>
    </FormSection>
  );
}
