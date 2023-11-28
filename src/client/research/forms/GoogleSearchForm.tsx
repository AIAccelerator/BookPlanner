import React, {useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import prisma from '@wasp/prisma';
import TagsInput from './TagsInput';

type GoogleSearchFormData = {
  searchQuery: string;
  description?: string;
};

type GoogleSearchFormInput = {
  mode: 'create' | 'edit';
  resource: prisma.resource;
  onSubmit: (data: GoogleSearchFormData) => void;
};

const GoogleSearchForm: React.FC<GoogleSearchFormInput> = ({mode, resource, onSubmit}) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<GoogleSearchFormData>();
  const [selectedTags, setSelectedTags] = useState<string[]>([]); 

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

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="searchQuery" className="block text-sm font-medium text-gray-700">Search Query</label>
        <input 
          id="searchQuery" 
          {...register('url', { required: 'This field is required' })}
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
      <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded">Submit</button>
    </form>
  );
};

export default GoogleSearchForm;
