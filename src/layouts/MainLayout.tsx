
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

const MainLayout = ({ children }: Props) => {
    const location = useLocation();
    const isLanding = location.pathname === '/';

    if (isLanding) {
        return (
            <main className="w-full">
                {children}
            </main>
        );
    }

    return (
        <div className="min-h-screen">
            <Navbar />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;