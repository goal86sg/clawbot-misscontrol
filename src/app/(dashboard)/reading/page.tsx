'use client';

import React, { useState } from 'react';
import { PixelSparkle, PixelCheck } from '@/lib/pixel-icons';
import { PixelSearch } from '@/lib/pixel-icons-extra';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Book {
  id: string;
  title: string;
  author: string;
  type: 'book' | 'article' | 'paper' | 'course';
  status: 'reading' | 'want' | 'done' | 'paused';
  category: string;
  progress: number; // pages or %
  totalPages?: number;
  url?: string;
  started?: string;
  finished?: string;
  rating?: number; // 1-5
  notes?: string;
  tags: string[];
  source: string; // where Desss found it
  addedAt: string;
}

interface ReadingStreak {
  current: number;
  longest: number;
  lastRead: string;
}

// ─── Pixel Art Icons ──────────────────────────────────────────────────────────

function PixelBookOpen({ size = 20, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className={`text-indigo-500 ${className}`} shapeRendering="crispEdges">
      <rect x="0" y="2" width="3" height="4" fill="currentColor" opacity="0.3" />
      <rect x="3" y="1" width="1" height="6" fill="currentColor" />
      <rect x="4" y="2" width="3" height="4" fill="currentColor" opacity="0.2" />
      <rect x="1" y="3" width="2" height="1" fill="currentColor" opacity="0.5" />
      <rect x="4" y="3" width="2" height="1" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

function PixelBookSpine({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-orange-400" shapeRendering="crispEdges">
      <rect x="1" y="1" width="6" height="6" fill="currentColor" opacity="0.15" />
      <rect x="2" y="0" width="1" height="8" fill="currentColor" />
      <rect x="4" y="2" width="1" height="4" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

function PixelArticle({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-emerald-500" shapeRendering="crispEdges">
      <rect x="1" y="0" width="6" height="1" fill="currentColor" opacity="0.3" />
      <rect x="0" y="1" width="8" height="1" fill="currentColor" />
      <rect x="0" y="3" width="2" height="1" fill="currentColor" opacity="0.4" />
      <rect x="3" y="3" width="4" height="1" fill="currentColor" opacity="0.3" />
      <rect x="0" y="5" width="2" height="1" fill="currentColor" opacity="0.4" />
      <rect x="3" y="5" width="3" height="1" fill="currentColor" opacity="0.3" />
      <rect x="0" y="7" width="8" height="1" fill="currentColor" />
    </svg>
  );
}

function PixelCourse({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-blue-500" shapeRendering="crispEdges">
      <rect x="0" y="0" width="8" height="2" fill="currentColor" opacity="0.3" />
      <rect x="1" y="2" width="6" height="1" fill="currentColor" />
      <rect x="1" y="3" width="6" height="3" fill="currentColor" opacity="0.15" />
      <rect x="2" y="4" width="1" height="1" fill="currentColor" />
      <rect x="4" y="4" width="2" height="1" fill="currentColor" opacity="0.5" />
      <rect x="2" y="6" width="1" height="1" fill="currentColor" />
      <rect x="4" y="6" width="1" height="1" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

function PixelPaper({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-violet-500" shapeRendering="crispEdges">
      <rect x="1" y="0" width="6" height="7" fill="currentColor" opacity="0.1" />
      <rect x="0" y="1" width="2" height="6" fill="currentColor" opacity="0.15" />
      <rect x="2" y="2" width="4" height="1" fill="currentColor" opacity="0.4" />
      <rect x="2" y="4" width="5" height="1" fill="currentColor" opacity="0.3" />
      <rect x="2" y="6" width="3" height="1" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

function PixelFlame({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-orange-500" shapeRendering="crispEdges">
      <rect x="3" y="0" width="2" height="1" fill="currentColor" />
      <rect x="2" y="1" width="4" height="1" fill="currentColor" opacity="0.5" />
      <rect x="1" y="2" width="6" height="2" fill="currentColor" opacity="0.4" />
      <rect x="2" y="2" width="4" height="2" fill="currentColor" opacity="0.6" />
      <rect x="3" y="2" width="2" height="2" fill="currentColor" />
      <rect x="2" y="4" width="4" height="2" fill="currentColor" opacity="0.5" />
      <rect x="3" y="5" width="2" height="1" fill="currentColor" opacity="0.7" />
      <rect x="2" y="6" width="1" height="1" fill="currentColor" opacity="0.3" />
      <rect x="5" y="6" width="1" height="1" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function PixelTarget({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-red-400" shapeRendering="crispEdges">
      <rect x="3" y="0" width="2" height="1" fill="currentColor" opacity="0.3" />
      <rect x="3" y="7" width="2" height="1" fill="currentColor" opacity="0.3" />
      <rect x="0" y="3" width="1" height="2" fill="currentColor" opacity="0.3" />
      <rect x="7" y="3" width="1" height="2" fill="currentColor" opacity="0.3" />
      <rect x="2" y="2" width="4" height="4" fill="currentColor" opacity="0.15" />
      <rect x="3" y="3" width="2" height="2" fill="currentColor" />
    </svg>
  );
}

// ─── Seed Data ────────────────────────────────────────────────────────────────

const books: Book[] = [
  {
    id: 'B-001',
    title: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    type: 'book',
    status: 'reading',
    category: 'Engineering',
    progress: 142,
    totalPages: 350,
    url: 'https://dataintensive.net',
    started: '2026-05-10',
    tags: ['distributed-systems', 'databases', 'architecture'],
    source: 'Hacker News',
    addedAt: '2026-05-01',
  },
  {
    id: 'B-002',
    title: 'eBPF: The Complete Guide',
    author: 'Rtoal & Linux Foundation',
    type: 'book',
    status: 'reading',
    category: 'Engineering',
    progress: 88,
    totalPages: 280,
    started: '2026-05-15',
    tags: ['ebpf', 'linux', 'performance'],
    source: 'Work (eBPF DAM project)',
    addedAt: '2026-05-10',
  },
  {
    id: 'B-003',
    title: 'The Rust Programming Language',
    author: 'Steve Klabnik & Carol Nichols',
    type: 'book',
    status: 'want',
    category: 'Engineering',
    progress: 0,
    totalPages: 560,
    tags: ['rust', 'systems'],
    source: 'eBPF DAM project needs Rust',
    addedAt: '2026-05-20',
  },
  {
    id: 'A-001',
    title: 'Understanding Git by Building a Git',
    author: 'Julie Song',
    type: 'article',
    status: 'done',
    category: 'Engineering',
    progress: 100,
    url: 'https://blog.bootstrappedmind.com',
    finished: '2026-05-18',
    rating: 5,
    tags: ['git', 'learning-by-building'],
    source: 'Hacker News',
    addedAt: '2026-05-15',
    notes: 'Excellent deep-dive into git internals. Built my own git to understand the data model.',
  },
  {
    id: 'A-002',
    title: 'Postgres at Scale: Lessons from Cloudflare',
    author: 'Philip O\'Brien',
    type: 'article',
    status: 'reading',
    category: 'Engineering',
    progress: 60,
    url: 'https://news.ycombinator.com',
    started: '2026-05-25',
    tags: ['postgres', 'scaling', 'cloudflare'],
    source: 'Hacker News',
    addedAt: '2026-05-22',
  },
  {
    id: 'C-001',
    title: 'fast.ai: Practical Deep Learning',
    author: 'Jeremy Howard',
    type: 'course',
    status: 'want',
    category: 'AI/ML',
    progress: 0,
    tags: ['ai', 'ml', 'deep-learning', 'python'],
    source: 'Links → Fast.ai',
    addedAt: '2026-05-05',
  },
  {
    id: 'P-001',
    title: 'Attention Is All You Need',
    author: 'Vaswani et al.',
    type: 'paper',
    status: 'done',
    category: 'AI/ML',
    progress: 100,
    finished: '2026-05-12',
    rating: 4,
    tags: ['transformers', 'attention', 'nlp'],
    source: 'Papers with Code',
    addedAt: '2026-05-08',
    notes: 'Foundational paper. Re-read twice to grok the attention mechanism.',
  },
  {
    id: 'B-004',
    title: 'The Goal',
    author: 'Eliyahu M. Goldratt',
    type: 'book',
    status: 'done',
    category: 'Productivity',
    progress: 100,
    finished: '2026-04-28',
    rating: 5,
    tags: ['productivity', 'business', 'fiction'],
    source: 'Recommended by colleague',
    addedAt: '2026-04-15',
    notes: 'Best business/operations book I\'ve read. Theory of constraints applied to software teams.',
  },
  {
    id: 'A-003',
    title: 'How Kubernetes Changed My Thinking',
    author: 'CNCF Blog',
    type: 'article',
    status: 'paused',
    category: 'Infrastructure',
    progress: 30,
    url: 'https://kubernetes.io',
    tags: ['kubernetes', 'cloud-native'],
    source: 'K8s News Monitor',
    addedAt: '2026-05-18',
  },
  {
    id: 'B-005',
    title: 'A Philosophy of Software Design',
    author: 'John Ousterhout',
    type: 'book',
    status: 'want',
    category: 'Engineering',
    progress: 0,
    totalPages: 300,
    tags: ['design', 'architecture', 'software'],
    source: 'Many HN comments recommend this',
    addedAt: '2026-05-25',
  },
  {
    id: 'A-004',
    title: 'The Art of Unix Programming',
    author: 'Eric S. Raymond',
    type: 'book',
    status: 'want',
    category: 'Engineering',
    progress: 0,
    totalPages: 560,
    tags: ['unix', 'philosophy', 'programming'],
    source: 'Links → Unix philosophy posts',
    addedAt: '2026-05-28',
  },
];

const streak: ReadingStreak = {
  current: 5,
  longest: 14,
  lastRead: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getTimeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

function TypeIcon({ type }: { type: Book['type'] }) {
  switch (type) {
    case 'book': return <PixelBookSpine size={14} />;
    case 'article': return <PixelArticle size={14} />;
    case 'course': return <PixelCourse size={14} />;
    case 'paper': return <PixelPaper size={14} />;
  }
}

function StatusBadge({ status }: { status: Book['status'] }) {
  const styles: Record<string, string> = {
    reading: 'bg-blue-100 text-blue-700 border-blue-200',
    want: 'bg-gray-100 text-gray-500 border-gray-200',
    done: 'bg-green-100 text-green-700 border-green-200',
    paused: 'bg-orange-50 text-orange-600 border-orange-200',
  };
  const labels: Record<string, string> = {
    reading: 'Reading',
    want: 'Want to Read',
    done: 'Done',
    paused: 'Paused',
  };
  return (
    <span className={`text-[8px] px-1.5 py-0.5 rounded border font-medium uppercase ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={`text-[8px] ${i < rating ? 'text-yellow-400' : 'text-gray-200'}`}>★</span>
      ))}
    </div>
  );
}

function ProgressBar({ value, max }: { value: number; max: number }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="flex items-center gap-1.5">
      <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-[9px] text-gray-400 font-mono">{pct}%</span>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function ReadingPage() {
  const [filter, setFilter] = useState<Book['status'] | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', ...Array.from(new Set(books.map(b => b.category))).sort()];

  const filtered = books.filter(b => {
    if (filter !== 'all' && b.status !== filter) return false;
    if (categoryFilter !== 'All' && b.category !== categoryFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q) || b.tags.some(t => t.includes(q));
    }
    return true;
  });

  const reading = books.filter(b => b.status === 'reading');
  const want = books.filter(b => b.status === 'want');
  const done = books.filter(b => b.status === 'done');

  return (
    <div className="max-w-6xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
            <PixelBookOpen size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900 tracking-tight">Reading</h1>
            <p className="text-xs text-gray-500 mt-0.5">
              {reading.length} reading · {want.length} want to read · {done.length} done
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <PixelSearch size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search titles, authors, tags..."
              className="text-xs border border-gray-200 rounded-md pl-7 pr-3 py-1.5 w-52 outline-none focus:border-gray-400 bg-white"
            />
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-4">
        {/* Currently Reading */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <PixelBookSpine size={12} />
            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Reading</span>
          </div>
          <p className="text-2xl font-bold text-blue-600">{reading.length}</p>
          {reading.map(b => (
            <div key={b.id} className="mt-2">
              <p className="text-[10px] text-gray-700 font-medium truncate">{b.title}</p>
              <ProgressBar value={b.progress} max={b.totalPages ?? 100} />
            </div>
          ))}
        </div>

        {/* Want to Read */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <PixelTarget size={12} />
            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Backlog</span>
          </div>
          <p className="text-2xl font-bold text-gray-600">{want.length}</p>
          <p className="text-[9px] text-gray-400 mt-1">books & articles queued</p>
        </div>

        {/* Finished This Month */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <PixelCheck size={12} />
            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Done</span>
          </div>
          <p className="text-2xl font-bold text-green-600">{done.length}</p>
          <p className="text-[9px] text-gray-400 mt-1">completed</p>
        </div>

        {/* Reading Streak */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <PixelFlame size={12} />
            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Streak</span>
          </div>
          <p className="text-2xl font-bold text-orange-500">{streak.current} <span className="text-sm text-gray-400">days</span></p>
          <p className="text-[9px] text-gray-400 mt-1">best: {streak.longest} days · last read {getTimeAgo(streak.lastRead)}</p>
        </div>
      </div>

      {/* Currently Reading — Spotlight */}
      {reading.length > 0 && (
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-indigo-100/50 flex items-center gap-2"
            style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
            <PixelFlame size={10} />
            <h2 className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">Currently Reading</h2>
          </div>
          <div className="p-5 grid grid-cols-2 gap-6">
            {reading.map(book => (
              <div key={book.id} className="bg-white/80 rounded-lg p-4 border border-indigo-100/50">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-14 bg-gradient-to-br from-indigo-200 to-purple-200 rounded flex items-center justify-center shrink-0">
                    <span className="text-[9px] font-bold text-indigo-600 uppercase">{book.type}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[9px] font-mono text-gray-400">{book.id}</span>
                      <TypeIcon type={book.type} />
                      <StatusBadge status={book.status} />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900 leading-tight">{book.title}</h3>
                    <p className="text-[10px] text-gray-500 mt-0.5">{book.author}</p>
                    <div className="mt-2">
                      <ProgressBar value={book.progress} max={book.totalPages ?? 100} />
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-[9px] text-gray-400">p. {book.progress} of {book.totalPages}</span>
                        {book.started && (
                          <span className="text-[9px] text-gray-400">started {book.started}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {book.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-[8px] px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-500 font-medium">#{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category + Status Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setFilter('all')}
          className={`shrink-0 text-[10px] px-3 py-1.5 rounded-full font-medium border transition-colors ${
            filter === 'all' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'
          }`}
        >
          All ({books.length})
        </button>
        {(['reading', 'want', 'done', 'paused'] as const).map(s => {
          const count = books.filter(b => b.status === s).length;
          return (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`shrink-0 text-[10px] px-3 py-1.5 rounded-full font-medium border transition-colors ${
                filter === s ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'
              }`}
            >
              {s === 'want' ? 'Want to Read' : s.charAt(0).toUpperCase() + s.slice(1)} ({count})
            </button>
          );
        })}
        <span className="text-gray-200">|</span>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`shrink-0 text-[10px] px-2 py-1 rounded-full font-medium border transition-colors ${
              categoryFilter === cat ? 'bg-purple-100 text-purple-700 border-purple-200' : 'bg-white text-gray-400 border-gray-100 hover:border-gray-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Reading List */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between"
          style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
          <div className="flex items-center gap-2">
            <PixelBookOpen size={12} />
            <h2 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
              {filter === 'all' ? 'All Reading' : `${filter} (${filtered.length})`}
            </h2>
          </div>
          <span className="text-[9px] text-gray-400">{filtered.length} items</span>
        </div>

        <div className="divide-y divide-gray-50">
          {filtered.length === 0 ? (
            <div className="px-5 py-12 text-center">
              <PixelBookOpen size={32} />
              <p className="text-xs text-gray-400 mt-3">Nothing here yet</p>
            </div>
          ) : (
            filtered.map(book => (
              <div key={book.id} className="px-5 py-4 hover:bg-gray-50/50 transition-colors group">
                <div className="flex items-start gap-4">
                  {/* Type icon + color block */}
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    book.type === 'book' ? 'bg-orange-100 text-orange-500' :
                    book.type === 'article' ? 'bg-emerald-100 text-emerald-500' :
                    book.type === 'course' ? 'bg-blue-100 text-blue-500' :
                    'bg-violet-100 text-violet-500'
                  }`}>
                    <TypeIcon type={book.type} />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-mono text-gray-300">{book.id}</span>
                      <h3 className="text-sm font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {book.title}
                      </h3>
                      {book.rating && <StarRating rating={book.rating} />}
                    </div>
                    <p className="text-[11px] text-gray-500 mt-0.5">{book.author}</p>

                    {/* Meta row */}
                    <div className="flex items-center gap-3 mt-2 flex-wrap">
                      <StatusBadge status={book.status} />
                      <span className="text-[9px] text-gray-400">{book.category}</span>
                      {book.totalPages && (
                        <span className="text-[9px] text-gray-400">{book.totalPages} pages</span>
                      )}
                      {book.url && (
                        <a href={book.url} target="_blank" rel="noopener noreferrer" className="text-[9px] text-blue-500 hover:underline font-mono truncate max-w-[180px]">
                          {book.url.replace('https://', '')}
                        </a>
                      )}
                    </div>

                    {/* Tags + notes */}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {book.tags.map(tag => (
                        <span key={tag} className="text-[8px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 font-medium">#{tag}</span>
                      ))}
                    </div>
                    {book.notes && (
                      <p className="text-[10px] text-gray-400 mt-2 italic border-l-2 border-gray-200 pl-2">{book.notes}</p>
                    )}
                  </div>

                  {/* Progress / dates */}
                  <div className="shrink-0 text-right">
                    {book.status === 'reading' && book.totalPages && (
                      <div>
                        <ProgressBar value={book.progress} max={book.totalPages} />
                        <p className="text-[9px] text-gray-400 mt-1">{book.progress}/{book.totalPages}</p>
                      </div>
                    )}
                    {book.finished && (
                      <p className="text-[9px] text-gray-400">finished {book.finished}</p>
                    )}
                    {book.started && book.status !== 'done' && (
                      <p className="text-[9px] text-gray-400">started {book.started}</p>
                    )}
                    <p className="text-[9px] text-gray-300 mt-1">via {book.source}</p>
                  </div>
                </div>
              </div>
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
          {Array.from(new Set(books.flatMap(b => b.tags))).sort().map(tag => {
            const count = books.filter(b => b.tags.includes(tag)).length;
            return (
              <button
                key={tag}
                onClick={() => setSearchQuery(tag)}
                className="text-[10px] px-2 py-1 rounded-full border border-gray-200 text-gray-500 hover:border-orange-300 hover:text-orange-600 hover:bg-orange-50 transition-colors flex items-center gap-1"
              >
                <span className="font-mono">#{tag}</span>
                <span className="text-[8px] bg-gray-100 px-1 rounded-full">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer decoration */}
      <div className="flex justify-center gap-1 opacity-20">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 bg-gray-400"
            style={{
              opacity: Math.sin(i * 0.8) * 0.4 + 0.5,
              borderRadius: i % 4 === 0 ? '50%' : '2px',
            }}
          />
        ))}
      </div>

      <p className="text-center text-[9px] text-gray-300 font-mono tracking-widest uppercase">
        Des_bot · Nightly Build · Reading · {books.filter(b => b.status === 'done').length} books completed
      </p>
    </div>
  );
}