'use client';

import { useCallback, useRef } from 'react';
import { useAppContext } from './providers';
import { TwoColumnLayout } from '@/components/ui/TwoColumnLayout';
import { WidthIndicator } from '@/components/ui/WidthIndicator';
import { EvidenceRequestForm } from '@/components/form';
import { PreviewControls } from '@/components/preview';
import DefaultPageAdapter from '@/vets-website-sync/adapters/DefaultPageAdapter';
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
        leftHeader="Evidence Request"
        rightHeader="Preview"
        left={
          <>
            {/* @ts-expect-error - VA web component */}
            <va-tabs initially-selected={0} label="Editor tabs">
              {/* @ts-expect-error - VA web component */}
              <va-tab-item button-text="Form" target-id="form-panel" />
              {/* @ts-expect-error - VA web component */}
              <va-tab-panel panel-id="form-panel">
                <EvidenceRequestForm
                  formData={formData}
                  onChange={handleFieldChange}
                  onReset={resetForm}
                />
                {/* @ts-expect-error - VA web component */}
              </va-tab-panel>

              {/* @ts-expect-error - VA web component */}
              <va-tab-item button-text="GitHub Issue" target-id="github-panel" />
              {/* @ts-expect-error - VA web component */}
              <va-tab-panel panel-id="github-panel">
                <GitHubOutput formData={formData} />
                {/* @ts-expect-error - VA web component */}
              </va-tab-panel>
              {/* @ts-expect-error - VA web component */}
            </va-tabs>
          </>
        }
        right={
          <div ref={previewContainerRef}>

            <PreviewControls
              settings={previewSettings}
              onSettingsChange={updatePreviewSettings}
            />
            <DefaultPageAdapter
              formData={formData}
              settings={previewSettings}
            />
          </div>
        }
      />
      <WidthIndicator containerRef={previewContainerRef} />
    </>
  );
}
