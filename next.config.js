/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'atctees.com',
        pathname: '/backend/public/uploads/**',
      },
    ],
  },
};

module.exports = nextConfig;
