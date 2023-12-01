import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import prisma from '@wasp/prisma';
import TagsInput from './TagsInput';
import generateSasToken from "@wasp/queries/generateSasToken";
import { BlobServiceClient } from '@azure/storage-blob';
import UploadedFileType from '../../common/types/UploadedFileType';
import { FormData } from '../../common/types/FormType';

type PdfFormInput = {
  mode: 'create' | 'edit';
  resource?: prisma.resource;
  onSubmit: (data: FormData) => void;
};


const PdfForm: React.FC<PdfFormInput> = ({mode, resource, onSubmit}) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [azureSasToken, setAzureSasToken] = useState<string>('');

    useEffect(() => {
      if (mode === 'edit' && resource) {
        setValue('title', resource.title);
        setValue('description', resource.description || '');
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

    const uploadFileToBlob = async (data) => {
      if (!(data.file && data.file.length > 0)) {
        return;
      }
    
      const file = data.file[0];
      const uploadedFile = await fileUpload(file, 'bookgpt');
      onSubmit({...data, file: { filePath: uploadedFile.filePath, fileName: uploadedFile.fileName}});
    };
    
    async function fileUpload(file: File, containerName: string): Promise<UploadedFileType> {

      try {
        let sasToken = await generateSasToken();
        setAzureSasToken(sasToken.sasToken);
        const blobServiceClient = new BlobServiceClient(`https://bookgpt.blob.core.windows.net/${containerName}?${sasToken.sasToken}`);
        const containerClient = blobServiceClient.getContainerClient(containerName);
        const blobClient = containerClient.getBlockBlobClient(file.name);
        const options = { blobHTTPHeaders: { blobContentType: file.type } };
        const response = await blobClient.uploadData(file, options);
        
        return {fileName: file.name, filePath: blobClient.url};
      } catch (error) {
        console.error("Error uploading file:", error);
      }

      return {fileName: '', filePath: ''};
      
    }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(uploadFileToBlob)}>
      <div>
        <label htmlFor="file" className="block text-sm font-medium text-gray-700">PDF File</label>
        <input id="file" type="file" {...register('file', { required: mode === 'create'})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
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

export default PdfForm;
