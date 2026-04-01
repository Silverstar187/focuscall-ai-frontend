import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'dist',
  turbopack: {
    root: __dirname,
  },
  images: {
    unoptimized: true,
  },
  compiler: {
    styledJsx: true,
  },
};

export default nextConfig;
