import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  devIndicators: false,
  typescript: {
    ignoreBuildErrors: false, 
  },
  experimental: {
    optimizePackageImports: [
      "motion",
      "@paper-design/shaders-react",
      "lucide-react"
    ],
  },
  async redirects() {
    return [
      {
        source: "/icons-legacy",
        destination: "/icons",
        permanent: true,
      },
    ];
  },
};

export default withMDX(config);
