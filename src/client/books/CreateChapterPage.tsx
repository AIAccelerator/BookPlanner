// File: src/components/CreateChapter.jsx

import React, { useState } from 'react';
import createChapter from '@wasp/actions/createChapter';
import { useHistory } from 'react-router-dom';

const CreateChapterPage = () => {
  const [title, setTitle] = useState('');
  const [number, setNumber] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [bookId, setBookId] = useState('');
  
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
        await createChapter({
            bookId: parseInt(bookId),
            title: title,
            number: parseInt(number),
            description: description
            });
      setSuccess(true);
    } catch (error) {
      setError(error.message);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">Create a New Chapter</h1>
      {success ? (
        <div className="bg-green-100 text-green-700 p-4 rounded">Chapter created successfully!</div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="number" className="block text-gray-700 text-sm font-bold mb-2">Chapter Number:</label>
            <input
              type="number"
              id="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-20"
            ></textarea>
          </div>
          <button type="submit" disabled={isSubmitting} className={`px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}>
            {isSubmitting ? 'Creating...' : 'Create Chapter'}
          </button>
          <button type="button" onClick={() => history.goBack()} className="px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline-red ml-4">
            Cancel
          </button>
        </form>
      )}
      {error && <div className="bg-red-100 text-red-700 p-4 rounded mt-4">{error}</div>}
    </div>
  );
};

export default CreateChapterPage;
