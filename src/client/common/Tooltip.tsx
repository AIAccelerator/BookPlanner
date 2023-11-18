import React, { Fragment, useState } from 'react';
import { Transition } from '@headlessui/react'

const Tooltip = ({ content, children }) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  return (
    <Transition
        as={Fragment}
        show={true}
        enter="transform transition duration-[400ms]"
        enterFrom="opacity-0 rotate-[-120deg] scale-50"
        enterTo="opacity-100 rotate-0 scale-100"
        leave="transform duration-200 transition ease-in-out"
        leaveFrom="opacity-100 rotate-0 scale-100 "
        leaveTo="opacity-0 scale-95 "
    >
        <div className="relative flex flex-col items-center group">
            {isTooltipVisible && (
                <div
                className="absolute bottom-full mb-2 z-10 p-2 text-sm text-white bg-black rounded-md shadow-lg"
                style={{ minWidth: '120px' }}
                >
                {content}
                <span className="absolute top-full w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-black"></span>
                </div>
            )}

            <div
                onMouseEnter={() => setTooltipVisible(true)}
                onMouseLeave={() => setTooltipVisible(false)}
            >
                {children}
            </div>
        </div>
    </Transition>
  );
};

export default Tooltip;
