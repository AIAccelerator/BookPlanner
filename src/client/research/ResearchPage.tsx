import React, { useState } from 'react';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getResources from '@wasp/queries/getResources';
import removeResource from '@wasp/actions/removeResource';
import { FunnelIcon, XMarkIcon, DocumentTextIcon, DocumentPlusIcon, LinkIcon, DocumentIcon, MagnifyingGlassPlusIcon } from '@heroicons/react/24/solid';
import Pagination from '../common/Pagination';
import SidebarModal from '../common/SidebarModal';
import ResourceList from './resource/ResourceList';
import Tooltip from '../common/Tooltip';
import { Transition, Menu } from '@headlessui/react';
import ResourceForm from './forms/ResourceForm';
import ResourceType from '../common/types/ResourceType';
import IconComponent from './IconComponent';
import ResourceFilters from './resource/ResourceFilters';
import { ResourceCreateButton } from './resource/ResourceCreateButton';
import ResearchFilterSortSidebar from './resource/ResearchFilterSortSidebar';
import { ResoruceHead } from './resource/ResourceHead';
import { FormData } from '../common/types/FormType';
import type FormCreateOrEdit from '../common/types/FormCreateOrEditType';
import prisma from '@wasp/prisma';

const ResearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortDirection, setSortDirection] = useState("DESC");
  const [page, setPage] = useState(1);
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const [tag, setTag] = useState('');
  const [isResourceFormOpen, setResourceFormOpen] = useState(false);   
  const [selectedResourceType, setSelectedResourceType] = useState(null);
  const [mode, setMode] = useState<FormCreateOrEdit>('create');
  const [resource, setResource] = useState<prisma.resource | null>(null);

  const { data, error, isLoading } = useQuery(getResources, { page, limit: 10, sort: sortDirection, searchTerm, tag });
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

  const handleEdit = (resourceId: number) => {
    console.log(`Edit resource with ID: ${resourceId}`);
    setMode('edit');
    setResource(data.resources.find(resource => resource.id === resourceId));    
    toggleResourceForm();

  }

  const toggleSortDirection = () => {
    setSortDirection(prev => prev === "DESC" ? "ASC" : "DESC");
  };

  const toggleResourceForm = () => setResourceFormOpen(!isResourceFormOpen);

  const handleResourceFormSubmit = (resourceData: any) => {
    // Process the submitted data, possibly sending it to the backend
    console.log(resourceData);
    //editAction(resourceData);
    toggleResourceForm(); // Close the form upon submission
  };

  const handleSelectResourceType = (type: ResourceType) => {
    setSelectedResourceType(type);
    setResourceFormOpen(true);
    setMode('create');
  };


  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-600 text-center">Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto mt-10 p-4 bg-background rounded-lg shadow-md">
      <ResoruceHead 
        totalResources={data.totalResources}
        searchTerm={searchTerm}
        tag={tag}
        clearSearch={clearSearch}
        clearTag={clearTag}
        handleOpenFilterModal={handleOpenFilterModal}
        handleSelectResourceType={handleSelectResourceType}
      />
      
      <div className="mb-8 flex justify-center">
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
      
      <ResourceList resources={data?.resources} onTagClick={handleTagClick} onEdit={handleEdit} onRemove={handleRemove}/>
      
      
      <div className="mb-8 flex justify-center">
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>

      
      <SidebarModal 
        isOpen={isResourceFormOpen} 
        onClose={() => setResourceFormOpen(false)} 
        title="Add New Resource"
      >
        {selectedResourceType && (
          <ResourceForm resourceType={selectedResourceType} resource={resource} mode={mode} onSubmit={handleResourceFormSubmit}  />
        )}
      </SidebarModal>        
      
      <SidebarModal
        isOpen={isFilterModalOpen}
        onClose={handleCloseFilterModal}
        title="Filter and Sort"
      >
        <ResearchFilterSortSidebar
          searchTerm={searchTerm}
          sortDirection={sortDirection}
          onSearchTermChange={setSearchTerm}
          onSortDirectionChange={setSortDirection}
          tag={tag}
          onTagChange={setTag}
        />
      </SidebarModal>
    
    </div>
  );
};

export default ResearchPage;
