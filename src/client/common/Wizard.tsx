import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import ProgressBar from './ProgressBar';
import { WizardProvider } from "./WizardContext";

interface WizardProps {
  children: React.ReactElement[];
  onSubmit: (data: any) => void;
}

const Wizard: React.FC<WizardProps> = ({ children, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [success, setSuccess] = useState(false);

  const totalSteps = React.Children.count(children);

  const goNext = () => {
      if (currentStep < totalSteps - 1) setCurrentStep(currentStep + 1);
  };

  const goPrev = () => {
      if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const updateFormData = (newData) => {
      setFormData({ ...formData, ...newData });
  };

  const handleFormSubmission = () => {
      setSuccess(true);
      onSubmit(formData);
  };

  const childProps = {
      updateFormData,
      formData,
      goNext,
      goPrev
  };

  return (
    <WizardProvider initialData={{}} totalSteps={totalSteps}>
    <div className="flex">
      <aside className="w-full h-full bg-background p-4 fixed right-0 top-0 overflow-y-auto">
      <h1 className="text-2xl font-bold mb-5 text-primary">Book Wizard</h1>
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        <div>
            <Transition
              show={success}
              enter="transition-opacity duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="bg-green-100 text-green-700 p-4 rounded">Book created successfully!</div>
            </Transition>

            {children[currentStep] && React.cloneElement(children[currentStep], childProps)}
            <div className="flex gap-2">
                {currentStep > 0 && <button className='bg-primary text-background py-2 px-4 rounded' onClick={goPrev}>Previous</button>}
                {currentStep < totalSteps - 1 ? 
                    <button className="bg-primary text-background py-2 px-4 rounded" onClick={goNext}>Next</button> : 
                    <button className="bg-primary text-background py-2 px-4 rounded" onClick={handleFormSubmission}>Submit</button>}
            </div>
        </div>
      </aside>
    </div>
    </WizardProvider>
  );
};

export default Wizard;
