'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit'
import Button from './Button';

export default function ConnectWallet() {
    return (
        <ConnectButton.Custom>
          {({ openConnectModal, mounted }) => {
            const ready = mounted
    
            return (
                <Button onClick={openConnectModal} disabled={!ready}>
                    Connect Wallet
                </Button>
            )
          }}
        </ConnectButton.Custom>
      )
}