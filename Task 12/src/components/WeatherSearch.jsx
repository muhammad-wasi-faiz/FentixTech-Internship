import React, { useState } from 'react';

export default function WeatherSearch({ onSearch }) {
  const [input, setInput] = useState('');
  const [shake, setShake] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    onSearch(input.trim());
    setInput('');
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`mb-6 flex gap-2 transition-transform duration-200 ${shake ? 'animate-bounce' : ''}`}
    >
      <div className="relative flex-grow">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search for a city (e.g. Tokyo, New York)..."
          className="w-full bg-slate-900/60 border border-slate-800 focus:border-indigo-500/50 rounded-2xl py-3 pl-4 pr-10 text-sm focus:outline-none transition-colors text-slate-100 placeholder:text-slate-500 backdrop-blur-md"
        />
        <i className="fa-solid fa-location-dot absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-sm"></i>
      </div>
      <button
        type="submit"
        className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-950/50 cursor-pointer active:scale-95"
      >
        <i className="fa-solid fa-magnifying-glass text-xs"></i>
        <span>Search</span>
      </button>
    </form>
  );
}
