'use client';

import { useIsCorrectNetwork } from '@/crypto/hooks/useIsCorrectNetwok';
import { useVaultTranslations } from '@/crypto/hooks/useVaultTranslations';
import { useEffect, useState } from 'react';
import ConnectWallet from '../web3/ConnectWallet';

export default function WithSupportedNetwork({ children } : {children: JSX.Element | JSX.Element[]}) {

    const t = useVaultTranslations();

    const [visible, setVisible] = useState(false);
    const isCorrectNetwork = useIsCorrectNetwork();

    useEffect(() => {
        setVisible(isCorrectNetwork);
    }, [isCorrectNetwork])

    return <>
        <div className={visible ? 'visible' : 'hidden'}>{children}</div>
        <div className={'text-center mt-48 ' + (visible ? 'hidden' : 'visible')}>
            <ConnectWallet connectLabel={t('connect-wallet')} networkLabel={t('switch-network')} />
        </div>
    </>
}
