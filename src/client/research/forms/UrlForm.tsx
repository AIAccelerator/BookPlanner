import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAction } from '@wasp/actions';
import createUrlResource from '@wasp/actions/createUrlResource';
import TagsInput from './TagsInput';

type UrlFormData = {
  url: string;
  title: string;
  description?: string;
};

const UrlForm: React.FC = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]); 
  const { register, handleSubmit, formState: { errors } } = useForm<UrlFormData>();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const createUrl = useAction(createUrlResource);
  
  const onSubmit = async (data: UrlFormData) => {
    try {
      await createUrl({
        url: data.url,
        title: data.title,
        description: data.description,
        resourceType: 'url',
        tags: selectedTags
      });
      setSuccessMessage('Resource created successfully');
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(error.message);
      setSuccessMessage(null);
    }
  };
  const handleTagsChange = (selectedTags: string[]) => {
    console.log('Selected Tags:', selectedTags);
    setSelectedTags(selectedTags);
  };

  const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

  return (
    <form className="space-y-4 bg-background p-4 rounded" onSubmit={handleSubmit(onSubmit)}>
      {successMessage && <div className="text-green-500">{successMessage}</div>}
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}

      <div>
        <label htmlFor="url" className="block text-sm font-medium text-text">URL</label>
        <input 
          id="url" 
          {...register('url', { 
            required: 'This field is required', 
            pattern: {
              value: urlPattern,
              message: 'Enter a valid URL'
            } 
          })} 
          className="mt-1 block w-full border border-primary rounded-md shadow-primary focus:ring-accent focus:border-accent sm:text-sm"
        />
        {errors.url && <span className="text-accent text-xs">{errors.url.message}</span>}
      </div>

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-text">Title</label>
        <input 
          id="title" 
          {...register('title', { required: true })} 
          className="mt-1 block w-full border border-primary rounded-md shadow-primary focus:ring-accent focus:border-accent sm:text-sm"
        />
        {errors.title && <span className="text-accent text-xs">This field is required</span>}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-text">Description</label>
        <textarea 
          id="description" 
          {...register('description')} 
          className="mt-1 block w-full border border-primary rounded-md shadow-primary focus:ring-accent focus:border-accent sm:text-sm"
        />
      </div>
      
      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-primary">Tags</label>
        <TagsInput onTagsChange={handleTagsChange} />
      </div>

      <button type="submit" className="py-2 px-4 bg-gradient-primary bg-primary text-white rounded shadow-primary hover:bg-secondary">Submit</button>
    </form>
  );
};

export default UrlForm;
