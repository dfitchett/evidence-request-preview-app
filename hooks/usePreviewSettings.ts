'use client';
import { useState, useCallback } from 'react';
import { PreviewSettings } from '@/lib/types';
import { addDays, format } from 'date-fns';

const getDefaultSettings = (): PreviewSettings => ({
  viewMode: 'NEEDED_FROM_YOU',
  suspenseDate: format(addDays(new Date(), 30), 'yyyy-MM-dd'),
  requestedDate: format(new Date(), 'yyyy-MM-dd'),
  simulatePastDue: false,
});

export function usePreviewSettings(initialSettings?: Partial<PreviewSettings>) {
  const [settings, setSettings] = useState<PreviewSettings>(() => ({
    ...getDefaultSettings(),
    ...initialSettings,
  }));

  const updateSettings = useCallback((updates: Partial<PreviewSettings>) => {
    setSettings((prev) => ({
      ...prev,
      ...updates,
    }));
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(getDefaultSettings());
  }, []);

  return {
    settings,
    updateSettings,
    resetSettings,
  };
}
