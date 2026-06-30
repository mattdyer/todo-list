import React, { useState } from 'react';

interface TodoInputProps {
  onAdd: (text: string) => void;
  placeholder?: string;
}

const TodoInput: React.FC<TodoInputProps> = ({ onAdd, placeholder = 'Add a new task...' }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        className="flex-1 px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Add
      </button>
    </form>
  );
};

export default TodoInput;
