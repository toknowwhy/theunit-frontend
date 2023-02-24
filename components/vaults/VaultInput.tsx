'use client';

export default function VaultInput({
    value,
    onChange,
    unitPrice,
    symbol,
} : {
    value: string,
    onChange: (value: string) => void;
    unitPrice?: number,
    symbol: string,
}) {

    const onInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        onChange(e.currentTarget.value);
    };

    return <div className="px-4 bg-gray-dark h-16 flex flex-col justify-center rounded-lg">
            <input 
                value={value}
                type="number"
                min={0}
                onChange={onInputChange}
                className="text-text text-xl border-none bg-transparent outline-none placeholder:text-gray" 
                placeholder={`0 ${symbol}`} 
            />
            { unitPrice && <div className="text-gray text-xs">
                    ~{value && !isNaN(parseFloat(value)) ? (unitPrice * parseFloat(value)).toString() : '0'} UNIT
                </div>
            }
        </div>
}