/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
      },
      // {
      //   protocol: "https",
      //   hostname: "dawid-food-ordering.s3.amazonaws.com",
      // },
    ],
  },
};

module.exports = nextConfig;
