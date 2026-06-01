# mission-control — Project Registry

## Overview

Pixel art dashboard with 35 screens, Next.js + Tailwind. Desss Lee's personal command center.

## Details

- **Location:** `mission-control/`
- **Tech:** Next.js 16, TypeScript, Tailwind CSS, pixel art SVG icons
- **Screens:** 35 (as of May 31, 2026)
- **Version:** v2.11.0
- **Build:** Clean, all 35 routes static ✓

## Screens (35 total)

### Core
1. Dashboard — overview stats, active agents, mission log
2. Standup — daily briefing: tasks, events, activity, quote
3. Vitals — CPU/RAM/disk real-time monitoring
4. Weather — current conditions + 5-day forecast
5. Commute — MRT/LRT route planner with live crowd data

### Finance
6. Spending — expense tracker with category budgets
7. Income — passive income streams, monthly breakdown, category donut
8. **Git** — commit history, repo stats, contribution graph, PR list

### Productivity
9. Tasks — Kanban board (backlog / in-progress / done)
10. Calendar — upcoming events and schedule
11. Focus — Pomodoro timer with session history
12. Habits — habit tracker with streaks, weekly heatmap, daily check-in
13. Goals — quarterly roadmap with milestones and deadlines
14. Journal — daily reflection: mood, energy, wins, lessons, gratitude
15. Command Bar — quick launcher / command palette

### Knowledge
16. Sleep — sleep & energy tracker with weekly bar chart and quality trends
17. Reading — books, articles, papers, courses with streaks and tag filtering
18. Links — bookmark hub with categories, search, starred links, tag cloud
19. Snippets — code snippet library with search, filters, copy-to-clipboard
20. Memory — knowledge base
21. Docs — documentation
22. Projects — project tracker
23. Agents — agent registry with type/status

### Operations
24. Monitor — DevOps overview: project health, CI/CD pipeline, contribution heatmap, PR board
25. Docker — container management with status, stats, logs
26. Missions — cron jobs and scheduled tasks
27. Notifications — notification feed
28. Activity — system event stream
29. Pulse — live system pulse with event feed
30. Sound — ambient sound monitor

### Workspace
31. Terminal — terminal access
32. Team — team management
33. Office — office management
34. Portfolio — investment holdings tracker
35. Settings — app settings

## Version History

| Version | Date | Change |
|---------|------|--------|
| v2.11.0 | May 31 | 35 screens, Git Activity — commits, repos, contribution graph |
| v2.10.0 | May 30 | 34 screens, Reading Tracker — books/articles/papers/courses |
| v2.9.0 | May 29 | 33 screens, Sleep & Energy Tracker |
| v2.9.0 | May 28 | 32 screens, Snippets — code snippet library |
| v2.8.0 | May 24 | 32 screens, Links — pixel bookmark hub |
| v2.7.0 | May 22 | 30 screens, Monitor — DevOps dashboard |
| v2.6.0 | May 18 | 22 screens, spending tracker |
| v2.5.x | May 17 | Focus timer, income tracker |
| v2.4.x | May 16 | Commute, weather, standup |

## Recent Commits

| Commit | Description |
|---------|-------------|
| `040d046` | 🌙 Nightly build: Git Activity — Screen 35 |
| `9018c3f` | 🌙 Nightly build: Reading Tracker — Screen 34 |
| `3d576ab` | docs: add nightly report for sleep tracker build |
| `35188d4` | 🌙 Nightly build: Sleep & Energy Tracker — Screen 33 |
| `fe76d07` | 🌙 Nightly build: Snippets — code snippet library (Screen 32) |
| `5461aa7` | 🌙 Nightly build: Docker — container management screen (Screen 31) |
| `074143a` | 🌙 Nightly build: Links — pixel bookmark hub (Screen 32) |
| `cd959f8` | 🌙 Nightly build: Daily Journal — Screen 31 |

## Build Commands

```bash
cd mission-control
npm run dev    # development
npm run build  # production build
```

## Key Files

- `src/app/(dashboard)/` — all screen pages
- `src/components/Sidebar.tsx` — navigation (updated on each new screen)
- `src/lib/pixel-icons.tsx` — core pixel icons
- `src/lib/pixel-icons-extra.tsx` — extended icons (one per screen)
- `src/components/PixelProgress.tsx` — progress bar component
- `src/components/PixelAvatar.tsx` — avatar component

## Nightly Build History

| Night | Screen | Description |
|-------|--------|-------------|
| May 31 | 35 | Git Activity — commits, repositories, contribution graph, PR board |
| May 30 | 34 | Reading Tracker — books, articles, papers, courses with streaks and tags |
| May 29 | 33 | Sleep & Energy Tracker — weekly bar chart, quality trends, 7-day average |
| May 28 | 32 | Snippets — code snippet library with search, filters, copy-to-clipboard |
| May 28 | 31 | Docker — container management with status, stats, logs |
| May 26 | 31 | Daily Journal — mood, energy, wins, lessons, gratitude |
| May 24 | 32 | Links — pixel bookmark hub with categories, search, stars |
| May 22 | 31 | Daily Journal — mood, energy, wins, lessons, gratitude |
| May 22 | 30 | Monitor — DevOps overview: projects, pipeline, heatmap, PRs |
| May 21 | 29 | Habits Tracker — streaks, weekly heatmap, daily check-in |
| May 19 | 28 | Passive Income Tracker — income streams, monthly trend |
| May 18 | 27 | Focus Timer — Pomodoro with session history |
| May 18 | 26 | Spending Tracker — pixel expense dashboard |
| May 16 | 25 | Commute Live — MRT crowd map |

## Ideas for Future Builds

- **Health Dashboard** — system CPU/mem/disk trends over time
- **Daily Standup Enhancement** — interactive standup form with history
- **Project Time Tracker** — log hours per project, weekly summaries
- **Notes / Notepad** — quick capture with search and tag filtering
- **Music Stats** — Spotify/Apple Music listening history
- **Weight / Body Metrics** — weight and body measurement tracking
