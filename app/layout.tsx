import type { Metadata } from "next";

// VA Design System CSS - order matters!
// 1. Design tokens (CSS custom properties)
import "@department-of-veterans-affairs/css-library/dist/tokens/css/variables.css";
// 2. Core styles (includes Source Sans Pro fonts)
import "@department-of-veterans-affairs/css-library/dist/stylesheets/core.css";
// 3. USWDS typography for proper text styling
import "@department-of-veterans-affairs/css-library/dist/stylesheets/uswds-typography.css";
// 4. Utility classes
import "@department-of-veterans-affairs/css-library/dist/stylesheets/utilities.css";
// 5. Base element styles
import "@department-of-veterans-affairs/css-library/dist/stylesheets/base/headings.css";
// 6. Component modules
import "@department-of-veterans-affairs/css-library/dist/stylesheets/modules/m-alert.css";

// Claims Status specific styles from vets-website
import "@/styles/claims-status.scss";

// App-specific overrides (after VADS CSS)
import "./globals.css";
import { AppProvider } from "./providers";
import { WebComponentsInit } from "@/components/WebComponentsInit";

export const metadata: Metadata = {
  title: "Evidence Request Preview App",
  description: "Preview and generate GitHub issues for VA evidence request improvements",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="vads-u-font-family--sans">
        <WebComponentsInit />
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
