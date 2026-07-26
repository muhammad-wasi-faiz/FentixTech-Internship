import React from 'react';
import TodoItem from './TodoItem';

// TodoList Component rendering a list of TodoItems or empty state
export default function TodoList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-8 text-slate-500 bg-slate-950/10 border border-dashed border-slate-800 rounded-xl">
        <p className="text-sm">No tasks remaining! 🎉</p>
      </div>
    );
  }

  return (
    <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
      {tasks.map(task => (
        <TodoItem 
          key={task.id} 
          task={task} 
          onToggle={onToggle} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
}
