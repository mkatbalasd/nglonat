-- Migration script to update existing schema to new id-based primary keys
-- and created_at columns for all tables

-- CardSequence
ALTER TABLE "CardSequence"
  ADD COLUMN id BIGSERIAL,
  ADD COLUMN created_at TIMESTAMPTZ DEFAULT now() NOT NULL;
ALTER TABLE "CardSequence" DROP CONSTRAINT "CardSequence_pkey";
ALTER TABLE "CardSequence" ADD CONSTRAINT cardsequence_prefix_unique UNIQUE ("Prefix");
ALTER TABLE "CardSequence" ADD PRIMARY KEY (id);
UPDATE "CardSequence" SET id = nextval('"CardSequence_id_seq"');

-- City
ALTER TABLE "City" RENAME COLUMN "CityID" TO id;
ALTER TABLE "City" ALTER COLUMN id TYPE BIGINT;
ALTER TABLE "City" ADD COLUMN created_at TIMESTAMPTZ DEFAULT now() NOT NULL;

-- OPC_LicenseType
ALTER TABLE "OPC_LicenseType" RENAME COLUMN "LicenseTypeID" TO id;
ALTER TABLE "OPC_LicenseType" ALTER COLUMN id TYPE BIGINT;
ALTER TABLE "OPC_LicenseType" ADD COLUMN created_at TIMESTAMPTZ DEFAULT now() NOT NULL;

-- Supplier
ALTER TABLE "Supplier" ALTER COLUMN id TYPE BIGINT;
ALTER TABLE "Supplier" ADD COLUMN created_at TIMESTAMPTZ DEFAULT now() NOT NULL;

-- OPC_Brand
ALTER TABLE "OPC_Brand" RENAME COLUMN "BrandID" TO id;
ALTER TABLE "OPC_Brand" ALTER COLUMN id TYPE BIGINT;
ALTER TABLE "OPC_Brand" ADD COLUMN created_at TIMESTAMPTZ DEFAULT now() NOT NULL;

-- OPC_Model
ALTER TABLE "OPC_Model" RENAME COLUMN "ModelID" TO id;
ALTER TABLE "OPC_Model" ALTER COLUMN id TYPE BIGINT;
ALTER TABLE "OPC_Model" ADD COLUMN created_at TIMESTAMPTZ DEFAULT now() NOT NULL;
ALTER TABLE "OPC_Model" DROP CONSTRAINT IF EXISTS "OPC_Model_BrandID_fkey";
ALTER TABLE "OPC_Model" ADD CONSTRAINT "OPC_Model_BrandID_fkey" FOREIGN KEY ("BrandID") REFERENCES "OPC_Brand"(id);

-- OPC_Color
ALTER TABLE "OPC_Color" RENAME COLUMN "ColorID" TO id;
ALTER TABLE "OPC_Color" ALTER COLUMN id TYPE BIGINT;
ALTER TABLE "OPC_Color" ADD COLUMN created_at TIMESTAMPTZ DEFAULT now() NOT NULL;

-- OPC_Facility
ALTER TABLE "OPC_Facility" RENAME COLUMN "FacilityID" TO id;
ALTER TABLE "OPC_Facility" ALTER COLUMN id TYPE BIGINT;
ALTER TABLE "OPC_Facility" ADD COLUMN created_at TIMESTAMPTZ DEFAULT now() NOT NULL;
ALTER TABLE "OPC_Facility" DROP CONSTRAINT IF EXISTS "OPC_Facility_LicenseTypeID_fkey";
ALTER TABLE "OPC_Facility" DROP CONSTRAINT IF EXISTS "OPC_Facility_LicenseCityID_fkey";
ALTER TABLE "OPC_Facility" ADD CONSTRAINT "OPC_Facility_LicenseTypeID_fkey" FOREIGN KEY ("LicenseTypeID") REFERENCES "OPC_LicenseType"(id);
ALTER TABLE "OPC_Facility" ADD CONSTRAINT "OPC_Facility_LicenseCityID_fkey" FOREIGN KEY ("LicenseCityID") REFERENCES "City"(id);

-- OPC_Driver
ALTER TABLE "OPC_Driver" RENAME COLUMN "DriverID" TO id;
ALTER TABLE "OPC_Driver" ALTER COLUMN id TYPE BIGINT;
ALTER TABLE "OPC_Driver" ADD COLUMN created_at TIMESTAMPTZ DEFAULT now() NOT NULL;
ALTER TABLE "OPC_Driver" DROP CONSTRAINT IF EXISTS "OPC_Driver_FacilityID_fkey";
ALTER TABLE "OPC_Driver" ADD CONSTRAINT "OPC_Driver_FacilityID_fkey" FOREIGN KEY ("FacilityID") REFERENCES "OPC_Facility"(id);

