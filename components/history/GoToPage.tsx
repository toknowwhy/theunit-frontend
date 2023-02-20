'use client';

import { useRouter } from "next/navigation";
import { ChangeEvent, KeyboardEvent, useState } from "react";

export default function GoToPage({
    goto,
    page,
    path,
} : {
    goto: string,
    page: string,
    path: string,
}) {

    const router = useRouter();
    const [inputPage, setInputPage] = useState<string | undefined>();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputPage(event.target.value);
    };
    

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            router.push(`${path}/${inputPage}`);
        }
    };

    return (
        <div>
            {goto} 
            <input 
                type="number" 
                value={inputPage} 
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className="bg-gray-dark rounded-2xl w-16 focus-visible:outline-none px-3 py-1 mx-4" 
            /> 
            {page}
        </div>
    )
}