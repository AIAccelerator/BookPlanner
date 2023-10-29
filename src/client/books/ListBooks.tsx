import React from 'react';
import { Transition } from '@headlessui/react';
import prisma from '@wasp/prisma';

type ListBooksProps = {
    books: prisma.book[]
}

const ListBooks: React.FC<ListBooksProps> = ({ books }) => {
    // Helper function to format the date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    }

    return (
        // Book List
        <Transition
            as="div"
            className="bg-white p-6 rounded-lg shadow-lg"
            show={true}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
        >
            {books && books.map(book => (
                <div key={book.id} className="mb-6 border-b pb-4 hover:bg-secondary transition-colors duration-200">
                    <h2 className="text-2xl font-semibold mb-2 text-primary">{book.title}</h2>
                    <p className="text-lg text-text">Author: {book.author}</p>
                    <p className="text-sm text-text">Date Created: {formatDate(book.createdAt)}</p>
                </div>
            ))}
        </Transition>
    )
}

export default ListBooks;
