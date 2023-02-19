import { Link } from 'next-intl';
import { TokenDesc } from "@/crypto/types";
import CoinLogo from '../CoinLogo';

export default function VaultType({coin}: {coin: TokenDesc}) {

    return <Link href={"/vaults/"+coin.symbol} className="flex items-center justify-between cursor-pointer px-3 py-2 text-xl rounded hover:bg-gray-dark">
        <div>{coin.symbol}-UNIT</div>
        <div className="w-8 h-8 bg-white p-1 rounded-3xl">
            <CoinLogo coinId={coin.coinId} />
        </div>
    </Link>
}