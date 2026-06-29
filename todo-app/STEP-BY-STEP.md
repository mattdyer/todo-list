# Step-by-Step Implementation Guide: Todo List App

This document provides an exhaustive, granular guide for building the Todo List application from scratch.

## Phase 1: Project Initialization and Environment Setup

### 1.1 Initialize Vite Project
1. Open your terminal in the desired project directory.
2. Run the following command to create a new React project with TypeScript:
   ```bash
   npm create vite@latest . -- --template react-ts
   ```
3. Install the base dependencies:
   ```bash
   npm install
4. Run the development server to be sure:
   ```bash
   npm run dev
   ```

### 1.2 Install CSS and Styling Dependencies
4. Install Tailwind CSS and its peer dependencies:
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   ```
5. Initialize Tailwind configuration:
   ```bash
   npx tailwindcss init -p
   ```
6. Configure `tailwind.config.js` to scan your source files:
   - Open `tailwind.config.js`.
   - Replace the `content` array with: `content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],`

### 1.3 Install Testing Dependencies
7. Install Vitest and React Testing Library for unit and integration tests:
   ```bash
   npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom @testing-library/user-event
   ```
8. Install Playwright for End-to-End testing:
   ```bash
   npm install -D @playwright/test
   ```
9. Initialize Playwright:
   ```bash
   npx playwright install
   ```

### 1.4 Configure Build Tools
10. Configure `vite.config.ts` to support Vitest:
    - Open `vite.config.ts`.
    - Import `setupFiles` and `environment` from `vitest/config`.
    - Update the `test` object in the configuration:
      ```typescript
      export default defineConfig({
        plugins: [react()],
        test: {
          globals: true,
          environment: 'jsdom',
          setupFiles: './src/test/setup.ts',
        },
      })
      ```
11. Create the test setup file:
    - Create directory: `mkdir -p src/test`
    - Create file: `src/test/setup.ts`
    - Content of `src/test/setup.ts`:
      ```typescript
      import '@testing-library/jest-dom';
      ```

### 1.5 Project Structure Setup
12. Create the following folder structure:
    ```bash
    mkdir -p src/components src/context src/hooks src/types src/utils src/assets tests/e2end
    ```

---

## Phase 2: Data Modeling and Types

### 2.1 Define Interfaces
13. Create `src/types/todo.ts`.
14. Add the following interfaces (from the Plan):
    ```typescript
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
      date: string;
      items: TodoItem[];
    }

    export interface AppState {
      masterList: TodoItem[];
      dailyLists: Record<string, DailyList>;
    }
    ```

---

## Phase 3: State Management (Context API)

### 3.1 Implement TodoContext
15. Create `src/context/TodoContext.tsx`.
16. Implement the `TodoProvider` component.
    - Define the `TodoContext` with the `AppState` and state-modifying functions.
    - Implement functions: `addMasterTask`, `deleteMasterTask`, `addTaskToDate`, `toggleTaskCompletion`, `addSubItem`, `moveTaskToDate`, etc.
    - Use `localStorage` to persist the state so data isn't lost on refresh.

### 3.2 Implement useTodo Hook
17. Create `src/hooks/useTodo.ts`.
18. Create a custom hook to consume the `TodoContext` easily.
    ```typescript
    import { useContext } from 'react';
    import { TodoContext } from '../context/TodoContext';

    export const useTodo = () => {
      const context = useContext(TodoContext);
      if (!context) throw new Error('useTodo must be used within a TodoProvider');
      return context;
    };
    ```

---

## Phase 4: Component Development

### 4.1 Core UI - Input Components
19. Create `src/components/TodoInput.tsx`.
    - Implement an input field that can accept a task text.
    - Add functionality to trigger the `addMasterTask` or `addTaskToDate` via props.

### 4.2 Core UI - Task Item (Recursive)
20. Create `src/components/TodoItem.tsx`.
    - This component renders a `TodoItem` structure.
    - Logic: If `subItems` exist, the component should recursively call itself to render the sub-items.
    - Include a checkbox for completion.
    - Include a "Delete" button and an "Add Sub-item" button.

### 4.3 Core UI - Master List View
21. Create `src/components/MasterList.tsx`.
    - Fetch tasks from `useTodo`.
    - Map through `masterList` and render `TodoItem` components.

### 4.4 Core UI - Daily List View
22. Create `src/components/DailyList.tsx`.
    - Accept a `date` prop.
    - Fetch tasks for that specific date from `useTodo`.
    - Render tasks similarly to the Master List.

### 4.5 Core UI - Sidebar / Navigation
23. Create `src/components/Sidebar.tsx`.
    - List all available dates from `dailyLists`.
    - Button to "Create New Day".
    - Button to "View Master List".

### 4.6 Core UI - Print View
24. Create `src/components/PrintView.tsx`.
    - This component should purely render the selected day's list in a simplified, clean format.
    - Use `window.print()` trigger button.
    - IMPORTANT: Wrap the contents of this component (or the container in App.tsx) in an element with `id="print-area"` to correspond with the CSS print rules.

---

## Phase 5: Styling and Print Optimization

### 5.1 Global Styles
25. Edit `src/index.css`.
    - Add Tailwind directives: `@tailwind base; @tailwind components; @tailwind utilities;`.
    - Add custom styles for the `print` media query:
      ```css
      @media print {
        body * { visibility: hidden; }
        #print-area, #print-area * { visibility: visible; }
        #print-area { position: absolute; left: 0; top: 0; width: 100%; }
        .no-print { display: none !important; }
      }
      ```

---

## Phase 6: Integration

### 6.1 Assemble App.tsx
26. Open `src/App.tsx`.
27. Wrap the entire application in `TodoProvider`.
28. Create the layout: `Sidebar` on the left, `MainContent` (either `MasterList` or `DailyList`) on the right.

---

## Phase 7: Testing Implementation

### 7.1 Unit Testing
29. Create `src/context/TodoContext.test.tsx`.
    - Test adding a task to the master list.
    - Test moving a task from master to a daily list.
    - Test toggling sub-items.

### 7.2 E2E Testing
30. Create `tests/e2e/todo-flow.spec.ts`.
31. Write the following tests:
    - **Test 1**: User enters a task in the master list and sees it appear.
    - **Test 2**: User creates a new day and moves a task from the master list to that day.
    - **Test 3**: User checks off a sub-item and verifies the UI updates.
    - **Test 4**: User clicks print and verifies that the print-specific elements are visible and the 'no-print' elements are hidden.

### 7.3 Final Check
32. Run all tests:
    ```bash
    npm test
    ```
33. Run E2E tests:
    ```bash
    npx playwright test
    ```
34. Build the production application:
    ```bash
    npm run build
    ```
