import React, { useState } from 'react';
import { TodoItem as TodoItemType } from '../types/todo';
import TodoInput from './TodoInput';

interface TodoItemProps {
  task: TodoItemType;
  onDelete: (id: string) => void;
  onToggle: (id: string, subItemId?: string) => void;
  onAddSubItem: (taskId: string) => void;
  isSubItem?: boolean;
  date?: string;
  onMove?: (taskId: string, date: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  task,
  onDelete,
  onToggle,
  onAddSubItem,
  isSubItem = false,
  date,
  onMove,
  onAddTaskToDate,
}) => {
  const [isAddingSubItem, setIsAddingSubItem] = useState(false);

  const handleToggle = () => {
    onToggle(task.id);
  };

  const handleSubItemToggle = (subItemId: string) => {
    onToggle(task.id, subItemId);
  };

  return (
    <div className={`ml-${isSubItem ? '6' : '0'} mt-2 p-2 border-l-2 border-blue-200 bg-white/50 rounded-r ${isSubItem ? 'ml-4' : ''}`}>
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
          {!isSubItem && onMove && date && (
            <button
              onClick={() => onMove(task.id, date)}
              className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
            >
              Move
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

      {isAddingSubItem && (
        <div className="mt-2">
          <TodoInput
            onAdd={(text) => {
              // This is tricky because we need to call addSubItem.
              // But TodoInput calls onAdd(text). 
              // We'll need to pass the correct implementation.
            }}
          />
        </div>
      )}

      {task.subItems.length > 0 && (
        <div className="ml-4 mt-2 space-y-1">
          {task.subItems.map((subItem) => (
            <TodoItem
              key={subItem.id}
              task={subItem as any} // Type assertion because subItems are TodoItem but actually they are SubItem (which is a subset)
              onDelete={() => {}} // Should we be able to delete sub-items? Yes, but the context needs a way.
              onToggle={handleSubItemToggle}
              onAddSubItem={() => {}}
              isSubItem={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoItem;
