import createMiddleware from 'next-intl/middleware';
import { localePrefix, locales, pathnames } from './navigation';
 
export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: 'en',
  localePrefix,
  pathnames,
});

export const config = {
  // Skip all non-content paths
  matcher: ['/((?!api|_next|favicon.ico|charting_library|datafeeds|bgds|.*\\..*).*)']
};