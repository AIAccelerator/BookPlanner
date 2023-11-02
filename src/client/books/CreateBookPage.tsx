// src/books/CreateBookPage.tsx

import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler, FormProvider, useFormContext } from 'react-hook-form';
import CreateBookStep from './wizard/CreateBookStep';
import CreateChapterStep from './wizard/CreateChapterStep';
import ReviewStep from './wizard/ReviewStep';
import ProgressBar from '../common/ProgressBar';
import useAuth from '@wasp/auth/useAuth';

type FormValues = {
  title: string;
  author: string;
  chapters: { title: string; description: string }[];
};

const CreateBookPage: React.FC = () => {
  const methods = useForm<FormValues>();
  const { handleSubmit, formState, setValue } = methods;
  const { data: user } = useAuth();
  const [totalSteps, setTotalSteps] = useState<number>(0);
  const [step, setStep] = useState<number>(0);

  const assignSelfAsAuthor = () => {
    setValue('author', user.fullName);
  };

  const childSteps = [
    <CreateBookStep assignSelfAsAuthor={assignSelfAsAuthor} />,
    <CreateChapterStep />,
    <ReviewStep />,
    // Assuming there are other steps, they would be listed here.
  ];

  useEffect(() => {
    setTotalSteps(childSteps.length);
  }, [childSteps.length]);

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    if (formState.errors.chapters) {
      console.error('Validation errors in chapters', formState.errors.chapters);
      return;
    }
    if (step < totalSteps - 1) {
      setStep((prevStep) => prevStep + 1);  // Move to the next step
    } else {
      console.log(values);  // Handle form submission on the last step
    }
  };

  return (
    <div className="bg-background text-text p-4">
      <h1 className="text-primary mb-4">Create Book</h1>
      <ProgressBar currentStep={step} totalSteps={totalSteps} />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {childSteps[step]}
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep((prevStep) => prevStep - 1)}
              className="bg-secondary text-background py-2 px-4 border border-primary rounded-md mr-4"
            >
              Previous Step
            </button>
          )}
          {step < totalSteps - 1 ? (
            <button
              type="submit"
              className="bg-primary text-background py-2 px-4 border border-primary rounded-md"
            >
              Next Step
            </button>
          ) : (
            <button
              type="submit"
              className="bg-primary text-background py-2 px-4 border border-primary rounded-md"
            >
              Submit
            </button>
          )}
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateBookPage;
