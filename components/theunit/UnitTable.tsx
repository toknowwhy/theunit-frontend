import { CoinTableData } from "@/app/db/types"
import { useTranslations } from "next-intl"
import EmptySpace from "../EmptySpace";
import Table from "./Table";

export default function UnitTable({
    titleKey,
    subtitleKey,
    data
} : {
    titleKey?: string,
    subtitleKey?: string,
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
        {titleKey && <div className="page-title">{t(titleKey)}</div>}
        {subtitleKey && <div className="page-subtitle">{t(subtitleKey)}</div>}
        <EmptySpace size="medium" />
        <Table data={data} headers={headers} />
    </>
}