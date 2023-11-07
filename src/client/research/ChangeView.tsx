import React from 'react';
import { EyeIcon } from '@heroicons/react/24/solid';

const ChangeView = () => (
    <button
      className="inline-flex items-center rounded-md text-sm font-medium bg-primary hover:bg-secondary text-background h-10 px-4 py-2 justify-start"
    >
      <EyeIcon className="w-5 h-5 mr-2" />
    </button>
  );
  
  export default ChangeView;