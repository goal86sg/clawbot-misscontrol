import React from 'react';
import { render } from '@testing-library/react';
import { PixelAvatar } from '@/components/PixelAvatar';

describe('PixelAvatar', () => {
  const validAgents = ['cyber', 'scout', 'engineer', 'guardian'] as const;

  it('returns null for an unknown agent type', () => {
    // Cast to bypass TS — tests the runtime guard
    const { container } = render(<PixelAvatar agent={'unknown' as never} />);
    expect(container.firstChild).toBeNull();
  });

  validAgents.forEach(agent => {
    describe(`agent: ${agent}`, () => {
      it('renders an SVG', () => {
        const { container } = render(<PixelAvatar agent={agent} />);
        expect(container.querySelector('svg')).not.toBeNull();
      });

      it('only renders non-transparent pixels (color index != 0)', () => {
        const { container } = render(<PixelAvatar agent={agent} />);
        const rects = container.querySelectorAll('rect');
        rects.forEach(rect => {
          expect(rect.getAttribute('fill')).not.toBe('transparent');
        });
      });

      it('renders SVG width equal to the size prop', () => {
        const { container } = render(<PixelAvatar agent={agent} size={64} />);
        const svg = container.querySelector('svg');
        expect(svg?.getAttribute('width')).toBe('64');
      });

      it('defaults size to 36', () => {
        const { container } = render(<PixelAvatar agent={agent} />);
        const svg = container.querySelector('svg');
        expect(svg?.getAttribute('width')).toBe('36');
      });

      it('has a viewBox matching pixel grid dimensions', () => {
        const { container } = render(<PixelAvatar agent={agent} />);
        const svg = container.querySelector('svg');
        // All agent grids are 8 wide × 9 tall
        expect(svg?.getAttribute('viewBox')).toBe('0 0 8 9');
      });

      it('passes className to SVG', () => {
        const { container } = render(<PixelAvatar agent={agent} className="test-cls" />);
        expect(container.querySelector('svg')).toHaveClass('test-cls');
      });
    });
  });
});
