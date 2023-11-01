// src/books/CreateBookPage.tsx

import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import CreateBookStep from './wizard/CreateBookStep';
import ReviewStep from './wizard/ReviewStep';
import ProgressBar from '../common/ProgressBar';
import Review from './wizard/Review';  // Ensure this import is used or remove if unnecessary

type FormValues = {
  title: string;
  author: string;
};

const CreateBookPage: React.FC = () => {
  const methods = useForm<FormValues>();
  const { handleSubmit } = methods;
  const [totalSteps, setTotalSteps] = useState<number>(0);
  const [step, setStep] = useState<number>(0);

  const childSteps = [
    <CreateBookStep />,
    <ReviewStep />,
    // Assuming there are other steps, they would be listed here.
  ];

  useEffect(() => {
    setTotalSteps(childSteps.length);
  }, [childSteps.length]);

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    if (step < totalSteps - 1) {
      setStep((prevStep) => prevStep + 1);  // Move to the next step
    } else {
      console.log(values);  // Handle form submission on the last step
    }
  };

  const handlePreviousStep = () => {
    setStep((prevStep) => prevStep - 1);  // Move to the previous step
  };

  return (
    <div className="bg-background text-text p-4">
      <h1 className="text-primary mb-4">Create Book</h1>
      <ProgressBar currentStep={step + 1} totalSteps={totalSteps} />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {childSteps[step]}  {/* Render the current step */}
          <button 
            type="button" 
            onClick={handlePreviousStep} 
            disabled={step === 0} 
            className="bg-secondary text-background py-2 px-4 border border-primary rounded-md mr-2"
          >
            Previous Step
          </button>
          <button type="submit" className="bg-primary text-background py-2 px-4 border border-primary rounded-md">
            {step < totalSteps - 1 ? 'Next Step' : 'Submit'}
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateBookPage;
