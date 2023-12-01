import React, { useState } from 'react';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import Pagination from '../common/Pagination';
import SidebarModal from '../common/SidebarModal';
import ResourceList from './resource/ResourceList';
import ResourceForm from './forms/ResourceForm';
import ResourceType from '../common/types/ResourceType';
import ResearchFilterSortSidebar from './resource/ResearchFilterSortSidebar';
import { ResoruceHead } from './resource/ResourceHead';
import { Dialog } from '@headlessui/react';
import DocView from '@cyntler/react-doc-viewer';

import getResources from '@wasp/queries/getResources';
import removeResource from '@wasp/actions/removeResource';
import editResource from '@wasp/actions/editResource';


import type FormCreateOrEdit from '../common/types/FormCreateOrEditType';
import prisma from '@wasp/prisma';

const ResearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortDirection, setSortDirection] = useState("DESC");
  const [page, setPage] = useState(1);
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const [tag, setTag] = useState('');
  const [isResourceFormOpen, setResourceFormOpen] = useState(false);   
  const [selectedResourceType, setSelectedResourceType] = useState<ResourceType | null>(null);
  const [mode, setMode] = useState<FormCreateOrEdit>('create');
  const [resource, setResource] = useState<prisma.resource | null>(null);
  const [fileModalOpen, setFileModalOpen] = useState(false);

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
    if (!data) 
      return;

    const selectedResource = data.resources.find(resource => resource.id === resourceId);

    if (!selectedResource)
      return;

    setMode('edit');
    setResource(selectedResource);
    setSelectedResourceType(selectedResource.resourceType);
    toggleResourceForm();   

  }

  const toggleResourceForm = () => setResourceFormOpen(!isResourceFormOpen);

  const handleResourceFormSubmit = (resourceData: any) => {    
    console.log(resourceData);
    editResource({ ...resourceData, id: resource?.id });
    toggleResourceForm();
  };

  const handleSelectResourceType = (type: ResourceType) => {
    setSelectedResourceType(type);
    setResourceFormOpen(true);
    setMode('create');
  };

  const handleClickFileModal = () => {
    setResourceFormOpen(false);
    setFileModalOpen(true);
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
      
      <ResourceList resources={data?.resources} onTagClick={handleTagClick} onEdit={handleEdit} onRemove={handleRemove} onClickFile={handleClickFileModal}/>
      
      
      <div className="mb-8 flex justify-center">
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>

      
      <SidebarModal 
        isOpen={isResourceFormOpen} 
        onClose={() => setResourceFormOpen(false)} 
        title="Add New Resource"
      >
        {selectedResourceType && (
          <ResourceForm resourceType={selectedResourceType} resource={resource} mode={mode} onSubmit={handleResourceFormSubmit} onClickFile={handleClickFileModal}  />
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

      {fileModalOpen && resource && (
  <Dialog 
    as="div" 
    className="fixed inset-0 z-10 overflow-y-auto" 
    open={fileModalOpen} 
    onClose={() => setFileModalOpen(false)}
  >
    
    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      
      {/* This element is to trick the browser into centering the modal contents. */}
      <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      
      {/* We use margin and max-width for sm screens and above, and margin-auto for smaller screens */}
      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl lg:max-w-5xl xl:max-w-6xl w-full">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
              {/* Close button */}
            <div className="absolute top-0 right-0 pt-4 pr-4">
              <button
                onClick={() => setFileModalOpen(false)}
                className="text-secondary hover:text-primary focus:outline-none"
                aria-label="Close panel"
              >
                <span className="sr-only">Close panel</span>
                ×
              </button>
            </div>
              <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                Document Viewer
              </Dialog.Title>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Your document appears below.
                </p>
              </div>
              {/* Adjust height based on screen size */}
              <div className="mt-4 md:h-[60vh] lg:h-[70vh] xl:h-[80vh] overflow-auto">
                <DocView
                  documents={[{ uri: resource.filePath }]}
                  // Additional props and styles can be added here
                />
              </div>
            </div>
          </div>
        </div>        
      </div>
    </div>
  </Dialog>
)}

    </div>
  );
};

export default ResearchPage;
