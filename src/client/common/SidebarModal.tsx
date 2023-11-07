import React, { FC, Fragment } from 'react';
import { Transition } from '@headlessui/react';

type SidebarModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

const SidebarModal: FC<SidebarModalProps> = ({ isOpen, onClose, title, children }) => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <div className="fixed inset-0 z-10 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
        <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>
        <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
          <Transition.Child
            as={Fragment}
            enter="transform transition ease-in-out duration-500 sm:duration-700"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-500 sm:duration-700"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <div className="relative w-screen max-w-md">
              <div className="h-full flex flex-col bg-background shadow-xl overflow-y-auto">
                <div className="px-4 sm:px-6 py-4">
                  <div className="flex items-center justify-between">
                    <h2 id="slide-over-title" className="text-lg font-bold text-primary">
                      {title}
                    </h2>
                    <button
                      className="text-secondary hover:text-primary focus:outline-none"
                      onClick={onClose}
                    >
                      <span className="sr-only">Close panel</span>
                      &times;
                    </button>
                  </div>
                </div>
                <div className="relative flex-1 px-4 sm:px-6">
                  {children}
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </div>
    </Transition>
  );
};

export default SidebarModal;