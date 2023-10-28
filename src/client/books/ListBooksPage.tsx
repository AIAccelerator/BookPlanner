import React, { useState } from 'react';
import { useQuery } from '@wasp/queries';
import getBooks from '@wasp/queries/getBooks';
import { Transition } from '@headlessui/react';
import Pagination from '../common/Pagination';

const ListBooksPage: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const { data, error, isLoading } = useQuery(getBooks, { page, limit: 10 });

  const totalPages = Math.ceil(data?.totalBooks / 10);

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
        <a href="/create-book" className="bg-primary text-background py-2 px-4 rounded">Create New Book</a>
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
