import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  transpilePackages: ['@department-of-veterans-affairs/component-library'],
  reactStrictMode: true,

  webpack: (config) => {
    // Resolve the ~@department-of-veterans-affairs alias used in VADS CSS
    config.resolve.alias = {
      ...config.resolve.alias,
      '~@department-of-veterans-affairs/css-library': path.resolve(
        __dirname,
        'node_modules/@department-of-veterans-affairs/css-library'
      ),
    };

    return config;
  },
};

export default nextConfig;
