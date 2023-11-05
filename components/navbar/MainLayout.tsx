import Header from './Header';
import Sidebar from './Sidebar';
import { ReactNode } from 'react';

export default function MainLayout({children} : {children: ReactNode}) {

    return <>
        <Header />
        <nav className='fixed left-0 bottom-0 top-16 h-screen hidden lg:block'>
            <Sidebar />
        </nav>
        <main className="lg:ml-72 mt-16">
            {children}
        </main>
    </>
}