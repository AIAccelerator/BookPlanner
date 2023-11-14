import React, { useEffect, useState } from 'react';
import SearchInput from '../common/SearchInput';

type ResearchFilterSortSidebarProps = {
    searchTerm: string;
    sortDirection: string;
    onSearchTermChange: (term: string) => void;
    onSortDirectionChange: (direction: string) => void;
    tag?: string;
    onTagChange: (tag: string) => void;
};

const ResearchFilterSortSidebar: React.FC<ResearchFilterSortSidebarProps> = ({
    searchTerm,
    sortDirection,
    onSearchTermChange,
    onSortDirectionChange,
    tag,
    onTagChange,
}) => {
    // Local state to debounce the search term input
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
    const [activeTags, setActiveTags] = useState<string[]>([]);

    const handleAddTag = (tag: string) => {
        if (!activeTags.includes(tag)) {
            setActiveTags([...activeTags, tag]);
        }
    };

    const handleRemoveTag = (tag: string) => {
        setActiveTags(activeTags.filter(t => t !== tag));
    };

    // Pass the activeTags to the parent component or query function to filter resources
    // This part of the logic will depend on how the parent component or query function expects to receive the tags

    // Effect for debouncing search term input
    useEffect(() => {
        const timerId = setTimeout(() => {
            onSearchTermChange(debouncedSearchTerm);
        }, 500); // Debounce delay of 500 ms

        return () => {
            clearTimeout(timerId);
        };
    }, [debouncedSearchTerm, onSearchTermChange]);

    // Handler for search term input change
    const handleSearchTermChange = (newSearchTerm: string) => {
        setDebouncedSearchTerm(newSearchTerm);
    };

    // Handler for sort direction change
    const handleSortDirectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onSortDirectionChange(event.target.value);
    };

    return (
        <div className="px-4 py-6">
            {/* Search Term Input */}
            <div className="mb-4">
                <label htmlFor="search-input" className="block text-sm font-medium text-text mb-2">
                    Search Term
                </label>
                <SearchInput 
                    id="search-input"
                    value={debouncedSearchTerm}
                    onSearch={handleSearchTermChange}
                />
            </div>

            {/* Sort Direction Dropdown */}
            <div className="mb-4">
                <label htmlFor="sort-direction" className="block text-sm font-medium text-text mb-2">
                    Sort Direction
                </label>
                <select
                    id="sort-direction"
                    value={sortDirection}
                    onChange={handleSortDirectionChange}
                    className="bg-background border border-primary rounded-md p-2 w-full text-text"
                >
                    <option value="DESC">Descending</option>
                    <option value="ASC">Ascending</option>
                </select>
            </div>

            {/* Tag Input (assuming a simple text input for tag, replace with your tag input component as needed) */}
            {tag !== undefined && (
                <div className="mb-4">
                    <label htmlFor="tag-input" className="block text-sm font-medium text-text mb-2">
                        Tag
                    </label>
                    <input
                        id="tag-input"
                        type="text"
                        value={tag}
                        onChange={(e) => onTagChange(e.target.value)}
                        className="bg-background border border-primary rounded-md p-2 w-full text-text"
                    />
                </div>
            )}

            {/* Other filters and sorting options can be added here in the future */}
        </div>
    );
};

export default ResearchFilterSortSidebar;
