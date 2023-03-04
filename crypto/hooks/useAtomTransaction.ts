import { useAtom } from "jotai"
import { transactionsAtom } from "../atoms"

export const useAtomTransaction = (id?: string) => {
    const [transactions] = useAtom(transactionsAtom)
    return transactions.find((transaction) => transaction.id === id)
}