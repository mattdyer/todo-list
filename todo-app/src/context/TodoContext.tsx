import React, { createContext, useState, useEffect, useCallback, ReactNode, useMemo } from 'format'; // Error here too.
import { AppState, TodoItem, DailyList, SubItem } from '../types/todo';

interface TodoContextType extends AppState {
  addMasterTask: (text: string) => void;
  deleteMasterTask: (id: string) => void;
  addTaskToDate: (date: string, text: string) => void;
  toggleTaskCompletion: (id: string, subItemId?: string) => void;
  addSubItem: (taskId: string, subItemText: string) => void;
  moveTaskToDate: (taskId: string, date: string) => void;
  deleteDailyTask: (date: string, taskId: string) => void;
}

export const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('todo-app-state');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Failed to parse saved state', e);
        }
      }
    }
    return { masterList: [], dailyLists: {} };
  });

  useEffect(() => {
    localStorage.setItem('todo-app-state', JSON.stringify(state));
  }, [state]);

  const addMasterTask = useCallback((text: string) => {
    const newTask: TodoItem = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      subItems: [],
    };
    setState((prev) => ({
      ...prev,
      masterList: [...prev.masterList, newTask],
    }));
  }, []);

  const deleteMasterTask = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      masterList: prev.masterList.filter((task) => task.id !== id),
    }));
  }, []);

  const addTaskToDate = useCallback((date: string, text: string) => {
    const newTask: TodoItem = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      subItems: [],
    };
    setState((prev) => {
      const dailyList = prev.dailyLists[date] || { date, items: [] };
      return {
        ...prev,
        dailyLists: {
          ...prev.dailyLists,
          [date]: {
            ...dailyList,
            items: [...dailyList.items, newTask],
          },
        },
      };
    });
  }, []);

  const toggleTaskCompletion = useCallback((id: string, subItemId?: string) => {
    setState((prev) => {
      const updateItem = (item: TodoItem): TodoItem => {
        if (subItemId) {
          if (item.id === id || item.subItems.some((si) => si.id === subItemId)) {
            const newSubItems = item.subItems.map((si) =>
              si.id === subItemId ? { ...si, completed: !si.completed } : si
            );
            const allDone = newSubItems.length > 0 && newSubItems.every((si) => si.completed);
            return { ...item, subItems: newSubItems, completed: allDone };
          }
          return item;
        }
        if (item.id === id) {
          return { ...item, completed: !item.completed };
        }
        return item;
      };

      const newMasterList = prev.masterList.map(updateItem);
      const newDailyLists: Record<string, DailyList> = {};
      for (const date in prev.dailyLists) {
        newDailyLists[date] = {
          ...prev.dailyLists[date],
          items: prev.dailyLists[date].items.map(updateItem),
        };
      }

      return { ...prev, masterList: newMasterList, dailyLists: newDailyLists };
    });
  }, []);

  const addSubItem = useCallback((taskId: string, subItemText: string) => {
    const newSubItem: SubItem = {
      id: crypto.randomUUID(),
      text: subItemText,
      completed: false,
    };
    setState((prev) => {
      const updateItem = (item: TodoItem): TodoItem => {
        if (item.id === taskId) {
          return { ...item, subItems: [...item.subItems, newSubItem] };
        }
        return item;
      };

      const updateDailyList = (dailyList: DailyList): DailyList => ({
        ...dailyList,
        items: dailyList.items.map(updateItem),
      });

      const newMasterList = prev.masterList.map(updateItem);
      const newDailyLists: Record<string, DailyList> = {};
      for (const date in prev.dailyLists) {
        newDailyLists[date] = updateDailyList(prev.dailyLists[date]);
      }

      return { ...prev, masterList: newMasterList, dailyLists: newDailyLists };
    });
  }, []);

  const moveTaskToDate = useCallback((taskId: string, date: string) => {
    setState((prev) => {
      const taskToMove = prev.masterList.find((task) => task.id === taskId);
      if (!taskToMove) return prev;

      const newMasterList = prev.masterList.filter((task) => task.id !== taskId);
      const dailyList = prev.dailyLists[date] || { date, items: [] };
      const newDailyLists = {
        ...prev.dailyLists,
        [date]: {
          ...dailyList,
          items: [...dailyList.items, taskToMove],
        },
      };

      return { ...prev, masterList: newMasterList, dailyLists: newDailyLists };
    });
  }, []);

  const deleteDailyTask = useCallback((date: string, taskId: string) => {
    setState((prev) => {
      const dailyList = prev.dailyLists[date];
      if (!dailyList) return prev;

      return {
        ...prev,
        dailyLists: {
          ...prev.dailyLists,
          [date]: {
            ...dailyList,
            items: dailyList.items.filter((task) => task.id !== taskId),
          },
        },
      };
    });
  }, []);

  const contextValue = useMemo(
    () => ({
      ...state,
      addMasterTask,
      deleteMasterTask,
      addTaskToDate,
      toggleTaskCompletion,
      addSubItem,
      moveTaskToDate,
      deleteDailyTask,
    }),
    [state, addMasterTask, deleteMasterTask, addTaskToDate, toggleTaskCompletion, addSubItem, moveTaskToDate, deleteDailyTask]
  );

  return (
    <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
  );
}, []);
