import { networkById } from '@/crypto/config';
import { useAccount, useNetwork } from 'wagmi';

export const useIsCorrectNetwork = () => {
    const { isConnected } = useAccount();
    const { chain } = useNetwork();
    const network = networkById[chain?.id ?? ""];
    return isConnected && network;
}