/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Unoptimized can be false since Vercel optimizes local images automatically
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dhrmveersambhajikridamandal.wordpress.com",
      },
    ],
  },
};

export default nextConfig;
