import Header from './Header';
import Sidebar from './Sidebar';
import { ReactNode } from 'react';

export default function MainLayout({children} : {children: ReactNode}) {

    return <>
        <Header />
        <Sidebar />
        <div className="ml-72 mt-16 px-12 py-14">
            {children}
        </div>
    </>
}