import VaultTypeList from "@/components/vaults/VaultTypeList";
import { useVaultTranslations } from "@/crypto/hooks/useVaultTranslations";

export default function VaultPage() {
    const t = useVaultTranslations();

    return <div className={"w-full max-w-2xl mx-auto bg-gray-darker border border-gray rounded-lg px-8 py-10 mt-24 relative"}>
                <div className="mb-10 text-2xl">{t('choose-vault')}</div>
                <div className="grid grid-cols-2 gap-16">
                    <VaultTypeList isStable={false} />
                    <VaultTypeList />
                </div>
            </div>
}