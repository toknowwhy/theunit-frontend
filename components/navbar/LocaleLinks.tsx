'use client'

import { AVAILABLE_LOCALES } from '@/utils/constants';
import { Link, usePathname } from '@/navigation';
import { SupportedLocale } from '@/utils/types';

export default function AvailableLocales() {

    const path = usePathname();

    return <>
       {AVAILABLE_LOCALES.map((loc) => (
            <LocaleLink 
                language={loc.locale} 
                title={loc.title} 
                key={loc.locale} 
                path={path ?? '/'}
            />
       ))}
    </>
}

function LocaleLink({
    language,
    title,
    path,
} : {
    language: SupportedLocale,
    title: string,
    path: string,
}) {
    // @ts-expect-error
    return <Link className='group/locale' href={`/${path}`} locale={language}>
            <span className='group-hover/locale:text-gradient'>{title}</span>
        </Link>;
}