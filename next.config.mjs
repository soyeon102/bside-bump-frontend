/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "bump-project.o-r.kr" },
      { protocol: "http", hostname: "bump-project.o-r.kr" },
    ],
  },
};

export default nextConfig;
