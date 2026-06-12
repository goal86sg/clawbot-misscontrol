# Nightly Build Report — 2026-06-12

## 🌙 What Was Built

**Screen:** Year in Pixels — `src/app/(dashboard)/year-in-pixels/page.tsx`

A 365-day life dashboard inspired by GitHub's contribution graph, but for personal life data. Each pixel = one day, colored by how well the day went.

### Features

- **Year-at-a-Glance Grid** — Full 12-month calendar pixel grid where each pixel is colored by day score (1–5 scale: Tough → Rough → Okay → Good → Great)
- **Click-to-Inspect** — Click any pixel to see day detail: mood, energy bar, productivity bar, highlight text, tags
- **Annual Stats Strip** — 7 KPIs at top: Days Logged, Avg Score, Avg Energy, Avg Productivity, Great Days, Tough Days, Current Streak
- **Quarter Views** — Toggle between year view and 4 quarter grids for a zoomed-in look
- **Monthly Breakdown** — 12 mini stat cards (one per month) showing avg score, logged days, great days count
- **Tag Frequency** — Most common tags across the year
- **Seed data** — 365 days of realistic generated data (moods, energy 40–95%, productivity, highlights, tags)
- **Singapore time clock** in header

### Design Details

- Pixel-art inline SVG icons: `PixelCalendar`, `PixelGrid`, `PixelFire`, `PixelStar`, `PixelMoonSmall`
- Color palette: `#fecaca` (tough) → `#fed7aa` (rough) → `#fef08a` (okay) → `#bbf7d0` (good) → `#86efac` (great)
- Pixel-art footer with 5-color gradient dots
- Matches existing patterns: `PixelProgress`-style components, card layouts, tab switchers
- Version bump: sidebar footer updated from v2.15.0 (41 screens) → v2.16.0 (42 screens)

### New Icon Added

`PixelYearInPixels` in `src/lib/pixel-icons-extra.tsx` — calendar grid with 6 colored squares representing months

---

## Files Changed

| File | Change |
|------|--------|
| `src/app/(dashboard)/year-in-pixels/page.tsx` | **NEW** — 32KB screen |
| `src/lib/pixel-icons-extra.tsx` | Added `PixelYearInPixels` |
| `src/components/Sidebar.tsx` | Added nav item + version bump |

---

## Next Steps (Ideas for Future Nights)

- Connect to real data: replace seed data with actual entries from sleep/habits/activity pages
- Add filtering by tag (e.g. "show only workout days")
- Export to PNG pixel art image
- Year-over-year comparison (2025 vs 2026 overlay)
- Add a "heatmap density" view showing energy × productivity scatter as pixel blocks
- Mobile: scrollable horizontal layout for the year grid

---

**Commit:** `f2994bd` — "🌙 Nightly build: Year in Pixels..."