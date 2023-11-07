import React, { useState } from 'react';

interface TagInputProps {
  // Define your props here
}

const TagInput: React.FC<TagInputProps> = (props) => {
  const [input, setInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && input) {
      if (!tags.includes(input)) {
        setTags([...tags, input]);
      }
      setInput('');
    }
  };

  const handleTagRemove = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
      />
      {tags.map(tag => (
        <div key={tag}>
          {tag}
          <button onClick={() => handleTagRemove(tag)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default TagInput;
