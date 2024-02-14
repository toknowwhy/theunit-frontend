'use client';

import { ReactNode, useEffect, useState } from "react";
import Hamburger from 'hamburger-react'
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

export default function MobileMenu({children} : {children: ReactNode}) {
    const [active, setActive] = useState(false);
    const [color, setColor] = useState('#ffffff');
    const pathname = usePathname();
    const { theme } = useTheme();

    useEffect(() => {
        setActive(false)
    }, [pathname])

    useEffect(() => {
        setColor((!theme || theme === 'dark') ? '#ffffff' : '#000000')
    }, [theme])  

    return <div className={`group ${active ? 'is-active' : ''}`}>
        <Hamburger size={23} color={color} toggled={active} toggle={setActive} />
        <div className="hidden fixed right-0 bottom-0 top-16 h-screen bg-black-light group-[.is-active]:block">
            {children}
        </div>
    </div>
}