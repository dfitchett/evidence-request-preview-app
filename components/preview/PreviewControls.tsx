"use client";

import { PreviewSettings } from "@/lib/types";

interface PreviewControlsProps {
  settings: PreviewSettings;
  onSettingsChange: (settings: PreviewSettings) => void;
}

export default function PreviewControls({
  settings,
  onSettingsChange,
}: PreviewControlsProps) {
  const handleViewModeChange = (viewMode: PreviewSettings["viewMode"]) => {
    onSettingsChange({ ...settings, viewMode });
  };

  const handleSuspenseDateChange = (suspenseDate: string) => {
    onSettingsChange({ ...settings, suspenseDate });
  };

  const handleRequestedDateChange = (requestedDate: string) => {
    onSettingsChange({ ...settings, requestedDate });
  };

  return (
    <div className="vads-u-margin-bottom--3 border border-1px border-color-gray-medium">
      {/* @ts-expect-error - VA web component */}
      <va-accordion bordered open-single>
        {/* @ts-expect-error - VA web component */}
        <va-accordion-item header="Preview Settings">
          <div className="vads-u-padding--2">
            <div className="vads-u-display--flex vads-u-flex-wrap--wrap vads-u-margin-top--neg1">
              {/* View Mode Toggle */}
              <div className="vads-u-flex--1 vads-u-margin-right--2 vads-u-margin-top--1 vads-u-min-width--200">
                <label
                  htmlFor="viewMode"
                  className="vads-u-display--block vads-u-margin-bottom--1"
                >
                  Request Type
                </label>
                <select
                  id="viewMode"
                  name="viewMode"
                  value={settings.viewMode}
                  onChange={(e) =>
                    handleViewModeChange(e.target.value as PreviewSettings["viewMode"])
                  }
                  className="usa-select vads-u-width--full"
                >
                  <option value="NEEDED_FROM_YOU">
                    First-party (NEEDED_FROM_YOU)
                  </option>
                  <option value="NEEDED_FROM_OTHERS">
                    Third-party (NEEDED_FROM_OTHERS)
                  </option>
                </select>
              </div>

              {/* Suspense Date (Respond By Date) */}
              <div className="vads-u-flex--1 vads-u-margin-right--2 vads-u-margin-top--1 vads-u-min-width--200">
                <label
                  htmlFor="suspenseDate"
                  className="vads-u-display--block vads-u-margin-bottom--1"
                >
                  Respond by date (suspenseDate)
                </label>
                <input
                  type="date"
                  id="suspenseDate"
                  value={settings.suspenseDate}
                  onChange={(e) => handleSuspenseDateChange(e.target.value)}
                  className="usa-input vads-u-width--full"
                />
              </div>

              {/* Requested Date */}
              <div className="vads-u-flex--1 vads-u-margin-top--1 vads-u-min-width--200">
                <label
                  htmlFor="requestedDate"
                  className="vads-u-display--block vads-u-margin-bottom--1"
                >
                  Request date (requestedDate)
                </label>
                <input
                  type="date"
                  id="requestedDate"
                  value={settings.requestedDate}
                  onChange={(e) => handleRequestedDateChange(e.target.value)}
                  className="usa-input vads-u-width--full"
                />
              </div>
            </div>
          </div>
          {/* @ts-expect-error - VA web component */}
        </va-accordion-item>
        {/* @ts-expect-error - VA web component */}
      </va-accordion>
    </div>
  );
}
