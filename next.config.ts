import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async rewrites() {
    return [
      {
        source: '/directus-api/:path*',
        destination: 'http://control-directus-9ee74c-76-13-234-106.traefik.me/:path*',
      },
    ];
  },
};

export default nextConfig;
