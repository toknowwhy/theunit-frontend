import BoxContainer from "@/components/BoxContainer";
import VaultInfoBox, { VaultInfoBoxProps } from "./VaultInfoBox";

export default function VaultStats({
    camount,
    uamount,
    unitValueAfter,
    collateralValueAfter,
    liquidationRatio,
    price,
    symbol,
}: {
    camount: number,
    uamount: number,
    unitValueAfter: number,
    collateralValueAfter: number,
    liquidationRatio: number,
    price: number,
    symbol: string,
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
        availableToWithdraw = Math.max(0, (camount - liquidationRatio * uamount / price ))
        availableToWithdrawAfter = Math.max(0, (collateralValueAfter - unitValueAfter * liquidationRatio / price))
    }

    const availableToGenerate = camount * price * liquidationRatio - uamount;
    const availableToGenerateAfter = collateralValueAfter * price * liquidationRatio - unitValueAfter;

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
            value: Math.floor(availableToGenerate * 1000) / 1000,
            extraValue: Math.floor(availableToGenerateAfter * 1000) / 1000,
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
            suffix: symbol
        },
        {
            title: "available-to-withdraw",
            value: Math.floor(availableToWithdraw * 1000) / 1000,
            extraValue: Math.floor(availableToWithdrawAfter * 1000) / 1000,
            suffix: symbol
        },
    ];

    if (unitValueAfter === uamount && collateralValueAfter === camount) {
        boxes = boxes.map((box) => {
            return { ...box, extraValue: undefined }
        })
    }


    return (
        <BoxContainer>
            <div className="py-6 px-4 sm:py-10 sm:px-8">
                <div className="grid grid-cols-3 divide-x group above">
                    {boxes.slice(0, 3).map((box) => <VaultInfoBox key={box.title} { ...box } />)}
                </div>
                <div className="bg-gray-border w-full h-[1px]"></div>
                <div className="grid grid-cols-3 divide-x group below">
                    {boxes.slice(3).map((box) => <VaultInfoBox key={box.title} { ...box } />)}
                </div>
            </div>
        </BoxContainer>
    )
}