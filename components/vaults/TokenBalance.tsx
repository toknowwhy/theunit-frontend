import Image from "next/image";
import wallet from "@/public/icons/wallet.png";

export default function TokenBalance({ balance } : { balance?: number }) {
    return <div className="flex items-center text-sm text-gray gap-2">
        <Image src={wallet} alt="wallet" width={20} height={20} /> 
        <div>{balance ? balance.toFixed(2) : 0}</div>
    </div>
}