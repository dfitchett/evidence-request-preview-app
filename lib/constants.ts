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
  displayName: '',
  friendlyName: '',
  supportAliases: [],
  shortDescription: '',
  activityDescription: '',
  canUploadFile: true,
  noActionNeeded: false,
  isDBQ: false,
  isProperNoun: false,
  isSensitive: false,
  noProvidePrefix: false,
  longDescriptionContent: '',
  longDescriptionNotes: '',
  nextStepsContent: '',
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
