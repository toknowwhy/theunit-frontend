import { isCoinSupported } from '@/helpers/utils';
import { notFound } from 'next/navigation';

export default function ManageVaultPage({
    params,
  }: {
    params: { coinId: string };
  }) {
    const coinId = params.coinId;
    if (!isCoinSupported(coinId)) {
        return notFound();
    }

    return <>{coinId}</>
}