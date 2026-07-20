-- Instituto Integra+ — tabela de submissões do quiz de triagem
create extension if not exists pgcrypto;

create table if not exists public.quiz_submissions (
  id uuid primary key default gen_random_uuid(),
  public_code text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  age integer not null,
  age_group text not null,
  branch text not null,

  respondent_type text not null,
  respondent_name text not null,
  subject_name_or_initials text,
  phone text not null,
  email text,
  city text not null,
  best_contact_time text not null,

  answers jsonb not null,
  additional_notes text,

  source_interest text,
  source_page text,
  utm_source text,
  utm_medium text,
  utm_campaign text,

  result_key text not null,
  result_label text not null,
  internal_scores jsonb,

  consent_responsibility boolean not null,
  consent_data_use boolean not null,
  consent_disclaimer boolean not null,
  consent_version text not null,
  consent_at timestamptz not null,

  pdf_path text,
  email_status text not null default 'pending',
  email_sent_at timestamptz,
  email_error text,

  status text not null default 'new',
  submission_token uuid not null unique,

  constraint quiz_submissions_email_status_check
    check (email_status in ('pending', 'sent', 'failed')),
  constraint quiz_submissions_status_check
    check (status in ('new', 'contacted', 'scheduled', 'closed'))
);

create index if not exists quiz_submissions_created_at_idx on public.quiz_submissions (created_at desc);
create index if not exists quiz_submissions_status_idx on public.quiz_submissions (status);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists quiz_submissions_set_updated_at on public.quiz_submissions;
create trigger quiz_submissions_set_updated_at
  before update on public.quiz_submissions
  for each row execute function public.set_updated_at();

-- RLS: nenhum acesso via chave pública. Apenas a service role (servidor) acessa esta tabela.
alter table public.quiz_submissions enable row level security;

drop policy if exists "no_public_access" on public.quiz_submissions;
create policy "no_public_access" on public.quiz_submissions
  for all
  using (false)
  with check (false);
