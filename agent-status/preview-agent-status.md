# Preview Components Agent Status

## Status: COMPLETED

**Date:** January 27, 2026
**Agent:** Preview Components Builder

## Summary

Successfully created all preview components for the right column of the Evidence Request Preview App. These components replicate the rendering logic from `DefaultPage.jsx` in vets-website.

## Components Created

### 1. `lib/helpers.ts`
Helper functions for date formatting, markdown conversion, and display name logic:
- `formatDate()` - Formats ISO date strings to "MMMM d, yyyy" format
- `getDisplayFriendlyName()` - Handles proper noun casing for friendly names
- `markdownToHtml()` - Converts markdown formatting to HTML
- `createMarkup()` - Creates React-safe HTML for dangerouslySetInnerHTML
- Additional utilities: `transformToTrackedItem()`, `isPastDue()`, `getDaysRemaining()`, etc.

### 2. `components/preview/PreviewControls.tsx`
Controls at the top of the preview panel:
- Toggle between first-party (NEEDED_FROM_YOU) and third-party (NEEDED_FROM_OTHERS) view
- Date input for `suspenseDate` (respond by date)
- Date input for `requestedDate`
- Checkbox to simulate past due date

### 3. `components/preview/PreviewHeader.tsx`
Renders the h1 header section matching DefaultPage.jsx logic:
- `getFirstPartyDisplayName()` - For first-party requests
- `getFirstPartyRequestText()` - Respond by date text
- `getItemDisplayName()` - For third-party requests
- `getRequestText()` - Request date text for third-party
- Handles isDBQ, isSensitive, friendlyName conditions

### 4. `components/preview/PreviewAlert.tsx`
Renders the va-alert for past due date (first-party only):
- "Deadline passed for requested information" warning
- Phone numbers: 800-827-1000 and TTY: 711
- Styled to match VA Design System alert component

### 5. `components/preview/PreviewDescription.tsx`
Renders "What we need from you" or "What we're notifying you about" section:
- Priority 1: Shows frontendDescription (longDescriptionContent from form)
- Priority 2: Falls back to apiDescription (shortDescription)
- Priority 3: Empty state with claim letters link (first-party only)

### 6. `components/preview/PreviewNextSteps.tsx`
Renders the "Next steps" section:
- Shows custom frontendNextSteps if provided (nextStepsContent from form)
- Otherwise shows generic first-party next steps with bullet list
- Links to claim letters and find forms

### 7. `components/preview/PreviewThirdPartyNotice.tsx`
Notice shown for third-party requests:
- "This is just a notice. No action is needed by you."
- Conditionally shows optional upload text based on noActionNeeded flag

### 8. `components/preview/MockUploadForm.tsx`
Simplified visual representation of the upload form:
- Dashed border placeholder box
- File upload icon
- Descriptive text explaining the upload section
- Only shown when `canUploadFile` is true

### 9. `components/preview/DefaultPagePreview.tsx`
Main preview container that assembles all components:
- Transforms formData and settings into preview state
- Calculates isFirstParty, isThirdParty, pastDueDate
- Renders components conditionally matching DefaultPage.jsx logic
- Includes "Learn about this request" section for first-party with content override

### 10. `components/preview/index.ts`
Barrel export file for easy imports:
```typescript
export { DefaultPagePreview, PreviewControls, PreviewHeader, ... } from './preview';
```

## CSS Additions to `app/globals.css`

Added styles for:
- VA Alert component simulation (warning, error, info, success variants)
- VA Link styles
- VA Telephone styles
- Preview controls (radio groups, date inputs, checkboxes)
- Mock upload form (dashed border placeholder)
- Optional upload section
- Preview panel container
- Additional VADS utility classes

## Key Design Decisions

1. **Markdown to HTML Conversion**: Using `dangerouslySetInnerHTML` with sanitized markdown conversion for content that may contain formatting. Supports `**bold**`, `[links](url)`, and line breaks.

2. **VA Web Component Simulation**: Since this is a standalone Next.js app without the actual VA web components, we simulate their appearance with CSS styling.

3. **Conditional Rendering Logic**: Carefully replicated the conditional rendering from DefaultPage.jsx to ensure preview accuracy matches production behavior.

4. **Type Safety**: All components use TypeScript interfaces from `lib/types.ts` for type safety.

5. **Component Composition**: Broke down the preview into smaller, focused components for maintainability and testability.

## Integration Notes

To use these preview components in the main page:

```tsx
import { DefaultPagePreview, PreviewControls } from '@/components/preview';
import { EvidenceRequestFormData, PreviewSettings } from '@/lib/types';

function PreviewPanel({ formData, settings, onSettingsChange }) {
  return (
    <div className="preview-panel">
      <PreviewControls settings={settings} onSettingsChange={onSettingsChange} />
      <DefaultPagePreview formData={formData} settings={settings} />
    </div>
  );
}
```

## Files Created/Modified

**Created:**
- `/lib/helpers.ts`
- `/components/preview/PreviewControls.tsx`
- `/components/preview/PreviewHeader.tsx`
- `/components/preview/PreviewAlert.tsx`
- `/components/preview/PreviewDescription.tsx`
- `/components/preview/PreviewNextSteps.tsx`
- `/components/preview/PreviewThirdPartyNotice.tsx`
- `/components/preview/MockUploadForm.tsx`
- `/components/preview/DefaultPagePreview.tsx`
- `/components/preview/index.ts`

**Modified:**
- `/app/globals.css` - Added VA styling and preview component styles

## Reference Files Used

- `/vets-website/src/applications/claims-status/components/claim-document-request-pages/DefaultPage.jsx`
- `/vets-website/src/applications/claims-status/utils/evidenceDictionary.jsx`
- `/vets-website/src/applications/claims-status/utils/helpers.js`
