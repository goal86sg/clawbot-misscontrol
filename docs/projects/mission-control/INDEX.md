# mission-control — Project Registry

## Overview

Pixel art dashboard with 18+ screens, Next.js + Tailwind. Desss Lee's personal command center.

## Details

- **Location:** `mission-control/`
- **Tech:** Next.js 16, TypeScript, Tailwind CSS, pixel art SVG icons
- **Screens:** 27 (as of May 19, 2026)
- **Version:** v2.6.0 → v2.7.0 (after tonight's build)
- **Build:** Clean, all routes static

## Screens (27 total)

1. Dashboard (home) — overview stats, active agents, mission log
2. Vitals — CPU/RAM/disk real-time monitoring
3. Weather — current + forecast
4. Commute — MRT/LRT route planner
5. Activity — recent system events
6. Spending — expense tracker with category budgets
7. Goals — quarterly roadmap, milestones, habits, deadlines
8. Tasks — Kanban board (backlog/in-progress/done)
9. Calendar — upcoming events
10. Agents — agent registry with status
11. Missions — mission list
12. Notifications — notification feed
13. Projects — project tracker
14. Portfolio — financial holdings
15. Memory — knowledge base
16. Docs — documentation
17. Command Bar — command palette
18. Pulse — system pulse
19. Sound — audio controls
20. Team — team management
21. Office — office management
22. Terminal — terminal access
23. Settings — app settings
24. Standup — daily standup view
25. Team — (duplicate? check)
26. Spending Tracker — expense dashboard (nightly build May 18)
27. Focus Timer — Pomodoro timer (nightly build May 19)

## Recent Commits

| Commit | Description |
|--------|-------------|
| `f5d4484` | 🌙 Nightly build: Focus Timer screen (Screen 27) |
| `ecfac4a` | 🌙 Nightly build: Spending Tracker (Screen 26) |
| `16e5d8e` | 🔧 Bump version to v2.6.0 — 22 screens |
| `beb69f9` | 🌙 Nightly build: Commute Live (Screen 25) |

## Build Commands

```bash
cd mission-control
npm run dev    # development
npm run build  # production build
```

## Key Files

- `src/app/(dashboard)/` — all screen pages
- `src/components/Sidebar.tsx` — navigation
- `src/lib/pixel-icons.tsx` — core pixel icons
- `src/lib/pixel-icons-extra.tsx` — extended icons
- `src/components/PixelProgress.tsx` — progress bar
- `src/components/PixelAvatar.tsx` — avatar component

## Nightly Build History

| Night | Screen | Description |
|-------|--------|-------------|
| May 16 | 25 | Commute Live — MRT crowd map |
| May 17 | — | (no build) |
| May 18 | 26 | Spending Tracker |
| May 19 | 27 | Focus Timer / Pomodoro |

## Ideas for Future Builds

- Screen 28: **Health & Fitness** — steps, sleep, water, calories
- Screen 29: **Habit Tracker Grid** — daily/weekly habits matrix with streaks
- Screen 30: **Bookmarks** — links dashboard with categories
- Screen 31: **Music / Now Playing** — current track + recently played
- Real data persistence for Focus Timer sessions
- Wire Spending to real bank data