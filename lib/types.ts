export interface EvidenceRequestFormData {
  // Basic Info
  displayName: string;
  friendlyName: string;
  supportAliases: string[];

  // Description
  shortDescription: string;
  activityDescription: string;

  // Flags
  canUploadFile: boolean;
  noActionNeeded: boolean;
  isDBQ: boolean;
  isProperNoun: boolean;
  isSensitive: boolean;
  noProvidePrefix: boolean;

  // Content
  longDescriptionContent: string;
  longDescriptionNotes: string;
  nextStepsContent: string;
  nextStepsNotes: string;

  // Metadata
  additionalContext: string;
  linksResources: string;

  // Acceptance Criteria
  acceptanceCriteria: AcceptanceCriteriaItem[];
}

export interface AcceptanceCriteriaItem {
  id: string;
  label: string;
  checked: boolean;
}

export interface PreviewSettings {
  viewMode: 'NEEDED_FROM_YOU' | 'NEEDED_FROM_OTHERS';
  suspenseDate: string;
  requestedDate: string;
  simulatePastDue: boolean;
}

export interface TrackedItem {
  displayName: string;
  friendlyName: string | null;
  description: string;
  status: 'NEEDED_FROM_YOU' | 'NEEDED_FROM_OTHERS';
  suspenseDate: string;
  requestedDate: string;
  canUploadFile: boolean;
}

export interface EvidenceDictionaryEntry {
  longDescription: React.ReactNode;
  nextSteps?: React.ReactNode;
  isProperNoun?: boolean;
  noActionNeeded?: boolean;
  isDBQ?: boolean;
  isSensitive?: boolean;
  noProvidePrefix?: boolean;
}
