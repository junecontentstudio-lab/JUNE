-- June Content Studio : schéma de la base Supabase
-- À exécuter une seule fois dans Supabase (menu "SQL Editor" > coller ce fichier > "Run").
-- Le script peut être relancé sans risque : il ne recrée pas ce qui existe déjà.

-- 1. Comptes suivis : le compte de June, les références, les prospects, les clients.
create table if not exists reference_accounts (
  id            uuid primary key default gen_random_uuid(),
  platform      text not null default 'instagram',
  handle        text not null,                 -- sans le @, ex. "junecontentstudio"
  url           text,
  role          text not null check (role in ('own', 'strategy', 'ideas', 'branding', 'mountain', 'prospect', 'client', 'other')),
  why           text,                          -- ce que June veut en tirer
  notes         text,
  created_at    timestamptz not null default now(),
  unique (platform, handle)
);

-- 2. Photo d'un compte à une date donnée (chiffres publics), pour suivre l'évolution.
create table if not exists account_snapshots (
  id                uuid primary key default gen_random_uuid(),
  account_id        uuid not null references reference_accounts (id) on delete cascade,
  captured_at       timestamptz not null default now(),
  display_name      text,
  bio               text,
  bio_link          text,
  category          text,
  followers         integer,
  following         integer,
  posts_count       integer,
  posts_analyzed    integer,                   -- nombre de publications collectées
  avg_likes         numeric,
  avg_comments      numeric,
  engagement_rate   numeric,                   -- (J'aime + commentaires) / abonnés, en %
  posts_per_week    numeric,
  format_mix        jsonb,                     -- ex. {"reel": 18, "carousel": 8, "photo": 4}
  highlights        jsonb,                     -- titres des stories à la une
  top_hashtags      jsonb,
  source            text default 'apify',      -- outil utilisé pour la collecte
  raw               jsonb                      -- données brutes utiles (sans aucune clé secrète)
);

-- 3. Audits : une note sur 5 par axe, avec preuves et recommandation.
create table if not exists audits (
  id              uuid primary key default gen_random_uuid(),
  account_id      uuid not null references reference_accounts (id) on delete cascade,
  snapshot_id     uuid references account_snapshots (id) on delete set null,
  audit_date      date not null default current_date,
  axis            text not null,               -- ex. "positionnement", "identite_visuelle", "conversion"
  score           numeric(2,1) check (score between 0 and 5),   -- demi-points acceptés (ex. 2.5)
  evidence        text,                        -- observations précises
  recommendation  text,
  report_path     text,                        -- ex. "rapports/audit-june-2026-10-25.md"
  created_at      timestamptz not null default now()
);

-- 4. Traits de marque repérés : garder, adapter ou éviter.
create table if not exists brand_traits (
  id                   uuid primary key default gen_random_uuid(),
  source_account_id    uuid references reference_accounts (id) on delete set null,
  trait                text not null,
  category             text,                   -- ex. "visuel", "ton", "format", "offre", "preuve"
  decision             text not null check (decision in ('garder', 'adapter', 'eviter')),
  example_observed     text,
  adaptation_for_june  text,
  created_at           timestamptz not null default now()
);

-- 5. Idées de contenu, pour June ou pour ses clients.
create table if not exists content_ideas (
  id                   uuid primary key default gen_random_uuid(),
  for_account          text not null default 'junecontentstudio',
  title                text not null,
  format               text,                   -- ex. "POV", "lifestyle", "decouverte", "carrousel"
  hook                 text,
  description          text,
  inspired_by_account_id uuid references reference_accounts (id) on delete set null,
  target               text,                   -- ex. "hotel", "hebergement", "boutique"
  status               text not null default 'idee' check (status in ('idee', 'planifiee', 'tournee', 'publiee', 'abandonnee')),
  planned_for          date,
  created_at           timestamptz not null default now()
);

create index if not exists account_snapshots_account_idx on account_snapshots (account_id, captured_at desc);
create index if not exists audits_account_idx on audits (account_id, audit_date desc);
create index if not exists brand_traits_decision_idx on brand_traits (decision);
create index if not exists content_ideas_status_idx on content_ideas (status);

-- Sécurité : on active la protection des lignes (RLS) sans ouvrir d'accès public.
-- Seule la clé "service_role" (utilisée par Claude, jamais partagée) peut lire et écrire.
alter table reference_accounts enable row level security;
alter table account_snapshots  enable row level security;
alter table audits             enable row level security;
alter table brand_traits       enable row level security;
alter table content_ideas      enable row level security;

-- Comptes de départ.
insert into reference_accounts (handle, url, role, why) values
  ('junecontentstudio',     'https://www.instagram.com/junecontentstudio',     'own',      'Diagnostic honnête, priorités de correction'),
  ('blondie.communication', 'https://www.instagram.com/blondie.communication', 'strategy', 'Stratégie claire, message, façon de se vendre, communication montagne/station'),
  ('lina.michy',            'https://www.instagram.com/lina.michy',            'ideas',    'Idées de contenu, formats, hooks'),
  ('agencebazin',           'https://www.instagram.com/agencebazin',           'branding', 'Image de marque épurée et vintage, univers cohérent')
on conflict (platform, handle) do nothing;
