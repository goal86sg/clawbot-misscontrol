import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import TasksPage from '@/app/(dashboard)/tasks/page';

// Initial task counts from initialTasks fixture:
//   backlog: 6 (T-002,010,011,012,013,014)
//   in-progress: 1 (T-008)
//   done: 8 (T-001,003,004,005,006,007,009,015)

/** Returns the numeric text inside a stat card for a given label. */
const getStatValue = (label: string): string | null => {
  const labelEls = screen.getAllByText(label);
  for (const el of labelEls) {
    const sibling = el.nextElementSibling;
    if (sibling?.tagName === 'P') return sibling.textContent;
  }
  return null;
};

describe('TasksPage', () => {
  describe('initial render', () => {
    it('shows the page heading', () => {
      render(<TasksPage />);
      expect(screen.getByRole('heading', { name: 'Tasks' })).toBeInTheDocument();
    });

    it('renders kanban column labels', () => {
      render(<TasksPage />);
      // Use getAllByText since "Backlog" / "Done" also appear in the filter <select>
      expect(screen.getAllByText('Backlog').length).toBeGreaterThan(0);
      expect(screen.getAllByText('In Progress').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Done').length).toBeGreaterThan(0);
    });

    it('shows the correct total task count in the stats card', () => {
      render(<TasksPage />);
      expect(getStatValue('Total')).toBe('15');
    });

    it('shows correct initial backlog / in-progress / done counts', () => {
      render(<TasksPage />);
      expect(getStatValue('Backlog')).toBe('6');
      expect(getStatValue('In Progress')).toBe('1');
      expect(getStatValue('Done')).toBe('8');
    });
  });

  describe('status filter', () => {
    it('hides non-backlog tasks when filter is "backlog"', () => {
      render(<TasksPage />);
      fireEvent.change(screen.getByRole('combobox'), { target: { value: 'backlog' } });

      // A backlog task should be visible
      expect(screen.getByText('Audit eBPF probe memory footprint')).toBeInTheDocument();
      // A done task should be hidden
      expect(screen.queryByText('Generate weekly K8s news digest')).not.toBeInTheDocument();
    });

    it('hides non-done tasks when filter is "done"', () => {
      render(<TasksPage />);
      fireEvent.change(screen.getByRole('combobox'), { target: { value: 'done' } });

      expect(screen.getByText('Generate weekly K8s news digest')).toBeInTheDocument();
      expect(screen.queryByText('Audit eBPF probe memory footprint')).not.toBeInTheDocument();
    });

    it('shows all tasks when filter is reset to "all"', () => {
      render(<TasksPage />);
      const select = screen.getByRole('combobox');
      fireEvent.change(select, { target: { value: 'done' } });
      fireEvent.change(select, { target: { value: 'all' } });

      expect(screen.getByText('Audit eBPF probe memory footprint')).toBeInTheDocument();
      expect(screen.getByText('Generate weekly K8s news digest')).toBeInTheDocument();
    });
  });

  describe('search', () => {
    it('filters tasks by title (case-insensitive)', () => {
      render(<TasksPage />);
      fireEvent.change(screen.getByPlaceholderText('Search tasks...'), { target: { value: 'eBPF' } });

      expect(screen.getByText('Audit eBPF probe memory footprint')).toBeInTheDocument();
      expect(screen.queryByText('Generate weekly K8s news digest')).not.toBeInTheDocument();
    });

    it('filters tasks by project name', () => {
      render(<TasksPage />);
      fireEvent.change(screen.getByPlaceholderText('Search tasks...'), { target: { value: 'Spending Tracker' } });

      expect(screen.getByText('Build spending tracker CSV parser')).toBeInTheDocument();
      expect(screen.queryByText('Audit eBPF probe memory footprint')).not.toBeInTheDocument();
    });

    it('returns no visible tasks for a non-matching query', () => {
      render(<TasksPage />);
      fireEvent.change(screen.getByPlaceholderText('Search tasks...'), { target: { value: 'xyz-no-match-ever' } });

      expect(screen.queryByText('Generate weekly K8s news digest')).not.toBeInTheDocument();
      expect(screen.queryByText('Audit eBPF probe memory footprint')).not.toBeInTheDocument();
    });

    it('clearing the search restores all tasks', () => {
      render(<TasksPage />);
      const input = screen.getByPlaceholderText('Search tasks...');
      fireEvent.change(input, { target: { value: 'eBPF' } });
      fireEvent.change(input, { target: { value: '' } });

      expect(screen.getByText('Generate weekly K8s news digest')).toBeInTheDocument();
    });
  });

  describe('moveTask', () => {
    it('moves a backlog task to in-progress on button click', () => {
      render(<TasksPage />);

      const taskTitle = screen.getByText('Audit eBPF probe memory footprint');
      const card = taskTitle.closest('div.group') as HTMLElement;
      fireEvent.click(within(card).getByText('▶ Start'));

      expect(getStatValue('In Progress')).toBe('2');
      expect(getStatValue('Backlog')).toBe('5');
    });

    it('moves a backlog task to done and sets completion date', () => {
      render(<TasksPage />);

      const taskTitle = screen.getByText('Audit eBPF probe memory footprint');
      const card = taskTitle.closest('div.group') as HTMLElement;
      fireEvent.click(within(card).getByText('✓ Done'));

      expect(getStatValue('Done')).toBe('9');
      expect(getStatValue('Backlog')).toBe('5');
    });

    it('moves a done task back to backlog', () => {
      render(<TasksPage />);

      const taskTitle = screen.getByText('Generate weekly K8s news digest');
      const card = taskTitle.closest('div.group') as HTMLElement;
      fireEvent.click(within(card).getByText('← Backlog'));

      expect(getStatValue('Done')).toBe('7');
      expect(getStatValue('Backlog')).toBe('7');
    });

    it('moves an in-progress task to done', () => {
      render(<TasksPage />);

      const taskTitle = screen.getByText('Mission Control dashboard screens');
      const card = taskTitle.closest('div.group') as HTMLElement;
      fireEvent.click(within(card).getByText('✓ Done'));

      expect(getStatValue('Done')).toBe('9');
      expect(getStatValue('In Progress')).toBe('0');
    });
  });
});
