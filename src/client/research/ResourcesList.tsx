import React from 'react';
import { Transition } from '@headlessui/react';
import prisma from '@wasp/prisma';
import { TrashIcon, LinkIcon, DocumentTextIcon, DocumentIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import ResourceItem from './ResourceItem';

interface ResourcesListProps {
  resources: prisma.resource[];
  onTagClick: (tagName: string) => void;
  onRemove: (resourceId: number) => void;
}

const ResourcesList: React.FC<ResourcesListProps> = ({ resources, onTagClick, onRemove }) => {


  if (!resources || resources.length === 0) return <div className="empty">No resources found.</div>;

  return (
    <Transition
      as="div"
      className="bg-white p-6 rounded-lg shadow-lg"
      show={true}
      enter="transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
    >
      {resources.map(resource => (
        <ResourceItem
          key={resource.id}
          resource={resource}
          onTagClick={onTagClick}
          onRemove={onRemove}
        />
      ))}
    </Transition>
  );
};

export default ResourcesList;
