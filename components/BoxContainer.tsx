import { ReactNode } from "react";

export default function BoxContainer({ children } : { children: ReactNode }) {
    return (
        <div className="border border-gray-border bg-box rounded-2xl backdrop-blur-sm">
            { children }
        </div>
    )
}