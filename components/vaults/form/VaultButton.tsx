import { memo } from "react";
import { useVaultTranslations } from "@/utils/hooks/useVaultTranslations";
import { VaultButtonProps } from "@/utils/types";
import Button from "../../form/Button";
import VaultApproveButton from "./VaultApproveButton";
import ConfirmBtn from "./ManageButton";

const VaultButton = memo(function VaultButton(props: VaultButtonProps) {
    const t = useVaultTranslations();
    const { unitAmount, disabled, isManage } = props;

    if (disabled) {
        return <Button disabled>{ isManage ? t('update') : t('create')}</Button>
    }

    return (unitAmount < 0 || !isManage) ? 
            <VaultApproveButton { ...props } /> : 
            <ConfirmBtn { ...props } />
})

export default VaultButton;