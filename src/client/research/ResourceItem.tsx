import React from 'react';
import { TrashIcon, LinkIcon, DocumentTextIcon, DocumentIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';

interface ResourceItemProps {
  resource: any; // Replace 'any' with the actual type of your resource
  onRemove: (id: number) => void;
}

const ResourceItem: React.FC<ResourceItemProps> = ({ resource, onRemove }) => {
  // Logic to determine which icon to use based on the resource type
  const IconComponent = getIconComponent(resource.type);

  return (
    <div className="border rounded-lg p-4 flex justify-between items-center">
      <div className="flex items-center">
        <IconComponent className="w-5 h-5 mr-2" />
        <div>
          <h3 className="font-semibold inline-block align-middle">{resource.title}</h3>
          <p className="text-zinc-500 dark:text-zinc-400">{resource.description}</p>
          <div className="mt-2">
            {resource.tags.map((tag, index) => (
              <span key={index} className="inline-block bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full text-sm mr-2">{tag.name}</span>
            ))}
          </div>
        </div>
      </div>
      <button
        onClick={() => onRemove(resource.id)}
        className="inline-flex items-center rounded-md text-sm font-medium ring-offset-background transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-white hover:shadow-md h-10 px-4 py-2 justify-start"
      >
        <TrashIcon className="w-5 h-5 mr-2 transition-transform duration-300 ease-in-out hover:scale-110" />
        Remove
      </button>
    </div>
  );
};

function getIconComponent(type: string) {
  switch (type) {
    case 'url':
      return LinkIcon;
    case 'pdf':
    case 'text':
      return DocumentTextIcon;
    case 'doc':
      return DocumentIcon;
    case 'google_search':
      return MagnifyingGlassIcon;
    default:
      return DefaultIcon; // Replace with actual default icon component
  }
}

export default ResourceItem;
