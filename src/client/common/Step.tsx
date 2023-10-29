import React from 'react';

interface StepProps {
  onNext: (data: any) => void;
  children: React.ReactNode;
}

const Step: React.FC<StepProps> = ({ children, onNext }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    onNext(data);
  };

  return (
    <>
      {children}
      <button onClick={handleSubmit}>Next</button>
    </>
  );
};

export default Step;
