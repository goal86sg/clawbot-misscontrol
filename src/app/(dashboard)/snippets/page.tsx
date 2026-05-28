'use client';

import React, { useState } from 'react';
import { PixelSearch, PixelSnippets } from '@/lib/pixel-icons-extra';

type SnippetLang = 'bash' | 'typescript' | 'python' | 'sql' | 'json' | 'css' | 'rust' | 'yaml';
type SnippetCategory = 'infra' | 'scripts' | 'db' | 'web' | 'config' | 'ai' | 'misc';

interface Snippet {
  id: string;
  title: string;
  description: string;
  category: SnippetCategory;
  language: SnippetLang;
  tags: string[];
  code: string;
  lastUsed: string;
  useCount: number;
}

const snippets: Snippet[] = [
  {
    id: 'SN-001',
    title: 'Git branch cleanup',
    description: 'Delete local branches already merged into main',
    category: 'scripts',
    language: 'bash',
    tags: ['git', 'cleanup', 'prune'],
    code: `# Delete merged local branches
git branch --merged main | grep -v "main\\|\\*" | xargs -r git branch -d`,
    lastUsed: '3 days ago',
    useCount: 12,
  },
  {
    id: 'SN-002',
    title: 'PostgreSQL slow query log',
    description: 'Enable and configure pg slow query logging',
    category: 'db',
    language: 'sql',
    tags: ['postgres', 'performance', 'logging'],
    code: `-- Enable slow query log
ALTER SYSTEM SET log_min_duration_statement = 1000;
SELECT pg_reload_conf();

-- View slow queries
SELECT pid, now() - query_start AS duration, query
FROM pg_stat_activity
WHERE state = 'active' AND query_start < now() - interval '1 minute'
ORDER BY duration DESC;`,
    lastUsed: '1 week ago',
    useCount: 8,
  },
  {
    id: 'SN-003',
    title: 'Docker prune everything',
    description: 'Clean up all dangling Docker resources',
    category: 'infra',
    language: 'bash',
    tags: ['docker', 'cleanup', 'disk'],
    code: `# Prune all dangling resources
docker system prune -f

# Remove all stopped containers
docker container prune -f

# Remove unused images
docker image prune -f

# Remove unused volumes
docker volume prune -f`,
    lastUsed: '2 days ago',
    useCount: 15,
  },
  {
    id: 'SN-004',
    title: 'Next.js API route with error handling',
    description: 'Standard pattern for Next.js 14 app router API routes',
    category: 'web',
    language: 'typescript',
    tags: ['nextjs', 'api', 'typescript'],
    code: `import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }
    
    const data = await fetchSomething(id);
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}`,
    lastUsed: '5 days ago',
    useCount: 7,
  },
  {
    id: 'SN-005',
    title: 'Cron schedule decoder',
    description: 'Human-readable explanation of cron expressions',
    category: 'misc',
    language: 'bash',
    tags: ['cron', 'schedule', 'utility'],
    code: `# ┌───────────── minute (0-59)
# │ ┌───────────── hour (0-23)
# │ │ ┌───────────── day of month (1-31)
# │ │ │ ┌───────────── month (1-12)
# │ │ │ │ ┌───────────── day of week (0-6, Sun=0)
# │ │ │ │ │
# * * * * * command

# Examples:
# 0 9 * * 1-5    → 09:00 Mon-Fri
# 0 */4 * * *    → Every 4 hours
# 30 23 * * *    → 23:30 daily
# 0 0 1 * *      → Midnight on 1st of month
# 0 8 * * 0,6    → 08:00 Sat & Sun`,
    lastUsed: '2 weeks ago',
    useCount: 20,
  },
  {
    id: 'SN-006',
    title: 'pg_stat_activity monitoring',
    description: 'Real-time PostgreSQL connection and query monitoring',
    category: 'db',
    language: 'sql',
    tags: ['postgres', 'monitoring', 'connections'],
    code: `-- Active queries with wait info
SELECT
  pid,
  usename,
  application_name,
  client_addr,
  state,
  wait_event_type,
  wait_event,
  query,
  query_start
FROM pg_stat_activity
WHERE state != 'idle'
ORDER BY query_start;

-- Connection count by state
SELECT state, count(*)
FROM pg_stat_activity
GROUP BY state;

-- Kill idle connection
SELECT pg_cancel_backend(pid); -- graceful
SELECT pg_terminate_backend(pid); -- force`,
    lastUsed: '1 week ago',
    useCount: 9,
  },
  {
    id: 'SN-007',
    title: 'Find large files in Linux',
    description: 'Find files larger than 100MB, sorted by size',
    category: 'infra',
    language: 'bash',
    tags: ['linux', 'disk', 'find', 'storage'],
    code: `# Find files > 100MB
find / -type f -size +100M -exec ls -lh {} \\; 2>/dev/null | awk '{ print $5 ": " $9 }' | sort -h

# Per directory usage
du -sh /* 2>/dev/null | sort -h | tail -20

# Find largest directories
du -h --max-depth=3 / | sort -h | tail -20`,
    lastUsed: '3 days ago',
    useCount: 11,
  },
  {
    id: 'SN-008',
    title: 'OpenClaw security audit',
    description: 'Run deep security audit and format output',
    category: 'ai',
    language: 'bash',
    tags: ['openclaw', 'security', 'audit', 'guarddog'],
    code: `# Run security audit
openclaw security audit --deep 2>&1 | tee /tmp/security-audit-$(date +%Y%m%d).log

# Check SSH config
openclaw security audit --ssh

# Fix common issues
openclaw security audit --fix

# Quick status
openclaw security audit --brief`,
    lastUsed: '2 days ago',
    useCount: 14,
  },
  {
    id: 'SN-009',
    title: 'YAML config for cron job',
    description: 'Standard cron job YAML schema for OpenClaw',
    category: 'config',
    language: 'yaml',
    tags: ['yaml', 'cron', 'openclaw', 'schedule'],
    code: `# Cron job YAML example
name: my-cron-task
schedule:
  kind: cron
  expr: "0 9 * * 1-5"  # 09:00 Mon-Fri
  tz: Asia/Singapore
payload:
  kind: agentTurn
  message: "Run my task"
delivery:
  mode: announce
  channel: telegram
  to: "78417402"
sessionTarget: isolated`,
    lastUsed: '1 week ago',
    useCount: 18,
  },
  {
    id: 'SN-010',
    title: 'eBPF probe attach pattern',
    description: 'Attach eBPF probe to PostgreSQL query parsing',
    category: 'db',
    language: 'rust',
    tags: ['ebpf', 'postgres', 'probe', 'rust'],
    code: `useaya_ebpf::link::UProbe;

let prog = load_bpf!("pg_query_probe")?;
let link = UProbe::new()
    .target("postgres")
    .symbol("pg_parse_query")
    .handler("handle_query")
    .entry()?
    .attach()?;

println!("Attached to pg_parse_query");`,
    lastUsed: '1 week ago',
    useCount: 5,
  },
  {
    id: 'SN-011',
    title: 'Telegram bot send message',
    description: 'Send formatted message to Telegram via bot API',
    category: 'ai',
    language: 'bash',
    tags: ['telegram', 'bot', 'notify', 'script'],
    code: `TELEGRAM_BOT_TOKEN="your_token_here"
TELEGRAM_CHAT_ID="78417402"

send_telegram() {
  local message="$1"
  curl -s -X POST "https://api.telegram.org/bot\${TELEGRAM_BOT_TOKEN}/sendMessage" \\
    -d chat_id="\${TELEGRAM_CHAT_ID}" \\
    -d text="\${message}" \\
    -d parse_mode="Markdown" > /dev/null
}

send_telegram "✅ Build complete: v1.2.3"`,
    lastUsed: '2 days ago',
    useCount: 16,
  },
  {
    id: 'SN-012',
    title: 'Python virtualenv setup',
    description: 'Create and activate Python venv with pip',
    category: 'scripts',
    language: 'python',
    tags: ['python', 'venv', 'setup', 'pip'],
    code: `# Create venv
python3 -m venv .venv

# Activate
source .venv/bin/activate

# Install deps
pip install -r requirements.txt

# Freeze deps
pip freeze > requirements.txt

# Deactivate
deactivate`,
    lastUsed: '4 days ago',
    useCount: 13,
  },
  {
    id: 'SN-013',
    title: 'TypeScript interface from JSON',
    description: 'Generate TypeScript interface from raw JSON object',
    category: 'web',
    language: 'typescript',
    tags: ['typescript', 'types', 'json', 'schema'],
    code: `interface Generated {
  field1: string;
  nested: {
    fieldA: number;
    fieldB: boolean;
    items: string[];
  };
  optional?: string;
  timestamp: string; // ISO 8601
}

// With runtime validation (Zod)
import { z } from 'zod';
const Schema = z.object({
  field1: z.string(),
  nested: z.object({
    fieldA: z.number(),
    fieldB: z.boolean(),
    items: z.array(z.string()),
  }),
  optional: z.string().optional(),
  timestamp: z.string().datetime(),
});`,
    lastUsed: '1 week ago',
    useCount: 10,
  },
  {
    id: 'SN-014',
    title: 'tmux session management',
    description: 'Create, detach, and attach tmux sessions',
    category: 'infra',
    language: 'bash',
    tags: ['tmux', 'terminal', 'session'],
    code: `# Create named session
tmux new -s work -d

# Send command to session
tmux send-keys -t work "cd ~/project" C-m

# Split window
tmux split-window -t work -h
tmux split-window -t work -v

# List sessions
tmux ls

# Attach to session
tmux attach -t work

# Kill session
tmux kill-session -t work`,
    lastUsed: '3 days ago',
    useCount: 12,
  },
  {
    id: 'SN-015',
    title: 'CSS pixel-art utility',
    description: 'Tailwind CSS pixel-art box shadow pattern',
    category: 'web',
    language: 'css',
    tags: ['css', 'pixel', 'tailwind', 'design'],
    code: `/* Pixel-art box shadow — 8px grid */
.pixel-box {
  box-shadow:
    4px 0 0 0 currentColor,   /* right edge */
    -4px 0 0 0 currentColor, /* left edge */
    0 -4px 0 0 currentColor, /* top edge */
    0 4px 0 0 currentColor,  /* bottom edge */
    4px 4px 0 0 currentColor, /* corner */
    4px -4px 0 0 currentColor,
    -4px 4px 0 0 currentColor,
    -4px -4px 0 0 currentColor;
}

/* Crisp rendering */
.pixel-art {
  image-rendering: pixelated;
  shape-rendering: crispEdges;
}`,
    lastUsed: '5 days ago',
    useCount: 8,
  },
];

