// File: src/components/ListBooksPage.tsx

import React, { useState } from 'react';
import { useQuery } from '@wasp/queries';
import getBooks from '@wasp/queries/getBooks';

const ListBooksPage: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const { data: books, error, isLoading } = useQuery(getBooks, { page, limit: 10 });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">Books List</h1>
      
      {/* Pagination Controls */}
      <div className="mb-5">
        <button
          onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue mr-2"
        >
          Previous
        </button>
        <button
          onClick={() => setPage((prevPage) => prevPage + 1)}
          // Assuming last page is known, replace `books && books.length === 0` with a condition that checks if it's the last page
          disabled={books && books.length === 0}
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
        >
          Next
        </button>
      </div>
      
      {/* Book List */}
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {books && books.map(book => (
          <div key={book.id} className="mb-4 border-b pb-4">
            <h2 className="text-xl font-bold">{book.title}</h2>
            <p>Author: {book.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListBooksPage;
