import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";

// VA Design System CSS - order matters!
// Note: core.css contains fonts and base styles
import "@department-of-veterans-affairs/css-library/dist/stylesheets/core.css";
import "@department-of-veterans-affairs/css-library/dist/stylesheets/utilities.css";
import "@department-of-veterans-affairs/css-library/dist/stylesheets/base/headings.css";
import "@department-of-veterans-affairs/css-library/dist/stylesheets/modules/m-alert.css";
import "@department-of-veterans-affairs/css-library/dist/tokens/css/variables.css";

// Claims Status specific styles from vets-website
import "@/styles/claims-status.scss";

// App-specific overrides (after VADS CSS)
import "./globals.css";
import { AppProvider } from "./providers";
import { WebComponentsInit } from "@/components/WebComponentsInit";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

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
      <body
        className={`${sourceSans.variable} antialiased`}
      >
        <WebComponentsInit />
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
