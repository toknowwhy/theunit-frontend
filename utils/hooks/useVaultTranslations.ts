import { useTranslations } from "next-intl"

export const useVaultTranslations = () => {
    const t = useTranslations('Vault');
    return t;
}