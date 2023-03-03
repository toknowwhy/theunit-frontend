import VaultInfoBox from "./VaultInfoBox";

export default function VaultStats({
    camount,
    uamount,
    unitValueAfter,
    collateralValueAfter,
    liquidationRatio,
    price,
}: {
    camount: number,
    uamount: number,
    unitValueAfter: number,
    collateralValueAfter: number,
    liquidationRatio: number,
    price: number,
}) {
    const ratio = collateralValueAfter == 0 ? 0 : (collateralValueAfter * price / unitValueAfter);
    
    let liquidationPrice: string|number = 0;
    let liquidationPriceAfter: string|number = 0;
    if (camount > 0) {
        liquidationPrice = uamount == 0 ? "Infinity" : (liquidationRatio * uamount / camount);
    }
    if (collateralValueAfter > 0) {
        liquidationPriceAfter = unitValueAfter == 0 ? "Infinity" : (liquidationRatio * unitValueAfter / collateralValueAfter);
    }

    let collateralRatio: string | number = 0;
    if (uamount > 0) {
        collateralRatio = (camount * price / uamount * 100).toFixed(2);
    } else if (uamount == 0 && camount > 0) {
        collateralRatio = 'Infinity';
    }


    return (
        <div className="py-10 px-8 bg-gray-darker rounded-lg border-r-8 border-r-gray-border border-b-8 border-b-gray-border grid grid-cols-3 gap-y-16">
            <VaultInfoBox
                title="liquidation-price"
                value={`Ø${liquidationPrice}`}
                info="liquidation-price-info"
                extraValue={`Ø${liquidationPriceAfter}`}
            />
            <VaultInfoBox
                title="vault-unit-debt"
                value={uamount}
                extraValue={unitValueAfter}
            />
            <VaultInfoBox
                title="available-to-generate"
                value={(camount * price * liquidationRatio - uamount).toFixed(2)}
                extraValue={(collateralValueAfter * price * liquidationRatio - unitValueAfter).toFixed(2)}
            />
            <VaultInfoBox
                title="collateralization-ratio"
                value={collateralRatio + '%'}
                info="collateralization-ratio-info"
                extraValue={(ratio*100).toFixed(2) + '%'}
            />
            <VaultInfoBox
                title="collateral-locked"
                value={camount}
                info="collateral-locked-info"
                extraValue={collateralValueAfter}
            />
            <VaultInfoBox
                title="available-to-withdraw"
                value={Math.max(0, (camount - uamount / price / liquidationRatio))}
                extraValue={Math.max(0, (collateralValueAfter - unitValueAfter / price / liquidationRatio))}
            />
        </div>
    )
}