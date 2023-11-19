import React, { useState } from 'react';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getResources from '@wasp/queries/getResources';
import removeResource from '@wasp/actions/removeResource';
import { FunnelIcon, XMarkIcon, DocumentTextIcon, DocumentPlusIcon, LinkIcon, DocumentIcon, MagnifyingGlassPlusIcon } from '@heroicons/react/24/solid';
import Pagination from '../common/Pagination';
import SidebarModal from '../common/SidebarModal';
import ResearchFilterSortSidebar from './ResearchFilterSortSidebar';
import ResourcesList from './ResourcesList';
import Tooltip from '../common/Tooltip';
import { Transition, Menu } from '@headlessui/react';
import ResourceForm from './forms/ResourceForm';
import ResourceType from '../common/types/ResourceType';
import IconComponent from './IconComponent';

const ResearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortDirection, setSortDirection] = useState("DESC");
  const [page, setPage] = useState(1);
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const [tag, setTag] = useState('');
  const [isResourceFormOpen, setResourceFormOpen] = useState(false); 
  const { data, error, isLoading } = useQuery(getResources, { page, limit: 10, sort: sortDirection, searchTerm, tag });
  const [selectedResourceType, setSelectedResourceType] = useState(null);
  const removeResourceAction = useAction(removeResource);

  const totalPages = data ? Math.ceil(data.totalResources / 10) : 0;

  const handleOpenFilterModal = () => setFilterModalOpen(true);
  const handleCloseFilterModal = () => setFilterModalOpen(false);
  const clearSearch = () => setSearchTerm('');
  const handleTagClick = (tagName: string) => {
    setTag(tagName);
    setPage(1);
  }
  const clearTag = () => setTag('');

  const handleRemove = (resourceId: number) => {
    console.log(`Remove resource with ID: ${resourceId}`);
    removeResourceAction({ id: resourceId });
  }

  const toggleSortDirection = () => {
    setSortDirection(prev => prev === "DESC" ? "ASC" : "DESC");
  };

  const toggleResourceForm = () => setResourceFormOpen(!isResourceFormOpen);

  const handleResourceFormSubmit = (resourceData: any) => {
    // Process the submitted data, possibly sending it to the backend
    console.log(resourceData);
    toggleResourceForm(); // Close the form upon submission
  };

  const resourceTypes = [
    { type: 'url', label: 'URL' },
    { type: 'pdf', label: 'PDF' },
    { type: 'text', label: 'Text' }, // Example icon, change as needed
    { type: 'doc', label: 'Doc' },
    { type: 'google_search', label: 'Google Search' },
  ];

  const handleSelectResourceType = (type: ResourceType) => {
    setSelectedResourceType(type);
    setResourceFormOpen(true);
  };


  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-600 text-center">Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto mt-10 p-4 bg-background rounded-lg shadow-md">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Resource Library</h1>
      </div>

      <div className="flex justify-between items-center mb-4">
      <span className="text-lg">Total Resources: {data?.totalResources}</span>
      <div className="flex items-center">
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
        
        {/* Dropdown menu for selecting resource type */}
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="bg-primary hover:bg-secondary text-background py-2 px-4 rounded flex items-center">
              Create Resource
            </Menu.Button>
          </div>
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {resourceTypes.map(({ type, label }) => (
                <Menu.Item key={type}>
                  {({ active }) => (
                    <a
                      href="#"
                      className={`${
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      } flex items-center px-4 py-2 text-sm`}
                      onClick={() => handleSelectResourceType(type)}
                    >
                      <IconComponent type={type} />
                      {label}
                    </a>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Menu>
      </div>
    </div>

      {/* Pagination Controls */}
      <div className="mb-8 flex justify-center">
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
      
      <ResourcesList resources={data?.resources} onTagClick={handleTagClick} onRemove={handleRemove}/>
      
      {/* Pagination Controls */}
      <div className="mb-8 flex justify-center">
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>

      {/* Resource Form Modal */}
      <SidebarModal 
        isOpen={isResourceFormOpen} 
        onClose={() => setResourceFormOpen(false)} 
        title="Add New Resource"
      >
        {selectedResourceType && (
          <ResourceForm resourceType={selectedResourceType} />
        )}
      </SidebarModal>
    </div>
  );
};

export default ResearchPage;
