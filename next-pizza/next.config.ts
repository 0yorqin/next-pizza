import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["media.dodostatic.net"],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
