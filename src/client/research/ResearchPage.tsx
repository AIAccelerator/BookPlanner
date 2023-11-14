import React, { useCallback, useState } from 'react';
import SearchInput from '../common/SearchInput'; // Search input component
import Filters from './Filters'; // Filters component
import ResourcesMenu from './ResourcesMenu'; // Dropdown button for adding resources
import ResourcesList from './ResourcesList';
import ResearchFilterSortSidebar from './ResearchFilterSortSidebar';
import SidebarModal from '../common/SidebarModal';
import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useQuery } from '@wasp/queries';
import getResources from '@wasp/queries/getResources';

const ResourcesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tag, setTag] = useState<string>('');
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const [sort, setSort] = useState('DESC');
  const [page, setPage] = useState(1);
  const handleOpenFilterModal = () => setFilterModalOpen(true);
  const handleCloseFilterModal = () => setFilterModalOpen(false);
  const clearSearch = () => setSearchTerm('');

  const { data, error, isLoading } = useQuery(getResources, { page, limit: 10, sort, searchTerm, tag });

  const totalPages = data ? Math.ceil(data.totalResources / 10) : 0;

  const handleTagClick = (tagName: string) => {
    setTag(tagName)
  };

  const handleSearchTermChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
  };

  const handleTagChange = (newTag: string) => {
    setSelectedTags(prevTags => {
      if (prevTags.includes(newTag)) {
        return prevTags.filter(tag => tag !== newTag);
      } else {
        return [...prevTags, newTag];
      }
    });
  };

  // Debounce function
  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  // Update the searchTerm state immediately on change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
    return (
    <div className="bg-gray-100 dark:bg-zinc-900 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-6">
          <h1 className="text-3xl font-bold mb-4">Resource Library</h1>
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
            <SearchInput placeholder="Search resources" onSearchChange={handleSearchChange} />
            <ResourcesMenu />
          </div>
        </header>
        
        <main>
            <div className="flex justify-between items-center mb-4">
            <span className="text-lg text-text">Total Books: {data?.totalResources}</span>
              <button 
                onClick={handleOpenFilterModal} 
                className="bg-secondary text-background py-2 px-4 rounded flex items-center"
              >
                Filters <FunnelIcon className="ml-2 h-5 w-5" /> 
                {searchTerm && <span className="ml-2 text-accent">"{searchTerm}"</span>}
                {searchTerm && (
                  <XMarkIcon 
                    onClick={clearSearch} 
                    className="h-5 w-5 ml-2 text-accent cursor-pointer"
                    aria-label="Clear search"
                  />
                )}    
            </button>
          </div>

          <SidebarModal title="Filter Sources" isOpen={isFilterModalOpen} onClose={handleCloseFilterModal}>
            <ResearchFilterSortSidebar
              searchTerm={searchTerm}
              sortDirection={sort}
              onSearchTermChange={handleSearchTermChange}
              onTagChange={handleTagChange}
              onSortDirectionChange={() => {}}
            />
          </SidebarModal>
          <ResourcesList searchTerm={searchTerm} onTagClick={handleTagClick} selectedTags={selectedTags} />
        </main>
      </div>
    </div>
  );
}

export default ResourcesPage;
