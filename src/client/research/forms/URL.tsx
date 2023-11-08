import React from 'react';
,
const URL = () => {
    return (
        <div>
        <h1>URL</h1>
        </div>
    );
}
z
export default URL;import React, { useState } from 'react';

const URL: React.FC = () => {
  const [url, setUrl] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('URL submitted:', url);
    // Here you can handle the URL, e.g., save it to a database or send it to an API
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h2 className="text-secondary font-semibold text-lg mb-3">Submit your URL</h2>
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter your URL here..."
        className="w-full p-3 border border-secondary rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
        required
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

export default URL;
