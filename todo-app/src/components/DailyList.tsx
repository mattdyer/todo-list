import React from 'react';
import { useTodo } from '../hooks/useTodo';
import TodoItem from './TodoItem';
import TodoInput from './TodoInput';

interface DailyListProps {
  date: string;
}

const DailyList: React.FC<DailyListProps> = ({ date }) => {
  const { dailyLists, addTaskToDate, deleteDailyTask, toggleTaskCompletion, addSubItem } = useTodo();
  const dailyList = dailyLists[date];

  const handleAddSubItem = (taskId: string) => {
    const text = window.prompt('Enter sub-item text:');
    if (text && text.trim()) {
      addSubItem(taskId, text.trim());
    }
  };

  const handleAddTask = (text: string) => {
    addTaskToDate(date, text);
  };

  if (!dailyList) {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4 text-black">Daily List: {date}</h2>
        <p className="text-gray.500">No tasks for this day.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-black">Daily List: {date}</h2>
      <TodoInput onAdd={handleAddTask} placeholder="Add task for today..." />
      <div className="space-y-2">
        {dailyList.items.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            onDelete={(id) => deleteDailyTask(date, id)}
            onToggle={toggleTaskCompletion}
            onAddSubItem={handleAddSubItem}
          />
        ))}
        {dailyList.items.length === 0 && (
          <p className="text-gray-500">No tasks for this day.</p>
        )}
      </div>
    </div>
  );
};

export default DailyList;
