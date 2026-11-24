# SUPER SAPIEN India

> **Every talent deserves to be discovered.**

SUPER SAPIEN is a responsive talent-discovery and community prototype focused on emerging Indian athletes and creators. It provides a polished interface for discovering profiles, following talent, reading Indian sports stories, and exploring a simulated virtual-rupee marketplace.

The project is currently a **client-only frontend demonstration**. It does not contain a backend, authentication service, database, payment integration, or live API. Profiles, articles, contracts, notifications, transactions, and account interactions use local/mock data and browser storage.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Application Routes](#application-routes)
- [Project Structure](#project-structure)
- [Architecture and Data Flow](#architecture-and-data-flow)
- [Core Data Models](#core-data-models)
- [State Persistence](#state-persistence)
- [UI and Styling](#ui-and-styling)
- [Development Guide](#development-guide)
- [Build and Deployment](#build-and-deployment)
- [Prototype Boundaries](#prototype-boundaries)
- [License](#license)

## Features

### Public experience

- Responsive landing page with animated profile highlights, counters, news, testimonials, and marketplace previews.
- About, terms, and privacy prototype pages.
- Demo login, signup, password-reset, and onboarding flows.
- Onboarding for disciplines, interests, followed talent, display name, and density preference.
- Clear labeling of fictional profiles, news, contracts, and transactions.

### Talent discovery

- Search profiles by name, sport, talent category, state, or position.
- Filter by talent category, discipline, Indian state or Union Territory, age band, and career stage.
- Filter trending profiles only.
- Sort by performance score, growth, or name.
- Switch between card and list views.
- Incrementally load additional fictional talent profiles.
- Follow or unfollow talent directly from discovery cards.

### Athlete profiles

- Detailed athlete overview with biography, achievement, state, age, and career stage.
- Performance-score and animated performance trend chart.
- 7-, 30-, and 90-day chart range controls.
- Statistics table for simulated 2024–2026 seasons.
- Career timeline.
- Related news and sample contracts.
- Watchlist, follow, and native share-link actions.
- Recently viewed profile tracking.

### Simulated marketplace

- Fictional contract listings in Indian rupees.
- Contract filtering by type: performance-linked, development, or endorsement.
- Portfolio summary with virtual cash, portfolio value, and open positions.
- Buy and sell validation for available cash and held units.
- Order review and confirmation modal.
- Persistent simulated transaction history.
- Contract overview, structure, risk, terms, and activity tabs.

### News

- Fictional Indian sports news feed.
- Category filtering and featured-story presentation.
- Full article view with related athlete and related stories.
- Article bookmarking.
- Contributor article form that publishes articles locally in the browser.
- Generated reading time and publication date for locally created articles.

### User dashboard and settings

- Time-aware personalized greeting and current date.
- Follow, watchlist, trending, and update counters.
- Watchlist, trending talent, personalized news, and recently viewed sections.
- Collections for watchlist, followed talent, and saved articles.
- Editable display name, bio, photo preview, and favourite disciplines.
- Notification read/unread state and mark-all-read action.
- Notification, appearance, privacy, and password-preference controls.
- Responsive desktop sidebar and mobile bottom navigation.

## Technology Stack

| Area        | Technology                              |
| ----------- | --------------------------------------- |
| UI library  | React 18                                |
| Language    | TypeScript 5                            |
| Build tool  | Vite 5                                  |
| Routing     | React Router DOM 6                      |
| Styling     | Tailwind CSS 3 with custom theme values |
| Charts      | Recharts 2                              |
| Animation   | Framer Motion 11                        |
| Icons       | Lucide React                            |
| State       | React Context plus component state      |
| Persistence | Browser `localStorage`                  |

## Getting Started

### Prerequisites

- Node.js 18 or newer is recommended.
- npm (included with Node.js) or a compatible package manager.

### Installation

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Vite will print the local development URL, usually `http://localhost:5173`.

## Available Scripts

| Command           | Purpose                                                                                             |
| ----------------- | --------------------------------------------------------------------------------------------------- |
| `npm run dev`     | Start the Vite development server with hot module replacement.                                      |
| `npm run build`   | Run strict-free TypeScript checking with `tsc --noEmit`, then create a production build in `dist/`. |
| `npm run preview` | Serve the generated production build locally for verification.                                      |

## Application Routes

### Public routes

| Route              | Page                       |
| ------------------ | -------------------------- |
| `/`                | Landing page               |
| `/about`           | About page                 |
| `/terms`           | Terms placeholder          |
| `/privacy`         | Privacy placeholder        |
| `/login`           | Demo sign-in               |
| `/signup`          | Demo account creation      |
| `/forgot-password` | Demo password-reset flow   |
| `/onboarding`      | Multi-step personalization |

### Authenticated application shell

All routes below `/app` use the responsive application shell.

| Route                | Page                                          |
| -------------------- | --------------------------------------------- |
| `/app`               | Personalized dashboard                        |
| `/app/discover`      | Talent search and filtering                   |
| `/app/athletes/:id`  | Athlete detail profile                        |
| `/app/market`        | Simulated marketplace and transaction history |
| `/app/market/:id`    | Contract detail and simulated order form      |
| `/app/news`          | Indian sports news and article creation       |
| `/app/news/:id`      | Full article                                  |
| `/app/watchlist`     | Watchlist collection                          |
| `/app/following`     | Following collection                          |
| `/app/saved`         | Saved articles collection                     |
| `/app/profile`       | Profile editing                               |
| `/app/notifications` | Notification center                           |
| `/app/settings`      | Preferences and demo account controls         |

Unknown routes show an in-app 404 page with a link to the landing page.

## Project Structure

```text
Athletix/
├── index.html                 # HTML entry document
├── package.json               # Dependencies and npm scripts
├── postcss.config.js          # PostCSS configuration
├── tailwind.config.js         # Tailwind theme and content paths
├── tsconfig.json              # TypeScript compiler configuration
├── vite.config.ts             # Vite React plugin configuration
└── src/
    ├── App.tsx                # Application route map
    ├── main.tsx               # React root and provider composition
    ├── index.css              # Tailwind directives and global form styles
    ├── store.tsx              # Global context store and persistence
    ├── components/
    │   ├── Shell.tsx          # Desktop/mobile navigation and page shell
    │   └── ui.tsx             # Shared cards, buttons, charts, modals, etc.
    ├── data/
    │   └── mock.ts            # Mock athletes, news, contracts and constants
    └── pages/
        ├── Public.tsx         # Landing, about, terms and privacy pages
        ├── Auth.tsx           # Login, signup, reset and onboarding
        ├── Discover.tsx       # Search, filters and talent cards
        ├── Athlete.tsx        # Athlete profile tabs and watch/follow actions
        ├── Market.tsx         # Marketplace and virtual trading
        ├── News.tsx           # News feed and article creation
        └── Me.tsx             # Dashboard, collections, profile and settings
```

## Architecture and Data Flow

### Entry point

`src/main.tsx` mounts the React application inside `BrowserRouter` and wraps it with `StoreProvider`. `src/App.tsx` owns the route hierarchy, including nested `/app` routes.

### Shared state

`src/store.tsx` defines a React Context store containing:

- Following and watchlist IDs.
- Saved article IDs.
- Recently viewed profiles.
- Virtual cash, positions, and simulated transactions.
- Sidebar and profile preferences.
- Notifications read state.
- Toast notifications.

Mutating functions are exposed through `useStore()`:

- `set(partialState)` merges partial top-level state.
- `toggle(key, id)` adds or removes an ID from a collection.
- `toast(message, error?)` creates an auto-expiring status message.

### Mock data

`src/data/mock.ts` is the current data service. It exports generated fictional athletes, 8 news articles, 8 marketplace contracts, notification records, taxonomy lists, format helpers, chart data, and the stable data types used throughout the application.

The 24 generated athletes cover 19 disciplines, 8 talent categories, and the Indian states and Union Territories represented in the mock dataset. The data is deterministic: profile IDs and their display values are generated by array positions and simple seed formulas.

### Routing

React Router performs client-side navigation. The shell uses nested routes, `NavLink` for active navigation states, `useNavigate` for search submission and logout, `useParams` for detail pages, and `useSearchParams` for discovery queries.

The app requires standard SPA fallback handling in production so direct URLs such as `/app/discover` resolve to `index.html` rather than a server 404.

## Core Data Models

### Athlete

```ts
type Athlete = {
  id: string;
  name: string;
  sport: string;
  category: string;
  country: string;
  state: string;
  position: string;
  age: number;
  score: number;
  growth: number;
  stage: string;
  trending: boolean;
  verified: boolean;
  achievement: string;
  photo: string;
  bio: string;
};
```

### News article

```ts
type NewsArticle = {
  id: string;
  title: string;
  cat: string;
  desc: string;
  source: string;
  date: string;
  mins: number;
  athleteId: string;
  body: string[];
};
```

### Transaction

```ts
type Tx = {
  id: string;
  t: "BUY" | "SELL";
  cid: string;
  units: number;
  price: number;
  at: string;
};
```

Contracts and positions are not represented by a dedicated context model; contract data comes from `mock.ts`, while positions remain as a `Record<contractId, unitCount>` in the store.

## State Persistence

### Global state

The store initializes from the `super-sapien` local storage key and merges saved values over the default state. Every state change is written back to that key.

Persisted values include:

- Followed talent IDs and watchlist IDs.
- Saved article IDs.
- Recently viewed profile IDs.
- Profile name, bio, photo, sports, density, and privacy values.
- Notification preferences and read notifications.
- Sidebar state.
- Virtual cash, positions, and transaction history.

### Custom articles

Locally published articles are stored under `super-sapien_custom_articles`. Each article is reconstructed as a `NewsArticle`-compatible object and merged with mock articles when the news page opens.

### Persistence limitations

- Data is isolated to the browser and origin.
- Clearing site storage resets the demo.
- There is no account synchronization or cross-device storage.
- Authentication and passwords are not implemented or persisted.
- Uploaded profile photos are stored as data URLs, so large images can consume browser storage limits.
- Local storage errors are handled safely, but state may fall back to defaults.

## UI and Styling

- Tailwind CSS provides utility-first layout and component styling.
- The custom theme uses dark background, card, lime, text, muted-text, and border colors.
- The desktop layout uses a collapsible 248-pixel sidebar that shrinks to 72 pixels.
- Mobile layouts use a fixed bottom navigation and remove the desktop sidebar.
- Manrope is loaded from Google Fonts, with Inter and system sans-serif as fallbacks.
- `Tabular` numerals are enabled globally for consistent figures.
- Keyboard focus has a lime outline.
- `prefers-reduced-motion` disables CSS animation and transition effects.
- Framer Motion handles page reveals, shell transitions, card movement, counters, modals, toasts, and tabs.
- Recharts renders responsive performance-area charts with 7/30/90-day controls.

## Development Guide

### Adding a talent

1. Update `N`, `SPORTS`, `INDIAN_STATES`, or the relevant category/position mappings in `src/data/mock.ts`.
2. Keep profile IDs unique and compatible with routes such as `/app/athletes/a25`.
3. Update generated-profile logic if the new talent needs a custom field.
4. Verify discovery filters and related news/contracts.

### Adding a news article

Add a `NewsArticle`-compatible entry to the `news` array or publish through the local article form.

- Category values should match `SPORTS`.
- `athleteId` must reference an athlete ID if the article should appear as related talent content.

### Adding a marketplace contract

Add an entry to `contracts` in `src/data/mock.ts`:

- Keep `id` unique.
- Set `athleteId` to a valid athlete ID.
- Use the supported contract types and risk labels.
- Use Indian rupee numeric values and format them through `formatINR()`.

### Replacing mock data with an API

When connecting a backend, introduce a data service or query layer and replace direct imports from `mock.ts` incrementally. Recommended additions include:

- Typed API client and server response validation.
- Authentication tokens and protected route guards.
- User profile and preference endpoints.
- Server-side talent discovery and pagination.
- Persistent follows, watchlists, bookmarks, notifications, and transactions.
- Real article and marketplace schemas.
- Image storage and media CDN integration.
- Loading, retry, and error-state handling for every remote request.

### Code conventions

- Use functional React components and hooks.
- Keep route-level components in `src/pages/`.
- Keep reusable UI primitives in `src/components/ui.tsx`.
- Keep mock types and static datasets in `src/data/mock.ts`.
- Use `useStore()` for state shared across distant components.
- Use local component state for temporary form, tab, modal, filter, and view state.
- Mark simulated or fictional behavior clearly in both UI copy and documentation.

## Build and Deployment

Create a production bundle:

```bash
npm run build
```

The build directory is `dist/`. Serve it through a static host with an SPA rewrite rule from all routes to `index.html`.

Example rewrites:

```text
/app/*             -> /index.html
/athletes/*        -> /index.html
/market/*          -> /index.html
/news/*            -> /index.html
/about             -> /index.html
/login             -> /index.html
```

Deployments must allow JavaScript module assets, single-page history routing, and secure browser storage. No environment variables or external API credentials are required by the current version.

## Prototype Boundaries

The repository is a frontend prototype rather than a production platform:

- **No backend:** browser state does not synchronize with a server.
- **No real authentication:** login/signup/reset flows only validate forms and show demo messages.
- **No real payments:** marketplace actions move virtual funds and create only local simulated transactions.
- **No real financial instruments:** contracts and risk labels are demonstration content, not investment products or advice.
- **Fictional data:** athlete profiles, achievements, scores, stories, testimonials, and contracts are synthetic.
- **No verified reporting:** news entries and the in-browser article editor are prototypes, not editorial services.
- **No server-side authorization:** public routes and `/app` routes are both accessible as client routes.
- **No production security controls:** passwords are neither submitted nor stored.
- **No analytics or consent system:** only the browser’s `localStorage` and external Google Fonts are used directly.

Before public or production use, replace mock/authentication/payment/news services; validate terms and privacy notices for applicable Indian law; review content moderation and copyright requirements; and add real consent, encryption, security, testing, monitoring, and data-retention controls.

## License

This project is licensed under the Apache License 2.0. See [`LICENSE`](LICENSE) for the complete license text.
