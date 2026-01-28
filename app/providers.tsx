'use client';
import { createContext, useContext, ReactNode, useMemo } from 'react';
import { useEvidenceForm } from '@/hooks/useEvidenceForm';
import { usePreviewSettings } from '@/hooks/usePreviewSettings';
import { EvidenceRequestFormData, PreviewSettings } from '@/lib/types';

interface AppContextType {
  formData: EvidenceRequestFormData;
  setField: <K extends keyof EvidenceRequestFormData>(
    field: K,
    value: EvidenceRequestFormData[K]
  ) => void;
  setForm: (data: EvidenceRequestFormData) => void;
  resetForm: () => void;
  previewSettings: PreviewSettings;
  updatePreviewSettings: (settings: Partial<PreviewSettings>) => void;
  resetPreviewSettings: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
  initialFormData?: Partial<EvidenceRequestFormData>;
  initialPreviewSettings?: Partial<PreviewSettings>;
}

export function AppProvider({
  children,
  initialFormData,
  initialPreviewSettings,
}: AppProviderProps) {
  const {
    formData,
    setField,
    setForm,
    resetForm,
  } = useEvidenceForm(initialFormData);

  const {
    settings: previewSettings,
    updateSettings: updatePreviewSettings,
    resetSettings: resetPreviewSettings,
  } = usePreviewSettings(initialPreviewSettings);

  const contextValue = useMemo<AppContextType>(
    () => ({
      formData,
      setField,
      setForm,
      resetForm,
      previewSettings,
      updatePreviewSettings,
      resetPreviewSettings,
    }),
    [
      formData,
      setField,
      setForm,
      resetForm,
      previewSettings,
      updatePreviewSettings,
      resetPreviewSettings,
    ]
  );

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext(): AppContextType {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
