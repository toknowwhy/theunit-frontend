import PriceRow from '@/components/vaults/PriceRow';
import VaultHeader from '@/components/vaults/VaultHeader';
import { getCoinFromId } from '@/helpers/utils';
import { notFound } from 'next/navigation';

export default function ManageVaultPage({
    params,
  }: {
    params: { coinId: string };
  }) {
    const coinId = params.coinId;
    const coin = getCoinFromId(coinId);
    if (coin == null) {
        return notFound();
    }

    return <>
        <VaultHeader coin={coin} />
        <PriceRow />
    </>
}