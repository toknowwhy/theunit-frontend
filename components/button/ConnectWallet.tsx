'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit'

export default function ConnectWallet({ label } : { label: string }) {
    return <ConnectButton label={label} />;
}