-- OPC_Vehicle
ALTER TABLE "OPC_Vehicle" RENAME COLUMN "ID" TO id;
ALTER TABLE "OPC_Vehicle" ALTER COLUMN id TYPE BIGINT;
ALTER TABLE "OPC_Vehicle" ADD COLUMN created_at TIMESTAMPTZ DEFAULT now() NOT NULL;
ALTER TABLE "OPC_Vehicle" DROP CONSTRAINT IF EXISTS "OPC_Vehicle_FacilityID_fkey";
ALTER TABLE "OPC_Vehicle" DROP CONSTRAINT IF EXISTS "OPC_Vehicle_ModelID_fkey";
ALTER TABLE "OPC_Vehicle" DROP CONSTRAINT IF EXISTS "OPC_Vehicle_ColorID_fkey";
ALTER TABLE "OPC_Vehicle" ADD CONSTRAINT "OPC_Vehicle_FacilityID_fkey" FOREIGN KEY ("FacilityID") REFERENCES "OPC_Facility"(id);
ALTER TABLE "OPC_Vehicle" ADD CONSTRAINT "OPC_Vehicle_ModelID_fkey" FOREIGN KEY ("ModelID") REFERENCES "OPC_Model"(id);
ALTER TABLE "OPC_Vehicle" ADD CONSTRAINT "OPC_Vehicle_ColorID_fkey" FOREIGN KEY ("ColorID") REFERENCES "OPC_Color"(id);

-- OPC_Card
ALTER TABLE "OPC_Card" RENAME COLUMN "ID" TO id;
ALTER TABLE "OPC_Card" ALTER COLUMN id TYPE BIGINT;
ALTER TABLE "OPC_Card" ADD COLUMN created_at TIMESTAMPTZ DEFAULT now() NOT NULL;
ALTER TABLE "OPC_Card" DROP CONSTRAINT IF EXISTS "OPC_Card_FacilityID_fkey";
ALTER TABLE "OPC_Card" DROP CONSTRAINT IF EXISTS "OPC_Card_VehicleID_fkey";
ALTER TABLE "OPC_Card" DROP CONSTRAINT IF EXISTS "OPC_Card_DriverID_fkey";
ALTER TABLE "OPC_Card" DROP CONSTRAINT IF EXISTS "OPC_Card_Supplier_fkey";
ALTER TABLE "OPC_Card" ADD CONSTRAINT "OPC_Card_FacilityID_fkey" FOREIGN KEY ("FacilityID") REFERENCES "OPC_Facility"(id);
ALTER TABLE "OPC_Card" ADD CONSTRAINT "OPC_Card_VehicleID_fkey" FOREIGN KEY ("VehicleID") REFERENCES "OPC_Vehicle"(id);
ALTER TABLE "OPC_Card" ADD CONSTRAINT "OPC_Card_DriverID_fkey" FOREIGN KEY ("DriverID") REFERENCES "OPC_Driver"(id);
ALTER TABLE "OPC_Card" ADD CONSTRAINT "OPC_Card_Supplier_fkey" FOREIGN KEY ("Supplier") REFERENCES "Supplier"(id);

-- OPC_DriverCard
ALTER TABLE "OPC_DriverCard" RENAME COLUMN "ID" TO id;
ALTER TABLE "OPC_DriverCard" ALTER COLUMN id TYPE BIGINT;
ALTER TABLE "OPC_DriverCard" ADD COLUMN created_at TIMESTAMPTZ DEFAULT now() NOT NULL;
ALTER TABLE "OPC_DriverCard" DROP CONSTRAINT IF EXISTS "OPC_DriverCard_CardType_fkey";
ALTER TABLE "OPC_DriverCard" DROP CONSTRAINT IF EXISTS "OPC_DriverCard_FacilityID_fkey";
ALTER TABLE "OPC_DriverCard" DROP CONSTRAINT IF EXISTS "OPC_DriverCard_DriverID_fkey";
ALTER TABLE "OPC_DriverCard" DROP CONSTRAINT IF EXISTS "OPC_DriverCard_Supplier_fkey";
ALTER TABLE "OPC_DriverCard" ADD CONSTRAINT "OPC_DriverCard_CardType_fkey" FOREIGN KEY ("CardType") REFERENCES "OPC_LicenseType"(id);
ALTER TABLE "OPC_DriverCard" ADD CONSTRAINT "OPC_DriverCard_FacilityID_fkey" FOREIGN KEY ("FacilityID") REFERENCES "OPC_Facility"(id);
ALTER TABLE "OPC_DriverCard" ADD CONSTRAINT "OPC_DriverCard_DriverID_fkey" FOREIGN KEY ("DriverID") REFERENCES "OPC_Driver"(id);
ALTER TABLE "OPC_DriverCard" ADD CONSTRAINT "OPC_DriverCard_Supplier_fkey" FOREIGN KEY ("Supplier") REFERENCES "Supplier"(id);

