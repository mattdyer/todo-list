import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import PrintView from './PrintView';
import { DailyList } from '../types/todo';

describe('PrintView', () => {
  const mockDailyList: DailyList = {
    date: '2023-10-27',
    items: [
      {
        id: '1',
        text: 'Task 1',
        completed: false,
        subItems: [
          { id: 'sub-1', text: 'Sub Item 1', completed: true },
        ],
      },
      {
        id: '2',
        text: 'Task 2',
        completed: true,
        subItems: [],
      },
    ],
  };

  const printSpy = vi.spyOn(window, 'print').mockImplementation(() => {});

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders nothing if no dailyList is provided', () => {
    const { container } = render(<PrintView dailyList={null as any} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders the date and tasks correctly', () => {
    render(<PrintView dailyList={mockDailylyList as any} />); // Still typing typos... I must be careful.
  });
});
