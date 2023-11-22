import React from 'react';
import UrlForm from './UrlForm';
import PdfForm from './PdfForm';
import TextForm from './TextForm';
import DocForm from './DocForm';
import GoogleSearchForm from './GoogleSearchForm';
import ResourceType from '../../common/types/ResourceType';
import prisma from '@wasp/prisma';
import type { FormData } from "../../common/types/FormType";

interface ResourceFormProps {
  resourceType: ResourceType;
  mode: 'create' | 'edit';
  resource?: prisma.resource;
  onSubmit: (data: FormData) => void;
}

const ResourceForm: React.FC<ResourceFormProps> = ({ resourceType, mode, resource, onSubmit }) => {

  const renderForm = () => {
    switch (resourceType) {
      case 'url':
        return <UrlForm mode={mode} resource={resource} onSubmit={onSubmit} />;
      case 'pdf':
        return <PdfForm mode={mode} resource={resource} onSubmit={onSubmit} />;
      case 'text':
        return <TextForm mode={mode} resource={resource} onSubmit={onSubmit} />;
      case 'doc':
        return <DocForm mode={mode} resource={resource} onSubmit={onSubmit}/>;
      case 'google_search':
        return <GoogleSearchForm mode={mode} resource={resource} onSubmit={onSubmit} />;
      default:
        return <div>Select a resource type</div>;
    }
  };

  return (
    <div>
      {/* Render the selected form */}
      {renderForm()}
    </div>
  );
};

export default ResourceForm;
