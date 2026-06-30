import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import TodoItem from './TodoItem';
import { TodoItem as TodoItemType } from '../types/todo';

describe('TodoItem', () => {
  const mockTask: TodoItemType = {
    id: '1',
    text: 'Test Task',
    completed: false,
    subItems: [],
  };

  const mockOnDelete = vi.fn();
  const mockOnToggle = vi.fn();
  const mockOnAddSubItem = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the task text correctly', () => {
    render(
      <TodoItem
        task={mockTask}
        onDelete={mockOnDelete}
        onToggle={mockOnToggle}
        onAddSubItem={mockOnAddSubItem}
      />
    );
    expect(screen.getByText('Test Task')).toBeInTheDocument();
  });

  it('calls onToggle when checkbox is clicked', () => {
    render(
      <TodoItem
        task={mockTask}
        onDelete={mockOnDelete}
        onToggle={mockOnToggle}
        onAddSubItem={mockOnAddSubItem}
      />
    );
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(mockOnToggle).toHaveBeenCalledWith('1');
  });

  it('calls onDelete when delete button is clicked', () => {
    render(
      <TodoItem
        task={mockTask}
        onDelete={mockOnDelete}
        onToggle={mockOnToggle}
        onAddSubItem={mockOnAddSubItem}
      />
    );
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);
    expect(mockOnDelete).toHaveBeenCalledWith('1');
  });

  it('renders sub-items if they exist', () => {
    const taskWithSubItems: TodoItemType = {
      id: '1',
      text: 'Parent Task',
      completed: false,
      subItems: [
        { id: 'sub-1', text: 'Sub Item 1', completed: false },
      ],
    };
    render(
      <TodoItem
        task={taskWithSubItems}
        onDelete={mockOnDelete}
        onToggle={mockOnToggle}
        onAddSubItem={mockOnAddSubItem}
      />
    );
    expect(screen.getByText('Sub Item 1')).toBeInTheDocument();
  });

  it('calls onToggle with subItemId when sub-item checkbox is clicked', () => {
    const taskWithSubItems: TodoItemType = {
      id: '1',
      text: 'Parent Task',
      completed: false,
      subItems: [
        { id: 'sub-1', text: 'Sub Item 1', completed: false },
      ],
    };
    render(
      <TodoItem
        task={taskWithSubItems}
        onDelete={mockOnDelete}
        onToggle={mockOnToggle}
        onAddSubItem={mockOnAddSubItem}
      />
    );
    const allCheckboxes = screen.getAllByRole('checkbox');
    fireEvent.click(allCheckboxes[1]);
    expect(mockOnToggle).toHaveBeenCalledWith('1', 'sub-1');
  });

  it('calls onAddSubItem when + Sub-item button is clicked', () => {
    render(
      <TodoItem
        task={mockTask}
        onDelete={mockOnDelete}
        onToggle={mockOnToggle}
        onAddSubItem={mockOnAddSubItem}
      />
    );
    const addSubItemButton = screen.getByText('+ Sub-item');
    fireEvent.click(addSubItemButton);
    expect(mockOnAddSubItem).toHaveBeenCalledWith('1');
  });
});
