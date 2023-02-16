import { CoinTableData } from "@/app/db/types"
import { useTranslations } from "next-intl"
import Table from "./Table";

export default function UnitTable({
    titleKey,
    subtitleKey,
    data
} : {
    titleKey: string,
    subtitleKey: string,
    data: CoinTableData[]
}) {
    const t = useTranslations("TheUnit");
    const headers = [
        t('table-rank'),
        t('table-name'),
        t('table-price'),
        t('table-24'),
        t('table-marketcap'),
        t('table-volume'),
    ]

    return <>
        <div className="text-4xl">{t(titleKey)}</div>
        <div className="text-gray mb-6">{t(subtitleKey)}</div>
        <Table data={data} headers={headers} />
    </>
}