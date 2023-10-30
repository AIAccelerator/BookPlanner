import React, { useState } from 'react';
import createBook from '@wasp/actions/createBook';
import useAuth from '@wasp/auth/useAuth';
import Step, { CommonStepProps } from '../../common/Step';

const CreateBook: React.FC<CommonStepProps> = ({ onNext }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [titleError, setTitleError] = useState('');
  const [authorError, setAuthorError] = useState('');
  const [error, setError] = useState(null);
  const { data: user } = useAuth();

  const validateTitle = () => {
    if (!title.trim()) {
      setTitleError('Title is required.');
      return false;
    }
    setTitleError('');
    return true;
  };

  const validateAuthor = () => {
    if (!author.trim()) {
      setAuthorError('Author is required.');
      return false;
    }
    setAuthorError('');
    return true;
  };

  const handleNext = async (e) => {
    e.preventDefault();
    const isTitleValid = validateTitle();
    const isAuthorValid = validateAuthor();
    if (isTitleValid && isAuthorValid) {
      try {
        await createBook({ title, author });
        onNext({ title, author });
      } catch (err) {
        setError(err.message);
      }      
    }
  };

  return (
      <Step onNext={handleNext}>
        <form onSubmit={handleNext} className="bg-background shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label htmlFor="title" className="block text-text text-sm font-bold mb-2">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="shadow appearance-none border border-primary rounded w-full py-2 px-3 text-text leading-tight focus:outline-none focus:shadow-outline"
            />
            {titleError && <p className="text-accent text-xs mt-1">{titleError}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="author" className="block text-text text-sm font-bold mb-2">Author:</label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="shadow appearance-none border border-primary rounded w-full py-2 px-3 text-text leading-tight focus:outline-none focus:shadow-outline"
            />
            <a 
              href="#" 
              className="text-accent text-xs mt-1" 
              onClick={(e) => { e.preventDefault(); setAuthor(user?.fullName); }}
            >
              Use my name ({user?.fullName}) as the author
            </a>
            {authorError && <p className="text-accent text-xs mt-1">{authorError}</p>}
          </div>
        </form>
          
          {error && <div className="bg-red-100 text-red-700 p-4 rounded mt-4">{error}</div>}      
      </Step>
  );
};

export default CreateBook;