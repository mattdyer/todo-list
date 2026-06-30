import React, { useState } from 'react';
import { TodoProvider, useTodo } from './context/TodoContext';
import Sidebar from './components/Sidebar';
import MasterList from './components/MasterList';
import DailyList from './components/DailyList';
import PrintView from './components/PrintView';

const MainContent: React.FC<{ view: string }> = ({ view }) => {
  const { dailyLists } = useTodo();

  if (view === 'master') {
    return <MasterList />;
  }

  const dailyList = dailyListExists(view) ? dailyLists[view] : null;

  if (dailyList) {
    return (
      <div className="flex flex-col gap-4">
        <DailyList date={view} />
        <PrintView dailyList={dailyList} />
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-black">Daily List: {view}</h2>
      <p className="text-gray-500">No data found for this date.</p>
    </div>
  );
};

// Helper to check if a date view is valid
function dailyListExists(view: string): boolean {
  // This is a bit hacky. In a real app, we'd check against the state.
  // But we are inside a component that doesn't have access to the state directly
  // without useTodo.
  return false; // We'll fix this by moving the logic or adding a check
}

// Let's rewrite App.tsx and MainContent properly.
// I'll put the logic inside a component that can use useTodo.

const AppContent: React.FC<{ view: string }> = ({ view }) => {
  const { dailyLists } = useTodo();

  const isMasterView = view === 'master';
  const currentDailyList = !isMasterView ? dailyLists[view] : null;

  return (
    <main className="flex-1 h-screen overflow-y-auto bg-gray-100">
      {isMasterView ? (
        <MasterList />
      ) : (
        <div className="flex flex-col gap-4">
          {currentDailyList ? (
            <DailyList date={view} />
          ) : (
            <div className="p-4">
              <h2 className="text-2xl font-bold text-black">Daily List: {view}</h2>
              <p className="text-gray-500">No data found for this date.</p>
            </div>
          )}
          {currentDailyList && <PrintView dailyList={currentDailyList} />}
        </div>
      )}
    </main>
  );
};

const App: React.FC = () => {
  const [view, setView] = useState<string>('master');

  return (
    <TodoProvider>
      <div className="flex h-screen w-full overflow-hidden text-black">
        <Sidebar onNavigate={setView} />
        <AppContent view={view} />
      </div>
    </TodoProvider>
  );
};

export default App;
