import { EvidenceRequestFormData, AcceptanceCriteriaItem } from './types';

export const DEFAULT_ACCEPTANCE_CRITERIA: AcceptanceCriteriaItem[] = [
  {
    id: 'content-added',
    label:
      'Content is added to lib/lighthouse/benefits_claims/tracked_item_content/override_content.json',
    checked: false,
  },
  {
    id: 'display-name-alias',
    label: 'the displayName is added to the supportedAliases array',
    checked: false,
  },
  {
    id: 'json-validates',
    label: 'JSON validates against the schema',
    checked: false,
  },
  {
    id: 'staging-tested',
    label: 'Content tested in staging environment',
    checked: false,
  },
  {
    id: 'visual-review',
    label: 'Visual review confirms content renders correctly',
    checked: false,
  },
  {
    id: 'a11y-review',
    label: 'Accessibility review completed (if applicable)',
    checked: false,
  },
  { id: 'unit-tests', label: 'Unit tests added/updated', checked: false },
  { id: 'e2e-tests', label: 'End-to-end tests added/updated', checked: false },
];

export const INITIAL_FORM_DATA: EvidenceRequestFormData = {
  displayName: '21-4142/21-4142a',
  friendlyName: 'Authorization to disclose information',
  supportAliases: ['21-4142/21-4142a'],
  shortDescription: '',
  activityDescription: 'We need your permission to request your personal information from a non-VA source, like a private doctor or hospital.',
  canUploadFile: true,
  noActionNeeded: false,
  isDBQ: false,
  isProperNoun: false,
  isSensitive: false,
  noProvidePrefix: false,
  longDescriptionContent: `For your benefits claim, we need your permission to request your personal information from a non-VA source, like a private doctor or hospital.

Personal information may include:

- Medical treatments
- Hospitalizations
- Psychotherapy
- Outpatient care`,
  longDescriptionNotes: '',
  nextStepsContent: `Use VA Form 21-4142 to give us permission to request your personal information.

You can complete and sign this form online, or use a PDF version and upload or mail it.
[VA Form 21-4142](/find-forms/about-form-21-4142/)`,
  nextStepsNotes: '',
  additionalContext: '',
  linksResources: '',
  acceptanceCriteria: DEFAULT_ACCEPTANCE_CRITERIA,
};

export const FLAG_OPTIONS = {
  canUploadFile: [
    { value: 'yes', label: 'yes' },
    { value: 'no', label: 'no' },
  ],
  noActionNeeded: [
    { value: 'false', label: 'yes (noActionNeeded = false)' },
    { value: 'true', label: 'no (noActionNeeded = true)' },
  ],
  isDBQ: [
    { value: 'no', label: 'no' },
    { value: 'yes', label: 'yes' },
  ],
  isProperNoun: [
    { value: 'no', label: 'no' },
    { value: 'yes', label: 'yes' },
  ],
  isSensitive: [
    { value: 'no', label: 'no' },
    { value: 'yes', label: 'yes' },
  ],
  noProvidePrefix: [
    { value: 'no', label: 'no' },
    { value: 'yes', label: 'yes' },
  ],
};
