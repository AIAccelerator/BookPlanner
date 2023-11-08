import React, { useState } from 'react';

const Text: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState(''); // You can set a default type if needed

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Here you would handle the submission of the text, e.g., sending it to a server or processing it further.
    console.log('Submitted text:', text);
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
