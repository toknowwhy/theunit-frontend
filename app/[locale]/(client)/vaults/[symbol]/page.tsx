import ManageVault from '@/components/vaults/ManageVault';

export default async function ManageVaultPage({
  params,
}: {
  params: { symbol: string };
}) {
    return (
          <ManageVault collateral={params.symbol} />
    )
}