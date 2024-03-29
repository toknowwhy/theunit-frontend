import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { TabItem } from "@/utils/types"
import arrowUp from "@/public/icons/arrow-up.svg"

export default function DropDown<T>({
    tabs,
    onSelect,
    selected,
} : {
    tabs: TabItem<T>[],
    onSelect: (value: TabItem<T>) => void,
    selected: TabItem<T>,
}) {

    const [show, setShow] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent): void {
          if (ref.current && !ref.current.contains(event.target as Node)) {
            setShow(false);
          }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
    });

    return (
        <div className="relative z-[999]" ref={ref}>
            <div 
                onClick={() => {
                    setShow(!show);
                }}
                className="inline-flex border border-gray-border p-1 pr-4 rounded-lg cursor-pointer items-center justify-between"
            >
                <div className="min-w-[160px]">
                    <DropDownItem<T>
                        item={selected}
                        onSelect={() => {}}
                    />
                </div>
                <Image 
                    src={arrowUp} 
                    alt="network" 
                    className={"-mt-[1px] transition-transform " + (show ? "rotate-0" : "rotate-180")}
                />
            </div>
            {show && <div className="absolute left-0 right-0 top-14 flex flex-col bg-gray-border rounded-lg py-4">
                {tabs.map((tab) => (
                    <DropDownItem<T>
                        key={tab.title}
                        item={tab}
                        onSelect={(val: TabItem<T>) => {
                            onSelect(val);
                            setShow(false);
                        }}
                    />
                ))}
            </div>}
        </div>
    )
}

function DropDownItem<T>({ 
    item, 
    onSelect,
} : { 
    item: TabItem<T>,
    onSelect: (value: TabItem<T>) => void,
}) {
    return (
        <div 
            className='inline-flex items-center gap-2 px-8 py-2 cursor-pointer'
            onClick={() => { onSelect(item) }}
        >
            { item.icon && <Image className="-mt-1" width={24} height={24} src={item.icon} alt={item.title} />}
            { item.title }
        </div>
    )
}