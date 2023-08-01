import Spinner from '@/components/Spinner';
import { allNetworkContracts } from '@/crypto/config';
import { DiscoverRank } from '@/utils/types';
import { gql, useQuery } from '@apollo/client';
import { Fragment } from 'react';
import { formatEther } from 'viem';
import { useContractRead } from 'wagmi';

export default function DiscoverList({
    headers,
    rank,
    chainId,
} : {
    headers: string[],
    rank: DiscoverRank,
    chainId: string,
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

    return (
        <div className="w-full grid grid-cols-5 py-8 px-10 border border-gray-border mt-4 rounded-2xl">
            {headers.map((h) => (
                <div key={h} className="text-gray">
                    {h}
                </div>
            ))}
            {loading && <Spinner small />}
            {error && <div>{error.toString()}</div>}
            {data?.vaultActions.map((vaultAction: any) => {
                const liquidationPrice = vaultAction.liquidationPrice / 1000;
                const nextPrice = priceData ? parseFloat(formatEther(priceData as bigint)) : undefined;

                return <Fragment key={vaultAction.id}>
                    <div>{liquidationPrice.toFixed(3)}</div>
                    {priceLoading ? <Spinner small /> : (
                        <div>{nextPrice ? nextPrice.toFixed(3) : 'NA'}</div>
                    )}
                    <div>{parseFloat(formatEther(vaultAction.unitDebt)).toFixed(3)}</div>
                    <div>{nextPrice ? ((nextPrice - liquidationPrice) / nextPrice * 100).toFixed(3) + '%' : 'NA'}</div>
                    <div>View</div>
                </Fragment>
            })}
        </div>
    )
}