/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Required to handle CJK (Chinese/Japanese) characters in file paths
    // and for App Router
  },
};

module.exports = nextConfig;
