import React, { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

type SearchInputProps = {
  placeholder: string;
  onSearch: (value: string) => void;
};

const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
};

const ResearchSearchInput: React.FC<SearchInputProps> = ({ placeholder, onSearch }) => {
  const [inputValue, setInputValue] = useState('');
  const debouncedSearch = useCallback(debounce(onSearch, 500), [onSearch]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    debouncedSearch(newValue);
  };

  return (
    <div className="relative w-80">
      <input
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        className="border rounded-lg p-2 w-full text-text bg-background"
        type="text"
      />
      <MagnifyingGlassIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text" />
    </div>
  );
};

/**
 * `SearchInput` component provides a styled input field for search functionality.
 *
 * @param {SearchInputProps} props - Component props.
 * @returns {React.ReactElement} - A rendered search input component.
 */
const SearchInput: React.FC<SearchInputProps> = ({ placeholder, onSearchChange }) => (
    <div className="relative w-80">
      <input
        placeholder={placeholder}
        className="border rounded-lg p-2 w-full text-text bg-background"
        onChange={onSearchChange}
        type="text"
      />
      <MagnifyingGlassIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text" />
    </div>
  );
  
  export default SearchInput;
  
