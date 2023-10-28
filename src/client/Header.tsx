// Header.tsx

import React from 'react';
import NavBar from './NavBar';

const Header: React.FC = () => {
    return (
        <header className="text-white p-4">
            <div className="container mx-auto">                
                <NavBar />
            </div>
        </header>
    );
}

export default Header;
