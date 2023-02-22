'use client';

import { usePathname } from "next-intl/client";
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
    let active = false;
    links.forEach((link) => {
        if (pathname === link || (pathname?.startsWith(link) && link !== '/')) {
            active = true;
        }
    })
    return <div className={`group ${active ? 'is-active' : ''} ${className ?? ''}`}>
        {children}
    </div>
}