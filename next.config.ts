import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      // The generic /tools/image-converter was split into format-specific pages
      // (jpg-to-png, png-to-jpg, jpg-to-webp, webp-to-jpg, png-to-webp, webp-to-png)
      // for SEO. Preserve any inbound links to the old URL.
      {
        source: "/tools/image-converter",
        destination: "/tools/jpg-to-png",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
