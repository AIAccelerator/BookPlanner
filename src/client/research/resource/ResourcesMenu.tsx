import React, { useState } from 'react';
import { Menu } from '@headlessui/react';
import { ClipboardDocumentIcon } from '@heroicons/react/24/solid';
import SidebarModal from '../common/SidebarModal';
import Text from './forms/Text';

const ResourcesMenu = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <Menu as="nav" className="relative">
        <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700">
          Actions
        </Menu.Button>
        <Menu.Items className="absolute left-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {/* ... other menu items ... */}
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={openSidebar}
                  className={`${
                    active ? 'bg-primary text-background' : 'text-text'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  <ClipboardDocumentIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                  Paste Text
                </button>
              )}
            </Menu.Item>
            {/* ... other menu items ... */}
          </div>
        </Menu.Items>
      </Menu>
      <SidebarModal isOpen={isSidebarOpen} onClose={closeSidebar} title="Paste Text">
        <Text />
      </SidebarModal>
    </>
  );
};

export default ResourcesMenu;