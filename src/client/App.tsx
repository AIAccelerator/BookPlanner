// App.tsx

import './css/Main.css';
import Header from './Header';  // Import Header component
import Footer from './Footer';  // Import Footer component
import { ReactNode } from 'react';

export default function App({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen from-yellow-300 via-yellow-200 to-yellow-100">
            <Header />
            <main className='w-full mx-auto max-w-7xl sm:px-6 lg:px-8 flex-grow'>
                {children}
            </main>
            <Footer />
        </div>
    );
}
