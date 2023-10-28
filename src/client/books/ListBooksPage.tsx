import React, { useState } from 'react';
import { useQuery } from '@wasp/queries';
import getBooks from '@wasp/queries/getBooks';

const ListBooksPage: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const { data: books, error, isLoading } = useQuery(getBooks, { page, limit: 10 });

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><div className="loader"></div></div>;
  }

  if (error) {
    return <div className="text-red-600 text-center mt-10">Error: {error.message} (Try reloading the page.)</div>;
  }

  return (
    <div className="container mx-auto mt-10 p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-8 text-center">Books List</h1>
      
      {/* Pagination Controls */}
      <div className="mb-8 flex justify-center">
        <button
          onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
          disabled={page === 1}
          className="px-5 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue mr-4"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
</svg> 
        </button>
        <span className="text-xl mx-4">Page {page}</span>
        <button
          onClick={() => setPage((prevPage) => prevPage + 1)}
          disabled={books && books.length === 0}
          className="px-5 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue ml-4"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
</svg>

        </button>
      </div>
      
      {/* Book List */}
      <div className="bg-white p-6 rounded-lg">
        {books && books.map(book => (
          <div key={book.id} className="mb-6 border-b pb-4 hover:bg-gray-200 transition-colors duration-200">
            <h2 className="text-2xl font-semibold mb-2">{book.title}</h2>
            <p className="text-lg">Author: {book.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListBooksPage;
