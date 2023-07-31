'use client';

import { ReactNode } from "react";
import Spinner from "../Spinner";

export interface ButtonProps {
    disabled?: boolean;
    loading?: boolean;
    onClick?: () => void;
    children: ReactNode;
}

export default function Button({ 
    disabled=false, 
    loading=false, 
    onClick, 
    children 
}: ButtonProps) {
    let names = "font-semibold text-xl cursor-pointer w-full rounded-xl py-3 text-center border border-gray-border text-white ";
    if (disabled) {
        names += "bg-gray-border cursor-not-allowed";
    } else if (loading) {
        names += "flex items-center justify-center gap-4 bg-input cursor-not-allowed";
    } else {
        names += "text-light hover:bg-input active:bgd-gradient"
    }

    return (
        <div 
            className={names}
            onClick={() => {
                if (!disabled && !loading && onClick) {
                    onClick();
                }
            }} 
        >
            {loading && <Spinner small /> }
            {children} 
        </div>
    )
}