import React from 'react';
import { useForm } from 'react-hook-form';

type PdfFormData = {
  file: FileList;
  title: string;
  description?: string;
};

const PdfForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<PdfFormData>();

  const onSubmit = (data: PdfFormData) => {
    console.log(data);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="file" className="block text-sm font-medium text-gray-700">PDF File</label>
        <input id="file" type="file" {...register('file', { required: true })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
        {errors.file && <span className="text-red-500 text-xs">This field is required</span>}
      </div>

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
        <input id="title" {...register('title', { required: true })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
        {errors.title && <span className="text-red-500 text-xs">This field is required</span>}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea id="description" {...register('description')} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
      </div>

      <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded">Submit</button>
    </form>
  );
};

export default PdfForm;
