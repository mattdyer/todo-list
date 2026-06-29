# Todo List Application Plan

## 1. Overview
A React-based application designed for highly organized task management. The app allows users to maintain a high-level "Master Todo List" and drill down into specific "Daily Todo Lists". It supports hierarchical tasks (sub-items) and provides a specialized view for printing daily agendas.

## 2. Core Features
### 2.1 Master Todo List
- A central repository for all tasks that are not yet assigned to a specific day.
- Capability to move items from the Master List to a Daily List.

### 2.2 Daily Todo Lists
- Ability to create, view, and manage tasks for specific dates.
- Each day acts as a separate context for tasks.
- Integration with a calendar or date picker to switch between days.

### 2.3 Hierarchical Task Structure
- **Tasks**: The primary unit of work.
- **Sub-tasks**: Each task can contain an arbitrary number of sub-items.
- **Progress Tracking**: Checking off a sub-task can optionally update the parent task's completion status.

### 2.4 Printable View
- A dedicated, clean, and minimalist view for the currently selected Daily List.
- Optimized via CSS `@media print` to ensure a professional look when printed on paper.

## 3. Technical Stack
- **Framework**: React.js
- **Build Tool**: Vite (for fast development and modern features)
- **Styling**: Tailwind CSS (for responsive and utility-first styling)
- **State Management**: React Context API (to manage the global state of Master and Daily lists)

- **Testing**:
    - **Unit & Integration Testing**: Vitest + React Testing Library
    - **End-to-End (E2E) Testing**: Playwright

## 4. Data Model
```typescript
interface SubItem {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  subItems: SubItem[];
}

interface DailyList {
  date: string; // YYYY-MM-DD
  items: TodoItem[];
}

interface AppState {
  masterList: TodoItem[];
  dailyLists: Record<string, DailyList>; // Keyed by date
}
```

## 5. Component Architecture
- `App`: Main entry point, manages Provider.
- `TodoProvider`: Context provider for global state.
- `Sidebar`: Navigation between Master List and different Daily Lists.
- `MasterListContainer`: View for the Master Todo List.
- `DailyListContainer`: View for a specific Daily List.
- `TodoItemComponent`: Recursive component to render tasks and their sub-items.
- `PrintView`: A specialized component/layout for the printable version of the daily list.
- `TodoInput`: Shared component for adding new tasks/sub-tasks.

## 6. Testing Strategy
### 6.1 Unit & Integration Tests
- Test individual utility functions (e.g., date formatting, completion logic).
- Test `TodoItemComponent` for rendering and interaction (toggling completion).
- Test `TodoProvider` to ensure state updates correctly when adding/deleting/moving items.

### 6.2 End-to-End (E2E) Tests (Playwright)
- **Scenario 1: Creating a Master Task**: Verify a user can add a task to the Master List.
- **Scenario 2: Creating a Daily List**: Verify a user can create a list for a specific date.
- **Scenario 3: Moving Task**: Verify a task can be moved from Master to a Daily List.
- **Scenario 4: Sub-item Management**: Verify adding and checking off sub-items.
- **Scenario 5: Print View**: Verify the print view renders the correct content for the active daily list.

## 7. Implementation Roadmap
### Phase 1: Project Setup
- Initialize Vite + React + TypeScript.
- Configure Tailwind CSS.
- Set up Vitest and Playwright.

### Phase 2: Core State & Master List
- Implement `TodoProvider` and the data model.
- Implement the Master List view and task creation.

### Phase 3: Daily Lists & Hierarchical Tasks
- Implement Daily List creation and date navigation.
- Implement sub-item functionality within tasks.
- Implement functionality to move tasks between lists.

### Phase 4: Print View & Polish
- Implement the `@media print` CSS and the Print View component.
- Finalize UI/UX styling.

### Phase 5: Testing & Verification
- Implement comprehensive Unit tests.
- Implement E2E Playwright tests.
- Final project audit.
