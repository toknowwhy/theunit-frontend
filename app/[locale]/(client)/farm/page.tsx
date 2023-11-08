import BodyContainer from "@/components/navbar/BodyContainer";
import VaultsSelect from "@/components/vaults/VaultSelect";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'UNIT\'s ETF DeFi farms'
}

export default function FarmsPage() {
    return (
        <BodyContainer>
            <VaultsSelect isFarm />
        </BodyContainer>
    )
}