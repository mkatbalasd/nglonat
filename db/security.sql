-- Security configuration for nagl database

-- Restrict schema creation permissions
revoke create on schema public from public;

-- Ensure functions run with a secure search path
alter function public.set_updated_at() set search_path = pg_catalog, public;
alter function public.generate_card_number(text, text) set search_path = pg_catalog, public;
alter function public.generate_token_and_card(text, integer) set search_path = pg_catalog, public;
alter function public.before_insert_opc_card() set search_path = pg_catalog, public;
alter function public.before_insert_opc_driver_card() set search_path = pg_catalog, public;

-- Placeholder for future RLS policies or additional constraints
-- e.g., -- alter table some_table enable row level security;
