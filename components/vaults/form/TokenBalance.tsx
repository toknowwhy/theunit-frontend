import Image from "next/image";
import wallet from "@/public/icons/wallet.png";

export default function TokenBalance({ balance } : { balance?: number }) {
    return <div className="flex items-center text-base text-gray gap-2">
        <Image src={wallet} alt="wallet" width={18} height={18} /> 
        <div>{balance ? balance.toFixed(2) : 0}</div>
    </div>
}