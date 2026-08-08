# Help Is on the Way

Free mental healthcare access platform connecting individuals with professional mental health services. We coordinate with partner providers so you don't have to pay.

## Tech Stack

- **Framework**: Next.js 16 (App Router) with TypeScript
- **Styling**: Tailwind CSS v4
- **Database & Auth**: Supabase (PostgreSQL + Row Level Security)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- A Supabase project (free tier available at [supabase.com](https://supabase.com))

### Environment Variables

Copy `.env.example` to `.env.local` and fill in your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### Database Setup

1. Go to your Supabase project's SQL Editor
2. Run the contents of `supabase-schema.sql`
3. This creates all tables, indexes, RLS policies, and seed data for categories

### Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Creating an Admin Account

1. Sign up normally through the application
2. In your Supabase SQL Editor, run:

```sql
UPDATE profiles SET role = 'admin' WHERE email = 'your-email@example.com';
```

## Project Structure

```
src/
├── app/
│   ├── (auth)/          # Protected client pages
│   │   ├── appointments/
│   │   ├── book/        # Booking workflow
│   │   ├── dashboard/
│   │   ├── instructions/
│   │   ├── notifications/
│   │   └── profile/
│   ├── admin/           # Admin pages
│   │   ├── appointments/
│   │   ├── availability/
│   │   ├── categories/
│   │   ├── clients/
│   │   └── events/
│   ├── auth/            # Auth actions & callback
│   ├── login/
│   ├── signup/
│   ├── about/
│   ├── how-it-works/
│   ├── faq/
│   ├── contact/
│   └── resources/
├── components/
│   ├── ui/              # Reusable UI components
│   └── layout/          # Layout components (Sidebar, SupportSection)
├── lib/
│   ├── supabase/        # Supabase clients (browser, server, proxy)
│   ├── types.ts         # TypeScript type definitions
│   ├── data.ts          # Category & event seed data
│   └── utils.ts         # Utility functions
└── proxy.ts             # Auth proxy (route protection)
```

## Key Features

- **Client**: Registration/login, dashboard, booking workflow (Category → Event → Date/Time → Review), appointment tracking, profile management
- **Admin**: Dashboard with stats, appointment management (confirm/reschedule/cancel), client list, category & event management, availability management
- **Booking**: 4-step guided booking flow with progress indicator and no payment step
- **Security**: Row Level Security (RLS), role-based authorization, protected routes
- **SEO**: Sitemap, robots.txt, Open Graph metadata, semantic HTML
- **Responsive**: Mobile-first design with collapsible sidebar navigation

## Deployment

This project is configured for Vercel deployment. The repository is connected and automatically deploys on push.

Set the following environment variables in your Vercel project settings:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## License

Private project. All rights reserved.
