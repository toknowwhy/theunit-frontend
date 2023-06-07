'use client';

import { ReactNode } from "react";
import ClipLoader from "react-spinners/ClipLoader";

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
    let names = "font-semibold text-xl cursor-pointer w-full rounded-xl py-3 text-center border border-gray-border";
    if (disabled) {
        names += " bg-input text-white";
    } else if (loading) {
        names += " bg-input flex items-center justify-center gap-4";
    } else {
        names += " text-black-light dark:text-white hover:bgd-gradient"
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
            {children} 
            {loading && <ClipLoader
                            color="#ffffff"
                            size={20}
                        />
            }
        </div>
    )
}