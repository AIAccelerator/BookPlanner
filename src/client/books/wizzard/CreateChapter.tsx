import React, { useState } from 'react';
import createChapter from '@wasp/actions/createChapter';
import useAuth from '@wasp/auth/useAuth';
import Step, { CommonStepProps } from '../../common/Step';

const CreateChapter: React.FC<CommonStepProps> = ({ onNext }) => {
  const [chapterTitle, setChapterTitle] = useState('');
  const [chapterContent, setChapterContent] = useState('');
  const [chapterTitleError, setChapterTitleError] = useState('');
  const [chapterContentError, setChapterContentError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const { data: user } = useAuth();

  const validateChapterTitle = () => {
    if (!chapterTitle.trim()) {
      setChapterTitleError('Chapter title is required.');
      return false;
    }
    setChapterTitleError('');
    return true;
  };

  const validateChapterContent = () => {
    if (!chapterContent.trim()) {
      setChapterContentError('Chapter content is required.');
      return false;
    }
    setChapterContentError('');
    return true;
  };

  const handleNext = async (e) => {
    e.preventDefault();
    const isChapterTitleValid = validateChapterTitle();
    const isChapterContentValid = validateChapterContent();
    if (isChapterTitleValid && isChapterContentValid) {
      try {
        await createChapter({ chapterTitle, chapterContent });
        onNext({ chapterTitle, chapterContent });
      } catch (err) {
        setError(err.message);
      }      
    }
  };

  return (
    <Step onNext={handleNext}>
        {success ? (
          <div className="bg-green-100 text-green-700 p-4 rounded">Chapter created successfully!</div>
        ) : (
          <form onSubmit={handleNext} className="bg-background shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label htmlFor="chapterTitle" className="block text-text text-sm font-bold mb-2">Chapter Title:</label>
              <input
                type="text"
                id="chapterTitle"
                value={chapterTitle}
                onChange={(e) => setChapterTitle(e.target.value)}
                className="shadow appearance-none border border-primary rounded w-full py-2 px-3 text-text leading-tight focus:outline-none focus:shadow-outline"
              />
              {chapterTitleError && <p className="text-accent text-xs mt-1">{chapterTitleError}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="chapterContent" className="block text-text text-sm font-bold mb-2">Chapter Content:</label>
              <textarea
                id="chapterContent"
                value={chapterContent}
                onChange={(e) => setChapterContent(e.target.value)}
                className="shadow appearance-none border border-primary rounded w-full py-2 px-3 text-text leading-tight focus:outline-none focus:shadow-outline"
              ></textarea>
              {chapterContentError && <p className="text-accent text-xs mt-1">{chapterContentError}</p>}
            </div>
            <button type="submit" disabled={isSubmitting} className={`px-4 py-2 font-bold text-white bg-primary rounded-full hover:bg-secondary focus:outline-none focus:shadow-outline-blue ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}>
              {isSubmitting ? 'Creating...' : 'Next'}
            </button>
          </form>
        )}
        {error && <div className="bg-red-100 text-red-700 p-4 rounded mt-4">{error}</div>}
    </Step>
  );
};

export default CreateChapter;
