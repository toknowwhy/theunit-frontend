import { useAccount, useBalance } from "wagmi"

export const useMyBalance = () => {
    const { address } = useAccount();
    const { data } = useBalance({address})
    return data?.formatted ? parseFloat(data.formatted) : 0;
}