const categoryMeta: Record<SnippetCategory, { label: string; color: string; bg: string }> = {
  infra:    { label: 'Infra',    color: 'text-slate-700',   bg: 'bg-slate-100' },
  scripts:  { label: 'Scripts',  color: 'text-orange-700',  bg: 'bg-orange-50' },
  db:       { label: 'Database', color: 'text-blue-700',    bg: 'bg-blue-50' },
  web:      { label: 'Web',      color: 'text-purple-700',  bg: 'bg-purple-50' },
  config:   { label: 'Config',   color: 'text-teal-700',    bg: 'bg-teal-50' },
  ai:       { label: 'AI',       color: 'text-pink-700',    bg: 'bg-pink-50' },
  misc:     { label: 'Misc',     color: 'text-gray-700',    bg: 'bg-gray-100' },
};

const langColors: Record<SnippetLang, string> = {
  bash:       'text-gray-600',
  typescript: 'text-blue-600',
  python:     'text-yellow-600',
  sql:        'text-emerald-600',
  json:       'text-orange-600',
  css:        'text-purple-600',
  rust:       'text-orange-700',
  yaml:       'text-rose-600',
};

function CodePreview({ code, language }: { code: string; language: SnippetLang }) {
  return (
    <pre className="bg-gray-950 text-green-400 text-[10px] font-mono p-4 rounded-lg overflow-x-auto leading-relaxed">
      <code>{code}</code>
    </pre>
  );
}

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 text-[10px] px-3 py-1.5 rounded-md border border-gray-200 hover:border-gray-400 hover:bg-gray-50 transition-colors"
    >
      <span className={copied ? 'text-green-500' : 'text-gray-500'}>
        {copied ? '✓ Copied' : '📋 Copy'}
      </span>
    </button>
  );
}

