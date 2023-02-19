const withNextIntl = require('next-intl/plugin')(
  './i18n.ts'
);

module.exports = withNextIntl({
  experimental: {appDir: true},
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.20y.org',
        port: '',
        pathname: '/files/**',
      },
    ],
  },
});