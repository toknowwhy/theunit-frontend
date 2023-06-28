"use client"

import Image from 'next/image';
import Link from 'next-intl/link';
import logo from '@/public/logo.svg';
import logoDark from '@/public/logo-dark.svg';
import logoSmall from '@/public/logo-small.svg';
import logoSmallDark from '@/public/logo-small-dark.svg';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export default function Logo() {

    const { theme } = useTheme();
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        setIsDark(theme === 'dark');
    }, [theme])

    return (
        <Link href="/">
            <div className='md:hidden'>
                <Image src={isDark ? logoSmall : logoSmallDark} alt="" />
            </div>
            <div className='hidden md:block'>
                <Image src={isDark ? logo : logoDark} alt="" />
            </div>
        </Link>
    )
}