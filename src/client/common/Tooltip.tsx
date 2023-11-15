import React, { useState } from 'react';

const Tooltip = ({ content, children }) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  return (
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
  );
};

export default Tooltip;
