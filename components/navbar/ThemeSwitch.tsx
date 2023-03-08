'use client';

import { useTheme } from 'next-themes'
import Image from 'next/image';
import light from '@/public/icons/light.png';
import dark from '@/public/icons/dark.png';

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme()
  const isDark = theme === 'dark';
  const changeTheme = () => {
    if (isDark) {
        setTheme('light')
    } else {
        setTheme('dark')
    }
  }

  return <Image 
            className="cursor-pointer"
            src={isDark ? dark : light} 
            alt="theme" 
            width={32}
            height={32}
            onClick={changeTheme} 
        />
}