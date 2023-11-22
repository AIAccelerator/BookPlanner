import React from 'react';
import { useForm } from 'react-hook-form';
import prisma from '@wasp/prisma';

type GoogleSearchFormData = {
  searchQuery: string;
  description?: string;
};

type GoogleSearchFormInput = {
  mode: 'create' | 'edit';
  resource: prisma.resource;
};

const GoogleSearchForm: React.FC<GoogleSearchFormInput> = ({mode, resource}) => {
  const { register, handleSubmit, formState: { errors } } = useForm<GoogleSearchFormData>();

  const onSubmit = (data: GoogleSearchFormData) => {
    if (mode === 'edit') {
    } else {
      
    }
    console.log(data);
    // Process the submitted data here
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="searchQuery" className="block text-sm font-medium text-gray-700">Search Query</label>
        <input 
          id="searchQuery" 
          {...register('searchQuery', { required: 'This field is required' })}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.searchQuery && <span className="text-red-500 text-xs">{errors.searchQuery.message}</span>}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea 
          id="description" 
          {...register('description')}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded">Submit</button>
    </form>
  );
};

export default GoogleSearchForm;
