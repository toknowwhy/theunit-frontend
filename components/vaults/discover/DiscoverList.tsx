import Spinner from '@/components/Spinner';
import { allNetworkContracts } from '@/crypto/config';
import { shortenAddress } from '@/utils/functions';
import { DiscoverRank, VaultEvent } from '@/utils/types';
import { gql, useQuery } from '@apollo/client';
import { Fragment } from 'react';
import { formatEther } from 'viem';
import { useContractRead } from 'wagmi';

export default function DiscoverList({
    headers,
    rank,
    chainId,
    untilText,
    viewText,
} : {
    headers: string[],
    rank: DiscoverRank,
    chainId: string,
    untilText: string,
    viewText: string,
}) {

    const orderby = rank === 'debt' ? 'unitDebt' : 'liquidationPrice';
    const contracts = allNetworkContracts[chainId]
    const {data: priceData, isLoading: priceLoading} = useContractRead({
        ...contracts.UnitPriceFeed,
        functionName: 'latestAnswer',
        chainId: parseInt(chainId)
    })


    const GET_VAULTS = gql`
        query GetVaults {
            vaultActions(first: 100, orderBy: ${orderby}, orderDirection: "desc") {
                id,
                liquidationPrice,
                unitDebt,
                collateralToken,
                owner,
            }
        }
    `;

    const { loading, error, data } = useQuery(GET_VAULTS);
    const actionIds: string[] = [];
    const uniqueActions: VaultEvent[] = [];
    if (data?.vaultActions) {
        const actions = data.vaultActions;
        for (let p=0; p<actions.length; p++) {
            if (actionIds.indexOf(actions[p].owner) == -1) {
                const action = actions[p];
                actionIds.push(action.owner);
                uniqueActions.push(action);
            }
        }
    }

    return <div className="w-full py-8 px-10 border border-gray-border mt-4 rounded-2xl">
        <div className="grid grid-cols-[3fr_2fr_2fr_2fr_4fr_1fr] text-gray">
            {headers.map((h) => <div className='p-4' key={h}>{h}</div>)}
        </div>
        {loading && <Spinner small />}
        {error && <div>{error.toString()}</div>}
        <div className="grid grid-cols-[3fr_2fr_2fr_2fr_4fr_1fr] font-semibold">
            {uniqueActions.map((vaultAction: VaultEvent) => {
                const liquidationPrice = Number(vaultAction.liquidationPrice) / 1000;
                const nextPrice = priceData ? parseFloat(formatEther(priceData as bigint)) : undefined;

                return <Fragment key={vaultAction.id}>
                    <div className='border-b border-b-gray-border p-4'>{shortenAddress(vaultAction.owner)}</div>
                    <div className='border-b border-b-gray-border p-4'>{liquidationPrice.toFixed(3)}</div>
                    {priceLoading ? <Spinner small /> : (
                        <div className='border-b border-b-gray-border p-4'>{nextPrice ? nextPrice.toFixed(3) : 'NA'}</div>
                    )}
                    <div className='border-b border-b-gray-border p-4'>{parseFloat(formatEther(vaultAction.unitDebt)).toFixed(3)}</div>
                    <div className='border-b border-b-gray-border p-4'>
                        <div className='bgd-gradient rounded-full inline-block px-4'>
                            {nextPrice ? (<>
                                <span className='text-base'>{((nextPrice - liquidationPrice) / nextPrice * 100).toFixed(2)}</span>
                                <span className='text-xs font-normal'>% {untilText}</span>
                            </>) : (
                                <span>NA</span>
                            )}
                        </div>
                    </div>
                    <div className='border-b border-b-gray-border p-4'>
                        <div className='bg-gray-border px-4 rounded-full'>
                            {viewText}
                        </div>
                    </div>
                </Fragment>
            })}
        </div>
    </div>
}