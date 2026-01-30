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
      // Platform utility stubs (replace vets-website platform dependencies)
      '@department-of-veterans-affairs/platform-utilities/environment': path.resolve(
        __dirname,
        'lib/platform-stubs/environment.js'
      ),
      '@department-of-veterans-affairs/platform-utilities/api': path.resolve(
        __dirname,
        'lib/platform-stubs/api.js'
      ),
      '@department-of-veterans-affairs/platform-utilities/scroll': path.resolve(
        __dirname,
        'lib/platform-stubs/scroll.js'
      ),
      '@department-of-veterans-affairs/platform-utilities/data/titleCase': path.resolve(
        __dirname,
        'lib/platform-stubs/titleCase.js'
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
      // Platform utility stubs (replace vets-website platform dependencies)
      '@department-of-veterans-affairs/platform-utilities/environment': path.resolve(
        __dirname,
        'lib/platform-stubs/environment.js'
      ),
      '@department-of-veterans-affairs/platform-utilities/api': path.resolve(
        __dirname,
        'lib/platform-stubs/api.js'
      ),
      '@department-of-veterans-affairs/platform-utilities/scroll': path.resolve(
        __dirname,
        'lib/platform-stubs/scroll.js'
      ),
      '@department-of-veterans-affairs/platform-utilities/data/titleCase': path.resolve(
        __dirname,
        'lib/platform-stubs/titleCase.js'
      ),
    };

    return config;
  },
};

export default nextConfig;
