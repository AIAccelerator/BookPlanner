import React from 'react';
import { Transition } from '@headlessui/react';

type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ page, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center items-center mt-4">
      {/* Previous Button */}
      <Transition
        as="button"
        show={page > 1}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="px-3 py-1 rounded-md mx-1 bg-primary hover:bg-secondary focus:outline-none focus:bg-secondary active:bg-accent text-text"
        onClick={() => onPageChange(page - 1)}
      >
        Previous
      </Transition>

      {/* Page Numbers */}
      {[...Array(totalPages)].map((_, i) => (
        <Transition
          as="button"
          key={i}
          show={true}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className={`px-2 py-1 rounded-md mx-1 ${i + 1 === page ? 'bg-primary text-background' : 'text-primary'} hover:bg-secondary focus:outline-none focus:bg-secondary active:bg-accent text-text`}
          onClick={() => onPageChange(i + 1)}
        >
          {i + 1}
        </Transition>
      ))}

      {/* Next Button */}
      <Transition
        as="button"
        show={page < totalPages}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="px-3 py-1 rounded-md mx-1 bg-primary hover:bg-secondary focus:outline-none focus:bg-secondary active:bg-accent text-text"
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </Transition>
    </div>
  );
};

export default Pagination;
