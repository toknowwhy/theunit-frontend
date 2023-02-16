import Image from "next/image";
import redArrow from '@/public/red-arrow.svg';
import greenArrow from '@/public/green-arrow.svg';

export default function PriceChange({
    priceChange,
    className,
} : {
    priceChange: number,
    className?: string
}) {
    const imgSrc = priceChange < 0 ? redArrow : greenArrow;
    const perc = priceChange.toFixed(3).replace('-', '') + '%';
    return <div className={`flex items-center ${className}`}>
        <Image src={imgSrc} alt="arrow" /> 
        <span className={priceChange < 0 ? "text-red" : "text-green"}>{perc}</span>
    </div>
}