-- Database functions and triggers for nagl

-- Update timestamp column automatically
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;
ALTER FUNCTION public.set_updated_at() OWNER TO supabase_admin;

-- Generate card number based on type with separate sequences for each type
CREATE OR REPLACE FUNCTION public.generate_card_number(type text, license_number text)
RETURNS text
LANGUAGE plpgsql
SET search_path = pg_catalog, public
AS $$
DECLARE
  prefix_val TEXT := COALESCE(SUBSTRING(license_number FROM 1 FOR 3), '000');
  next_num INTEGER;
BEGIN
  IF type = 'operation' THEN
    SELECT last_operation_card_number + 1 INTO next_num
    FROM public.card_sequence WHERE prefix = prefix_val FOR UPDATE;

    IF NOT FOUND THEN
      next_num := 1;
      INSERT INTO public.card_sequence (prefix, last_driver_card_number, last_operation_card_number, created_at, updated_at)
      VALUES (prefix_val, 0, next_num, now(), now());
    ELSE
      UPDATE public.card_sequence
      SET last_operation_card_number = next_num, updated_at = now()
      WHERE prefix = prefix_val;
    END IF;
  ELSE
    SELECT last_driver_card_number + 1 INTO next_num
    FROM public.card_sequence WHERE prefix = prefix_val FOR UPDATE;

    IF NOT FOUND THEN
      next_num := 1;
      INSERT INTO public.card_sequence (prefix, last_driver_card_number, last_operation_card_number, created_at, updated_at)
      VALUES (prefix_val, next_num, 0, now(), now());
    ELSE
      UPDATE public.card_sequence
      SET last_driver_card_number = next_num, updated_at = now()
      WHERE prefix = prefix_val;
    END IF;
  END IF;

  RETURN prefix_val || LPAD(next_num::text, 6, '0');
END;
$$;
ALTER FUNCTION public.generate_card_number(text, text) OWNER TO supabase_admin;

-- Generate token and card number for the given facility
CREATE OR REPLACE FUNCTION public.generate_token_and_card(p_type text, p_facility_id integer,
                                                          OUT token text, OUT cardnumber text)
LANGUAGE plpgsql
SET search_path = pg_catalog, public
AS $$
DECLARE
  facility_license_number VARCHAR(30);
BEGIN
  SELECT f.license_number
  INTO facility_license_number
  FROM public.opc_facility AS f
  WHERE f.id = p_facility_id
  LIMIT 1;

  token := md5(random()::text || clock_timestamp()::text);
  cardnumber := public.generate_card_number(p_type, facility_license_number);
END;
$$;
ALTER FUNCTION public.generate_token_and_card(text, integer) OWNER TO supabase_admin;

-- Trigger function for opc_card
CREATE OR REPLACE FUNCTION public.before_insert_opc_card()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = pg_catalog, public
AS $$
BEGIN
  IF NEW.token IS NULL OR NEW.token = '' OR NEW.card_number IS NULL OR NEW.card_number = '' THEN
    SELECT token, cardnumber INTO NEW.token, NEW.card_number
    FROM public.generate_token_and_card('operation', NEW.facility_id);
  END IF;
  RETURN NEW;
END;
$$;
ALTER FUNCTION public.before_insert_opc_card() OWNER TO supabase_admin;

-- Trigger function for opc_driver_card
CREATE OR REPLACE FUNCTION public.before_insert_opc_driver_card()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = pg_catalog, public
AS $$
BEGIN
  IF NEW.token IS NULL OR NEW.token = '' OR NEW.card_number IS NULL OR NEW.card_number = '' THEN
    SELECT token, cardnumber INTO NEW.token, NEW.card_number
    FROM public.generate_token_and_card('driver', NEW.facility_id);
  END IF;
  RETURN NEW;
END;
$$;
ALTER FUNCTION public.before_insert_opc_driver_card() OWNER TO supabase_admin;

-- Triggers to generate token and card numbers
DROP TRIGGER IF EXISTS before_insert_opc_card ON public.opc_card;
CREATE TRIGGER before_insert_opc_card
BEFORE INSERT ON public.opc_card
FOR EACH ROW EXECUTE FUNCTION public.before_insert_opc_card();

DROP TRIGGER IF EXISTS before_insert_opc_driver_card ON public.opc_driver_card;
CREATE TRIGGER before_insert_opc_driver_card
BEFORE INSERT ON public.opc_driver_card
FOR EACH ROW EXECUTE FUNCTION public.before_insert_opc_driver_card();

-- Attach set_updated_at trigger to all tables having updated_at column
DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN
    SELECT table_schema, table_name
    FROM information_schema.columns
    WHERE column_name = 'updated_at'
      AND table_schema = 'public'
  LOOP
    EXECUTE format('DROP TRIGGER IF EXISTS set_updated_at_%I ON %I.%I;',
                   r.table_name, r.table_schema, r.table_name);
    EXECUTE format('CREATE TRIGGER set_updated_at_%I BEFORE UPDATE ON %I.%I FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();',
                   r.table_name, r.table_schema, r.table_name);
  END LOOP;
END;
$$;
