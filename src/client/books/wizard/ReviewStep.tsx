import React from 'react';
import { useFormContext } from 'react-hook-form';

const ReviewStep: React.FC = () => {
  const { watch } = useFormContext();
  const { title, author } = watch();

  return (
    <div className="mb-4">
      <h2 className="text-primary mb-2">Review</h2>
      <p className="mb-2"><strong>Title:</strong> {title}</p>
      <p className="mb-2"><strong>Author:</strong> {author}</p>
    </div>
  );
};

export default ReviewStep;