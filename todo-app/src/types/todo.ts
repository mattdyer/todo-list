export interface SubItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  subItems: SubItem[];
}

export interface DailyList {
  date: string; // YYYY-MM-DD
  items: TodoItem[];
}

export interface AppState {
  masterList: TodoItem[];
  dailyLists: Record<string, DailyList>;
}
