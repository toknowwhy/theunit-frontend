import VaultInfoBox, { VaultInfoBoxProps } from "./VaultInfoBox";

export default function VaultStats({
    camount,
    uamount,
    unitValueAfter,
    collateralValueAfter,
    liquidationRatio,
    price,
    error,
}: {
    camount: number,
    uamount: number,
    unitValueAfter: number,
    collateralValueAfter: number,
    liquidationRatio: number,
    price: number,
    error: string,
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
        collateralRatio = camount * price / uamount * 100;
    } else if (uamount == 0 && camount > 0) {
        collateralRatio = 'Infinity';
    }

    let availableToWithdraw = 0;
    let availableToWithdrawAfter = 0;
    if (price > 0 && liquidationRatio > 0) {
        availableToWithdraw = Math.max(0, (camount - uamount / price / liquidationRatio))
        availableToWithdrawAfter = Math.max(0, (collateralValueAfter - unitValueAfter / price / liquidationRatio))
    }

    let boxes: VaultInfoBoxProps[] = [
        {
            title: "liquidation-price",
            value: liquidationPrice,
            info: "liquidation-price-info",
            extraValue: liquidationPriceAfter,
        },
        {
            title: "vault-unit-debt",
            value: uamount,
            extraValue: unitValueAfter,
        },
        {
            title: "available-to-generate",
            value: camount * price * liquidationRatio - uamount,
            extraValue: collateralValueAfter * price * liquidationRatio - unitValueAfter,
        },
        {
            title: "collateralization-ratio",
            value: collateralRatio,
            info: "collateralization-ratio-info",
            extraValue: (ratio*100).toFixed(3) + '%',
            suffix: '%'
        },
        {
            title: "collateral-locked",
            value: camount,
            info: "collateral-locked-info",
            extraValue: collateralValueAfter,
            suffix: 'ETH'
        },
        {
            title: "available-to-withdraw",
            value: availableToWithdraw,
            extraValue: availableToWithdrawAfter,
            suffix: 'ETH'
        },
    ];

    if (unitValueAfter === uamount && collateralValueAfter === camount) {
        boxes = boxes.map((box) => {
            return { ...box, extraValue: undefined }
        })
    }


    return (
        <div className="py-10 px-8 bg-gray-darker rounded-lg border-r-8 border-r-gray-border border-b-8 border-b-gray-border grid grid-cols-3 gap-y-16">
            {boxes.map((box) => <VaultInfoBox key={box.title} { ...box } />)}
        </div>
    )
}