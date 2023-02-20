'use client';

import { ReactNode } from "react";

export interface ButtonProps {
    disabled?: boolean;
    loading?: boolean;
    onClick: () => void;
    children: ReactNode;
}

export default function Button({ 
    disabled=false, 
    loading=false, 
    onClick, 
    children 
}: ButtonProps) {
    return (
        <div 
            className="cursor-pointer w-full bg-gray-dark text-gray rounded-xl py-3 text-center hover:text-text hover:bg-primary"
            onClick={() => {
                if (!disabled && !loading) {
                    onClick();
                }
            }} 
        >
            {children} {loading && <>...</>}
        </div>
    )
}