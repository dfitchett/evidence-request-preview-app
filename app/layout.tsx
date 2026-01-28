import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

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

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <WebComponentsInit />
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
