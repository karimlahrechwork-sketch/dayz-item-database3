# DayZ Item Database 🎮

A military-themed interactive item database for **DayZ Console Official Servers** (v1.29).

Search, filter, and browse weapons, gear, medical supplies, food, and tools with detailed stats and spawn location data for Chernarus, Livonia, and Sakhal.

---

## Features

- **58 items** across 5 categories (weapons, gear, medical, food & water, tools)
- **Search** by name, type, ammo, spawn location, or rarity
- **Filter** by category and map (Chernarus / Livonia / Sakhal)
- **Sort** by name, damage, weight, or inventory slots
- **Detailed item panel** with full stats, spawn locations, map availability, and attachments
- **Visual stat bars** for damage, protection, calories, and more
- **Tier badges** (T1–T4) matching DayZ's official loot tier system
- Military/tactical dark UI with scanline overlay and monospace fonts
- Built with **Next.js 14**, TypeScript, and zero external UI dependencies

---

## Getting Started (Local Dev)

```bash
# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev

# 3. Open in browser
http://localhost:3000
```

---

## Deploy to Vercel via GitHub

### Step 1 — Create a GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Name your repo (e.g. `dayz-item-database`)
3. Set to **Public** or **Private** — your choice
4. Click **Create repository**

### Step 2 — Push this project to GitHub

In your terminal, from inside this project folder:

```bash
git init
git add .
git commit -m "Initial commit — DayZ Item Database"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/dayz-item-database.git
git push -u origin main
```

> Replace `YOUR_USERNAME` with your GitHub username.

### Step 3 — Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **Add New → Project**
3. Find and select your `dayz-item-database` repo
4. Vercel will auto-detect it as a Next.js project
5. Leave all settings as default
6. Click **Deploy**

That's it! Vercel will give you a live URL like:
`https://dayz-item-database.vercel.app`

### Auto-deploy on push

Every time you `git push` to your `main` branch, Vercel automatically rebuilds and redeploys. No manual steps needed.

---

## Project Structure

```
dayz-db/
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout + metadata
│   │   ├── page.tsx         # Main database page
│   │   └── globals.css      # Global styles + CSS variables
│   ├── components/
│   │   ├── ItemCard.tsx     # Grid item card
│   │   └── ItemDetail.tsx   # Expanded item detail panel
│   └── data/
│       └── items.ts         # All item data + TypeScript types
├── package.json
├── next.config.js
├── tsconfig.json
└── README.md
```

---

## Adding More Items

All item data lives in `src/data/items.ts`. To add a new item, copy the pattern:

```ts
{
  id: 59,                          // Unique ID
  name: "AK-74",
  type: "Assault Rifle",
  cat: "weapons",                  // weapons | gear | medical | food | tools
  icon: "⚔️",
  damage: 82,
  weight: 3.4,
  slots: 6,
  ammo: "5.45x39mm",
  tier: 3,                         // 1 | 2 | 3 | 4
  rarity: "Military",
  maps: ["Chernarus", "Livonia"],   // Chernarus | Livonia | Sakhal
  spawns: ["Military", "NWAF"],
  desc: "Soviet assault rifle chambered in 5.45x39mm.",
  attachments: ["AK74 Suppressor", "AK74 30Rnd Mag"],
},
```

---

## Tech Stack

- [Next.js 14](https://nextjs.org/) — React framework with App Router
- [TypeScript](https://www.typescriptlang.org/) — Type safety
- CSS Variables — Theming with zero external CSS framework
- Google Fonts — Share Tech Mono + Rajdhani

---

## Disclaimer

This project is not affiliated with or endorsed by Bohemia Interactive. DayZ is a trademark of Bohemia Interactive a.s. All item data is based on publicly available game information.
