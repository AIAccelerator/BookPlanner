import React from 'react';
import SearchInput from '../common/SearchInput';
type FilterSortSidebarProps = {
    searchTerm: string;
    sortDirection: string;
    onSearchTermChange: (term: string) => void;
    onSortDirectionChange: () => void;
};

const FilterSortSidebar: React.FC<FilterSortSidebarProps> = ({
    searchTerm,
    sortDirection,
    onSearchTermChange,
    onSortDirectionChange,
}) => {
    return (
        <div className="px-4 py-6">
            {/* Search Term Input */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-text mb-2">
                    Search Term
                </label>                
                <SearchInput onSearch={(searchTerm: string) => onSearchTermChange(searchTerm)} value={searchTerm} />

            </div>

            {/* Sort Direction Dropdown */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-text mb-2">
                    Sort Direction
                </label>
                <select
                    value={sortDirection}
                    onChange={(e) => onSortDirectionChange()}
                    className="bg-background border border-primary rounded-md p-2 w-full text-text"
                >
                    <option value="DESC">Descending</option>
                    <option value="ASC">Ascending</option>
                </select>
            </div>

            {/* Other filters and sorting options can be added here in the future */}
        </div>
    );
};

export default FilterSortSidebar;
