import { useAtomTransaction } from "@/utils/hooks/useAtomTransaction";
import { TransactionState } from "@/utils/types";
import { ReactNode } from "react";
import Button from "../form/Button";

export default function TxButton({ 
    txId,
    loading = false,
    onClick,
    children,
} : { 
    txId: string,
    loading?: boolean,
    onClick: () => void,
    children: ReactNode,
}) {
    const transaction = useAtomTransaction(txId);
    const isLoading = loading || transaction?.state === TransactionState.pending

    return <Button onClick={onClick} loading={isLoading}>
        { children }
    </Button>
}