# GrowthTracker — UI/UX Design System Specification

## 1. Design Language & Aesthetics
- **Style:** Neo-Brutalist Swiss Lab (combination of Neubrutalism and structured Swiss Grid).
- **Core Philosophy:** High-contrast ink lines and zero-blur hard shadows, engineered so screenshots embedded in technical Word/PDF reports retain 100% legibility.
- **Elevation:** Flat surfaces with directional offset hard shadows (`box-shadow: 4px 4px 0px #000000`). No blurred drop shadows, gradients, or glassmorphism.

---

## 2. Color Palette & Tokens
- **Background Canvas:** `#FAF8F5` (warm off-white paper canvas)
- **Card Surface:** `#FFFFFF` (crisp white)
- **Primary / Accent:** `#F5B82E` (vibrant amber — primary CTA buttons, active sidebar pills, checked habit boxes)
- **Brand / Data Blue:** `#2563EB` (primary chart bars, progress bars, brand identity badge)
- **Comparison Orange:** `#F97316` (used for longest streak comparison bars)
- **Technical Badge Surface:** `#CFE8FC` (light sky blue for API labels, status tags, and IDs)
- **3NF DB Widget Surface:** `#FEF6D8` (cream yellow for database monitor)
- **Ink / Borders / Text Primary:** `#000000` (solid black, ~19:1 contrast ratio, WCAG AAA compliant)
- **Muted Text:** `#4B5563` (slate gray for subtitles and chart axes)
- **Destructive / Error:** `#EF4444` (logout pill, delete actions, validation banners)

---

## 3. Typography
- **Primary Font Family:** Inter, system-ui, sans-serif
  - Display / KPI Numbers: `24px`–`28px`, ExtraBold (800)
  - Card Headings (H2/H3): `16px`–`18px`, Bold (700)
  - Body Text: `14px`, Medium (500), line-height 1.5
- **Monospace Family:** JetBrains Mono, monospace
  - Technical Badges, DB IDs, Dates, and Counters: `11px`–`12px`, Bold (600), tabular figures enabled

---

## 4. Layout & Grid Rules
- **Base Grid Scale:** 8px system (spacing tokens: 4px, 8px, 16px, 24px, 32px).
- **Shell Structure:** Left fixed action sidebar (`260px` width) with 2px right border + Main content area (`max-w-6xl` centered).
- **Border Treatment:** `2px solid #000000` on all cards, buttons, inputs, tables, and tags.
- **Corner Radii:**
  - Cards & Containers: `12px` (rounded-xl)
  - Action Buttons & Text Inputs: `8px` (rounded-lg)
  - Micro-tags / Technical Badges: `4px` (rounded)
  - Status Indicators & Secondary Action Pills: Full pill (`9999px`)

---

## 5. Screen Inventory & Modules
1. **Analytics Dashboard:** 4 KPI overview cards, Current vs Longest streak grouped bar chart, Goal status donut chart, and Study minutes horizontal bar chart.
2. **Habit & Streak Tracker:** Daily habit creation form, 7-day checklist matrix with amber toggles, streak counters, and TC06 access simulation.
3. **Reading Goals & Book Tracker:** Book inventory with page progress bars, 1–5 star ratings, `+15 Pages` quick-actions, and TC08 validation checking.
4. **Study & Skill Session Logger:** Session submission form (subject + minutes), formatted session table with minute-to-hour conversions, and TC11 input guard.
5. **Goal & Task Planner:** Filterable 3-column Kanban board (To Do, In Progress, Completed) with goal category chips (`DAILY`, `WEEKLY`, `MONTHLY`) and status cycling.
6. **3NF Database Monitor:** Persistent sidebar widget displaying live record counts for normalized entities `D1` through `D5`.