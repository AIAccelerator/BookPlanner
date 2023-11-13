import React, { useState } from 'react';
import { useQuery } from '@wasp/queries';
import getBooks from '@wasp/queries/getBooks';
import { Transition } from '@headlessui/react';
import Pagination from '../common/Pagination';
import SidebarModal from '../common/SidebarModal';
import Wizard from '../common/Wizard';
import CreateBook from './wizard/CreateBook';
import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/solid';
import FilterSortSidebar from './FilterSortSidebar';
import ListBooks from './ListBooks';
import CreateChapter from './wizard/CreateChapter';
import Review from './wizard/Review';

const ListBooksPage: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDirection, setSortDirection] = useState("DESC");
  const { data, error, isLoading } = useQuery(getBooks, { page, limit: 10, sort: sortDirection, searchTerm });

  const totalPages = Math.ceil(data?.totalBooks / 10);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const handleOpenFilterModal = () => setFilterModalOpen(true);
  const handleCloseFilterModal = () => setFilterModalOpen(false);
  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1); // Reset page to 1 when a new search is executed
  }

  // Helper function to format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }

  // Toggle sort direction
  const toggleSortDirection = () => {
    setSortDirection(prev => prev === "DESC" ? "ASC" : "DESC");
  }

  const clearSearch = () => {
    setSearchTerm('');
  };

  const handleWizardComplete = (data: any) => {
    console.log(data);
    // Handle the form   data here, e.g., make API calls.
  };


  if (isLoading) {
    return <div className="flex justify-center items-center h-screen bg-background"><div className="loader"></div></div>;
  }

  if (error) {
    return <div className="text-red-600 text-center mt-10 bg-background">Error: {error.message} (Try reloading the page.)</div>;
  }

  return (
    <div className="container mx-auto mt-10 p-4 bg-background rounded-lg shadow-md">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-text">List of Books</h1>
        <button 
          onClick={handleOpenModal} 
          className="bg-primary text-background py-2 px-4 rounded"
        >
          Create New Book
        </button>
      </div>
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg text-text">Total Books: {data?.totalBooks}</span>
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

      {/* Pagination Controls */}
      <div className="mb-8 flex justify-center">
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
      
      <ListBooks books={data?.books} />
      
      {/* Pagination Controls */}
      <div className="mb-8 flex justify-center">
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
      <SidebarModal 
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
          title="Create a New Book"
        >
          {isModalOpen && 
          <>
            <div className="text-center mb-4">Please follow the steps to create a new book and its chapters.</div>
            <div className="text-center mb-4">Please follow the steps to create a new book and its chapters.</div>
               
          </>
          }
        </SidebarModal>
        {/* Modal for Filter & Sort */}
        <SidebarModal 
            isOpen={isFilterModalOpen} 
            onClose={handleCloseFilterModal} 
            title="Filter & Sort"
        >
            {isFilterModalOpen && (
                <FilterSortSidebar 
                    searchTerm={searchTerm}
                    sortDirection={sortDirection as 'ASC' | 'DESC'}
                    onSearchTermChange={setSearchTerm}
                    onSortDirectionChange={toggleSortDirection}
                />

            )}
        </SidebarModal>
    </div>
  );
};

export default ListBooksPage;

