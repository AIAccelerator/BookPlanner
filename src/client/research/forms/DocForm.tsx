import React from 'react';
import { useForm } from 'react-hook-form';
import prisma from '@wasp/prisma';

type DocFormData = {
  file: FileList;
  title: string;
  description?: string;
};

type DocFormInput = {
  mode: 'create' | 'edit';
  resource: prisma.resource;
};

const DocForm: React.FC<DocFormInput> = ({mode, resource}) => {
  const { register, handleSubmit, formState: { errors } } = useForm<DocFormData>();

  const onSubmit = (data: DocFormData) => {
    if (mode === 'edit') {
    } else {

    }
    console.log(data);
    // Process the submitted data here
  };

  const validateFileType = (fileList: FileList) => {
    if (fileList.length === 0) return true; // No file selected
    const file = fileList[0];
    const allowedExtensions = /(\.doc|\.docx)$/i;
    return allowedExtensions.exec(file.name) ? true : 'Invalid file type. Please select a .doc or .docx file.';
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="file" className="block text-sm font-medium text-gray-700">Document File</label>
        <input 
          id="file" 
          type="file" 
          {...register('file', { required: 'This field is required', validate: validateFileType })}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.file && <span className="text-red-500 text-xs">{errors.file.message}</span>}
      </div>

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
        <input 
          id="title" 
          {...register('title', { required: 'This field is required' })}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.title && <span className="text-red-500 text-xs">{errors.title.message}</span>}
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

export default DocForm;
