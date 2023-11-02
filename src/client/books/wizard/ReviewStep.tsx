import React from 'react';
import { useFormContext } from 'react-hook-form';

const ReviewStep: React.FC = () => {
  const { watch } = useFormContext();
  const { title, author, chapters } = watch();

  return (
    <div className="mb-4">
      <h2 className="text-primary mb-2">Review</h2>
      <p className="mb-2"><strong>Title:</strong> {title}</p>
      <p className="mb-2"><strong>Author:</strong> {author}</p>

      <h3 className="text-primary mt-4 mb-2">Chapters:</h3>
      {chapters && chapters.length > 0 ? (
        chapters.map((chapter, index) => (
          <div key={index} className="mb-2">
            <p><strong>Chapter {index + 1}:</strong> {chapter.title}</p>
            <p>Description: {chapter.description}</p>
          </div>
        ))
      ) : (
        <p>No chapters added.</p>
      )}
    </div>
  );
};

export default ReviewStep;
