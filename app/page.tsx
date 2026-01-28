'use client';

import { useCallback, useRef } from 'react';
import { useAppContext } from './providers';
import { TwoColumnLayout } from '@/components/ui/TwoColumnLayout';
import { WidthIndicator } from '@/components/ui/WidthIndicator';
import { EvidenceRequestForm } from '@/components/form';
import { DefaultPagePreview, PreviewControls } from '@/components/preview';
import { GitHubOutput } from '@/components/github';
import { EvidenceRequestFormData } from '@/lib/types';

export default function Home() {
  const {
    formData,
    setField,
    resetForm,
    previewSettings,
    updatePreviewSettings,
  } = useAppContext();

  const previewContainerRef = useRef<HTMLDivElement>(null);

  // Wrapper to match the form's onChange signature
  const handleFieldChange = useCallback(
    (field: keyof EvidenceRequestFormData, value: unknown) => {
      setField(field, value as EvidenceRequestFormData[typeof field]);
    },
    [setField]
  );

  return (
    <>
      <TwoColumnLayout
        leftHeader="Evidence Request Editor"
        rightHeader="Preview & Output"
        left={
          <>
            <EvidenceRequestForm
              formData={formData}
              onChange={handleFieldChange}
              onReset={resetForm}
            />
            <PreviewControls
              settings={previewSettings}
              onSettingsChange={updatePreviewSettings}
            />
          </>
        }
        right={
          <div ref={previewContainerRef}>
            {/* @ts-expect-error - VA web component */}
            <va-tabs initially-selected={0} label="Component details">
              {/* @ts-expect-error - VA web component */}
              <va-tab-item button-text="Preview" target-id="panel-1" />
              {/* @ts-expect-error - VA web component */}
              <va-tab-panel panel-id="panel-1">
                <DefaultPagePreview
                  formData={formData}
                  settings={previewSettings}
                />
                {/* @ts-expect-error - VA web component */}
              </va-tab-panel>

              {/* @ts-expect-error - VA web component */}
              <va-tab-item button-text="GitHub Issue" target-id="panel-2" />
              {/* @ts-expect-error - VA web component */}
              <va-tab-panel panel-id="panel-2">
                <GitHubOutput formData={formData} />
                {/* @ts-expect-error - VA web component */}
              </va-tab-panel>
              {/* @ts-expect-error - VA web component */}
            </va-tabs>
          </div>
        }
      />
      <WidthIndicator containerRef={previewContainerRef} />
    </>
  );
}
