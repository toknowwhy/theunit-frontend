export default function FarmInfo({
    title,
    value,
    price,
} : {
    title: string,
    value: number,
    price: number,
}) {
    return (
        <div>
            <div className="text-gray">{title}</div>
            <div className="text-2xl font-semibold">{value.toFixed(3)}</div>
            <div className="text-2xl">Ø{(price * value).toFixed(3)}</div>
        </div>
    )
}