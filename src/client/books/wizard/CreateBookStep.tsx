// src/books/wizard/CreateBookStep.tsx

import React from 'react';
import { useFormContext } from 'react-hook-form';

type Props = {
  assignSelfAsAuthor: () => void;
};

const CreateBookStep: React.FC<Props> = ({ assignSelfAsAuthor }) => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <>
      <div className="mb-4">
        <label htmlFor="title" className="block text-text mb-2">Title</label>
        <input 
          type="text" 
          id="title" 
          {...register("title", { required: "Title is required" })} 
          className="border border-primary p-2 w-full"
        />
        {errors.title && <span className="text-accent">{errors.title.message}</span>}
      </div>
      <div className="mb-4">
        <label htmlFor="author" className="block text-text mb-2">Author</label>
        <input 
          type="text" 
          id="author" 
          {...register("author", { required: "Author is required" })} 
          className="border border-primary p-2 w-full"
        />
        {errors.author && <div className="text-accent">{errors.author.message}</div>}
        <a 
        href="#" 
        onClick={(e) => { e.preventDefault(); assignSelfAsAuthor(); }} 
        className="text-sm text-secondary underline mt-2 inline-block"
      >
        Assign Myself as Author
      </a>
      </div>
    </>
  );
};

export default CreateBookStep;
