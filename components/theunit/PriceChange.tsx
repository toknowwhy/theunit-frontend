import Image from "next/image";
import redArrow from '@/public/red-arrow.svg';
import greenArrow from '@/public/green-arrow.svg';

export default function PriceChange({
    priceChange,
    className,
    diff,
} : {
    priceChange: number,
    className?: string,
    diff?: number,
}) {
    const imgSrc = priceChange < 0 ? redArrow : greenArrow;
    const perc = priceChange.toFixed(3).replace('-', '') + '%';
    const sign = priceChange < 0 ? '' : '+';
    const color = priceChange < 0 ? "text-red" : "text-green";
    return <div className={`${color} ${className}`}>
        {diff && <span className="pr-4">{sign}{diff.toFixed(3)}</span>}
        <Image className="inline-block -mt-[2px]" src={imgSrc} alt="arrow" /> 
        <span>{perc}</span>
    </div>
}