import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import VitalsPage from '@/app/(dashboard)/vitals/page';

const mockVitalsData = {
  generated: '2026-06-10T00:00:00Z',
  generated_sgt: '2026-06-10 08:00 SGT',
  cpu: { pct: 42, load: '1.23' },
  memory: { total_mb: 16384, used_mb: 8192, pct: 50 },
  disk: { pct: 60, used: '120G', total: '200G' },
  uptime: '5d 3h',
  processes: 312,
  network: { interface: 'eth0', ip: '192.168.1.100' },
  temperature_c: '45',
  docker_containers: 8,
  openclaw: 'online',
  repos: 22,
};

beforeEach(() => {
  jest.useFakeTimers();
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
  jest.restoreAllMocks();
});

describe('VitalsPage', () => {
  describe('initial render', () => {
    it('renders the System Vitals heading', () => {
      (global.fetch as jest.Mock).mockReturnValue(new Promise(() => {}));
      render(<VitalsPage />);
      expect(screen.getByText('System Vitals')).toBeInTheDocument();
    });

    it('shows "loading..." for last refresh before first fetch completes', () => {
      (global.fetch as jest.Mock).mockReturnValue(new Promise(() => {}));
      render(<VitalsPage />);
      expect(screen.getByText(/loading\.\.\./)).toBeInTheDocument();
    });
  });

  describe('data fetching', () => {
    it('fetches vitals data on mount and renders it', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockVitalsData,
      });

      await act(async () => { render(<VitalsPage />); });

      await waitFor(() => {
        expect(screen.getByText('5d 3h')).toBeInTheDocument();
      });

      expect(screen.getByText('8192MB / 16384MB')).toBeInTheDocument();
      expect(screen.getByText('120G / 200G')).toBeInTheDocument();
    });

    it('keeps stale data (default uptime) when fetch throws', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      await act(async () => { render(<VitalsPage />); });

      // Default uptime is '...' — data was NOT overwritten
      expect(screen.queryByText('5d 3h')).not.toBeInTheDocument();
    });

    it('keeps stale data when response is not ok', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

      await act(async () => { render(<VitalsPage />); });

      expect(screen.queryByText('5d 3h')).not.toBeInTheDocument();
    });

    it('refetches after 15 seconds', async () => {
      (global.fetch as jest.Mock)
        .mockResolvedValueOnce({ ok: true, json: async () => mockVitalsData })
        .mockResolvedValueOnce({ ok: true, json: async () => ({ ...mockVitalsData, uptime: '6d 0h' }) });

      await act(async () => { render(<VitalsPage />); });

      await act(async () => { jest.advanceTimersByTime(15000); });

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledTimes(2);
      });
    });

    it('clears both intervals on unmount', async () => {
      const clearIntervalSpy = jest.spyOn(global, 'clearInterval');
      (global.fetch as jest.Mock).mockResolvedValue({ ok: true, json: async () => mockVitalsData });

      let unmount: () => void;
      await act(async () => {
        ({ unmount } = render(<VitalsPage />));
      });

      act(() => { unmount(); });

      expect(clearIntervalSpy).toHaveBeenCalledTimes(2);
    });
  });

  describe('temperature display', () => {
    it('shows temperature in Celsius when sensor data is available', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ ...mockVitalsData, temperature_c: '55' }),
      });

      await act(async () => { render(<VitalsPage />); });
      await waitFor(() => expect(screen.getByText('55°C')).toBeInTheDocument());
    });

    it('shows "no sensor" message when temperature_c is "N/A"', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ ...mockVitalsData, temperature_c: 'N/A' }),
      });

      await act(async () => { render(<VitalsPage />); });
      await waitFor(() => expect(screen.getByText('no sensor')).toBeInTheDocument());
    });
  });

  describe('OpenClaw service status', () => {
    it('shows openclaw as online', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ ...mockVitalsData, openclaw: 'online' }),
      });

      await act(async () => { render(<VitalsPage />); });
      await waitFor(() => expect(screen.getByText('online')).toBeInTheDocument());
    });

    it('shows openclaw as offline', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ ...mockVitalsData, openclaw: 'offline' }),
      });

      await act(async () => { render(<VitalsPage />); });
      await waitFor(() => expect(screen.getByText('offline')).toBeInTheDocument());
    });
  });
});
