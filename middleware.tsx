import createIntlMiddleware from 'next-intl/middleware';

export default createIntlMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'cn'],

  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: 'en',
});

export const config = {
  // Skip all non-content paths
  matcher: ['/((?!api|_next|favicon.ico|charting_library|bgds).*)']
};