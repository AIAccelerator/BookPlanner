import React from 'react';
import { XMarkIcon, FunnelIcon } from '@heroicons/react/24/solid';
import Tooltip from '../../common/Tooltip';
import { Transition } from '@headlessui/react';
import SidebarModal from '../../common/SidebarModal';

type ResourceFiltersProps = {
  searchTerm: string;
  tag: string;
  clearSearch: () => void;
  clearTag: () => void;
  handleOpenFilterModal: () => void;
};

const ResourceFilters: React.FC<ResourceFiltersProps> = ({
  searchTerm,
  tag,
  clearSearch,
  clearTag,
  handleOpenFilterModal,
}) => {
  return (
    <>
    {searchTerm && (
            <Tooltip content="Click to remove search filter">
              <div className="bg-primary text-background px-3 py-1 rounded-full flex items-center mr-2">
                <span className="text-sm">{searchTerm}</span>
                <XMarkIcon 
                  onClick={clearSearch} 
                  className="h-4 w-4 ml-2 cursor-pointer text-background hover:text-secondary"
                  aria-label="Clear search"
                />
              </div>
            </Tooltip>
        )}
        {/* Display tag as a badge with Tooltip */}
        {tag && (
          <Transition 
            show={!!tag}
            enter="transition-opacity duration-600"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-600"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
          <Tooltip content="Click to remove tag filter">
            <div className="bg-primary text-background px-3 py-1 rounded-full flex items-center mr-2">
              <span className="text-sm">#{tag}</span>
              <XMarkIcon 
                onClick={clearTag} 
                className="h-4 w-4 ml-2 cursor-pointer text-background hover:text-secondary"
                aria-label="Clear tag"
              />
            </div>
          </Tooltip>
          </Transition>
        )}

        {/* Filter button */}
        <button 
          onClick={handleOpenFilterModal} 
          className="bg-secondary text-background py-2 px-4 rounded flex items-center mr-2"
        >
          Filters <FunnelIcon className="ml-2 h-5 w-5" />
        </button>
        {/* Sidebar with Filters */}
        <SidebarModal isOpen={false} onClose={() => {}} title="Filters">
            Filters go here
        </SidebarModal>
    </>
  );
};

export default ResourceFilters;
