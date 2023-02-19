import VaultTypeBox from "@/components/vaults/VaultTypeBox";
import { useTranslations } from "next-intl";

export default function VaultPage() {

    const t = useTranslations('Vault');
    const translations = {
        "vault": t('vault'),
        "choose-vault": t('choose-vault')
    }

    return <VaultTypeBox t={translations} />
}