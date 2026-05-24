'use client';

import React, { useState } from 'react';
import { PixelLink, PixelSearch } from '@/lib/pixel-icons-extra';
import { PixelSparkle, PixelCheck, PixelClock } from '@/lib/pixel-icons';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Link {
  id: string;
  title: string;
  url: string;
  category: string;
  tags: string[];
  favicon: string; // single color for the dot
  lastVisited: string;
  visitCount: number;
  description?: string;
}

interface Category {
  name: string;
  color: string;
  icon: string;
  count: number;
}

// ─── Pixel Favicon Dots ───────────────────────────────────────────────────────

const faviconColors = ['#6366f1', '#22c55e', '#f59e0b', '#ef4444', '#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6'];

function FaviconDot({ color, size = 16 }: { color: string; size?: number }) {
  return (
    <div
      className="rounded-sm shrink-0"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        boxShadow: `0 0 0 2px ${color}22`,
      }}
    />
  );
}

// ─── Pixel Link Icon ─────────────────────────────────────────────────────────

function PixelGlobe({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className={className} shapeRendering="crispEdges">
      <rect x="1" y="0" width="6" height="1" fill="currentColor" opacity="0.4" />
      <rect x="0" y="1" width="8" height="1" fill="currentColor" />
      <rect x="0" y="2" width="2" height="4" fill="currentColor" />
      <rect x="6" y="2" width="2" height="4" fill="currentColor" />
      <rect x="2" y="3" width="4" height="2" fill="currentColor" opacity="0.3" />
      <rect x="1" y="6" width="6" height="1" fill="currentColor" />
      <rect x="1" y="7" width="6" height="1" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

function PixelStarSmall({ size = 10 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-yellow-400" shapeRendering="crispEdges">
      <rect x="3" y="0" width="2" height="1" fill="currentColor" />
      <rect x="2" y="1" width="4" height="1" fill="currentColor" />
      <rect x="1" y="2" width="6" height="2" fill="currentColor" />
      <rect x="0" y="4" width="8" height="2" fill="currentColor" />
      <rect x="1" y="6" width="2" height="2" fill="currentColor" opacity="0.4" />
      <rect x="5" y="6" width="2" height="2" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

function PixelBookmark({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-indigo-400" shapeRendering="crispEdges">
      <rect x="1" y="0" width="6" height="1" fill="currentColor" />
      <rect x="0" y="1" width="2" height="7" fill="currentColor" />
      <rect x="2" y="1" width="5" height="6" fill="currentColor" opacity="0.2" />
      <rect x="3" y="3" width="2" height="2" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getTimeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// ─── Seed Data ────────────────────────────────────────────────────────────────

const categories: Category[] = [
  { name: 'Dev Tools', color: '#6366f1', icon: '🔧', count: 5 },
  { name: 'Learning', color: '#22c55e', icon: '📚', count: 4 },
  { name: 'Work', color: '#3b82f6', icon: '💼', count: 3 },
  { name: 'Finance', color: '#f59e0b', icon: '💰', count: 3 },
  { name: 'Design', color: '#ec4899', icon: '🎨', count: 2 },
  { name: 'Life', color: '#14b8a6', icon: '✨', count: 2 },
];

const links: Link[] = [
  // Dev Tools
  { id: '1', title: 'GitHub', url: 'https://github.com', category: 'Dev Tools', tags: ['git', 'code'], favicon: faviconColors[0], lastVisited: new Date(Date.now() - 1000 * 60 * 30).toISOString(), visitCount: 142, description: 'Code hosting and collaboration' },
  { id: '2', title: 'Stack Overflow', url: 'https://stackoverflow.com', category: 'Dev Tools', tags: ['qa', 'code'], favicon: faviconColors[1], lastVisited: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), visitCount: 89, description: 'Programming Q&A' },
  { id: '3', title: 'MDN Web Docs', url: 'https://developer.mozilla.org', category: 'Dev Tools', tags: ['docs', 'web'], favicon: faviconColors[4], lastVisited: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), visitCount: 67, description: 'Mozilla developer network' },
  { id: '4', title: 'Tailwind CSS', url: 'https://tailwindcss.com', category: 'Dev Tools', tags: ['css', 'ui'], favicon: faviconColors[3], lastVisited: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), visitCount: 54, description: 'Utility-first CSS framework' },
  { id: '5', title: 'Next.js', url: 'https://nextjs.org', category: 'Dev Tools', tags: ['react', 'framework'], favicon: faviconColors[0], lastVisited: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(), visitCount: 43, description: 'React framework' },
  // Learning
  { id: '6', title: 'Hacker News', url: 'https://news.ycombinator.com', category: 'Learning', tags: ['news', 'tech'], favicon: faviconColors[1], lastVisited: new Date(Date.now() - 1000 * 60 * 45).toISOString(), visitCount: 201, description: 'Tech news and discussions' },
  { id: '7', title: 'LeetCode', url: 'https://leetcode.com', category: 'Learning', tags: ['algorithms', 'interview'], favicon: faviconColors[5], lastVisited: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), visitCount: 38, description: 'Coding interview prep' },
  { id: '8', title: 'Fast.ai', url: 'https://fast.ai', category: 'Learning', tags: ['ai', 'ml'], favicon: faviconColors[5], lastVisited: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), visitCount: 12, description: 'Practical deep learning' },
  { id: '9', title: 'Papers with Code', url: 'https://paperswithcode.com', category: 'Learning', tags: ['research', 'ai'], favicon: faviconColors[0], lastVisited: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), visitCount: 19, description: 'ML papers with implementations' },
  // Work
  { id: '10', title: 'Gmail', url: 'https://mail.google.com', category: 'Work', tags: ['email'], favicon: faviconColors[4], lastVisited: new Date(Date.now() - 1000 * 60 * 5).toISOString(), visitCount: 312, description: 'Email client' },
  { id: '11', title: 'Google Drive', url: 'https://drive.google.com', category: 'Work', tags: ['docs', 'files'], favicon: faviconColors[4], lastVisited: new Date(Date.now() - 1000 * 60 * 60).toISOString(), visitCount: 156, description: 'Cloud file storage' },
  { id: '12', title: 'Notion', url: 'https://notion.so', category: 'Work', tags: ['notes', 'wiki'], favicon: faviconColors[0], lastVisited: new Date(Date.now() - 1000 * 60 * 30).toISOString(), visitCount: 98, description: 'All-in-one workspace' },
  // Finance
  { id: '13', title: 'TradingView', url: 'https://tradingview.com', category: 'Finance', tags: ['stocks', 'charts'], favicon: faviconColors[2], lastVisited: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), visitCount: 77, description: 'Financial charts' },
  { id: '14', title: 'CoinGecko', url: 'https://coingecko.com', category: 'Finance', tags: ['crypto', 'prices'], favicon: faviconColors[2], lastVisited: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(), visitCount: 45, description: 'Crypto price tracker' },
  { id: '15', title: 'Xero', url: 'https://xero.com', category: 'Finance', tags: ['accounting', 'tax'], favicon: faviconColors[1], lastVisited: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), visitCount: 22, description: 'Accounting software' },
  // Design
  { id: '16', title: 'Figma', url: 'https://figma.com', category: 'Design', tags: ['ui', 'design'], favicon: faviconColors[6], lastVisited: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), visitCount: 61, description: 'Collaborative design tool' },
  { id: '17', title: 'Dribbble', url: 'https://dribbble.com', category: 'Design', tags: ['inspiration', 'ui'], favicon: faviconColors[6], lastVisited: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), visitCount: 34, description: 'Design portfolio showcase' },
  // Life
  { id: '18', title: 'Spotify', url: 'https://spotify.com', category: 'Life', tags: ['music', 'podcasts'], favicon: '#1DB954', lastVisited: new Date(Date.now() - 1000 * 60 * 15).toISOString(), visitCount: 189, description: 'Music streaming' },
  { id: '19', title: 'YouTube', url: 'https://youtube.com', category: 'Life', tags: ['video', 'learning'], favicon: '#FF0000', lastVisited: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), visitCount: 267, description: 'Video platform' },
];

