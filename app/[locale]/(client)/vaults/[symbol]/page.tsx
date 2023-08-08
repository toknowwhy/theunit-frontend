import ManageVault from '@/components/vaults/ManageVault';
import VaultNetworkProvider from '@/components/vaults/VaultNetworkProvider';

export default async function ManageVaultPage({
  params,
}: {
  params: { symbol: string };
}) {
    return (
        <VaultNetworkProvider chainUnitId={params.symbol}>
          <ManageVault />
        </VaultNetworkProvider>
    )
}