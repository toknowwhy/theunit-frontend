import { coinLogoUrl } from "@/utils/functions";
import { CustomSize } from "@/utils/types";
import Image from "next/image";

export default function CoinLogo({
    coinId,
    size = "small"
} : {
    coinId: string,
    size?: CustomSize
}) {

    const darkCoins = [
        'stellar',
        'elrond-erd-2',
        'near',
        'gala',
        'iota',
        'ecomi',
    ];

    let width;
    switch(size) { 
        case 'medium': { 
            width = 40;
            break; 
        } 
        case 'large': { 
            width = 56;
            break; 
        }
        default: { 
            width = 32;
            break; 
        } 
    } 
    return <Image
                src={coinLogoUrl(coinId)}
                width={width}
                height={width}
                alt={coinId}
                className={darkCoins.indexOf(coinId) > -1 ? 'bg-white' : 'bg-none'}
            />
}