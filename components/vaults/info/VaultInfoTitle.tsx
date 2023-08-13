import questionMark from '@/public/icons/question-mark.svg';
import { TransType } from '@/utils/types';
import Image from 'next/image';

export default function VaultInfoTitle({
    title,
    info
} : {
    title: TransType,
    info?: string
}) {

    return <div className="text-sm sm:text-base text-gray flex items-center">
        {title} {info && (<div className="relative ml-1 inline">
            <Image className="peer cursor-pointer" src={questionMark} alt="info" />
            <div className="hidden absolute top-6 right-0 w-48 text-text peer-hover:block peer-hover:bg-gray-darker peer-hover:border peer-hover:border-gray peer-hover:rounded-lg peer-hover:p-3">
                <div className="mb-1 font-semibold">{title}</div>
                <div className='text-sm'>{info}</div>
            </div>
        </div>)}
    </div>
}