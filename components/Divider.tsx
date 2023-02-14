import variables from '@/styles/_variables.module.scss';

export default function Divider({
    isVertical = true,
    size = '100%',
    thickness = 1,
    isWhite = false,
} : {
    size?: string, 
    isVertical?: boolean,
    thickness?: number,
    isWhite?: boolean
}) {
    const w = `${thickness}px`;
    return <div style={{
        width: isVertical ? w : size, 
        height: isVertical ? size : w,
        backgroundColor: isWhite ? variables.white : variables.heavyGrey
    }}></div>
}