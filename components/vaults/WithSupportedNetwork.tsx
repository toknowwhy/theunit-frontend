'use client';

import { useIsCorrectNetwork } from '@/crypto/hooks/useIsCorrectNetwok';
import { useVaultTranslations } from '@/crypto/hooks/useVaultTranslations';
import ConnectWallet from '../button/ConnectWallet';

export default function WithSupportedNetwork({ children } : {children: JSX.Element}) {

    const t = useVaultTranslations();

    const isCorrectNetwork = useIsCorrectNetwork();
    if (isCorrectNetwork) {
        return children;
    }

    return <div className='text-center'>
            <ConnectWallet connectLabel={t('connect-wallet')} networkLabel={t('switch-network')} />
        </div>
}
