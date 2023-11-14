import React, { useState } from 'react';
import { useQuery } from '@wasp/queries';
import getResources from '@wasp/queries/getResources';
import Pagination from '../common/Pagination';
import ResourceItem from './ResourceItem';
import { TrashIcon, LinkIcon, DocumentTextIcon, DocumentIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';

interface ResourcesListProps {
  searchTerm: string;
}

const ResourcesList: React.FC<ResourcesListProps> = ({ searchTerm, setSearchTerm }: ResourcesListProps) => {
  const handleTagClick = (tagName: string) => {
    setSearchTerm(tagName);
    // If there is a search function, call it here
    // searchResources(tagName);
  };
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
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-zinc-900">
      <section className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-6 bg-white dark:bg-zinc-800 rounded-lg shadow-md overflow-hidden">
        <main className="flex-1 p-6">
          <h2 className="text-2xl font-bold mb-4">Selected Sources</h2>
          <div className="grid gap-4">
            {data.resources.map(resource => (
              <ResourceItem key={resource.id} resource={resource} onRemove={handleRemove} />
            ))}
          </div>
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </main>
      </section>
    </div>
  );
};

export default ResourcesList;
