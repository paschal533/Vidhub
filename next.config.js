// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "cdn.pixabay.com",
      "p16-amd-va.tiktokcdn.com",
      "image.shutterstock.com",
      "cdn.dribbble.com",
      "i.ibb.co",
    ],
  },
};

module.exports = nextConfig;
