import { ReactNode } from "react";

export default function GradientBorder({
    active = false,
    className = '',
    children
} : {
    active?: boolean,
    className?: string,
    children: ReactNode
}) {
    return (
        <div className={(active ? "bgd-gradient" : "bg-gray-border") + " rounded-lg p-[1px] " + className}>
            <div className="bg-gray-border-light relative rounded-lg overflow-hidden">
                {active && <div className="absolute top-0 right-0 bottom-0 left-0 bgd-gradient-light" />}
                { children }
            </div>
        </div>
    )
}