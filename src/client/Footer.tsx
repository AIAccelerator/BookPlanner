// Footer.tsx

import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="text-gray-400 p-4 mt-12 text-center">
            <p>&copy; {new Date().getFullYear()} App Name. All rights reserved.</p>
        </footer>
    );
}

export default Footer;
