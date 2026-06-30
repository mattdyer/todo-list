import React from 'react';
import { useTodo } from '../hooks/useTodo';

interface SidebarProps {
  onNavigate: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onNavigate }) => {
  const { dailyLists } = useTodo();

  // Sort dates chronologically
  const sortedDates = Object.keys(dailyLists).sort();

  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4 flex flex-col gap-4">
      <h2 className="text-xl font-bold border-b border-gray-700 pb-2">Tasks Menu</h2>
      
      <button
        onClick={() => onNavigate('master')}
        className="text-left px-3 py-2 rounded hover:bg-gray-700 transition-colors"
      >
        Master List
      </button>

      <div className="mt-4">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
          Daily Lists
        </h3>
        <div className="flex flex-col gap-1">
          {sortedDates.map((date) => (
            <button
              key={date}
              onClick={() => onNavigate(date)}
              className="text-left px-3 py-2 rounded hover:bg-gray-700 transition-colors text-sm"
            >
              {date}
            </button>
          ))}
          <button
            onClick={() => {
              const date = new Date().toISOString().split('T')[0];
              // We'll need a way to create a new day.
              // Actually, addTaskToDate creates it if it doesn't exist.
              // So we just need to navigate to it.
              onNavigate(date);
            }}
            className="text-left px-3 py-2 rounded hover:bg-gray-700 transition-colors text-sm text-blue-400"
          >
            + New Day
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
