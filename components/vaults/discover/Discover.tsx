'use client'

import Tabs from "@/components/form/Tabs"
import { supportedNetworks } from "@/crypto/config"
import { DiscoverRank, TabItem } from "@/utils/types"
import { useState } from "react"
import DiscoverList from "./DiscoverList"
import DiscoverProvider from "./DiscoverProvider"
import { useContracts } from "../VaultNetworkProvider"
import Spinner from "@/components/Spinner"

export default function Discover({
    tabs,
    headers,
    untilText,
    viewText,
} : {
    tabs: TabItem<DiscoverRank>[],
    headers: string[],
    untilText: string,
    viewText: string,
}) {

    const [rank, setRank] = useState<DiscoverRank>('risk')
    const network = useContracts();

    const onTabSelect = (value: DiscoverRank) => {
        setRank(value)
    }

    if (!network) {
        return <Spinner />
    }

    return (
        <div className="pt-3">
            <div className="flex items-center gap-4 mb-4">
                <Tabs<DiscoverRank>
                    tabs={tabs} 
                    onSelect={onTabSelect} 
                    selected={rank} 
                />
            </div>
            <DiscoverProvider subgraphUrl={supportedNetworks[network.id].subgraphUrl}>
                <DiscoverList 
                    headers={headers} 
                    rank={rank} 
                    chainId={network.id.toString()} 
                    viewText={viewText}
                    untilText={untilText}
                />
            </DiscoverProvider>
        </div>
    )
}