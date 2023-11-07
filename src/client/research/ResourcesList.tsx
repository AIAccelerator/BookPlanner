import React from 'react';
import { GlobeAltIcon, LinkIcon, DocumentIcon, DocumentTextIcon, TrashIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const resources = [
  {
    id: 1,
    icon: GlobeAltIcon,
    title: 'Source 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod eros in enim.',
    tag: 'Google',
  },
  {
    id: 2,
    icon: DocumentIcon,
    title: 'Source 2',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod eros in enim.',
    tag: 'Upload',
  },
  // ... additional resources
];

const ResourcesList: React.FC = () => {
  const handleRemove = (resourceId: number) => {
    // Logic to remove the resource from the list
    console.log(`Remove resource with ID: ${resourceId}`);
  };

  return (
    <div className="min-h-screen flex justify-center bg-gray-100 dark:bg-zinc-900">
      <section className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-6 bg-white dark:bg-zinc-800 rounded-lg shadow-md overflow-hidden flex">
        {/* Aside and Main content here */}
        <main className="flex-1 p-6">
          <h2 className="text-2xl font-bold mb-4">Selected Sources</h2>
          {/* Search and filter components here */}
          <div className="grid gap-4">
            {resources.map((resource) => (
              <div key={resource.id} className="border rounded-lg p-4 flex justify-between items-center">
                <div>
                  <resource.icon className="w-5 h-5 mr-2 inline-block align-middle" />
                  <h3 className="font-semibold inline-block align-middle">{resource.title}</h3>
                  <p className="text-zinc-500 dark:text-zinc-400">{resource.description}</p>
                  <span className="inline-block bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full text-sm mt-2">Tag: {resource.tag}</span>
                </div>
                <button
                  onClick={() => handleRemove(resource.id)}
                  className="inline-flex items-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 justify-start"
                >
                  <TrashIcon className="w-5 h-5 mr-2" />
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <button className="inline-flex items-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 justify-start">
              <ChevronLeftIcon className="w-5 h-5 mr-2" />
              Previous
            </button>
            <button className="inline-flex items-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 justify-start">
              <ChevronRightIcon className="w-5 h-5 mr-2" />
              Next
            </button>
          </div>
        </main>
      </section>
    </div>
  );
};

export default ResourcesList;