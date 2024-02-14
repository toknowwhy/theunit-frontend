const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,  
      fs: false,
      tls: false,
      net: false
    };
    
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.unitindex.org',
        port: '',
        pathname: '/files/**',
      },
    ],
  },
};
 
module.exports = withNextIntl(nextConfig);
