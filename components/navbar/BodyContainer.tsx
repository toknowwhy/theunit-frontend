import { ReactNode } from "react"

export default function BodyContainer({
    hasBgd = false,
    children,
} : {
    hasBgd?: boolean,
    children: ReactNode
}) {
    return (
        <div className={"px-4 lg:px-12 py-14 " + (hasBgd ? "dark:bg-vault bg-no-repeat bg-right-bottom bg-contain min-h-screen" : "")}>
            {children}
        </div>
    )
}