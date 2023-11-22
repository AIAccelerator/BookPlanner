import React from 'react';
import { Transition } from '@headlessui/react';
import {Menu} from '@headlessui/react';
import IconComponent from '../IconComponent';
import ResourceType from "../../common/types/ResourceType";

type ResourceCreateButtonProps = {
    handleSelectResourceType: (type: ResourceType) => void;
};
const resourceTypes = [
    { type: 'url', label: 'URL' },
    { type: 'pdf', label: 'PDF' },
    { type: 'text', label: 'Text' }, // Example icon, change as needed
    { type: 'doc', label: 'Doc' },
    { type: 'google_search', label: 'Google Search' },
];


export const ResourceCreateButton: React.FC<ResourceCreateButtonProps> = ({handleSelectResourceType}) => {
    return (
        <>
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
        </>
    );
};