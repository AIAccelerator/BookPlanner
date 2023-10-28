import { FC, Fragment, ReactNode } from 'react';
import { Transition } from '@headlessui/react';

type SidebarModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children?: React.ReactNode; // Add this line
  };
  

const SidebarModal: FC<SidebarModalProps> = ({ isOpen, onClose, title, children }) => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <div
        className="fixed inset-0 overflow-hidden"
        aria-labelledby="slide-over-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gray-500 bg-opacity-75" onClick={onClose}></div>
          
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
              <div className="w-screen max-w-md">
                <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                  <div className="px-4 sm:px-6">
                    <div className="flex items-start justify-between">                      
                      <div className="ml-3 h-7 flex items-center">
                        <button
                          className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          onClick={onClose}
                        >
                          <span className="sr-only">Close panel</span>
                          &times;
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 relative flex-1 px-4 sm:px-6">
                    {children}
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </div>
    </Transition>
  );
}

export default SidebarModal;
