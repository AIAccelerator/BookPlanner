import React from 'react';
import UrlForm from './UrlForm';
import PdfForm from './PdfForm';
import TextForm from './TextForm';
import DocForm from './DocForm';
import GoogleSearchForm from './GoogleSearchForm';
import ResourceType from '../../common/types/ResourceType';

interface ResourceFormProps {
  resourceType: ResourceType;
}

const ResourceForm: React.FC<ResourceFormProps> = ({ resourceType }) => {

  const renderForm = () => {
    switch (resourceType) {
      case 'url':
        return <UrlForm />;
      case 'pdf':
        return <PdfForm />;
      case 'text':
        return <TextForm />;
      case 'doc':
        return <DocForm />;
      case 'google_search':
        return <GoogleSearchForm />;
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
