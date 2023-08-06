'use client'

import DropDown from "@/components/form/DropDown"
import Tabs from "@/components/form/Tabs"
import { supportedNetworks } from "@/crypto/config"
import { DiscoverRank, TabItem } from "@/utils/types"
import { useState } from "react"
import DiscoverList from "./DiscoverList"
import DiscoverProvider from "./DiscoverProvider"

export default function Discover({
    tabs,
    headers,
    networks,
    untilText,
    viewText,
} : {
    tabs: TabItem<DiscoverRank>[],
    headers: string[],
    networks: TabItem<string>[],
    untilText: string,
    viewText: string,
}) {

    const [rank, setRank] = useState<DiscoverRank>('risk')
    const [network, setNetwork] = useState<TabItem<string>>(networks[0])

    const onTabSelect = (value: DiscoverRank) => {
        setRank(value)
    }

    const onNetworkSelect = (item: TabItem<string>) => {
        setNetwork(item)
    }

    return (
        <div className="pt-3">
            <div className="flex items-center gap-4">
                <DropDown<string>
                    tabs={networks}
                    onSelect={onNetworkSelect}
                    selected={network}
                />
                <Tabs<DiscoverRank>
                    tabs={tabs} 
                    onSelect={onTabSelect} 
                    selected={rank} 
                />
            </div>
            <DiscoverProvider subgraphUrl={supportedNetworks[network.value].subgraphUrl}>
                <DiscoverList 
                    headers={headers} 
                    rank={rank} 
                    chainId={network.value} 
                    viewText={viewText}
                    untilText={untilText}
                />
            </DiscoverProvider>
        </div>
    )
}