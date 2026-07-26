import React from 'react';

export default function WeatherError({ message }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-8 bg-rose-500/10 border border-rose-500/20 rounded-2xl p-6">
      <div className="w-12 h-12 rounded-full bg-rose-500/20 flex items-center justify-center mb-3">
        <i className="fa-solid fa-circle-exclamation text-rose-400 text-lg"></i>
      </div>
      <h3 className="text-sm font-bold text-rose-300 font-outfit uppercase tracking-wider mb-1">
        Search Failed
      </h3>
      <p className="text-xs text-rose-400/90 max-w-[240px]">
        {message || "We couldn't retrieve the weather for that location. Please check your spelling or try again."}
      </p>
    </div>
  );
}
