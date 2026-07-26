import React, { useState } from 'react';

// TodoInput Component handling task insertion form
export default function TodoInput({ onAddTask }) {
  const [inputText, setInputText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) {
      setError('Task text cannot be empty');
      return;
    }
    onAddTask(inputText.trim());
    setInputText('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
            if (error) setError('');
          }}
          placeholder="Add a new task..."
          className="flex-grow bg-slate-950 border border-slate-800 text-slate-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
        />
        <button
          type="submit"
          className="px-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium text-sm transition-colors flex items-center gap-1.5"
        >
          <i className="fa-solid fa-plus text-xs"></i>
          Add
        </button>
      </div>
      {error && (
        <p className="text-rose-400 text-xs mt-1.5 pl-1 flex items-center gap-1.5">
          <i className="fa-solid fa-circle-exclamation"></i>
          {error}
        </p>
      )}
    </form>
  );
}
