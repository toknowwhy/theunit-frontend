'use client';

import { LoadingOutlined } from "@ant-design/icons";
import { ReactNode } from "react";
import styles from "./Button.module.scss";

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
            className={`${styles.button} ${loading && 'loading'} ${disabled && 'disabled'}`} 
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