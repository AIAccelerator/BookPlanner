import React, { useState } from 'react';
import createBook from '@wasp/actions/createBook';
import useAuth from '@wasp/auth/useAuth';
import Step from '../../common/Step';

interface CreateBookProps {
  onNext?: (data: any) => void;
}

const CreateBook: React.FC<CreateBookProps> = ({ onNext }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [titleError, setTitleError] = useState('');
  const [authorError, setAuthorError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      await createBook({ title, author });
      onNext({ title, author });
    }
  };

  return (
    <Step onNext={handleNext}>
      <div className="flex">
        {/* Rest of the page content goes here */}
        <aside className="w-full h-full bg-background p-4 fixed right-0 top-0 overflow-y-auto">
          <h1 className="text-2xl font-bold mb-5 text-primary">Book Wizard</h1>
          {success ? (
            <div className="bg-green-100 text-green-700 p-4 rounded">Book created successfully!</div>
          ) : (
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
              <button type="submit" disabled={isSubmitting} className={`px-4 py-2 font-bold text-white bg-primary rounded-full hover:bg-secondary focus:outline-none focus:shadow-outline-blue ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}>
                {isSubmitting ? 'Creating...' : 'Next'}
              </button>
            </form>
          )}
          {error && <div className="bg-red-100 text-red-700 p-4 rounded mt-4">{error}</div>}
        </aside>
      </div>
    </Step>
  );
};

export default CreateBook;