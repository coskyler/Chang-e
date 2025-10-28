/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/stock/:path*",
        destination: "https://api.changefinance.coskyler.com/stock/:path*",
      },
      {
        source: "/user/:path*",
        destination: "https://api.changefinance.coskyler.com/user/:path*",
      },
    ];
  },
};

export default nextConfig;
