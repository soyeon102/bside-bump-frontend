/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "bump-project.o-r.kr" },
      { protocol: "http", hostname: "bump-project.o-r.kr" },
    ],
  },
};

export default nextConfig;
