import React, { useState } from 'react';
import { useQuery } from '@wasp/queries';
import getResources from '@wasp/queries/getResources';
import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/solid';
import Pagination from '../common/Pagination';
import SidebarModal from '../common/SidebarModal';
import ResearchFilterSortSidebar from './ResearchFilterSortSidebar';
import ResourcesList from './ResourcesList';

const ResearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortDirection, setSortDirection] = useState("DESC");
  const [page, setPage] = useState(1);
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const [tag, setTag] = useState('');

  const { data, error, isLoading } = useQuery(getResources, { page, limit: 10, sort: sortDirection, searchTerm, tag });
  const totalPages = data ? Math.ceil(data.totalResources / 10) : 0;

  const handleOpenFilterModal = () => setFilterModalOpen(true);
  const handleCloseFilterModal = () => setFilterModalOpen(false);
  const clearSearch = () => setSearchTerm('');
  const handleTagClick = (tagName: string) => {
    setTag(tagName);
    setPage(1);
  }

  const handleRemove = (resourceId: number) => {
    console.log(`Remove resource with ID: ${resourceId}`);
  }

  const toggleSortDirection = () => {
    setSortDirection(prev => prev === "DESC" ? "ASC" : "DESC");
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-600 text-center">Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto mt-10 p-4 bg-background rounded-lg shadow-md">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Resource Library</h1>
      </div>

      <div className="flex justify-between items-center mb-4">
        <span className="text-lg">Total Resources: {data?.totalResources}</span>
        <button 
          onClick={handleOpenFilterModal} 
          className="bg-secondary text-background py-2 px-4 rounded flex items-center"
        >
          Filters <FunnelIcon className="ml-2 h-5 w-5" /> 
          {searchTerm && <span className="ml-2">"{searchTerm}"</span>}
          {searchTerm && (
            <XMarkIcon 
              onClick={clearSearch} 
              className="h-5 w-5 ml-2 cursor-pointer"
              aria-label="Clear search"
            />
          )}    
        </button>
      </div>

      {/* Pagination Controls */}
      <div className="mb-8 flex justify-center">
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
      
      <ResourcesList resources={data?.resources} onTagClick={handleTagClick} onRemove={handleRemove}/>
      
      {/* Pagination Controls */}
      <div className="mb-8 flex justify-center">
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>

      {/* Filter & Sort Modal */}
      <SidebarModal 
          isOpen={isFilterModalOpen} 
          onClose={handleCloseFilterModal} 
          title="Filter & Sort"
      >
          {isFilterModalOpen && (
              <ResearchFilterSortSidebar 
                  searchTerm={searchTerm}
                  sortDirection={sortDirection}
                  onSearchTermChange={setSearchTerm}
                  onSortDirectionChange={toggleSortDirection}
                  onTagChange={setTag}
              />
          )}
      </SidebarModal>
    </div>
  );
};

export default ResearchPage;
