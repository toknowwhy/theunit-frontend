'use client';

import { useCollateralDetail } from "@/crypto/hooks/useCollateralDetail";

export default function ManageVault({
    symbol
} : {
    symbol: string
}) {
    const { data, isError, isLoading } = useCollateralDetail(symbol);
    return <>AAAA: {isLoading} BBBB: {isError} CCCC: {data[0].toNumber()}</>
}