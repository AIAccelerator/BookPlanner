import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid'
import debounce from 'lodash/debounce';

type SearchInputProps = {
    value: string;
    onSearch: (value: string) => void;
};

const SearchInput: React.FC<SearchInputProps> = ({ value, onSearch }) => {

  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    const debouncedOnSearch = debounce(() => {
      onSearch(inputValue);
    }, 1000);
    
    debouncedOnSearch();

    // Cleanup the debounced function when the component is unmounted or when the effect reruns
    return () => {
      debouncedOnSearch.cancel();
    };
  }, [inputValue, onSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
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
        <XMarkIcon 
          onClick={handleClearSearch}
          className="h-5 w-5 text-primary cursor-pointer"
          aria-label="Clear search"
        />
      )}
    </div>
  );
};

export default SearchInput;
