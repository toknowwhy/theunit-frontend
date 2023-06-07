import { ReactNode } from "react";

export default function GradientBorder({
    className,
    children
} : {
    className: string,
    children: ReactNode
}) {
    return (
        <div className="bg-gradient rounded-lg p-[1px]">
            <div className={className}>
                { children }
            </div>
        </div>
    )
}