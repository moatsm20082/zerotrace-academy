# ZeroTrace Core Supabase V1

This version implements the core missing platform pieces:

1. Supabase schema
2. Auth wiring
3. Profiles
4. Labs from database
5. Submissions
6. Admin sees answers
7. Admin can add labs
8. Tournament MVP tables/pages
9. Seed labs/challenges starter
10. AI Mentor placeholder ready for API/RAG later

## Install

```bash
npm install
npm run dev
```

## Deploy

Upload all files to GitHub root, then deploy on Vercel.

## Vercel Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## Supabase Setup

1. Open Supabase.
2. SQL Editor.
3. Run `supabase/schema.sql`.
4. Run `supabase/seed.sql`.
5. Create a user from `/auth`.
6. In Supabase table `profiles`, set your user's role to `admin`.
7. Open `/admin`.

## Important security note

This MVP uses `flag_plaintext` for quick launch testing. Production must move flag validation to a server-side API using hashes, not plaintext flags.
