import { ReactNode } from "react";
import BoxContainer from "../BoxContainer";

export default function FarmBox({children} : {children: ReactNode}) {
    return (
        <BoxContainer>
            <div className="p-10 h-full min-h-[480px]">
                {children}
            </div>
        </BoxContainer>
    )
}