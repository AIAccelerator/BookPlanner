import React, { useState } from 'react';

interface WizardProps {
  children: React.ReactNode | React.ReactNode[];
  onSubmit: (data: any) => void;
}

const Wizard: React.FC<WizardProps> = ({ children, onSubmit }) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});

  const next = (data: any) => {
    setFormData(prev => ({ ...prev, ...data }));
    if (step < React.Children.count(children) - 1) {
      setStep(step + 1);
    } else {
      onSubmit(formData);
    }
  };

  const childArray = React.Children.toArray(children);

  return (
    <>
      {childArray[step] && React.cloneElement(childArray[step] as React.ReactElement, { onNext: next })}
    </>
  );
};

export default Wizard;
