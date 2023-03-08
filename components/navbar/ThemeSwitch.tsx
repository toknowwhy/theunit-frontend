'use client';

import { useTheme, ThemeProvider } from '@wits/next-themes'
import Image from 'next/image';
import light from '@/public/icons/light.png';
import dark from '@/public/icons/dark.png';
import { useEffect, useState } from 'react';

export default function ThemeSwitch() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return <ThemeProvider>
                <Image 
                        className="cursor-pointer"
                        src={theme === 'dark' ? light : dark} 
                        alt="theme" 
                        width={32}
                        height={32}
                        onClick={() => { setTheme(theme === 'dark' ? 'light' : 'dark') }} 
                />
            </ThemeProvider>
}