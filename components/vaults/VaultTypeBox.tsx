'use client';

import { useIsCorrectNetwork } from '@/crypto/hooks/useIsCorrectNetwok';
import { Dictionary } from 'ts-essentials';
import ConnectWallet from '../button/ConnectWallet';
import VaultTypeList from './VaultTypeList';

export default function VaultTypeBox({ t } : { t: Dictionary<string> }) {

   const isCorrectNetwork = useIsCorrectNetwork();

    return <div className={"w-full max-w-2xl mx-auto bg-gray-darker border border-gray rounded-lg px-8 py-10 mt-24 relative"}>
        <div className="mb-10 text-2xl">{t['choose-vault']}</div>
        <div className="grid grid-cols-2 gap-16"><VaultTypeList isStable={false} /><VaultTypeList /></div>
        {!isCorrectNetwork && (
            <div className="absolute left-0 right-0 top-0 bottom-0 bg-gray-darker/80 flex justify-center items-center"><ConnectWallet /></div>
        )}
    </div>
}
