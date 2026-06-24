import React from 'react';
import { render } from '@testing-library/react';
import { PixelProgress } from '@/components/PixelProgress';

const getRects = (container: HTMLElement) =>
  container.querySelectorAll('rect');

describe('PixelProgress', () => {
  describe('segment fill calculation', () => {
    it('fills all 20 segments at 100%', () => {
      const { container } = render(<PixelProgress value={100} max={100} />);
      const rects = getRects(container);
      expect(rects).toHaveLength(20);
      rects.forEach(rect => {
        expect(rect.getAttribute('fill')).toBe('#22c55e'); // green fill
      });
    });

    it('fills 0 segments at 0%', () => {
      const { container } = render(<PixelProgress value={0} max={100} />);
      const rects = getRects(container);
      rects.forEach(rect => {
        expect(rect.getAttribute('fill')).toBe('#bbf7d0'); // green bg
      });
    });

    it('fills 10 segments at 50%', () => {
      const { container } = render(<PixelProgress value={50} max={100} />);
      const rects = getRects(container);
      const filled = Array.from(rects).filter(r => r.getAttribute('fill') === '#22c55e');
      expect(filled).toHaveLength(10);
    });

    it('fills 10 segments at 50 out of 200 (25%)', () => {
      // 25% of 20 = 5 segments
      const { container } = render(<PixelProgress value={50} max={200} />);
      const rects = getRects(container);
      const filled = Array.from(rects).filter(r => r.getAttribute('fill') === '#22c55e');
      expect(filled).toHaveLength(5);
    });
  });

  describe('boundary clamping', () => {
    it('clamps value above max to 100%', () => {
      const { container } = render(<PixelProgress value={150} max={100} />);
      const rects = getRects(container);
      rects.forEach(rect => {
        expect(rect.getAttribute('fill')).toBe('#22c55e');
      });
    });

    it('clamps negative value to 0%', () => {
      const { container } = render(<PixelProgress value={-10} max={100} />);
      const rects = getRects(container);
      rects.forEach(rect => {
        expect(rect.getAttribute('fill')).toBe('#bbf7d0');
      });
    });

    it('defaults max to 100 when not provided', () => {
      const { container } = render(<PixelProgress value={100} />);
      const rects = getRects(container);
      const filled = Array.from(rects).filter(r => r.getAttribute('fill') === '#22c55e');
      expect(filled).toHaveLength(20);
    });
  });

  describe('color variants', () => {
    const cases = [
      { variant: 'green' as const, fill: '#22c55e', bg: '#bbf7d0' },
      { variant: 'blue' as const, fill: '#3b82f6', bg: '#bfdbfe' },
      { variant: 'yellow' as const, fill: '#eab308', bg: '#fef08a' },
      { variant: 'red' as const, fill: '#ef4444', bg: '#fecaca' },
    ];

    cases.forEach(({ variant, fill, bg }) => {
      it(`uses correct colors for ${variant} variant`, () => {
        const { container } = render(<PixelProgress value={50} max={100} variant={variant} />);
        const rects = getRects(container);
        const fills = Array.from(rects).map(r => r.getAttribute('fill'));
        expect(fills).toContain(fill);
        expect(fills).toContain(bg);
      });
    });

    it('defaults to green variant when not specified', () => {
      const { container } = render(<PixelProgress value={50} />);
      const rects = getRects(container);
      const fills = Array.from(rects).map(r => r.getAttribute('fill'));
      expect(fills).toContain('#22c55e');
    });
  });

  describe('SVG dimensions', () => {
    it('renders correct SVG width (20 segments * 5px - 1px gap)', () => {
      const { container } = render(<PixelProgress value={50} />);
      const svg = container.querySelector('svg');
      // 20 segments * (4 segW + 1 gap) - 1 gap = 99
      expect(svg?.getAttribute('width')).toBe('99');
    });

    it('renders correct SVG height', () => {
      const { container } = render(<PixelProgress value={50} />);
      const svg = container.querySelector('svg');
      expect(svg?.getAttribute('height')).toBe('8');
    });

    it('passes className to svg', () => {
      const { container } = render(<PixelProgress value={50} className="my-class" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('my-class');
    });
  });
});
