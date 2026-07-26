import React, { useState, useEffect } from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

// Main App Component holding states and handling operations
export default function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('simple_tasks');
    return saved ? JSON.parse(saved) : [
      { id: 1, text: "Welcome to your To-Do list! 👋", completed: false },
      { id: 2, text: "Task completed looks like this ✔", completed: true },
      { id: 3, text: "Click the trash can to delete a task 🗑", completed: false }
    ];
  });

  // Save tasks to localStorage on update
  useEffect(() => {
    localStorage.setItem('simple_tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Add task handler passed down to input
  const handleAddTask = (text) => {
    const newTask = {
      id: Date.now(),
      text: text,
      completed: false
    };
    setTasks([...tasks, newTask]);
  };

  // Toggle completion
  const handleToggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Delete task
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const totalTasks = tasks.length;
  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl w-full max-w-md mx-auto my-10">
      
      {/* Header */}
      <header className="mb-6 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-white mb-1">To-Do List</h1>
        <p className="text-slate-400 text-xs font-light">Keep it simple, get things done</p>
      </header>

      {/* Input */}
      <TodoInput onAddTask={handleAddTask} />

      {/* List */}
      <TodoList 
        tasks={tasks} 
        onToggle={handleToggleComplete} 
        onDelete={handleDeleteTask} 
      />

      {/* Stats Footer */}
      {totalTasks > 0 && (
        <footer className="mt-6 pt-4 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400">
          <span>{completedCount} of {totalTasks} completed</span>
          {completedCount > 0 && (
            <button
              onClick={() => setTasks(tasks.filter(t => !t.completed))}
              className="text-rose-400 hover:text-rose-300 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <i className="fa-solid fa-broom text-[10px]"></i>
              Clear Completed
            </button>
          )}
        </footer>
      )}

    </div>
  );
}
