import prev from '@/public/icons/previous.svg';
import next from '@/public/icons/next.svg';
import { Link, useTranslations } from 'next-intl';
import Image from 'next/image';
import { range } from 'lodash';
import { historyPageSize } from '@/utils/db/getUnitHistory';
import GoToPage from './GoToPage';

export default function Pagination({ 
    page,
    path,
    total,
} : { 
    page: number,
    path: string,
    total: number,
}) {
    const t = useTranslations('History');

    const getPath = (p: number) => {
        return `${path}/${p}`
    }

    const pageTotal = Math.ceil(total / historyPageSize);

    return <>
        <div className='flex gap-7 items-center font-semibold mb-3'>
            <Link href={page == 1 ? '#' : getPath(page-1)}>
                <Image src={prev} alt="Previous" />
            </Link>

            {range(Math.max(1, page-2), Math.min(pageTotal, page+2)).map((p) => (
                <Link href={getPath(p)} key={p} className={p == page ? 'bg-gray-light w-9 h-9 rounded-3xl text-black-light text-center leading-9' : ''}>
                    {p}
                </Link>
            ))}

            {page + 2 < pageTotal - 1 && <div>...</div>}

            {page + 2 < pageTotal && <Link href={getPath(pageTotal)}>
                {pageTotal}
            </Link>}
            

            <Link href={page == pageTotal ? '#' : getPath(page+1)}>
                <Image src={next} alt="Next" />
            </Link>
            <div className='hidden md:block'><GoToPage goto={t('go-to')} page={t('page')} path={path} /></div>
        </div>
        <div className='block md:hidden'><GoToPage goto={t('go-to')} page={t('page')} path={path} /></div>
    </>
}