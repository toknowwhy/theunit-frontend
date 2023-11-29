'use client'

import { useState } from "react"
import VaultsSelect from "./VaultSelect"
import Discover from "./discover/Discover"
import { TabItem, DiscoverRank } from "@/utils/types"

export default function VaultTabs({
    tabs,
    headers,
    untilText,
    viewText,
    vaultTitle,
    vaultListTitle,
} : {
    tabs: TabItem<DiscoverRank>[],
    headers: string[],
    untilText: string,
    viewText: string,
    vaultTitle: string,
    vaultListTitle: string,
}) {

    const [selected, setSelected] = useState(vaultTitle)

    return <>
        <div className="flex gap-12 mb-10">
            <VaultTab 
                title={vaultTitle} 
                active={selected === vaultTitle}
                onClick={setSelected}
            />
            <VaultTab 
                title={vaultListTitle} 
                active={selected === vaultListTitle}
                onClick={setSelected}
            />
        </div>
        <div>
            { selected === vaultTitle ? (
                    <VaultsSelect />
            ) : (
                <Discover 
                    tabs={tabs} 
                    headers={headers} 
                    viewText={viewText}
                    untilText={untilText}
                />
            ) }
        </div>
    </>

}

function VaultTab({
    title,
    active,
    onClick,
} : {
    title: string,
    active: boolean,
    onClick: (title: string) => void,
}) {
    return <div 
        className={"text-4xl cursor-pointer transition-all " + (active ? "text-white font-bold" : "text-gray-medium")}
        onClick={() => { onClick(title )}}
    >
        {title}
    </div>
}