-- Users
ALTER TABLE "Users" RENAME COLUMN "ID" TO id;
ALTER TABLE "Users" ALTER COLUMN id TYPE BIGINT;
ALTER TABLE "Users" RENAME COLUMN "CreatedAt" TO created_at;
ALTER TABLE "Users" ALTER COLUMN created_at SET NOT NULL;
ALTER TABLE "Users" ALTER COLUMN created_at SET DEFAULT now();

-- Update functions to use new id columns
CREATE OR REPLACE FUNCTION generate_card_number(type text, license_number text) RETURNS text AS $func$
DECLARE
  prefix TEXT := COALESCE(SUBSTRING(license_number FROM 1 FOR 3), '000');
  next_num INTEGER;
BEGIN
  IF type = 'operation' THEN
    SELECT "LastOperationCardNumber" + 1 INTO next_num
    FROM "CardSequence" WHERE "Prefix" = prefix FOR UPDATE;

    IF NOT FOUND THEN
      next_num := 1;
      INSERT INTO "CardSequence" ("Prefix", "LastDriverCardNumber", "LastOperationCardNumber")
      VALUES (prefix, 0, next_num);
    ELSE
      UPDATE "CardSequence" SET "LastOperationCardNumber" = next_num WHERE "Prefix" = prefix;
    END IF;
  ELSE
    SELECT "LastDriverCardNumber" + 1 INTO next_num
    FROM "CardSequence" WHERE "Prefix" = prefix FOR UPDATE;

    IF NOT FOUND THEN
      next_num := 1;
      INSERT INTO "CardSequence" ("Prefix", "LastDriverCardNumber", "LastOperationCardNumber")
      VALUES (prefix, next_num, 0);
    ELSE
      UPDATE "CardSequence" SET "LastDriverCardNumber" = next_num WHERE "Prefix" = prefix;
    END IF;
  END IF;

  RETURN prefix || LPAD(next_num::text, 6, '0');
END;
$func$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION generate_token_and_card(p_type text, p_facility_id integer,
                                                   OUT token text, OUT cardnumber text) AS $func$
DECLARE
  license_number VARCHAR(30);
BEGIN
  SELECT "LicenseNumber" INTO license_number
  FROM "OPC_Facility"
  WHERE id = p_facility_id
  LIMIT 1;

  token := md5(random()::text || clock_timestamp()::text);
  cardnumber := generate_card_number(p_type, license_number);
END;
$func$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION before_insert_opc_card()
RETURNS TRIGGER AS $func$
DECLARE
  details RECORD;
BEGIN
  SELECT * INTO details FROM generate_token_and_card('operation', NEW."FacilityID");
  NEW."token" := details.token;
  NEW."CardNumber" := details.cardnumber;
  RETURN NEW;
END;
$func$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION before_insert_opc_drivercard()
RETURNS TRIGGER AS $func$
DECLARE
  details RECORD;
BEGIN
  SELECT * INTO details FROM generate_token_and_card('driver', NEW."FacilityID");
  NEW."token" := details.token;
  NEW."CardNumber" := details.cardnumber;
  RETURN NEW;
END;
$func$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION prevent_duplicate_active_driver_card()
RETURNS TRIGGER AS $func$
DECLARE
  existing_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO existing_count
  FROM "OPC_DriverCard"
  WHERE "DriverID" = NEW."DriverID"
    AND "status" = 'نشطة';

  IF existing_count > 0 THEN
    RAISE EXCEPTION '⚠️ لا يمكن إصدار بطاقة جديدة: السائق يملك بطاقة فعالة مسبقًا';
  END IF;

  RETURN NEW;
END;
$func$ LANGUAGE plpgsql;

