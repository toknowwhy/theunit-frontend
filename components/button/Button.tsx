'use client';

import { LoadingOutlined } from "@ant-design/icons";
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
            className=""
            onClick={() => {
                if (!disabled && !loading) {
                    onClick();
                }
            }} 
        >
            {children} {loading && <LoadingOutlined />}
        </div>
    )
}