import React, { useCallback, useState } from 'react';
import SearchInput from './SearchInput'; // Search bar component
import Filters from './Filters'; // Filters component
import ResourcesMenu from './ResourcesMenu'; // Dropdown button for adding resources
import ResourcesList from './ResourcesList';
// import ResourceList from './ResourceList'; // Component for listing resources
// import Pagination from './Pagination'; // Pagination component

const ResourcesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('');

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

  // Update the searchTerm state with debouncing
  const debouncedSetSearchTerm = useCallback(
    debounce((searchValue) => setSearchTerm(searchValue), 300),
    []
  );

  const handleSearchChange = (event) => {
    debouncedSetSearchTerm(event.target.value);
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
          <ResourcesList searchTerm={searchTerm} />
        </main>
      </div>
    </div>
  );
}

export default ResourcesPage;
