-- ZeroTrace Core Supabase Schema V1
-- Run this in Supabase SQL Editor.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  username text unique,
  avatar_url text,
  tryhackme_username text,
  picoctf_username text,
  role text default 'student' check (role in ('student','admin','mentor')),
  xp integer default 0,
  created_at timestamptz default now()
);

create table if not exists public.labs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  difficulty text not null,
  points integer default 100,
  description text,
  objective text,
  defensive_lesson text,
  flag_plaintext text,
  is_published boolean default false,
  created_at timestamptz default now()
);

create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  lab_id uuid references public.labs(id) on delete cascade,
  answer text not null,
  is_correct boolean default false,
  created_at timestamptz default now()
);

create table if not exists public.tournaments (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  starts_at timestamptz,
  ends_at timestamptz,
  status text default 'draft',
  prize text,
  created_at timestamptz default now()
);

create table if not exists public.tournament_challenges (
  id uuid primary key default gen_random_uuid(),
  tournament_id uuid references public.tournaments(id) on delete cascade,
  title text not null,
  category text not null,
  difficulty text not null,
  points integer default 100,
  objective text,
  flag_plaintext text,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;
alter table public.labs enable row level security;
alter table public.submissions enable row level security;
alter table public.tournaments enable row level security;
alter table public.tournament_challenges enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = id);

drop policy if exists "labs_read_published" on public.labs;
create policy "labs_read_published" on public.labs for select using (is_published = true);

drop policy if exists "submissions_insert_own" on public.submissions;
create policy "submissions_insert_own" on public.submissions for insert with check (auth.uid() = user_id);

drop policy if exists "submissions_select_own" on public.submissions;
create policy "submissions_select_own" on public.submissions for select using (auth.uid() = user_id);

drop policy if exists "tournaments_read" on public.tournaments;
create policy "tournaments_read" on public.tournaments for select using (status = 'published');

drop policy if exists "tournament_challenges_read" on public.tournament_challenges;
create policy "tournament_challenges_read" on public.tournament_challenges for select using (true);

-- MVP admin bypass note:
-- For real production, admin operations should use server-side service role API routes.
-- For this MVP, create labs from Admin only after setting your user role to admin.
-- You may temporarily add broader policies during testing if needed.
