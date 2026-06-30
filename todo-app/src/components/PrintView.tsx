import React from 'react';
import { DailyList } from '../types/todo';

interface PrintViewProps {
  dailyList: DailyList | null;
}

const PrintView: React.FC<PrintViewProps> = ({ dailyList }) => {
  if (!dailyList) return null;

  return (
    <div id="print-area" className="p-8 bg-white text-black">
      <h1 className="text-3xl font-bold mb-4">Agenda: {dailyList.date}</h1>
      <div className="space-y-4">
        {dailyList.items.map((task) => (
          <div key={task.id} className="border-b border-gray-300 pb-2">
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                checked={task.completed}
                readOnly
                className="mt-1 w-4 h-4"
              />
              <div>
                <p className={`text-lg ${task.completed ? 'line-through text-gray-500' : ''}`}>
                  {task.text}
                </p>
                {task.subItems.length > 0 && (
                  <ul className="ml-6 mt-1 list-disc list-inside text-sm text-gray-700">
                    {task.subItems.map((subItem) => (
                      <li key={subItem.id} className={subItem.completed ? 'line-through text-gray-500' : ''}>
                        {subItem.text}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => window.print()}
        className="no-print mt-8 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Print Agenda
      </button>
    </div>
  );
};

export default PrintView;
