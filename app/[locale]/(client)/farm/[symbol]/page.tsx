import Farm from '@/components/farm/Farm';

export default async function FarmPage({
    params,
  }: {
    params: { symbol: string };
  }) {
    const symbol = params.symbol;

    return <Farm symbol={symbol} />
}