import React, { useState } from 'react';

const Text: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('text'); // Default type set to 'text'

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/createResource', { // Replace with your actual API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include any other headers like authorization if needed
        },
        body: JSON.stringify({
          title,
          description,
          type,
          // Include any other fields required by the createResource action
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Resource created:', data);
      // Handle success, e.g., clear the form or show a success message
    } catch (error) {
      console.error('Error creating resource:', error);
      // Handle error, e.g., show an error message
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h2 className="text-secondary font-semibold text-lg mb-3">Paste your text</h2>
      <textarea
        value={text}
        onChange={handleTextChange}
        placeholder="Paste your text here..."
        rows={10}
        className="w-full p-3 border border-secondary rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
      />
      <div className="mt-4">
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-background rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Text;
