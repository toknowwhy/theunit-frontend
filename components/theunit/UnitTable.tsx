import { CoinData } from "@/app/db/types"
import { useTranslations } from "next-intl"
import ClientTable from "./ClientTable";

export default function UnitTable({
    titleKey,
    subtitleKey,
    data
} : {
    titleKey: string,
    subtitleKey: string,
    data: CoinData[]
}) {
    const t = useTranslations("TheUnit");

    return <>
        <div className="page-title">{t(titleKey)}</div>
        <div className="page-subtitle">{t(subtitleKey)}</div>
        <ClientTable data={data} />
    </>
}