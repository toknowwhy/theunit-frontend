export default function LPInfo({
    symbol,
    lp,
    total
} : {
    symbol: string,
    lp: number,
    total: number,
}) {
    return (
        <div className="text-base">
            <span className="text-base text-gray">{symbol}/TINU LP: </span>
            <span className="font-semibold pr-4 pl-1">{lp.toFixed(3)}</span>
            <span>Ø{total.toFixed(3)}</span>
        </div>
    )
}