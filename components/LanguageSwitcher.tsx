import Image from 'next/image'
import Link from 'next-intl/link';
import earth from '@/public/icons/earth.svg'
import earthBlack from '@/public/icons/earth-black.svg'

export default function LanguageSwitcher() {

    return (
        <div className="relative group">
            <Image className='cursor-pointer dark:hidden' src={earthBlack} alt="language" />
            <Image className='cursor-pointer hidden dark:inline-block' src={earth} alt="language" />
            <div className='hidden group-hover:block absolute pt-4 rounded-lg bg-black-light'>
                <div className='flex flex-col gap-4 p-4 rounded-lg border border-gray-medium text-white text-base'>
                    <AvailableLocales />
                </div>
            </div>
        </div>
    )
}

export function AvailableLocales() {
    return <>
        <LocaleLink language="en" title='English' />
        <LocaleLink language="es" title='Español' />
        <LocaleLink language="cn" title='中文' />
    </>
}

function LocaleLink({
    language,
    title,
} : {
    language: string,
    title: string,
}) {
    return (
        <Link 
            className='group/locale' 
            href="/" 
            locale={language}
        >
            <span className='group-hover/locale:text-gradient'>{title}</span>
        </Link>
    )
}
