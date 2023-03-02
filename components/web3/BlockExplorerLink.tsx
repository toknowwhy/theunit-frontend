import { Network } from "@/crypto/config"

export default function BlockExplorerLink({
    network,
    className,
    txHash,
    children,
} : {
    network: Network
    txHash: string
    children?: React.ReactNode
    className?: string
}) {
    let etherscanNetwork = "";
    if (network.name && network.id > 1) {
        etherscanNetwork = network.name + ".";
    }

    let etherscanTxUrl = "https://" + etherscanNetwork + "etherscan.io/tx/";
    if (network.id === 100) {
        etherscanTxUrl = "https://blockscout.com/poa/xdai/tx/";
    }
    return <a 
                href={etherscanTxUrl+txHash} 
                target="_blank" 
                rel="noreferrer"
                className={className}
            >
            {children}
            </a>
}