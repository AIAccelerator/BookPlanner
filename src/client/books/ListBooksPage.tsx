import React, { useState } from 'react';
import { useQuery } from '@wasp/queries';
import getBooks from '@wasp/queries/getBooks';
import { Transition } from '@headlessui/react';
import Pagination from '../common/Pagination';
import SidebarModal from '../common/SidebarModal';
import CreateBookForm from './CreateBookForm';
import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/solid';
import FilterSortSidebar from './FilterSortSidebar';

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

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen bg-background"><div className="loader"></div></div>;
  }

  if (error) {
    return <div className="text-red-600 text-center mt-10 bg-background">Error: {error.message} (Try reloading the page.)</div>;
  }

  return (
    <div className="container mx-auto mt-10 p-4 bg-background rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-text">List of Books</h1>
        <button 
          onClick={handleOpenModal} 
          className="bg-primary text-background py-2 px-4 rounded"
        >
          Create New Book
        </button>
        <SidebarModal 
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
          title="Create a New Book"
        >
          {isModalOpen && <CreateBookForm />}
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
      
      {/* Book List */}
      <Transition
        as="div"
        className="bg-white p-6 rounded-lg shadow-lg"
        show={true}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
      >
        {data?.books && data.books.map(book => (
          <div key={book.id} className="mb-6 border-b pb-4 hover:bg-secondary transition-colors duration-200">
            <h2 className="text-2xl font-semibold mb-2 text-primary">{book.title}</h2>
            <p className="text-lg text-text">Author: {book.author}</p>
            <p className="text-sm text-text">Date Created: {formatDate(book.createdAt)}</p>
          </div>
        ))}
      </Transition>
      
      {/* Pagination Controls */}
      <div className="mb-8 flex justify-center">
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
      
    </div>
  );
};

export default ListBooksPage;
