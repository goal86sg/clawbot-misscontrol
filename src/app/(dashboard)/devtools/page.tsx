'use client';

import React, { useState, useEffect } from 'react';
import { PixelTerminal, PixelSparkle, PixelCheck, PixelAlert } from '@/lib/pixel-icons';

// ─── Types ───────────────────────────────────────────────────────────────────

interface Tool {
  id: string;
  name: string;
  description: string;
  category: 'encode' | 'time' | 'git' | 'docker' | 'dev' | 'hash';
  icon: React.ReactNode;
}

// ─── Pixel Tool Icon ───────────────────────────────────────────────────────────

function PixelWrench({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" shapeRendering="crispEdges" className="text-orange-500">
      <rect x="0" y="3" width="5" height="2" fill="currentColor" opacity="0.6" />
      <rect x="4" y="1" width="2" height="2" fill="currentColor" />
      <rect x="5" y="3" width="3" height="2" fill="currentColor" opacity="0.8" />
      <rect x="6" y="5" width="2" height="2" fill="currentColor" opacity="0.5" />
      <rect x="3" y="5" width="2" height="2" fill="currentColor" />
    </svg>
  );
}

function PixelClockGray({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" shapeRendering="crispEdges" className="text-blue-500">
      <rect x="2" y="1" width="5" height="5" fill="currentColor" opacity="0.2" />
      <rect x="1" y="2" width="7" height="5" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <rect x="3" y="0" width="1" height="2" fill="currentColor" opacity="0.4" />
      <rect x="5" y="0" width="1" height="2" fill="currentColor" opacity="0.4" />
      <rect x="4" y="3" width="1" height="2" fill="currentColor" />
      <rect x="4" y="5" width="1" height="1" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

function PixelHash({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" shapeRendering="crispEdges" className="text-pink-500">
      <rect x="0" y="1" width="8" height="1" fill="currentColor" opacity="0.6" />
      <rect x="0" y="4" width="8" height="1" fill="currentColor" opacity="0.6" />
      <rect x="2" y="0" width="1" height="8" fill="currentColor" opacity="0.6" />
      <rect x="5" y="0" width="1" height="8" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

function PixelJson({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" shapeRendering="crispEdges" className="text-yellow-500">
      <rect x="0" y="0" width="1" height="8" fill="currentColor" opacity="0.4" />
      <rect x="2" y="0" width="1" height="3" fill="currentColor" />
      <rect x="5" y="0" width="1" height="3" fill="currentColor" />
      <rect x="2" y="4" width="1" height="3" fill="currentColor" />
      <rect x="5" y="4" width="1" height="3" fill="currentColor" />
      <rect x="6" y="0" width="1" height="8" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

function PixelGitBranch({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" shapeRendering="crispEdges" className="text-orange-600">
      <rect x="3" y="0" width="2" height="3" fill="currentColor" />
      <rect x="1" y="3" width="6" height="2" fill="currentColor" opacity="0.3" />
      <rect x="0" y="4" width="2" height="3" fill="currentColor" />
      <rect x="6" y="4" width="2" height="3" fill="currentColor" />
      <rect x="3" y="5" width="2" height="3" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

function PixelDockerSmall({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" shapeRendering="crispEdges" className="text-blue-400">
      <rect x="1" y="1" width="3" height="3" fill="currentColor" opacity="0.5" />
      <rect x="4" y="1" width="3" height="3" fill="currentColor" />
      <rect x="1" y="4" width="6" height="3" fill="currentColor" opacity="0.3" />
      <rect x="2" y="5" width="1" height="1" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

// ─── Base64 Tool ──────────────────────────────────────────────────────────────

function Base64Tool() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const process = () => {
    setError('');
    try {
      if (mode === 'encode') {
        setOutput(btoa(input));
      } else {
        setOutput(atob(input));
      }
    } catch (e) {
      setError('Invalid input for decoding');
      setOutput('');
    }
  };

  useEffect(() => { process(); }, [input, mode]);

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setMode('encode')}
          className={`text-[10px] px-3 py-1 rounded font-medium ${mode === 'encode' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-500'}`}
        >Encode</button>
        <button
          onClick={() => setMode('decode')}
          className={`text-[10px] px-3 py-1 rounded font-medium ${mode === 'decode' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-500'}`}
        >Decode</button>
      </div>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder={mode === 'encode' ? 'Text to encode...' : 'Base64 to decode...'}
        className="w-full text-xs font-mono border border-gray-200 rounded px-3 py-2 outline-none focus:border-blue-400 bg-gray-50"
      />
      {error && <p className="text-[10px] text-red-500">{error}</p>}
      {output && (
        <div className="bg-gray-900 rounded p-2 font-mono text-[10px] text-green-400 break-all">
          {output}
        </div>
      )}
    </div>
  );
}

// ─── Timestamp Tool ───────────────────────────────────────────────────────────

function TimestampTool() {
  const [ts, setTs] = useState(Date.now().toString());
  const [mode, setMode] = useState<'toDate' | 'toTs'>('toDate');
  const [input, setInput] = useState(String(Date.now()));
  const [result, setResult] = useState('');

  useEffect(() => {
    if (mode === 'toDate') {
      const n = parseInt(input);
      if (!isNaN(n)) {
        const d = new Date(n);
        setResult(d.toISOString() + ' | ' + d.toLocaleString());
      } else {
        setResult('Invalid timestamp');
      }
    } else {
      try {
        const d = new Date(input);
        if (!isNaN(d.getTime())) {
          setResult(String(d.getTime()));
        } else {
          setResult('Invalid date');
        }
      } catch {
        setResult('Invalid date string');
      }
    }
  }, [input, mode]);

  const now = Date.now();

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => setMode('toDate')}
          className={`text-[10px] px-3 py-1 rounded font-medium ${mode === 'toDate' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-500'}`}
        >TS → Date</button>
        <button
          onClick={() => setMode('toTs')}
          className={`text-[10px] px-3 py-1 rounded font-medium ${mode === 'toTs' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-500'}`}
        >Date → TS</button>
        <button
          onClick={() => { setInput(String(now)); setMode('toDate'); }}
          className="text-[10px] px-2 py-1 rounded bg-gray-100 text-gray-500 hover:bg-gray-200"
        >Now: {now}</button>
      </div>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder={mode === 'toDate' ? 'Unix timestamp (ms)' : 'ISO date string...'}
        className="w-full text-xs font-mono border border-gray-200 rounded px-3 py-2 outline-none focus:border-blue-400 bg-gray-50"
      />
      {result && (
        <div className="bg-gray-900 rounded p-2 font-mono text-[10px] text-green-400 leading-relaxed whitespace-pre">
          {result}
        </div>
      )}
    </div>
  );
}

// ─── JSON Formatter ───────────────────────────────────────────────────────────

function JsonTool() {
  const [input, setInput] = useState('{"name": "Desss", "role": "engineer", "active": true}');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError('');
    } catch (e: any) {
      setError(e.message);
      setOutput('');
    }
  }, [input]);

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <span className="text-[10px] text-gray-400 font-mono">JSON Formatter</span>
        <button
          onClick={() => { try { const p = JSON.parse(input); setInput(JSON.stringify(p)); } catch {} }}
          className="text-[10px] px-2 py-1 rounded bg-gray-100 text-gray-500 hover:bg-gray-200"
        >Minify</button>
      </div>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder='{"key": "value"}'
        rows={4}
        className="w-full text-xs font-mono border border-gray-200 rounded px-3 py-2 outline-none focus:border-blue-400 bg-gray-50 resize-none"
      />
      {error && <p className="text-[10px] text-red-500">{error}</p>}
      {output && (
        <pre className="bg-gray-900 rounded p-2 font-mono text-[10px] text-green-400 overflow-auto max-h-40 whitespace-pre">{output}</pre>
      )}
    </div>
  );
}

// ─── Hash Tool ────────────────────────────────────────────────────────────────

function HashTool() {
  const [input, setInput] = useState('hello world');
  const [algo, setAlgo] = useState<'md5' | 'sha1' | 'sha256'>('sha256');

  // Simple hash implementation (browser-compatible)
  const computeHash = (str: string, algorithm: string): string => {
    // Use Web Crypto API
    const enc = new TextEncoder();
    const data = enc.encode(str);
    
    if (algorithm === 'md5') {
      // MD5 via simple implementation
      const F = (x: number, y: number, z: number) => (x & y) | (~x & z);
      const G = (x: number, y: number, z: number) => (x & z) | (y & ~z);
      const H = (x: number, y: number, z: number) => x ^ y ^ z;
      const I = (x: number, y: number, z: number) => y ^ (x | ~z);
      
      const X = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476];
      
      const S = [
        7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
        5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20,
        4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
        6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21,
      ];
      
      // Padding
      const msg = enc.encode(str);
      const len = msg.length;
      const padded = new Uint8Array(Math.ceil((len + 9) / 64) * 64);
      padded.set(msg);
      padded[len] = 0x80;
      const bitLen = BigInt(len) * BigInt(8);
      const view = new DataView(padded.buffer);
      view.setBigUint64(padded.length - 8, bitLen, false);
      
      const n = padded.length / 64;
      let A = X[0], B = X[1], C = X[2], D = X[3];
      
      for (let i = 0; i < n; i++) {
        const M = new Uint32Array(16);
        for (let j = 0; j < 16; j++) {
          M[j] = view.getUint32(i * 64 + j * 4, true);
        }
        
        let AA = A, BB = B, CC = C, DD = D;
        
        for (let j = 0; j < 64; j++) {
          let f: number, g: number;
          if (j < 16) { f = F(B, C, D); g = j; }
          else if (j < 32) { f = G(B, C, D); g = (5 * j + 1) % 16; }
          else if (j < 48) { f = H(B, C, D); g = (3 * j + 5) % 16; }
          else { f = I(B, C, D); g = (7 * j) % 16; }
          
          f = (f + A + M[g] + S[j]) >>> 0;
          A = D;
          D = C;
          C = B;
          B = (B + ((f << S[j % 4 ? (j % 4 > 1 ? 30 : 26 : 25)) | (f >>> (32 - (S[j % 4 ? (j % 4 > 1 ? 30 : 26) : 25))))) >>> 0;
        }
        
        A = (A + AA) >>> 0;
        B = (B + BB) >>> 0;
        C = (C + CC) >>> 0;
        D = (D + DD) >>> 0;
      }
      
      const toHex = (n: number) => n.toString(16).padStart(8, '0');
      return toHex(A) + toHex(B) + toHex(C) + toHex(D);
    }
    
    // For sha1 and sha256, we'll show a placeholder
    return 'Use browser crypto API';
  };

  const getHashAsync = async () => {
    const data = new TextEncoder().encode(input);
    let hashBuffer: ArrayBuffer;
    
    if (algo === 'sha256') {
      hashBuffer = await crypto.subtle.digest('SHA-256', data);
    } else if (algo === 'sha1') {
      hashBuffer = await crypto.subtle.digest('SHA-1', data);
    } else {
      // MD5 not supported in Web Crypto, use simple fallback
      const result = computeHash(input, 'md5');
      return result;
    }
    
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const [hash, setHash] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!input) { setHash(''); return; }
    setLoading(true);
    getHashAsync().then(h => { setHash(h); setLoading(false); }).catch(() => { setHash('Error'); setLoading(false); });
  }, [input, algo]);

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1">
        {(['md5', 'sha1', 'sha256'] as const).map(a => (
          <button key={a} onClick={() => setAlgo(a)}
            className={`text-[10px] px-2 py-1 rounded font-mono font-medium ${algo === a ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
            {a.toUpperCase()}
          </button>
        ))}
      </div>
      <input type="text" value={input} onChange={e => setInput(e.target.value)}
        placeholder="String to hash..."
        className="w-full text-xs font-mono border border-gray-200 rounded px-3 py-2 outline-none focus:border-blue-400 bg-gray-50" />
      {loading ? (
        <div className="bg-gray-900 rounded p-2 font-mono text-[10px] text-gray-500">Computing...</div>
      ) : hash && (
        <div className="bg-gray-900 rounded p-2 font-mono text-[10px] text-green-400 break-all">{hash}</div>
      )}
    </div>
  );
}

// ─── Cron Visualizer ──────────────────────────────────────────────────────────

function CronVisualizer() {
  const [expr, setExpr] = useState('0 8 * * 1-5');
  const [desc, setDesc] = useState('');

  const parseCron = (cron: string) => {
    const parts = cron.trim().split(/\s+/);
    if (parts.length < 5) return 'Invalid cron expression (need 5 fields)';
    
    const [min, hour, dom, mon, dow] = parts;
    
    const describe = (field: string, label: string, values: Record<string, string>) => {
      if (field === '*') return `every ${label}`;
      if (field === '0') return `${label} ${values['0'] || '00'}`;
      if (field.includes('/')) {
        const [base, step] = field.split('/');
        return base === '*' ? `every ${step} ${label}s` : `every ${step} ${label}s starting at ${label} ${base}`;
      }
      if (field.includes(',')) return `${label}s: ${field}`; 
      if (field.includes('-')) {
        const [start, end] = field.split('-');
        return `${label}s ${start} through ${end}`;
      }
      return `${label} ${field}`;
    };

    const dayDesc = describe(dow, 'day', { '1': 'Mon', '2': 'Tue', '3': 'Wed', '4': 'Thu', '5': 'Fri', '6': 'Sat', '0': 'Sun' });
    const timeDesc = `at ${hour.padStart(2, '0')}:${min.padStart(2, '0')}`;
    
    return `${timeDesc} on ${dayDesc}`;
  };

  useEffect(() => {
    setDesc(parseCron(expr));
  }, [expr]);

  const presets = [
    { label: 'Daily 8AM', expr: '0 8 * * *' },
    { label: 'Weekdays 8AM', expr: '0 8 * * 1-5' },
    { label: 'Nightly 4AM', expr: '0 4 * * *' },
    { label: 'Every 15min', expr: '*/15 * * * *' },
    { label: 'Every hour', expr: '0 * * * *' },
    { label: 'Sunday midnight', expr: '0 0 * * 0' },
  ];

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1">
        {presets.map(p => (
          <button key={p.label} onClick={() => setExpr(p.expr)}
            className="text-[9px] px-2 py-0.5 rounded bg-gray-100 text-gray-500 hover:bg-blue-100 hover:text-blue-600">
            {p.label}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <input type="text" value={expr} onChange={e => setExpr(e.target.value)}
          placeholder="* * * * *"
          className="flex-1 text-xs font-mono border border-gray-200 rounded px-3 py-2 outline-none focus:border-blue-400 bg-gray-50" />
        <div className="flex gap-0.5">
          {expr.split(/\s+/).map((part, i) => (
            <span key={i} className="text-[9px] font-mono bg-gray-100 px-1.5 py-0.5 rounded text-gray-600"
              title={['minute', 'hour', 'day', 'month', 'weekday'][i]}>
              {part}
            </span>
          ))}
        </div>
      </div>
      {desc && (
        <div className="bg-blue-50 border border-blue-200 rounded px-3 py-2">
          <p className="text-[10px] text-blue-700 font-medium">{desc}</p>
        </div>
      )}
    </div>
  );
}

// ─── Git Cheatsheet ───────────────────────────────────────────────────────────

const gitCommands = [
  { cmd: 'git status', desc: 'Check working tree status' },
  { cmd: 'git log --oneline -10', desc: 'Last 10 commits' },
  { cmd: 'git diff', desc: ' unstaged changes' },
  { cmd: 'git diff --staged', desc: ' staged changes' },
  { cmd: 'git add .', desc: 'Stage all changes' },
  { cmd: 'git commit -m "msg"', desc: 'Commit with message' },
  { cmd: 'git push', desc: 'Push to remote' },
  { cmd: 'git pull', desc: 'Pull from remote' },
  { cmd: 'git branch -a', desc: 'List all branches' },
  { cmd: 'git checkout -b name', desc: 'Create & switch branch' },
  { cmd: 'git merge source', desc: 'Merge source into current' },
  { cmd: 'git rebase main', desc: 'Rebase onto main' },
  { cmd: 'git stash', desc: 'Stash working changes' },
  { cmd: 'git stash pop', desc: 'Apply stashed changes' },
  { cmd: 'git reset --hard HEAD', desc: 'Hard reset to HEAD' },
  { cmd: 'git restore .', desc: 'Restore working tree' },
];

function GitCheatsheet() {
  const [filter, setFilter] = useState('');
  const filtered = gitCommands.filter(c => 
    c.cmd.includes(filter) || c.desc.includes(filter)
  );

  return (
    <div className="space-y-2">
      <input type="text" value={filter} onChange={e => setFilter(e.target.value)}
        placeholder="Filter commands..."
        className="w-full text-xs font-mono border border-gray-200 rounded px-3 py-1.5 outline-none focus:border-blue-400 bg-gray-50" />
      <div className="grid grid-cols-2 gap-1 max-h-48 overflow-y-auto">
        {filtered.map(c => (
          <div key={c.cmd} className="flex items-start gap-2 bg-gray-50 rounded px-2 py-1">
            <code className="text-[10px] font-mono text-blue-600 whitespace-nowrap">{c.cmd}</code>
            <span className="text-[9px] text-gray-400 truncate">{c.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Docker Quick Ref ─────────────────────────────────────────────────────────

const dockerCommands = [
  { cmd: 'docker ps', desc: 'Running containers' },
  { cmd: 'docker ps -a', desc: 'All containers' },
  { cmd: 'docker images', desc: 'Image list' },
  { cmd: 'docker pull name:tag', desc: 'Pull image' },
  { cmd: 'docker run -d name', desc: 'Run detached container' },
  { cmd: 'docker stop name/id', desc: 'Stop container' },
  { cmd: 'docker start name/id', desc: 'Start container' },
  { cmd: 'docker restart name/id', desc: 'Restart container' },
  { cmd: 'docker rm name/id', desc: 'Remove container' },
  { cmd: 'docker rmi name:tag', desc: 'Remove image' },
  { cmd: 'docker logs -f name', desc: 'Follow logs' },
  { cmd: 'docker exec -it name sh', desc: 'Shell into container' },
  { cmd: 'docker network ls', desc: 'List networks' },
  { cmd: 'docker volume ls', desc: 'List volumes' },
  { cmd: 'docker-compose up -d', desc: 'Start compose stack' },
  { cmd: 'docker-compose down', desc: 'Stop compose stack' },
];

function DockerRef() {
  const [filter, setFilter] = useState('');
  const filtered = dockerCommands.filter(c =>
    c.cmd.includes(filter) || c.desc.includes(filter)
  );

  return (
    <div className="space-y-2">
      <input type="text" value={filter} onChange={e => setFilter(e.target.value)}
        placeholder="Filter commands..."
        className="w-full text-xs font-mono border border-gray-200 rounded px-3 py-1.5 outline-none focus:border-blue-400 bg-gray-50" />
      <div className="grid grid-cols-2 gap-1 max-h-48 overflow-y-auto">
        {filtered.map(c => (
          <div key={c.cmd} className="flex items-start gap-2 bg-gray-50 rounded px-2 py-1">
            <code className="text-[10px] font-mono text-blue-600 whitespace-nowrap">{c.cmd}</code>
            <span className="text-[9px] text-gray-400 truncate">{c.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Color Converter ───────────────────────────────────────────────────────────

function ColorConverter() {
  const [hex, setHex] = useState('#3b82f6');
  const [rgb, setRgb] = useState('59, 130, 246');
  const [hsl, setHsl] = useState('217, 91%, 60%');

  const hexToRgb = (h: string) => {
    const r = parseInt(h.slice(1, 3), 16);
    const g = parseInt(h.slice(3, 5), 16);
    const b = parseInt(h.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }
    return `${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%`;
  };

  useEffect(() => {
    try {
      const rgbVal = hexToRgb(hex);
      setRgb(rgbVal);
      const [r, g, b] = rgbVal.split(',').map(Number);
      setHsl(rgbToHsl(r, g, b));
    } catch {}
  }, [hex]);

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded border border-gray-200" style={{ backgroundColor: hex }} />
        <input type="text" value={hex} onChange={e => setHex(e.target.value)}
          className="flex-1 text-xs font-mono border border-gray-200 rounded px-3 py-1.5 outline-none focus:border-blue-400 bg-gray-50" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-gray-50 rounded px-2 py-1">
          <span className="text-[9px] text-gray-400">RGB</span>
          <p className="text-[10px] font-mono text-gray-700">{rgb}</p>
        </div>
        <div className="bg-gray-50 rounded px-2 py-1">
          <span className="text-[9px] text-gray-400">HSL</span>
          <p className="text-[10px] font-mono text-gray-700">{hsl}</p>
        </div>
      </div>
    </div>
  );
}

// ─── UUID Generator ───────────────────────────────────────────────────────────

function UuidGenerator() {
  const [uuid, setUuid] = useState('');

  const generate = () => {
    const hex = '0123456789abcdef';
    let u = '';
    for (let i = 0; i < 36; i++) {
      if (i === 8 || i === 13 || i === 18 || i === 23) u += '-';
      else u += hex[Math.floor(Math.random() * 16)];
    }
    setUuid(u);
  };

  return (
    <div className="space-y-2">
      <button onClick={generate}
        className="text-[10px] px-3 py-1.5 rounded bg-blue-500 text-white hover:bg-blue-600 font-medium">
        Generate UUID v4
      </button>
      {uuid && (
        <div className="bg-gray-900 rounded p-2 font-mono text-[10px] text-green-400">
          {uuid}
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const tools: Tool[] = [
  { id: 'base64', name: 'Base64', description: 'Encode/decode', category: 'encode', icon: <PixelWrench size={14} /> },
  { id: 'json', name: 'JSON', description: 'Format & validate', category: 'encode', icon: <PixelJson size={14} /> },
  { id: 'hash', name: 'Hash', description: 'MD5/SHA1/SHA256', category: 'hash', icon: <PixelHash size={14} /> },
  { id: 'timestamp', name: 'Timestamp', description: 'Convert time', category: 'time', icon: <PixelClockGray size={14} /> },
  { id: 'cron', name: 'Cron', description: 'Parse & visualize', category: 'dev', icon: <PixelClockGray size={14} /> },
  { id: 'color', name: 'Color', description: 'HEX→RGB→HSL', category: 'dev', icon: <PixelSparkle size={14} /> },
  { id: 'uuid', name: 'UUID', description: 'Generate v4', category: 'dev', icon: <PixelSparkle size={14} /> },
  { id: 'git', name: 'Git', description: 'Command cheatsheet', category: 'git', icon: <PixelGitBranch size={14} /> },
  { id: 'docker', name: 'Docker', description: 'Command reference', category: 'docker', icon: <PixelDockerSmall size={14} /> },
];

const categories = [
  { key: 'encode', label: 'Encoding', color: 'border-orange-200 bg-orange-50/50' },
  { key: 'hash', label: 'Hashing', color: 'border-pink-200 bg-pink-50/50' },
  { key: 'time', label: 'Time', color: 'border-blue-200 bg-blue-50/50' },
  { key: 'dev', label: 'Dev Utils', color: 'border-purple-200 bg-purple-50/50' },
  { key: 'git', label: 'Git', color: 'border-orange-200 bg-orange-50/50' },
  { key: 'docker', label: 'Docker', color: 'border-blue-200 bg-blue-50/50' },
] as const;

export default function DevToolsPage() {
  const [active, setActive] = useState('base64');

  const activeTool = tools.find(t => t.id === active);

  return (
    <div className="max-w-6xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900 tracking-tight">Dev Toolbox</h1>
          <p className="text-xs text-gray-500 mt-0.5">{tools.length} utilities · pixel-styled developer tools</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-[10px] font-mono text-gray-400 bg-gray-100 px-2 py-1 rounded">
            <PixelTerminal size={12} />
            <span>{Object.keys(localStorage).length} tools used</span>
          </div>
        </div>
      </div>

      {/* Tool Grid */}
      <div className="grid grid-cols-3 gap-3">
        {tools.map(tool => (
          <button
            key={tool.id}
            onClick={() => setActive(tool.id)}
            className={`bg-white border rounded-lg p-4 text-left transition-all hover:shadow-sm ${
              active === tool.id
                ? 'border-blue-400 ring-1 ring-blue-100 shadow-sm'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-8 h-8 rounded-md flex items-center justify-center ${
                active === tool.id ? 'bg-blue-100' : 'bg-gray-100'
              }`}>
                {tool.icon}
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-900">{tool.name}</p>
                <p className="text-[10px] text-gray-400">{tool.description}</p>
              </div>
            </div>
            <span className={`inline-block text-[9px] px-1.5 py-0.5 rounded ${
              active === tool.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
            }`}>
              {tool.category}
            </span>
          </button>
        ))}
      </div>

      {/* Active Tool Panel */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div
          className="px-5 py-3 border-b border-gray-100 flex items-center gap-3"
          style={{
            backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)',
            backgroundSize: '8px 100%',
          }}
        >
          <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
            {activeTool?.icon}
          </div>
          <div>
            <h2 className="text-xs font-semibold text-gray-900">{activeTool?.name}</h2>
            <p className="text-[10px] text-gray-400">{activeTool?.description}</p>
          </div>
          <div className="ml-auto">
            <span className="text-[9px] bg-gray-100 text-gray-500 px-2 py-1 rounded">{activeTool?.category}</span>
          </div>
        </div>
        <div className="p-5">
          {active === 'base64' && <Base64Tool />}
          {active === 'json' && <JsonTool />}
          {active === 'hash' && <HashTool />}
          {active === 'timestamp' && <TimestampTool />}
          {active === 'cron' && <CronVisualizer />}
          {active === 'git' && <GitCheatsheet />}
          {active === 'docker' && <DockerRef />}
          {active === 'color' && <ColorConverter />}
          {active === 'uuid' && <UuidGenerator />}
        </div>
      </div>

      {/* Keyboard hints */}
      <div className="flex items-center gap-4 text-[10px] text-gray-400">
        <span className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 bg-gray-100 rounded border border-gray-200 font-mono">1-9</kbd>
          <span>quick select tool</span>
        </span>
        <span className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 bg-gray-100 rounded border border-gray-200 font-mono">Enter</kbd>
          <span>generate result</span>
        </span>
      </div>
    </div>
  );
}