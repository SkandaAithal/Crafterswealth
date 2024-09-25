/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "stage.crafterswealth.com",
        pathname: "**",
      },
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
