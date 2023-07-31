import { TabItem } from "@/utils/types"

export default function Tabs<T>({
    tabs,
    onSelect,
    selected,
} : {
    tabs: TabItem<T>[],
    onSelect: (value: T) => void,
    selected: T,
}) {
    return (
        <div className="inline-flex p-1 border border-gray-border rounded-lg">
            {tabs.map((tab) => (
                <Tab 
                    key={tab.title} 
                    onSelect={onSelect}
                    active={selected === tab.value}
                    item={tab} 
                />
            ))}
        </div>
    )
}

function Tab<T>({ 
    item, 
    onSelect,
    active = false,
} : { 
    item: TabItem<T>,
    onSelect: (value: T) => void,
    active?: boolean,
}) {
    return (
        <div 
            className={"px-8 py-2 cursor-pointer " + (active ? 'rounded-md bg-gray-border text-text-light font-semibold' : 'text-gray-medium')}
            onClick={() => { onSelect(item.value) }}
        >
            {item.title}
        </div>
    )
}