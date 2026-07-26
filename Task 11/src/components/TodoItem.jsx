import React from 'react';

// TodoItem Component representing an individual task row
export default function TodoItem({ task, onToggle, onDelete }) {
  return (
    <div className={`flex items-center justify-between p-3 bg-slate-950/45 border border-slate-800/80 hover:border-slate-700/80 rounded-xl transition-all ${
      task.completed ? 'opacity-70' : ''
    }`}>
      <div className="flex items-center gap-3 min-w-0 flex-grow pr-2">
        <button
          onClick={() => onToggle(task.id)}
          className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all cursor-pointer ${
            task.completed 
              ? 'bg-indigo-600 border-indigo-600 text-white' 
              : 'border-slate-600 hover:border-indigo-500 bg-transparent'
          }`}
        >
          {task.completed && <i className="fa-solid fa-check text-[10px]"></i>}
        </button>
        <span 
          onClick={() => onToggle(task.id)}
          className={`text-sm break-words select-none cursor-pointer ${
            task.completed ? 'line-through text-slate-500' : 'text-slate-200'
          }`}
        >
          {task.text}
        </span>
      </div>
      <button
        onClick={() => onDelete(task.id)}
        className="text-slate-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-rose-500/10 transition-all flex-shrink-0"
        title="Delete task"
      >
        <i className="fa-solid fa-trash-can text-xs"></i>
      </button>
    </div>
  );
}
