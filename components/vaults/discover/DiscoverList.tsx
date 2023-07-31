'use client'

import DropDown from "@/components/form/DropDown"
import Tabs from "@/components/form/Tabs"
import { DiscoverRank, TabItem } from "@/utils/types"
import { useState } from "react"

export default function DiscoverList({
    tabs,
    headers,
    networks,
} : {
    tabs: TabItem<DiscoverRank>[],
    headers: string[],
    networks: TabItem<string>[],
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
            <div className="grid grid-cols-7 py-8 px-10 border border-gray-border mt-4 rounded-2xl">
                {headers.map((h) => (
                    <div key={h} className="text-gray">
                        {h}
                    </div>
                ))}
            </div>
        </div>
    )
}