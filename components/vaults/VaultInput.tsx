'use client';

export default function VaultInput({
    value,
    onChange,
    unitPrice,
    symbol,
} : {
    value: number | undefined,
    onChange: (value: number) => void;
    unitPrice?: number,
    symbol: string,
}) {

    const onInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        onChange(parseFloat(e.currentTarget.value));
    };

    return <div className="px-4 bg-gray-dark h-16 flex flex-col justify-center rounded-lg">
        <input 
            value={value && value > 0 ? value : undefined}
            type="number"
            onChange={onInputChange}
            className="text-text text-xl border-none bg-transparent outline-none placeholder:text-gray" 
            placeholder={`0 ${symbol}`} 
        />
        { unitPrice && <div className="text-gray text-xs">
                ~{value && !isNaN(value) ? (unitPrice * value).toString() : '0'} UNIT
            </div>
        }
    </div>
}