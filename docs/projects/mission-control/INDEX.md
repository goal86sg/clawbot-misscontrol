# mission-control — Project Registry

## Overview

Pixel art dashboard with 30 screens, Next.js + Tailwind. Desss Lee's personal command center.

## Details

- **Location:** `mission-control/`
- **Tech:** Next.js 16, TypeScript, Tailwind CSS, pixel art SVG icons
- **Screens:** 30 (as of May 22, 2026)
- **Version:** v2.7.0
- **Build:** Clean, all 30 routes static ✓

## Screens (30 total)

### Core
1. Dashboard — overview stats, active agents, mission log
2. Standup — daily briefing: tasks, events, activity, quote
3. Vitals — CPU/RAM/disk real-time monitoring
4. Weather — current conditions + 5-day forecast
5. Commute — MRT/LRT route planner with live crowd data

### Finance
6. Spending — expense tracker with category budgets
7. Income — passive income streams, monthly breakdown, category donut
8. Portfolio — investment holdings tracker

### Productivity
9. Tasks — Kanban board (backlog / in-progress / done)
10. Calendar — upcoming events and schedule
11. Focus — Pomodoro timer with session history
12. Habits — habit tracker with streaks, weekly heatmap, daily check-in
13. Goals — quarterly roadmap with milestones and deadlines
14. Command Bar — quick launcher / command palette

### Operations
15. Missions — cron jobs and scheduled tasks
16. Notifications — notification feed
17. Activity — system event stream
18. Pulse — live system pulse with event feed
19. Sound — ambient sound monitor
20. **Monitor** — DevOps overview: project health, CI/CD pipeline, contribution heatmap, PR board

### Knowledge
21. Projects — project tracker
22. Memory — knowledge base
23. Docs — documentation
24. Agents — agent registry with type/status
25. Team — team management

### Workspace
26. Terminal — terminal access
27. Office — office management
28. Settings — app settings

## Version History

| Version | Date | Change |
|---------|------|--------|
| v2.7.0 | May 22 | 30 screens, Monitor — DevOps dashboard |
| v2.6.0 | May 18 | 22 screens, spending tracker |
| v2.5.x | May 17 | Focus timer, income tracker |
| v2.4.x | May 16 | Commute, weather, standup |

## Recent Commits

| Commit | Description |
|---------|-------------|
| `9355c20` | 🌙 Nightly build: Monitor — DevOps overview dashboard (Screen 30) |
| `92f8546` | 🌙 Nightly build: Habits Tracker — Screen 29 |
| `76efc85` | 🌙 Nightly build: Passive Income Tracker — Screen 28 |
| `f5d4484` | 🌙 Nightly build: Focus Timer screen (Screen 27) |
| `ecfac4a` | 🌙 Nightly build: Spending Tracker (Screen 26) |

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
| May 16 | 25 | Commute Live — MRT crowd map |
| May 17 | — | (no build) |
| May 18 | 26 | Spending Tracker |
| May 19 | 27 | Focus Timer |
| May 20 | — | (no build) |
| May 21 | 29 | Habits Tracker — streaks, weekly heatmap, daily check-in |
| May 22 | 30 | Monitor — DevOps overview: projects, pipeline, heatmap, PRs |

## Ideas for Future Builds

- **Knowledge Graph** — visual connections between projects/people/topics
- **Link Vault** — curated bookmarks with tags and screenshots
- **Weekly Review** — accomplishments + lessons +下周 plan
- **Bookmarks / Reading List** — links dashboard with categories
- **Music / Now Playing** — current track + recently played
- Real data persistence for Focus Timer + Habits (currently all fake/demo data)
- Wire Spending to real bank data
- Connect Monitor to real GitHub API for live project/commit data