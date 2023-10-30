import React from 'react';

interface CommonStepProps {
  onNext: (data: any) => void;
  formData?: any;
}

interface StepProps extends CommonStepProps {
  children: React.ReactNode;
}

const Step: React.FC<StepProps> = ({ children, onNext }) => {
  return (
    <>
      {children}
    </>
  );
};

export default Step;
export type { CommonStepProps };
