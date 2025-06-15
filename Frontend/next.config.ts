import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000',
        pathname: '/api/files/**',
      },
    ],
  },
  devIndicators: {
    buildActivity: false,
    buildActivityPosition: 'bottom-right',
    appIsrStatus: false,
  },
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            dimensions: false,
          },
        },
      ],
    });
    return config;
  },
};

export default nextConfig;
