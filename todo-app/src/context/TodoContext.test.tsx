import { renderHook, act } from '@testing-library/react';
import { TodoProvider, useTodo } from '../context/TodoContext';
import { describe, it, expect, beforeEach } from 'vitest';

describe('useTodo', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should add a task to the master list', () => {
    const { result } = renderHook(() => useTodo(), { wrapper: TodoProvider });

    act(() => {
      result.current.addMasterTask('Test Task');
    });

    expect(result.current.masterList).toHaveLength(1);
    expect(result.current.masterList[0].text).toBe('Test Task');
  });

  it('should delete a task from the master list', () => {
    const { result } = renderHook(() => useTodo(), { wrapper: TodoProvider });

    act(() => {
      result.current.addMasterTask('Task to delete');
    });
    expect(result.current.masterList).toHaveLength(1);

    act(() => {
      result.current.deleteMasterTask(result.current.masterList[0].id);
    });

    expect(result.current.masterList).toHaveLength(0);
  });

  it('should add a task to a daily list', () => {
    const { result } = renderHook(() => useTodo(), { wrapper: TodoProvider });
    const date = '2023-10-27';

    act(() => {
      result.current.addTaskToDate(date, 'Daily Task');
    });

    expect(result.current.dailyLists[date].items).toHaveLength(1);
    expect(result.current.dailyLists[date].items[0].text).toBe('Daily Task');
  });
});
