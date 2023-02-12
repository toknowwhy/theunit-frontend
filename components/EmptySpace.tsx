export type CustomSize = "small" | "medium" | "large";

export default function EmptySpace({
    size="small", 
    isVertical = true
} : {
    size?: CustomSize, 
    isVertical?: boolean
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
        default: { 
            gap =  '8px';
            break; 
        } 
    } 
    return <div style={{
        width: isVertical ? '1px' : gap, 
        height: isVertical ? gap : '1px'
    }}></div>
}