import React from 'react';
import { render, screen } from '@testing-library/react';
import { Sidebar } from '@/components/Sidebar';

// next/navigation and next/link are auto-mocked by next/jest.
// We override usePathname for each test.
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

import { usePathname } from 'next/navigation';
const mockUsePathname = usePathname as jest.Mock;

describe('Sidebar', () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue('/');
  });

  it('renders the MISSION CONTROL logo text', () => {
    render(<Sidebar />);
    // <br> splits the text; match via the span's combined textContent
    const logoSpan = screen.getByText((_, el) =>
      el?.tagName === 'SPAN' && !!el.textContent?.includes('MISSION') && !!el.textContent?.includes('CONTROL')
    );
    expect(logoSpan).toBeInTheDocument();
  });

  it('renders all four nav group labels', () => {
    render(<Sidebar />);
    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Operations')).toBeInTheDocument();
    expect(screen.getByText('Knowledge')).toBeInTheDocument();
    expect(screen.getByText('Workspace')).toBeInTheDocument();
  });

  it('renders a link for every nav item', () => {
    render(<Sidebar />);
    // Spot-check a few items across groups
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Tasks')).toBeInTheDocument();
    expect(screen.getByText('Missions')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  describe('active link styling', () => {
    it('applies active class to the current route', () => {
      mockUsePathname.mockReturnValue('/tasks');
      render(<Sidebar />);
      const tasksLink = screen.getByText('Tasks').closest('a');
      expect(tasksLink).toHaveClass('bg-gray-100');
    });

    it('does not apply active class to non-current routes', () => {
      mockUsePathname.mockReturnValue('/tasks');
      render(<Sidebar />);
      const dashboardLink = screen.getByText('Dashboard').closest('a');
      expect(dashboardLink).not.toHaveClass('bg-gray-100');
    });

    it('marks Dashboard active when pathname is "/"', () => {
      mockUsePathname.mockReturnValue('/');
      render(<Sidebar />);
      const dashboardLink = screen.getByText('Dashboard').closest('a');
      expect(dashboardLink).toHaveClass('bg-gray-100');
    });
  });

  describe('badge counts', () => {
    it('shows a badge of "3" next to Missions', () => {
      render(<Sidebar />);
      const missionsLink = screen.getByText('Missions').closest('a');
      expect(missionsLink?.querySelector('span')).toHaveTextContent('3');
    });

    it('shows a badge of "1" next to Tasks', () => {
      render(<Sidebar />);
      const tasksLink = screen.getByText('Tasks').closest('a');
      expect(tasksLink?.querySelector('span')).toHaveTextContent('1');
    });

    it('does not render a badge on other nav items', () => {
      render(<Sidebar />);
      const dashboardLink = screen.getByText('Dashboard').closest('a');
      expect(dashboardLink?.querySelector('span')).toBeNull();
    });
  });

  it('renders the System Online status footer', () => {
    render(<Sidebar />);
    expect(screen.getByText('System Online')).toBeInTheDocument();
  });
});
