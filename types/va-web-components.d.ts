declare module '@department-of-veterans-affairs/web-components/loader' {
  export function defineCustomElements(win?: Window, options?: unknown): Promise<void>;
  export function applyPolyfills(): Promise<void>;
}