// ─── Main Component ──────────────────────────────────────────────────────────

export default function LinksPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [starred, setStarred] = useState<Set<string>>(new Set(['1', '7', '10', '16']));

  const allTags = Array.from(new Set(links.flatMap(l => l.tags))).sort();

  const filtered = links.filter(l => {
    const matchSearch = !searchQuery || l.title.toLowerCase().includes(searchQuery.toLowerCase()) || l.tags.some(t => t.includes(searchQuery.toLowerCase()));
    const matchCat = selectedCategory === 'All' || l.category === selectedCategory;
    return matchSearch && matchCat;
  });

  const toggleStar = (id: string) => {
    setStarred(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const topSites = [...links].sort((a, b) => b.visitCount - a.visitCount).slice(0, 5);
  const recentLinks = [...links].sort((a, b) => new Date(b.lastVisited).getTime() - new Date(a.lastVisited).getTime()).slice(0, 5);

  return (
    <div className="max-w-6xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <PixelLink size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900 tracking-tight">Links</h1>
            <p className="text-xs text-gray-500 mt-0.5">{links.length} bookmarks · {categories.length} categories</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-gray-100 rounded-md px-3 py-1.5">
            <PixelSearch size={12} />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search links..."
              className="text-xs outline-none bg-transparent text-gray-700 placeholder-gray-400 w-40"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="text-gray-400 hover:text-gray-600 text-xs">✕</button>
            )}
          </div>
        </div>
      </div>

      {/* Top Sites + Recently Visited */}
      <div className="grid grid-cols-2 gap-4">
        {/* Top Sites */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2"
            style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
            <PixelStarSmall size={10} />
            <h2 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Top Sites</h2>
          </div>
          <div className="p-3 space-y-1">
            {topSites.map((site, i) => (
              <a
                key={site.id}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <div className="w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold text-white" style={{ backgroundColor: site.favicon }}>
                  {site.title[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-800 truncate">{site.title}</p>
                </div>
                <span className="text-[9px] text-gray-400 font-mono">{site.visitCount}x</span>
                <span className="text-[9px] text-gray-300 group-hover:text-gray-500">→</span>
              </a>
            ))}
          </div>
        </div>

        {/* Recently Visited */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2"
            style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
            <PixelClock size={12} className="text-gray-400" />
            <h2 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Recently Visited</h2>
          </div>
          <div className="p-3 space-y-1">
            {recentLinks.map((site) => (
              <a
                key={site.id}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <FaviconDot color={site.favicon} size={14} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-800 truncate">{site.title}</p>
                  <p className="text-[9px] text-gray-400">{getTimeAgo(site.lastVisited)}</p>
                </div>
                <span className="text-[9px] text-gray-300 group-hover:text-gray-500">→</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setSelectedCategory('All')}
          className={`shrink-0 text-[10px] px-3 py-1.5 rounded-full font-medium border transition-colors ${
            selectedCategory === 'All'
              ? 'bg-gray-900 text-white border-gray-900'
              : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'
          }`}
        >
          All ({links.length})
        </button>
        {categories.map(cat => {
          const catCount = links.filter(l => l.category === cat.name).length;
          return (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`shrink-0 text-[10px] px-3 py-1.5 rounded-full font-medium border transition-colors flex items-center gap-1.5 ${
                selectedCategory === cat.name
                  ? 'border-gray-900'
                  : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'
              }`}
              style={selectedCategory === cat.name ? { backgroundColor: `${cat.color}15`, color: cat.color, borderColor: cat.color } : {}}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
              <span className="opacity-60">({catCount})</span>
            </button>
          );
        })}
      </div>

      {/* Link Grid */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between"
          style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
          <div className="flex items-center gap-2">
            <PixelBookmark size={12} />
            <h2 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
              {selectedCategory === 'All' ? 'All Links' : selectedCategory}
            </h2>
            <span className="text-[9px] text-gray-400 ml-1">({filtered.length})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] text-gray-400">{starred.size} starred</span>
          </div>
        </div>

        <div className="divide-y divide-gray-50">
          {filtered.length === 0 ? (
            <div className="px-5 py-12 text-center">
              <PixelGlobe size={32} className="mx-auto mb-3 opacity-20" />
              <p className="text-xs text-gray-400">No links found for "{searchQuery}"</p>
            </div>
          ) : (
            filtered.map(link => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50/50 transition-colors group border-l-4 border-transparent hover:border-l-indigo-300"
              >
                {/* Favicon */}
                <FaviconDot color={link.favicon} size={18} />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">{link.title}</span>
                    {starred.has(link.id) && <PixelStarSmall size={8} />}
                  </div>
                  {link.description && (
                    <p className="text-[11px] text-gray-400 mt-0.5 truncate">{link.description}</p>
                  )}
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[9px] text-gray-400 font-mono truncate max-w-[200px]">{link.url.replace('https://', '')}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="hidden group-hover:flex items-center gap-1.5 shrink-0">
                  {link.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 font-medium">{tag}</span>
                  ))}
                </div>

                {/* Category */}
                <div
                  className="hidden sm:flex items-center gap-1 shrink-0"
                >
                  <div
                    className="w-2 h-2 rounded-sm"
                    style={{ backgroundColor: categories.find(c => c.name === link.category)?.color ?? '#ccc' }}
                  />
                  <span className="text-[9px] text-gray-400">{link.category}</span>
                </div>

                {/* Meta */}
                <div className="shrink-0 text-right">
                  <p className="text-[9px] text-gray-400">{link.visitCount} visits</p>
                  <p className="text-[9px] text-gray-300 mt-0.5">{getTimeAgo(link.lastVisited)}</p>
                </div>

                {/* Star button */}
                <button
                  onClick={e => { e.preventDefault(); toggleStar(link.id); }}
                  className={`shrink-0 p-1 rounded transition-colors ${starred.has(link.id) ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-400'}`}
                >
                  {starred.has(link.id) ? '★' : '☆'}
                </button>

                {/* Arrow */}
                <span className="text-gray-300 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all text-sm">→</span>
              </a>
            ))
          )}
        </div>
      </div>

      {/* Tag Cloud */}
      <div className="bg-white border border-gray-200 rounded-xl px-5 py-4">
        <div className="flex items-center gap-2 mb-3">
          <PixelSparkle size={10} />
          <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest">Tags</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {allTags.map(tag => {
            const count = links.filter(l => l.tags.includes(tag)).length;
            return (
              <button
                key={tag}
                onClick={() => { setSearchQuery(tag); setSelectedCategory('All'); }}
                className="text-[10px] px-2 py-1 rounded-full border border-gray-200 text-gray-500 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50 transition-colors flex items-center gap-1"
              >
                <span className="font-mono">{tag}</span>
                <span className="text-[8px] bg-gray-100 px-1 rounded-full">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer decoration */}
      <div className="flex justify-center gap-1 opacity-20">
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 bg-gray-400"
            style={{
              opacity: Math.sin(i * 0.7) * 0.5 + 0.5,
              borderRadius: i % 3 === 0 ? '50%' : '2px',
            }}
          />
        ))}
      </div>

      <p className="text-center text-[9px] text-gray-300 font-mono tracking-widest uppercase">
        Des_bot · Nightly Build · Links · {links.length} bookmarks
      </p>
    </div>
  );
}