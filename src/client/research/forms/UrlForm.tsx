import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAction } from '@wasp/actions';
import createUrlResource from '@wasp/actions/createUrlResource';
import editUrlResource from '@wasp/actions/editUrlResource';
import type { EditUrlResource } from '@wasp/actions/types';
import TagsInput from './TagsInput';
import prisma from '@wasp/prisma';

type UrlFormData = {
  url: string;
  title: string;
  description?: string;
};

type UrlFormInput = {
  mode: 'create' | 'edit';
  resource?: prisma.resource;
  onSubmit: (data: UrlFormData) => void;
};

const UrlForm: React.FC<UrlFormInput> = ({ mode, resource, onSubmit }) => {

  const [selectedTags, setSelectedTags] = useState<string[]>([]); 
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const createUrl = useAction(createUrlResource);
  const editUrl = useAction(editUrlResource);
      
  useEffect(() => {
    if (mode === 'edit' && resource) {
      setValue('title', resource.title);
      setValue('description', resource.description || '');
      setValue('url', resource.url);
      const tags = transformTags(resource.tags);
      setSelectedTags(tags);
      setValue('tags', tags);
    }
  }, [mode, resource, setValue]);

  const handleTagsChange = (selectedTags: string[]) => {
    
    setSelectedTags(selectedTags);
    setValue('tags', selectedTags);
  };
  
  const transformTags = (tags: prisma.resourcetotag) => {    
    return tags ? tags.map(tag => tag.tag.name) : [];
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
        {mode == 'edit' && selectedTags.length > 0 &&
           <TagsInput onTagsChange={handleTagsChange} tags={selectedTags} />          
        }

        {mode == 'edit' && selectedTags.length == 0 &&
          <TagsInput onTagsChange={handleTagsChange} tags={selectedTags} />
        }

        {mode == 'create' &&
          <TagsInput onTagsChange={handleTagsChange} tags={[]} />
        }
        <input id="tags-hidden" type="hidden" {...register('tags', { value: selectedTags })} />
      </div>

      <button type="submit" className="py-2 px-4 bg-gradient-primary bg-primary text-white rounded shadow-primary hover:bg-secondary">Submit</button>
    </form>
  );
};

export default UrlForm;
