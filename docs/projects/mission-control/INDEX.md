# mission-control — Project Registry

## Overview

Pixel art dashboard with 55 screens, Next.js + Tailwind. Desss Lee's personal command center.

## Details

- **Location:** `mission-control/`
- **Tech:** Next.js 16, TypeScript, Tailwind CSS, pixel art SVG icons
- **Screens:** 59 (as of June 22, 2026)
- **Version:** v2.23.0
- **Build:** Clean, all 37 routes static ✓

## Screens (38 total)

### Core
1. **Briefing** — daily morning overview: greeting, commute, tasks, events, goals, habits
2. Dashboard — overview stats, active agents, mission log
3. Standup — daily briefing: tasks, events, activity, quote
3. Vitals — CPU/RAM/disk real-time monitoring
4. Weather — current conditions + 5-day forecast
5. Commute — MRT/LRT route planner with live crowd data
6. **Day Review** — end-of-day summary: energy, mood, tasks, wins, lessons, gratitude, health metrics, tomorrow's goals

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
17. **Time Warp** — 24-hour pixel timeline: minute-by-minute activity blocks, current time indicator, day rating stars, activity breakdown bars, vertical timeline
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
35. **Workout** — workout tracker: run/gym/hiit sessions, 500km yearly goal, personal records, energy tracking
38. Settings — app settings

## Version History

| Version | Date | Change |
|---------|------|--------|
| v2.23.0 | Jun 22 | 59 screens, Win Wall rebuild — confetti, trophy/medal pixel art, win feed with category filters, streak tracking, weekly stats hero |
| v2.21.0 | Jun 13 | 48 screens, Week Ahead planner — 7-day grid, goals, focus blocks, energy tracking |
| v2.20.0 | Jun 13 | 47 screens, Habit Garden — pixel plant growth tracker with 6 growth stages, watering interaction, animated bloom |
| v2.19.0 | Jun 13 | 44 screens, Skills & Progression System — XP/levels, streaks, category filters, skill cards, quests, leaderboard |
| v2.18.0 | Jun 12 | 43 screens, API Monitor — endpoint health, latency sparklines, P99/error rates, uptime gauges |
| v2.17.0 | Jun 12 | 42 screens, Year in Pixels — 365-day pixel grid with color-coded daily mood/workout/happiness/energy |
| v2.16.0 | Jun 12 | 41 screens, Financial Dashboard — income vs spending, budget categories, savings rate |
| v2.15.0 | Jun 5 | 38 screens, Day in Review — end-of-day summary with energy, mood, tasks, wins, lessons, gratitude |

## Recent Commits

| Commit | Description |
|---------|-------------|
| `76c84fe` | 🌙 Nightly build: Pixel Win Wall — Screen 59 |
| `53f8488` | 🌙 Nightly build: Pixel Campfire — Screen 58 |
| `d62d17c` | 🌙 Nightly build: Time Warp — Screen 52 |
| `c6aed78` | 🌙 Nightly build: Mind Garden — Screen 51 |
| `54fcbc8` | docs: add Rituals nightly report (Screen 50) |
| `098ba8b` | 🌙 Nightly build: Win Wall — Screen 49 |
| `db5505c` | 🌙 Nightly build: Week Ahead planner — Screen 48 |
| `3ec53fe` | docs: add Habit Garden nightly report |
| `9cca509` | 🌙 Nightly build: Habit Garden — Screen 45 |
| `aefb4f4` | 🌙 Nightly build: Skills & Progression System — Screen 44 |
| `b216f49` | 🌙 Nightly build: API Monitor — Screen 43 |

## Build Commands

```bash
cd mission-control
npm run dev    # development
npm run build  # production build
```

## Key Files

- `src/app/(dashboard)/` — all screen pages
- `src/components/Sidebar.tsx` — navigation (updated on each new screen)
- `src/lib/pixel-icons.tsx` — core pixel icons (including PixelSunset)
- `src/lib/pixel-icons-extra.tsx` — extended icons (one per screen)
- `src/components/PixelProgress.tsx` — progress bar component
- `src/components/PixelAvatar.tsx` — avatar component

## Nightly Build History

| Night | Screen | Description |
|-------|--------|-------------|
| **Jun 22** | **59** | **Win Wall — rebuilt with confetti, trophy/medal pixel art, win feed with category filters, streak tracking, weekly stats hero, auto-confetti on load** |
| **Jun 14** | **49** | **Win Wall — pixel art achievement tracker with featured wins, milestone progress bars, category filters, points system, interactive reaction buttons** |
| **Jun 13** | **48** | **Week Ahead planner — 7-day grid, goals strip, focus blocks timeline, energy indicators** |
| **Jun 13** | **45** | **Habit Garden — pixel plant growth tracker with 6 growth stages, watering interaction, animated bloom effects** |
| **Jun 13** | **44** | **Skills & Progression System — XP/levels, streaks, category filters, skill cards, quests, top skills leaderboard** |
| **Jun 12** | **43** | **API Monitor — endpoint health, latency sparklines, P99/error rates, uptime gauges, incidents panel** |
| **Jun 12** | **42** | **Year in Pixels — 365-day pixel grid with color-coded daily mood/workout/happiness/energy** |
| **Jun 12** | **41** | **Financial Dashboard — income vs spending, budget categories, savings rate gauge** |
| Jun 5 | 38 | Day in Review — end-of-day summary: energy, mood, tasks, wins, lessons, gratitude |
| Jun 4 | 37 | Workout Tracker — run/gym/hiit sessions, 500km goal, personal records |
| Jun 1 | 36 | Daily Briefing — morning overview: greeting, commute, tasks, events, goals, habits |

## Ideas for Future Builds

- **Health Dashboard** — system CPU/mem/disk trends over time
- **Daily Standup Enhancement** — interactive standup form with history
- **Project Time Tracker** — log hours per project, weekly summaries
- **Notes / Notepad** — quick capture with search and tag filtering
- **Music Stats** — Spotify/Apple Music listening history
- **Weight / Body Metrics** — weight and body measurement tracking
