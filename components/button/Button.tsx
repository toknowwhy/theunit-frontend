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
    let names = "cursor-pointer w-full rounded-xl py-3 text-center";
    if (disabled) {
        names += " bg-gray-dark text-gray";
    } else if (loading) {
        names += " bg-primary/50 flex items-center justify-center gap-4";
    } else {
        names += " bg-primary text-black-light dark:text-text"
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