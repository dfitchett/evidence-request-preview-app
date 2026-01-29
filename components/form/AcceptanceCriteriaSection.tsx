'use client';

import { VaTextarea } from '@department-of-veterans-affairs/component-library/dist/react-bindings';
import { EvidenceRequestFormData } from '@/lib/types';
import { FormSection } from './FormSection';

interface AcceptanceCriteriaSectionProps {
  formData: EvidenceRequestFormData;
  onChange: (field: keyof EvidenceRequestFormData, value: unknown) => void;
}

export function AcceptanceCriteriaSection({
  formData,
  onChange,
}: AcceptanceCriteriaSectionProps) {
  return (
    <FormSection
      title="Acceptance Criteria"
      description="Markdown checklist of requirements for the GitHub issue."
    >
      <VaTextarea
        name="acceptanceCriteria"
        value={formData.acceptanceCriteria}
        onInput={(e) => {
          const target = e.target as HTMLTextAreaElement;
          onChange('acceptanceCriteria', target.value);
        }}
      />
    </FormSection>
  );
}
