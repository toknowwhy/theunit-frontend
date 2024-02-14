import {
  createLocalizedPathnamesNavigation,
  Pathnames
} from 'next-intl/navigation';

export const locales = ['en', 'cn', 'es'] as const;
export const localePrefix = 'never';

// The `pathnames` object holds pairs of internal
// and external paths, separated by locale.
export const pathnames = {
  // If all locales use the same pathname, a
  // single external path can be provided.
  '/': '/',
  '/candidates': '/candidates',
  '/candidates/coins/[id]': '/candidates/coins/[id]',
  '/coins/[id]': '/coins/[id]',
  '/history/[page]': '/history/[page]',
  '/unit/[currency]': '/unit/[currency]',

} satisfies Pathnames<typeof locales>;
 
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createLocalizedPathnamesNavigation({locales, localePrefix, pathnames});