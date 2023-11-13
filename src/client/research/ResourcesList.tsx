import React, { useState } from 'react';
import { useQuery } from '@wasp/queries';
import getResources from '@wasp/queries/getResources';
import Pagination from '../common/Pagination';
import { TrashIcon, LinkIcon, DocumentTextIcon, DocumentIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';

interface ResourcesListProps {
  searchTerm: string;
}

const ResourcesList: React.FC<ResourcesListProps> = ({ searchTerm }) => {
  // Assuming your project is set up with TypeScript
  const [page, setPage] = useState(1);
  const [sortDirection, setSortDirection] = useState("DESC");
  const { data, error, isLoading } = useQuery(getResources, { page, limit: 10, sort: sortDirection, searchTerm });

  const totalPages = data ? Math.ceil(data.totalResources / 10) : 0;

  const handleRemove = (resourceId: number) => {
    // Logic to remove the resource from the list
    console.log(`Remove resource with ID: ${resourceId}`);
  };

  if (isLoading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;
  if (!data || data.resources.length === 0) return <div className="empty">No resources found.</div>;

  return (
    <div className="min-h-screen flex justify-center bg-gray-100 dark:bg-zinc-900">
      <section className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-6 bg-white dark:bg-zinc-800 rounded-lg shadow-md overflow-hidden flex">
        <main className="flex-1 p-6">
          <h2 className="text-2xl font-bold mb-4">Selected Sources</h2>
          <div className="grid gap-4">
            {data && data.resources.map((resource) => (
              <div key={resource.id} className="border rounded-lg p-4 flex justify-between items-center">
                <div className="flex items-center">
                  {resource.type === 'url' ? <LinkIcon className="w-8 h-8 mr-2" /> :
                   resource.type === 'pdf' ? <DocumentTextIcon className="w-8 h-8 mr-2" /> :
                   resource.type === 'doc' ? <DocumentIcon className="w-8 h-8 mr-2" /> :
                   resource.type === 'text' ? <DocumentTextIcon className="w-8 h-8 mr-2" /> :
                   resource.type === 'google_search' ? <MagnifyingGlassIcon className="w-8 h-8 mr-2" /> :
                   <DefaultIcon className="w-8 h-8 mr-2" />}
                  <div>
                    <h3 className="font-semibold inline-block align-middle">{resource.title}</h3>
                    <p className="text-zinc-500 dark:text-zinc-400">{resource.description}</p>
                    <span className="inline-block bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full text-sm mt-2">Tag: {resource.tag}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(resource.id)}
                  className="inline-flex items-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 justify-start"
                >
                  <TrashIcon className="w-7 h-7 mr-2" />
                  Remove
                </button>
              </div>
            ))}
          </div>
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </main>
      </section>
    </div>
  );
};

export default ResourcesList;
