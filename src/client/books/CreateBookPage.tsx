import React from 'react';
import { WizardProvider } from '../common/WizardContext';
import Wizard from '../common/Wizard';
import CreateBook from './wizzard/CreateBook';
import CreateChapter from './wizzard/CreateChapter';
import Review from './wizzard/Review';

const CreateBookPage: React.FC = () => {
  const handleWizardComplete = (data: any) => {
    console.log(data);
    // Handle the form data here, e.g., make API calls.
  };

  return (
    <div className="container mx-auto mt-10 p-4 bg-background rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-text">Create a New Book</h1>
      <WizardProvider initialData={{}} totalSteps={3}>
        <Wizard onSubmit={handleWizardComplete}>
          <CreateBook />
          <Review />
        </Wizard>
      </WizardProvider>
    </div>
  );
};

export default CreateBookPage;
