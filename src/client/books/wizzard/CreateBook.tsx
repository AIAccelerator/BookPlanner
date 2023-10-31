import React, { useState, useContext, useEffect } from 'react';
import { WizardContext } from '../../common/WizardContext';
import Step from '../../common/Step'; // Ensure you import Step

const CreateBook = () => {
  const { updateFormData, setValidators, formErrors, setFormErrors } = useContext(WizardContext);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [titleError, setTitleError] = useState<string | null>(null);
  const [authorError, setAuthorError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const user = { fullName: 'Your Name' }; // Replace this with your actual user object

  useEffect(() => {
    setValidators([
      { field: 'title', validate: (value: any) => value ? null : 'Title is required' },
      { field: 'author', validate: (value: any) => value ? null : 'Author is required' },
    ]);
  }, []);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();

    if (title && author) {
      updateFormData({ title, author });
    } else {
      setError('Both title and author are required.');
    }
  };

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
            {formErrors.title && <span className="text-accent text-xs mt-1">{formErrors.title}</span>}

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
            {formErrors.author && <span className="text-accent text-xs mt-1">{formErrors.author}</span>}

          </div>
        </form>
          
          {error && <div className="bg-red-100 text-red-700 p-4 rounded mt-4">{error}</div>}      
      </Step>
  ;
};
