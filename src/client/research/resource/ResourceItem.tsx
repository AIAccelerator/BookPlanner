import React, { useState, Fragment } from 'react';
import { TrashIcon, LinkIcon, DocumentTextIcon, DocumentIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { Tag } from '@prisma/client';
import Tooltip from '../../common/Tooltip';
import { Dialog, Menu, Transition } from '@headlessui/react';
import { EllipsisHorizontalIcon, PencilSquareIcon } from '@heroicons/react/24/solid';
import IconComponent from '../IconComponent';

interface ResourceItemProps {
  resource: any; // Replace 'any' with the actual type of your resource
  onEdit: (id: number) => void;
  onRemove: (id: number) => void;
  onTagClick: (tagName: string) => void;
}

const ResourceItem: React.FC<ResourceItemProps> = ({ resource, onEdit, onRemove, onTagClick}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const confirmRemove = () => {
    onRemove(resource.id);
    setIsDialogOpen(false);
  };

  const openConfirmationDialog = () => {
    setIsDialogOpen(true);
  };

  const closeConfirmationDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="border rounded-lg p-4 flex justify-between items-center group hover:bg-gray-100">
      <div className="flex items-center">
        <Tooltip content={resource.resourceType}>
          {resource && <IconComponent type={resource.resourceType} />}
        </Tooltip>
        <div>
          <h3 className="font-semibold inline-block align-middle">{resource.title}</h3>
          <p className="text-zinc-500 dark:text-zinc-400">{resource.description}</p>
          {resource.tags && resource.tags.length > 0 && (
            <div className="mt-2">              
              {resource.tags.map((tag: { tag: Tag }, index) => (                
                  <button
                    key={index}
                    onClick={() => onTagClick(tag.tag?.name)}
                    className="inline-block bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full text-sm mr-2 focus:outline-none focus:ring focus:border-blue-300"
                  >
                    {tag.tag?.name}
                  </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="relative inline-block text-left opacity-0 group-hover:opacity-100 transition-opacity">
      <Menu as="div" className="inline-block text-left">
          <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md hover:bg-gray-200 focus:outline-none">
            <EllipsisHorizontalIcon className="w-5 h-5" aria-hidden="true" />
          </Menu.Button>
          <Transition
            as={React.Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? 'bg-violet-500 text-white' : 'text-gray-900'
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      onClick={() => onEdit(resource.id)}
                    >
                      <PencilSquareIcon
                        className="w-5 h-5 mr-2"
                        aria-hidden="true"
                      />
                      Edit
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? 'bg-violet-500 text-white' : 'text-gray-900'
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      onClick={openConfirmationDialog}
                    >
                      <TrashIcon
                        className="w-5 h-5 mr-2"
                        aria-hidden="true"
                      />
                      Remove
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      {/* Confirmation Dialog */}
      <Transition
          as={Fragment}
          show={isDialogOpen}
          enter="transition ease-out duration-300"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95">
        {/* Confirmation Dialog with theme-based styling */}
        <Dialog open={isDialogOpen} onClose={closeConfirmationDialog} className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <Dialog.Panel className={`w-full max-w-md mx-auto bg-background p-6 rounded`}>
              <Dialog.Title className="text-text">Confirm Deletion</Dialog.Title>
              <Dialog.Description className="text-secondary">
                Are you sure you want to delete this resource? This action cannot be undone.
              </Dialog.Description>
              <div className="mt-4">
                <button onClick={confirmRemove} className={`mr-2 px-4 py-2 text-background bg-accent rounded shadow-accent`}>
                  Delete
                </button>
                <button onClick={closeConfirmationDialog} className={`px-4 py-2 text-text bg-primary rounded shadow-primary`}>
                  Cancel
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>        
      </Transition>

    </div>
  );
};


export default ResourceItem;
