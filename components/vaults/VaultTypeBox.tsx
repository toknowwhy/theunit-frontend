import { useTranslations } from 'next-intl';
import VaultTypeList from './VaultTypeList';

export default function VaultTypeBox() {
    const t = useTranslations('Vault')

    return <div className="w-full max-w-2xl mx-auto bg-gray-darker border border-gray rounded-lg px-8 py-10 mt-24">
        <div className="mb-10 text-2xl">{t('choose-vault')}</div>
        <div className="grid grid-cols-[1fr_1px_1fr] gap-8">
            <VaultTypeList isStable={false} />
            <div className="w-px h-full bg-gray-dark"></div>
            <VaultTypeList />
        </div>
    </div>
}
