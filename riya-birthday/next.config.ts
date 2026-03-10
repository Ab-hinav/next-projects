import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    serverActions: {
      allowedOrigins: ['happybirthdayriya.uk'],
      bodySizeLimit: '10mb',
    },
  },
  output: 'standalone',
};

export default nextConfig;
