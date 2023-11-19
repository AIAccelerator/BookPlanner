import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import getTags from '@wasp/queries/getTags';
import { useQuery } from '@wasp/queries';
import { Transition } from '@headlessui/react';

type TagsInputProps = {
    onTagsChange: (selectedTags: string[]) => void;
};

const TagsInput: React.FC<TagsInputProps> = ({ onTagsChange }) => {
    const [input, setInput] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const { data: tagsData, error, isLoading } = useQuery(getTags, { page: 1, limit: 10, searchTerm: input });

    useEffect(() => {
        setShowSuggestions(input.length > 0);
    }, [input]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleTagSelect = (tag: string) => {
        if (!selectedTags.includes(tag)) {
            setSelectedTags(prevTags => [...prevTags, tag]);
            onTagsChange([...selectedTags, tag]);
        }
        setInput('');
        setShowSuggestions(false);
    };

    const removeTag = (tagToRemove: string) => {
        setSelectedTags(prevTags => prevTags.filter(tag => tag !== tagToRemove));
        onTagsChange(selectedTags.filter(tag => tag !== tagToRemove));
    };

    return (
        <div className="bg-background rounded">
            <input
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="Search tags"
                className="mt-1 block w-full border border-primary rounded-md shadow-primary focus:ring-2 focus:ring-accent"
            />
            <Transition
                show={showSuggestions}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <div className="absolute z-10 bg-white shadow-lg rounded-md mt-1">
                    {isLoading ? (
                        <div>Loading...</div>
                    ) : error ? (
                        <div>Error fetching tags</div>
                    ) : (
                        tagsData?.tags.map((tag, index) => (
                            <div key={`${tag.id}-${index}`} className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleTagSelect(tag)}>
                                {tag.name}
                            </div>
                        ))
                    )}
                </div>
            </Transition>
            <div className="flex flex-wrap mt-2">
                {selectedTags.map((tag, index) => (
                    <span key={`${tag.id}-${index}`} className="flex items-center m-1 bg-secondary text-white text-xs font-semibold mr-2 px-2.5 py-0.5 rounded hover:bg-primary">
                        {tag.name}
                        <button type="button" className="ml-1 text-accent" onClick={() => removeTag(tag)}>
                            <XMarkIcon className="h-4 w-4" />
                        </button>
                    </span>
                ))}
            </div>


        </div>
    );
};

export default TagsInput;
