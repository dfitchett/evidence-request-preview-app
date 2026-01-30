'use client';

import { useCallback, useMemo, useRef } from 'react';
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

  // Check if required fields are populated to show preview
  const previewState = useMemo<{ canShow: boolean; message: string }>(() => {
    if (formData.displayName.trim() === '') {
      return {
        canShow: false,
        message: 'Please enter a Display Name to see preview',
      };
    }
    if (formData.friendlyName.trim() === '' && formData.supportAliases.length !== 0) {
      return {
        canShow: false,
        message: 'Please enter a Friendly Name when Support Aliases are provided',
      };
    }
    return { canShow: true, message: '' };
  }, [formData.displayName, formData.friendlyName, formData.supportAliases.length]);

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
            {previewState.canShow ? (
              <DefaultPageAdapter
                formData={formData}
                settings={previewSettings}
              />
            ) : (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '400px',
                  padding: '2rem'
                }}
              >
                {/* @ts-expect-error - VA web component */}
                <va-icon
                  icon="warning"
                  size={3}
                  style={{ marginBottom: '1rem' }}
                />
                <p style={{ textAlign: 'center', color: '#71767a', fontSize: '1.125rem' }}>
                  {previewState.message}
                </p>
              </div>
            )}
          </div>
        }
      />
      <WidthIndicator containerRef={previewContainerRef} />
    </>
  );
}
