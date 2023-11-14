import React, { useState, useEffect, useCallback } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import debounce from 'lodash/debounce';

interface SearchInputProps {
  value: string;
  onSearch: (value: string) => void;
}

/**
 * `SearchInput` component provides a styled input field with a clear button for search functionality.
 *
 * @param {SearchInputProps} props - Component props.
 * @returns {React.ReactElement} - A rendered search input component.
 */
const SearchInput: React.FC<SearchInputProps> = ({ value, onSearch }) => {
  const [inputValue, setInputValue] = useState<string>(value);

  const debouncedOnSearch = useCallback(
    debounce((searchValue: string) => {
      onSearch(searchValue);
    }, 300),
    [onSearch]
  );

  useEffect(() => {
    debouncedOnSearch(inputValue);
    return () => {
      debouncedOnSearch.cancel();
    };
  }, [inputValue, debouncedOnSearch]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleClearSearch = () => {
    setInputValue('');
    onSearch('');
  };

  return (
    <div className="flex border p-2 rounded">
      <input
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search for books..."
        className="flex-grow px-2 bg-transparent"
      />
      {inputValue && (
        <button onClick={handleClearSearch} aria-label="Clear search" className="p-1">
          <XMarkIcon className="h-5 w-5 text-primary cursor-pointer" />
        </button>
      )}
    </div>
  );
};

export default SearchInput;
