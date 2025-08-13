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
-- Enable RLS and allow inserts for authenticated users on reference tables
alter table city enable row level security;
drop policy if exists city_insert on city;
drop policy if exists "allow_insert_city_for_anon" on city;
create policy city_insert on city for insert to authenticated with check (true);
create policy "allow_insert_city_for_anon"
  on city
  for insert
  to anon
  with check (true);

alter table public.opc_license_type enable row level security;
drop policy if exists opc_license_type_insert on public.opc_license_type;
drop policy if exists "allow_insert_opc_license_type_for_authenticated" on public.opc_license_type;
drop policy if exists "allow_insert_opc_license_type_for_anon" on public.opc_license_type;
create policy "allow_insert_opc_license_type_for_authenticated"
  on public.opc_license_type
  for insert
  to authenticated
  with check (true);
create policy "allow_insert_opc_license_type_for_anon"
  on public.opc_license_type
  for insert
  to anon
  with check (true);

alter table supplier enable row level security;
drop policy if exists supplier_insert on supplier;
drop policy if exists "allow_insert_supplier_for_anon" on supplier;
create policy supplier_insert on supplier for insert to authenticated with check (true);
create policy "allow_insert_supplier_for_anon"
  on supplier
  for insert
  to anon
  with check (true);

alter table public.opc_brand enable row level security;
drop policy if exists opc_brand_insert on public.opc_brand;
drop policy if exists "allow_insert_opc_brand_for_authenticated" on public.opc_brand;
drop policy if exists "allow_insert_opc_brand_for_anon" on public.opc_brand;
create policy "allow_insert_opc_brand_for_authenticated"
  on public.opc_brand
  for insert
  to authenticated
  with check (true);
create policy "allow_insert_opc_brand_for_anon"
  on public.opc_brand
  for insert
  to anon
  with check (true);

alter table opc_model enable row level security;
drop policy if exists opc_model_insert on opc_model;
drop policy if exists "allow_insert_opc_model_for_anon" on opc_model;
create policy opc_model_insert on opc_model for insert to authenticated with check (true);
create policy "allow_insert_opc_model_for_anon"
  on opc_model
  for insert
  to anon
  with check (true);

alter table public.opc_color enable row level security;
drop policy if exists opc_color_insert on public.opc_color;
drop policy if exists "allow_insert_opc_color_for_authenticated" on public.opc_color;
drop policy if exists "allow_insert_opc_color_for_anon" on public.opc_color;
create policy "allow_insert_opc_color_for_authenticated"
  on public.opc_color
  for insert
  to authenticated
  with check (true);
create policy "allow_insert_opc_color_for_anon"
  on public.opc_color
  for insert
  to anon
  with check (true);

alter table opc_facility enable row level security;
drop policy if exists opc_facility_insert on opc_facility;
drop policy if exists "allow_insert_opc_facility_for_anon" on opc_facility;
create policy opc_facility_insert on opc_facility for insert to authenticated with check (true);
create policy "allow_insert_opc_facility_for_anon"
  on opc_facility
  for insert
  to anon
  with check (true);
