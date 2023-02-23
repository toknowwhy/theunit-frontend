import { basicTokens } from "@/crypto/config";
import { TokenDesc } from "@/crypto/types";
import VaultType from "./VaultType";

export default function VaultTypeList({isStable=true}: {isStable?: boolean}) {
    
    return <div className="flex flex-col gap-8">
        {basicTokens
            .filter((col: TokenDesc) => col.stable == isStable)
            .map((l) => <VaultType key={l.coinId} coin={l} />)
        }
    </div>
}