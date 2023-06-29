'use client';

import { usePathname } from "next-intl/client";
import { useTheme } from "next-themes";
import { ReactNode } from "react";

export default function LinkContainer({
    links,
    className,
    children,
} : {
    links: string[],
    className?: string,
    children: ReactNode,
}) {
    const pathname = usePathname();
    const { theme } = useTheme();
    let active = false;
    links.forEach((link) => {
        if (pathname === link || (pathname?.startsWith(link) && link !== '/')) {
            active = true;
        }
    })
    return <div className={`group ${active ? 'is-active' : ''} ${theme === 'dark' ? 'is-dark' : 'is-light'} ${className ?? ''}`}>
        {children}
    </div>
}