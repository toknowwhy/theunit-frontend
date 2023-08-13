const withNextIntl = require('next-intl/plugin')(
  './i18n.ts'
);

module.exports = withNextIntl({
  experimental: {appDir: true},
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
});