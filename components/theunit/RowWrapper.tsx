'use client';

import { ReactNode } from "react";

export default function RowWrapper({
    coinId,
    className,
    children
} : {
    coinId: string,
    className: string,
    children: ReactNode
}) {
    return <div className={className} onClick={() => { console.log(coinId) }}>
        {children}
    </div>
}