'use client';

import {
  VaSelect,
  VaCheckbox,
} from '@department-of-veterans-affairs/component-library/dist/react-bindings';
import { PreviewSettings } from '@/lib/types';

interface PreviewControlsProps {
  settings: PreviewSettings;
  onSettingsChange: (settings: PreviewSettings) => void;
}

export default function PreviewControls({
  settings,
  onSettingsChange,
}: PreviewControlsProps) {
  const handleViewModeChange = (viewMode: PreviewSettings['viewMode']) => {
    onSettingsChange({ ...settings, viewMode });
  };

  const handleSuspenseDateChange = (suspenseDate: string) => {
    onSettingsChange({ ...settings, suspenseDate });
  };

  const handleRequestedDateChange = (requestedDate: string) => {
    onSettingsChange({ ...settings, requestedDate });
  };

  const handleSimulatePastDueChange = (simulatePastDue: boolean) => {
    onSettingsChange({ ...settings, simulatePastDue });
  };

  return (
    <div className="vads-u-margin-bottom--3">
      {/* @ts-expect-error - VA web component */}
      <va-accordion bordered>
        {/* @ts-expect-error - VA web component */}
        <va-accordion-item header="Preview Settings">
          <div className="vads-u-padding--2">
            {/* View Mode Toggle */}
            <div className="vads-u-margin-bottom--2">
              <VaSelect
                label="Request Type"
                name="viewMode"
                value={settings.viewMode}
                onVaSelect={(e: CustomEvent) => handleViewModeChange(e.detail.value)}
              >
                <option value="NEEDED_FROM_YOU">First-party (NEEDED_FROM_YOU)</option>
                <option value="NEEDED_FROM_OTHERS">Third-party (NEEDED_FROM_OTHERS)</option>
              </VaSelect>
            </div>

            {/* Suspense Date (Respond By Date) */}
            <div className="vads-u-margin-bottom--2">
              <label
                htmlFor="suspenseDate"
                className="vads-u-display--block vads-u-font-weight--bold vads-u-margin-bottom--1"
              >
                Respond by date (suspenseDate)
              </label>
              <input
                type="date"
                id="suspenseDate"
                value={settings.suspenseDate}
                onChange={(e) => handleSuspenseDateChange(e.target.value)}
                className="usa-input"
                style={{ maxWidth: '200px' }}
              />
            </div>

            {/* Requested Date */}
            <div className="vads-u-margin-bottom--2">
              <label
                htmlFor="requestedDate"
                className="vads-u-display--block vads-u-font-weight--bold vads-u-margin-bottom--1"
              >
                Request date (requestedDate)
              </label>
              <input
                type="date"
                id="requestedDate"
                value={settings.requestedDate}
                onChange={(e) => handleRequestedDateChange(e.target.value)}
                className="usa-input"
                style={{ maxWidth: '200px' }}
              />
            </div>

            {/* Simulate Past Due */}
            <div className="vads-u-margin-bottom--0">
              <VaCheckbox
                label="Simulate past due date"
                checked={settings.simulatePastDue}
                onVaChange={(e: CustomEvent) => handleSimulatePastDueChange(e.detail.checked)}
                hint="When checked, displays the past due warning alert (first-party only)"
              />
            </div>
          </div>
          {/* @ts-expect-error - VA web component */}
        </va-accordion-item>
        {/* @ts-expect-error - VA web component */}
      </va-accordion>
    </div>
  );
}
