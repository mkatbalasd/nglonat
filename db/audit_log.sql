-- SQL script for creating AuditLog table in Supabase
create table if not exists "AuditLog" (
  id bigserial primary key,
  table_name text not null,
  record_id text,
  action text not null,
  payload jsonb,
  created_at timestamptz default now()
);
