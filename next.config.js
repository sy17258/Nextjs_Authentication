/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Allow production builds to complete even with ESLint errors
    ignoreDuringBuilds: true
  },
  typescript: {
    // Allow production builds to complete even with type errors
    ignoreBuildErrors: true
  }
};

module.exports = nextConfig;
