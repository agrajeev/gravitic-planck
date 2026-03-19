# CarMax Web App — Claude Code Playbook

A step-by-step guide to replicate this project from scratch using Claude Code.

---

## What You'll Build

A full CarMax-inspired used car marketplace with:

| Page | URL | What it does |
|------|-----|--------------|
| Home | `/` | Hero search, featured cars, stats, testimonials |
| Browse Cars | `/cars` | Filter/sort inventory by make, price, mileage, style |
| Car Detail | `/cars/:id` | Gallery, specs, features, inline payment calculator |
| Sell / Trade-In | `/sell` | 3-step instant offer wizard |
| Finance | `/finance` | Loan calculator + pre-approval form |
| About | `/about` | Company history, values, timeline |

**Tech stack:** React 18 · Vite 8 · TypeScript · Tailwind CSS v4 · React Router v6 · Lucide Icons

---

## Prerequisites

You need these installed on your machine:

```bash
node --version   # v18+ required
npm --version    # v9+ required
git --version    # any recent version
```

---

## How to Run This Project (Clone & Go)

```bash
# 1. Clone the repo
git clone <your-repo-url>
cd <repo-folder>

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open your browser at **http://localhost:5173**

That's it. No login required — it's a fully client-side app.

---

## How to Build for Production

```bash
npm run build       # outputs to ./dist/
npm run preview     # preview the production build locally
```

---

## Replicate It Yourself in Claude Code

Use this exact prompt sequence to rebuild the app from scratch in your own Claude Code session.

---

### Step 1 — Initial Prompt

Paste this into Claude Code to kick off the project:

```
Create a CarMax web application with the following pages and features,
using the same technologies as the real CarMax site. Deploy to git when done.

Pages:
1. Home — hero with car search form (make, body style, max price dropdowns),
   browse-by-style grid, featured cars, company stats, customer testimonials, CTA
2. Browse Cars — inventory grid with sidebar filters (make, body style, price range,
   mileage, year, certified only), sort options (price, year, mileage, newest),
   grid/list toggle, active filter tags
3. Car Detail — image gallery with thumbnails, tabbed detail view (overview, features,
   finance calculator), sticky pricing sidebar with buy/pre-approve CTAs
4. Sell / Trade-In — multi-step wizard: enter car info → instant offer → accept
5. Finance — interactive payment calculator (vehicle price, down payment, trade-in,
   loan term, credit score sliders) + pre-approval form
6. About — company mission, stats, core values, history timeline

Tech stack: React + Vite + TypeScript + Tailwind CSS + React Router + lucide-react
Data: 8 sample cars (Toyota, Honda, Ford, BMW, Tesla, Chevy, Jeep, Hyundai) with
      full specs, features, Unsplash images, pricing, location

Deploy to git branch when complete.
```

---

### Step 2 — If Claude Asks Follow-Up Questions

These are the decisions already made in this codebase:

| Decision | Choice |
|----------|--------|
| React setup | Vite (`npm create vite@latest . -- --template react-ts`) |
| Tailwind version | v4 via `@tailwindcss/vite` plugin (no `tailwind.config.js` needed) |
| Router | React Router v6 with `BrowserRouter` |
| Icons | `lucide-react` |
| Data layer | Static TypeScript file (`src/data/cars.ts`) — no backend |
| Auth / Login | None — fully public app |
| Finance logic | Client-side only (amortization formula) |

---

### Step 3 — Verify It Works

After Claude finishes, run:

```bash
npm install
npm run build    # should complete with 0 errors
npm run dev      # open http://localhost:5173
```

**Smoke test checklist:**

- [ ] Home page loads with hero, search form, car cards
- [ ] Search form → redirects to `/cars` with query params
- [ ] Browse page shows 8 cars, filters work, sort works
- [ ] Click a car card → detail page opens with gallery tabs
- [ ] Finance Calculator tab on detail page → slider updates monthly payment
- [ ] `/sell` → fill out form → see offer amount → accept
- [ ] `/finance` → sliders update payment → submit pre-approval form → confirmation
- [ ] `/about` → history timeline renders
- [ ] Mobile: hamburger menu opens and closes

---

## Project Structure

```
src/
├── components/
│   ├── Navbar.tsx        # Sticky nav, mobile menu, search bar
│   ├── Footer.tsx        # Multi-column footer with social links
│   └── CarCard.tsx       # Reusable car listing card (save/favorite)
├── data/
│   └── cars.ts           # 8 sample cars + type definitions
├── pages/
│   ├── Home.tsx
│   ├── BrowseCars.tsx
│   ├── CarDetail.tsx
│   ├── Sell.tsx
│   ├── Finance.tsx
│   └── About.tsx
├── App.tsx               # Router setup
├── main.tsx              # Entry point
└── index.css             # Tailwind v4 import + base styles
```

---

## Key Implementation Decisions

### Tailwind CSS v4 Setup
Tailwind v4 no longer requires `tailwind.config.js`. Use the Vite plugin:

```bash
npm install -D @tailwindcss/vite --force
```

```ts
// vite.config.ts
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({ plugins: [react(), tailwindcss()] })
```

```css
/* src/index.css */
@import "tailwindcss";
```

### Finance Calculator Formula
Standard amortization used in `CarDetail.tsx` and `Finance.tsx`:

```ts
const monthlyRate = apr / 100 / 12;
const monthly = Math.round(
  (principal * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) /
  (Math.pow(1 + monthlyRate, termMonths) - 1)
);
```

### URL-Driven Filters
`BrowseCars.tsx` reads initial filter state from `useSearchParams()`, so links like
`/cars?bodyStyle=SUV&maxPrice=30000` work as deep links from the Home page.

---

## Extending the App

Common next steps people ask Claude to add:

```
# Add a favorites/saved cars page
Add a /favorites page that shows cars the user has saved (heart icon).
Use localStorage to persist saved car IDs across page reloads.

# Add a location finder
Add a /locations page with a store finder. Show a list of 10 fake CarMax
locations with address, hours, and a "Get Directions" link.

# Add car comparison
Add a "Compare" button to CarCard. Allow up to 3 cars to be compared
side-by-side on a /compare page showing specs in a table.

# Add a test drive scheduler
On the Car Detail page, add a "Schedule Test Drive" button that opens
a modal with a date picker and time slot selector.

# Connect to a real backend
Replace src/data/cars.ts with API calls to a Node/Express or Supabase backend.
```

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `npm run build` fails with TS errors | Run `npx tsc --noEmit` to see all type errors first |
| Tailwind classes not applying | Make sure `@import "tailwindcss"` is in `index.css` and `tailwindcss()` is in `vite.config.ts` plugins |
| Images not loading | The app uses Unsplash URLs — requires internet access. Falls back to placeholder if image fails |
| Port 5173 already in use | Run `npm run dev -- --port 3000` to use a different port |
| `@tailwindcss/vite` install fails | Add `--force` flag: `npm install -D @tailwindcss/vite --force` |

---

## No Login Required

This is a **demo / frontend-only** application. There is no:
- User authentication
- Database
- Backend API
- Payment processing

All interactions (offers, pre-approvals, financing) are simulated client-side.
To add a real backend, ask Claude to scaffold a Node.js/Express API or connect to Supabase.

---

*Built with Claude Code · Branch: `claude/carmax-web-app-lwGme`*
