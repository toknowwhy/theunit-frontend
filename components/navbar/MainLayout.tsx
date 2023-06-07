import Header from './Header';
import Sidebar from './Sidebar';
import { ReactNode } from 'react';

export default function MainLayout({children} : {children: ReactNode}) {

    return <>
        <Header />
        <div className='fixed left-0 bottom-0 top-16 h-screen hidden lg:block'>
            <Sidebar />
        </div>
        <div className="lg:ml-72 mt-16 px-4 lg:px-12 py-14 dark:bg-vault bg-no-repeat bg-right-bottom bg-contain min-h-screen">
            {children}
        </div>
    </>
}