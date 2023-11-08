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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/createUrlResource', { // Replace with your actual API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include any other headers like authorization if needed
        },
        body: JSON.stringify({
          url,
          title: 'Default Title', // You might want to include a field to set this
          description: 'Default Description', // You might want to include a field to set this
          // Include any other fields required by the createUrlResource action
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('URL resource created:', data);
      // Handle success, e.g., clear the form or show a success message
    } catch (error) {
      console.error('Error creating URL resource:', error);
      // Handle error, e.g., show an error message
    }
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
