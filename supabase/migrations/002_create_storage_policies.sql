-- Bucket privado para os PDFs de triagem.
insert into storage.buckets (id, name, public)
values ('quiz-pdfs', 'quiz-pdfs', false)
on conflict (id) do update set public = false;

-- Nenhuma política pública é criada: leitura e escrita só acontecem
-- via service role (servidor), que ignora RLS de storage por padrão.
drop policy if exists "no_public_read" on storage.objects;
create policy "no_public_read" on storage.objects
  for select
  using (bucket_id = 'quiz-pdfs' and false);

drop policy if exists "no_public_write" on storage.objects;
create policy "no_public_write" on storage.objects
  for insert
  with check (bucket_id = 'quiz-pdfs' and false);
