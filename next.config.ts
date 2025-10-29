import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["v5.airtableusercontent.com"],
  },
  typescript: {
    // ✅ Allow production builds even if there are TS errors
    ignoreBuildErrors: true,
  },
  eslint: {
    // ✅ Skip ESLint checks during build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;