'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit'
import Image from 'next/image';

export default function ConnectWallet({ 
  connectLabel,
  networkLabel,
  chainId,
  notHeader = false,
} : { 
  connectLabel: string,
  networkLabel: string,
  chainId?: string,
  notHeader?: boolean,
}) {
    return <ConnectButton.Custom>
    {({
      account,
      chain,
      openAccountModal,
      openChainModal,
      openConnectModal,
      mounted,
    }) => {
      const ready = mounted;
      const connected =
        ready &&
        account &&
        chain;

      const buttonClass = notHeader ? 'w-full h-full' : 'px-6 py-2 border border-gray-border rounded-lg hover:bgd-gradient';

      return (
        <div
          {...(!ready && {
            'aria-hidden': true,
            'style': {
              opacity: 0,
              pointerEvents: 'none',
              userSelect: 'none',
            },
          })}
        >
          {(() => {
            if (!connected) {
              return (
                <button onClick={openConnectModal} type="button" className={buttonClass}>
                  {connectLabel}
                </button>
              );
            }

            if (chain.unsupported || (chainId && chain.id.toString() !== chainId)) {
              return (
                <button onClick={openChainModal} type="button" className={buttonClass}>
                  {networkLabel}
                </button>
              );
            }

            return (
              <div className="flex gap-0">
                <button
                  onClick={openChainModal}
                  className="flex items-center bg-gray-darker rounded-l-lg px-4 text-sm"
                  type="button"
                >
                  {chain.hasIcon && (
                    <div
                      style={{
                        background: chain.iconBackground,
                        width: 12,
                        height: 12,
                        borderRadius: 999,
                        overflow: 'hidden',
                        marginRight: 4,
                      }}
                    >
                      {chain.iconUrl && (
                        <Image
                          alt={chain.name ?? 'Chain icon'}
                          src={chain.iconUrl}
                          width={24}
                          height={24}
                        />
                      )}
                    </div>
                  )}
                  {chain.name}
                </button>

                <button 
                  className="border border-gray px-4 py-2 rounded-lg text-sm bg-gray-dark hover:bgd-gradient"
                  onClick={openAccountModal} 
                  type="button"
                >
                  {account.displayName}
                </button>
              </div>
            );
          })()}
        </div>
      );
    }}
  </ConnectButton.Custom>
}