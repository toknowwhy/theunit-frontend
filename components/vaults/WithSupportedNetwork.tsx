'use client';

import { useIsCorrectNetwork } from '@/crypto/hooks/useIsCorrectNetwok';
import ConnectWallet from '../button/ConnectWallet';

export default function WithSupportedNetwork({ children } : {children: JSX.Element}) {

    const isCorrectNetwork = useIsCorrectNetwork();
    if (isCorrectNetwork) {
        return children;
    }

    return <div className='text-center'><ConnectWallet /></div>
}
