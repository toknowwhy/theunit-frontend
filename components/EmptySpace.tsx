import { CustomSize } from "@/helpers/types";

export default function EmptySpace({
    size="small", 
    isVertical = true,
    background,
    width = 1,
} : {
    size?: CustomSize, 
    isVertical?: boolean,
    background?: string,
    width?: number
}) {
    let gap;
    switch(size) { 
        case 'medium': { 
            gap = '16px';
            break; 
        } 
        case 'large': { 
            gap = '24px';
            break; 
        }
        case 'full': { 
            gap = '100%';
            break; 
        }
        default: { 
            gap =  '8px';
            break; 
        } 
    } 
    const w = `${width}px`;
    return <div style={{
        width: isVertical ? w : gap, 
        height: isVertical ? gap : w,
        backgroundColor: background ?? 'none'
    }}></div>
}