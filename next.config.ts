import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack(config) {
    // Avoid PDF.js's internal Webpack names colliding with Next's eval-based dev bundle.
    config.resolve.alias["pdfjs-dist$"] = "pdfjs-dist/build/pdf.min.mjs";
    return config;
  },
};

export default nextConfig;
