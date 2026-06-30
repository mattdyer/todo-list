import React from 'react';
import { TodoItem as TodoItemType } from '../types/todo';

interface TodoItemProps {
  task: TodoItemType;
  onDelete: (id: string) => void;
  onToggle: (id: string, subItemId?: string) => void;
  onAddSubItem: (taskId: string) => void;
  isSubItem?: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({
  task,
  onDelete,
  onToggle,
  onAddSubItem,
  isSubItem = false,
}) => {
  const handleToggle = () => {
    onToggle(task.id);
  };

  const handleSubItemToggle = (subItemId: string) => {
    onToggle(task.id, subItemId);
  };

  return (
    <div className={`mt-2 p-2 border-l-2 border-blue-200 bg-white/50 rounded-r ${isSubItem ? 'ml-6' : ''}`}>
      <div className="flex items-center justify-between group">
        <div className="flex items-center gap-2 flex-1">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggle}
            className="w-4 h-4 cursor-pointer"
          />
          <span
            className={`text-black ${task.completed ? 'line-through text-gray-500' : ''}`}
          >
            {task.text}
          </span>
        </div>

        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {!isSubItem && (
            <button
              onClick={() => onAddSubItem(task.id)}
              className="text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
            >
              + Sub-item
            </button>
          )}
          <button
            onClick={() => onDelete(task.id)}
            className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>

      {task.subItems.length > 0 && (
        <div className="ml-4 mt-2 space-y-1">
          {task.subItems.map((subItem) => (
            <div key={subItem.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={subItem.completed}
                onChange={() => handleSubItemToggle(subItem.id)}
                className="w-4 h-4 cursor-pointer"
              />
              <span className={`text-sm ${subItem.completed ? 'line-through text-gray-500' : ''}`}>
                {subItem.text}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoItem;
