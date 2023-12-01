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
      <Dialog open={fileModalOpen} onClose={() => setFileModalOpen(false)}>
        <div className="fixed inset-0 bg-black bg-opacity-30"></div> {/* Overlay */}

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded bg-white p-6">
            <Dialog.Title className="text-lg font-medium">Document Viewer</Dialog.Title>
            <Dialog.Description>
              This is your document.
            </Dialog.Description>
            
            {/* DocView Component */}
            <DocView
              documents={[{uri: resource.filePath}]} // Replace with the URL of your document
              // Add other props as needed
            />

            <button 
              className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700"
              onClick={() => setFileModalOpen(false)}
            >
              Close
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
      )}

      
    
    </div>
  );
};

export default ResearchPage;
