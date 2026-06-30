import React from 'react';
import { useTodo } from '../hooks/useTodo';
import TodoItem from './TodoItem';
import TodoInput from './TodoInput';

const MasterList: React.FC = () => {
  const { masterList, addMasterTask, deleteMasterTask, addSubItem, toggleTaskCompletion } = useTodo();

  const handleAddSubItem = (taskId: string) => {
    // We'll need a way to prompt for the sub-item text. 
    // For now, let's just use a prompt.
    const text = window.prompt('Enter sub-item text:');
    if (text && text.trim()) {
      addSubItem(taskId, text.trim());
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-black">Master Todo List</h2>
      <TodoInput onAdd={addMasterTask} />
      <div className="space-y-2">
        {masterList.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            onDelete={deleteMasterTask}
            onToggle={toggleTaskCompletion}
            onAddSubItem={handleAddSubItem}
          />
        ))}
        {masterList.length === 0 && (
          <p className="text-gray-500">No tasks in Master List. Add one above!</p>
        )}
      </div>
    </div>
  );
};

export default MasterList;
