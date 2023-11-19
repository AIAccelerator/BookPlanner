import React from 'react';
import { useForm } from 'react-hook-form';

type TextFormData = {
  content: string;
  title: string;
};

const TextForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<TextFormData>();

  const onSubmit = (data: TextFormData) => {
    console.log(data);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">Text Content</label>
        <textarea id="content" {...register('content', { required: true })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
        {errors.content && <span className="text-red-500 text-xs">This field is required</span>}
      </div>

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
        <input id="title" {...register('title', { required: true })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
        {errors.title && <span className="text-red-500 text-xs">This field is required</span>}
      </div>

      <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded">Submit</button>
    </form>
  );
};

export default TextForm;
