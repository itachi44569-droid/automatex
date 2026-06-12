# AutomateX AI — Premium AI Automation Agency Platform

A world-class, production-ready AI Automation Agency website. Built to attract $5K–$50K projects and serve as an impressive Fiverr portfolio piece.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| UI Library | React 19 + TypeScript |
| Styling | Tailwind CSS v4 |
| Components | Shadcn UI |
| Auth | Firebase Authentication |
| Database | Firestore |
| Storage | Firebase Storage |
| Animation | Framer Motion |
| Charts | Recharts |
| Forms | React Hook Form + Zod |
| Deployment | Vercel |

## Features

**Public Website** — Home, Services, Case Studies, Portfolio, Pricing, About, Blog, Careers, Contact

**Client Portal** — Dashboard, Project tracking, Support tickets, Messaging, Meetings, Notifications

**Admin Dashboard** — Analytics charts, Client CRM, Project management, Lead pipeline (Kanban), Revenue tracking, Team management

**Design** — Dark/light mode, glassmorphism, gradient animations, mobile-first, SEO optimised

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Firebase
```bash
cp .env.local.example .env.local
# Fill in your Firebase config from Firebase Console
```

### 3. Run Dev Server
```bash
npm run dev
# Open http://localhost:3000
```

## Firebase Setup

1. Create project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable **Authentication** → Email/Password + Google
3. Enable **Firestore Database**
4. Enable **Firebase Storage**
5. Copy config values to `.env.local`
6. Deploy rules: `firebase deploy --only firestore:rules`

## Database Collections

| Collection | Purpose |
|------------|---------|
| `users` | Auth profiles + roles (admin/client/team) |
| `clients` | Client company records |
| `projects` | Project tracking with milestones |
| `leads` | CRM lead pipeline |
| `tickets` | Support ticket system |
| `meetings` | Scheduled calls |
| `caseStudies` | Published case studies |
| `notifications` | Real-time user notifications |
| `messages` | Client-team messaging |

## Folder Structure

```
src/
├── app/                     # Next.js pages (App Router)
│   ├── page.tsx             # Home
│   ├── services/            # Services page
│   ├── case-studies/        # Case studies
│   ├── portfolio/           # Portfolio
│   ├── pricing/             # Pricing
│   ├── about/               # About us
│   ├── contact/             # Contact + lead capture
│   ├── blog/                # Blog
│   ├── careers/             # Careers
│   ├── login/ register/     # Authentication
│   ├── client/              # Client portal (protected)
│   └── admin/               # Admin dashboard (protected)
├── components/
│   ├── ui/                  # Shadcn UI components
│   ├── layout/              # Navbar, Footer
│   ├── home/                # Hero, Stats, Services, etc.
│   ├── pages/               # Full page components
│   ├── dashboard/
│   │   ├── admin/           # Admin components + charts
│   │   └── client/          # Client portal components
│   ├── auth/                # Login / Register
│   └── providers/           # Theme + Auth providers
├── contexts/AuthContext.tsx  # Firebase auth
├── lib/firebase.ts           # Firebase init
├── middleware.ts             # Route protection
└── types/index.ts            # TypeScript types
```

## Deploy to Vercel

```bash
# Option A: CLI
npx vercel --prod

# Option B: GitHub → vercel.com → Import Repo → Add env vars → Deploy
```

## Make Yourself Admin

1. Register at `/register`
2. Open Firestore Console → `users/{your-uid}`
3. Change `role` to `"admin"`
4. Visit `/admin` for full access

## Customisation

- **Brand** — Edit `tailwind.config.ts` colour tokens
- **Company info** — `Navbar.tsx`, `Footer.tsx`, `layout.tsx`
- **Services** — `ServicesPage.tsx`
- **Pricing** — `PricingPage.tsx`
- **Team** — `AboutPage.tsx`

---

MIT License · Built with ♥ for AutomateX AI
