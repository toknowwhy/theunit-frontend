import { CoinTableData } from "@/utils/types"
import { useTranslations } from "next-intl"
import Table from "./Table";

export default function UnitTable({
    titleKey,
    subtitleKey,
    data,
    isCandidate = false,
} : {
    titleKey: string,
    subtitleKey: string,
    data: CoinTableData[],
    isCandidate?: boolean,
}) {
    const t = useTranslations("TheUnit");
    const headers = [
        t('rank'),
        t('name'),
        t('price'),
        t('h24'),
        t('market-cap'),
        t('volume'),
    ]

    return <>
        <div className="text-4xl font-bold">{t(titleKey)}</div>
        <div className="text-gray mb-6 text-lg">{t(subtitleKey)}</div>
        <Table data={data} headers={headers} isCandidate={isCandidate} />
    </>
}