export default function SnippetsPage() {
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState<SnippetCategory | 'all'>('all');
  const [langFilter, setLangFilter] = useState<SnippetLang | 'all'>('all');
  const [selected, setSelected] = useState<Snippet | null>(null);

  const filtered = snippets.filter(s => {
    if (search && !s.title.toLowerCase().includes(search.toLowerCase()) &&
        !s.description.toLowerCase().includes(search.toLowerCase()) &&
        !s.tags.some(t => t.includes(search.toLowerCase()))) return false;
    if (catFilter !== 'all' && s.category !== catFilter) return false;
    if (langFilter !== 'all' && s.language !== langFilter) return false;
    return true;
  });

  const categories = ['all', ...new Set(snippets.map(s => s.category))] as (SnippetCategory | 'all')[];
  const languages = ['all', ...new Set(snippets.map(s => s.language))] as (SnippetLang | 'all')[];

  return (
    <div className="max-w-6xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900 tracking-tight">Snippets</h1>
          <p className="text-xs text-gray-500 mt-0.5">{snippets.length} code snippets · searchable</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <PixelSearch size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search snippets..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="text-xs border border-gray-200 rounded-md pl-7 pr-3 py-1.5 w-48 outline-none focus:border-gray-400"
            />
          </div>
          <select
            value={catFilter}
            onChange={e => setCatFilter(e.target.value as typeof catFilter)}
            className="text-xs border border-gray-200 rounded-md px-2 py-1.5 bg-white text-gray-600"
          >
            {categories.map(c => (
              <option key={c} value={c}>{c === 'all' ? 'All Categories' : categoryMeta[c].label}</option>
            ))}
          </select>
          <select
            value={langFilter}
            onChange={e => setLangFilter(e.target.value as typeof langFilter)}
            className="text-xs border border-gray-200 rounded-md px-2 py-1.5 bg-white text-gray-600"
          >
            {languages.map(l => (
              <option key={l} value={l}>{l === 'all' ? 'All Languages' : l}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4">
        {filtered.map(snippet => (
          <div
            key={snippet.id}
            onClick={() => setSelected(selected?.id === snippet.id ? null : snippet)}
            className={`bg-white border rounded-lg overflow-hidden cursor-pointer transition-all ${
              selected?.id === snippet.id ? 'border-blue-400 shadow-sm' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            {/* Card Header */}
            <div className="px-4 py-3 flex items-start gap-3">
              <PixelSnippets size={20} className="mt-0.5 text-gray-400 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-xs font-semibold text-gray-900">{snippet.title}</p>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${langColors[snippet.language]} bg-gray-50`}>
                    {snippet.language}
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">{snippet.description}</p>
              </div>
            </div>

            {/* Tags */}
            <div className="px-4 pb-2 flex items-center gap-1.5 flex-wrap">
              <span className={`text-[9px] px-1.5 py-0.5 rounded font-medium ${categoryMeta[snippet.category].color} ${categoryMeta[snippet.category].bg}`}>
                {categoryMeta[snippet.category].label}
              </span>
              {snippet.tags.map(tag => (
                <span key={tag} className="text-[9px] text-gray-400 bg-gray-100 px-1 rounded">{tag}</span>
              ))}
            </div>

            {/* Expanded Preview */}
            {selected?.id === snippet.id && (
              <div className="border-t border-gray-100">
                <div className="px-4 py-3 flex items-center justify-between bg-gray-50/50">
                  <span className="text-[10px] text-gray-400">Last used: {snippet.lastUsed} · {snippet.useCount}x</span>
                  <CopyButton code={snippet.code} />
                </div>
                <div className="px-4 py-3">
                  <CodePreview code={snippet.code} language={snippet.language} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <PixelSnippets size={32} className="text-gray-300 mx-auto mb-3" />
          <p className="text-sm text-gray-400">No snippets match your search</p>
        </div>
      )}
    </div>
  );
}