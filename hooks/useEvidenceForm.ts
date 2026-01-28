'use client';
import { useReducer, useCallback } from 'react';
import { EvidenceRequestFormData } from '@/lib/types';
import { INITIAL_FORM_DATA } from '@/lib/constants';

type FormAction =
  | { type: 'SET_FIELD'; field: keyof EvidenceRequestFormData; value: unknown }
  | { type: 'SET_FORM'; data: EvidenceRequestFormData }
  | { type: 'RESET_FORM' };

function formReducer(
  state: EvidenceRequestFormData,
  action: FormAction
): EvidenceRequestFormData {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'SET_FORM':
      return action.data;
    case 'RESET_FORM':
      return INITIAL_FORM_DATA;
    default:
      return state;
  }
}

export function useEvidenceForm(initialData?: Partial<EvidenceRequestFormData>) {
  const [formData, dispatch] = useReducer(formReducer, {
    ...INITIAL_FORM_DATA,
    ...initialData,
  });

  const setField = useCallback(
    <K extends keyof EvidenceRequestFormData>(
      field: K,
      value: EvidenceRequestFormData[K]
    ) => {
      dispatch({ type: 'SET_FIELD', field, value });
    },
    []
  );

  const setForm = useCallback((data: EvidenceRequestFormData) => {
    dispatch({ type: 'SET_FORM', data });
  }, []);

  const resetForm = useCallback(() => {
    dispatch({ type: 'RESET_FORM' });
  }, []);

  return {
    formData,
    setField,
    setForm,
    resetForm,
  };
}
