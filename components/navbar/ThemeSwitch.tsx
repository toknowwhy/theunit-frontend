'use client';

import { useTheme, ThemeProvider } from '@wits/next-themes'
import Image from 'next/image';
import light from '@/public/icons/light.png';
import dark from '@/public/icons/dark.png';
import { useEffect, useState } from 'react';

export default function ThemeSwitch() {
    const { theme, setTheme } = useTheme()
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        setIsDark(theme === 'dark');
    }, [theme])

    const changeTheme = () => {
        if (isDark) {
            setTheme('light')
        } else {
            setTheme('dark')
        }
    }

  return <ThemeProvider>
            <Image 
                className="cursor-pointer"
                src={isDark ? dark : light} 
                alt="theme" 
                width={32}
                height={32}
                onClick={changeTheme} 
            />
        </ThemeProvider>
}