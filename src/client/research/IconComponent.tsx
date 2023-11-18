import { LinkIcon, DocumentTextIcon, DocumentIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import React from 'react';

type IconComponentProps = {
    type: string;
}

const IconComponent: React.FC<IconComponentProps> = ({ type }) => {
    switch (type) {
        case 'url':
            return <div><LinkIcon className="w-5 h-5 mr-2"  /></div>;
        case 'pdf':
        case 'text':
            return <div><DocumentTextIcon className="w-5 h-5 mr-2"  /></div>;
        case 'doc':
            return <div><DocumentIcon className="w-5 h-5 mr-2" /></div>;
        case 'google_search':
            return <div><MagnifyingGlassIcon className="w-5 h-5 mr-2"  /></div>;
        default:
            return <div><DocumentIcon className="w-5 h-5 mr-2" /></div>; // Replace with actual default icon component
    }
}

export default IconComponent;