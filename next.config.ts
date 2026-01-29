import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Ignore TypeScript errors from VA component library (incompatible with React 19)
  typescript: {
    // TODO: Remove when VA component library supports React 19
    ignoreBuildErrors: true,
  },

  // Turbopack configuration (Next.js 16+ default bundler)
  turbopack: {
    resolveAlias: {
      // Resolve the ~@department-of-veterans-affairs alias used in VADS CSS
      '~@department-of-veterans-affairs/css-library': path.resolve(
        __dirname,
        'node_modules/@department-of-veterans-affairs/css-library'
      ),
      // Resolve ~@uswds/uswds for font paths in VADS core.css
      '~@uswds/uswds': path.resolve(
        __dirname,
        'node_modules/@uswds/uswds/dist'
      ),
    },
  },

  // Webpack configuration (for --webpack flag)
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      // Resolve the ~@department-of-veterans-affairs alias used in VADS CSS
      '~@department-of-veterans-affairs/css-library': path.resolve(
        __dirname,
        'node_modules/@department-of-veterans-affairs/css-library'
      ),
      // Resolve ~@uswds/uswds for font paths in VADS core.css
      '~@uswds/uswds': path.resolve(
        __dirname,
        'node_modules/@uswds/uswds/dist'
      ),
    };

    return config;
  },
};

export default nextConfig;
