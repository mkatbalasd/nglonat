-- PostgreSQL schema for nagl database

-- Table CardSequence
CREATE TABLE IF NOT EXISTS "CardSequence" (
  "Prefix" VARCHAR(10) PRIMARY KEY,
  "LastDriverCardNumber" INTEGER DEFAULT 47115,
  "LastOperationCardNumber" INTEGER DEFAULT 14220
);

-- Table City
CREATE TABLE IF NOT EXISTS "City" (
  "CityID" SERIAL PRIMARY KEY,
  "NameAr" VARCHAR(100) NOT NULL,
  "NameEn" VARCHAR(100) NOT NULL
);

-- Table OPC_LicenseType
CREATE TABLE IF NOT EXISTS "OPC_LicenseType" (
  "LicenseTypeID" SERIAL PRIMARY KEY,
  "LicenseTypeNameAR" VARCHAR(255) NOT NULL,
  "LicenseTypeNameEN" VARCHAR(255) NOT NULL
);

-- View OPC_LicenseType_view to provide a generic id column
CREATE OR REPLACE VIEW "OPC_LicenseType_view" AS
SELECT "LicenseTypeID" AS id,
       "LicenseTypeNameAR",
       "LicenseTypeNameEN"
FROM "OPC_LicenseType";

-- Table Supplier
CREATE TABLE IF NOT EXISTS "Supplier" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(50) NOT NULL
);

-- Table OPC_Brand
CREATE TABLE IF NOT EXISTS "OPC_Brand" (
  "BrandID" SERIAL PRIMARY KEY,
  "BrandName" VARCHAR(50) NOT NULL
);

-- View OPC_Brand_view to provide a generic id column
CREATE OR REPLACE VIEW "OPC_Brand_view" AS
SELECT "BrandID" AS id, * FROM "OPC_Brand";

-- Table OPC_Model
CREATE TABLE IF NOT EXISTS "OPC_Model" (
  "ModelID" SERIAL PRIMARY KEY,
  "BrandID" INTEGER NOT NULL,
  "ModelName" VARCHAR(50) NOT NULL,
  FOREIGN KEY ("BrandID") REFERENCES "OPC_Brand" ("BrandID")
);

-- View OPC_Model_view to provide a generic id column
CREATE OR REPLACE VIEW "OPC_Model_view" AS
SELECT "ModelID" AS id, * FROM "OPC_Model";

-- Table OPC_Color
CREATE TABLE IF NOT EXISTS "OPC_Color" (
  "ColorID" SERIAL PRIMARY KEY,
  "ColorName" VARCHAR(30) NOT NULL
);

-- View OPC_Color_view to provide a generic id column
CREATE OR REPLACE VIEW "OPC_Color_view" AS
SELECT "ColorID" AS id, * FROM "OPC_Color";

-- Table OPC_Facility
CREATE TABLE IF NOT EXISTS "OPC_Facility" (
  "FacilityID" SERIAL PRIMARY KEY,
  "IdentityNumber" VARCHAR(50) NOT NULL,
  "Name" VARCHAR(100) NOT NULL,
  "EnglishName" VARCHAR(100),
  "LicenseNumber" VARCHAR(30),
  "LicenseTypeID" INTEGER,
  "LicenseCityID" INTEGER,
  "LicenseIssueDate" VARCHAR(30),
  "LicenseExpirationDate" VARCHAR(30),
  FOREIGN KEY ("LicenseTypeID") REFERENCES "OPC_LicenseType" ("LicenseTypeID"),
  FOREIGN KEY ("LicenseCityID") REFERENCES "City" ("CityID")
);

-- View OPC_Facility_view to provide a generic id column
CREATE OR REPLACE VIEW "OPC_Facility_view" AS
SELECT "FacilityID" AS id, * FROM "OPC_Facility";

-- Table OPC_Driver
CREATE TABLE IF NOT EXISTS "OPC_Driver" (
  "DriverID" SERIAL PRIMARY KEY,
  "FacilityID" INTEGER,
  "FirstName" VARCHAR(100) NOT NULL,
  "LastName" VARCHAR(100) NOT NULL,
  "IdentityNumber" VARCHAR(30),
  FOREIGN KEY ("FacilityID") REFERENCES "OPC_Facility" ("FacilityID")
);

-- View OPC_Driver_view to provide a generic id column
CREATE OR REPLACE VIEW "OPC_Driver_view" AS
SELECT "DriverID" AS id, * FROM "OPC_Driver";

-- Table OPC_Vehicle
CREATE TABLE IF NOT EXISTS "OPC_Vehicle" (
  "ID" SERIAL PRIMARY KEY,
  "FacilityID" INTEGER,
  "ModelID" INTEGER,
  "ColorID" INTEGER,
  "PlateNumber" VARCHAR(50),
  "SerialNumber" VARCHAR(30),
  "ManufacturingYear" INTEGER,
  FOREIGN KEY ("FacilityID") REFERENCES "OPC_Facility" ("FacilityID"),
  FOREIGN KEY ("ModelID") REFERENCES "OPC_Model" ("ModelID"),
  FOREIGN KEY ("ColorID") REFERENCES "OPC_Color" ("ColorID")
);

-- View OPC_Vehicle_view to provide a generic id column
CREATE OR REPLACE VIEW "OPC_Vehicle_view" AS
SELECT "ID" AS id, * FROM "OPC_Vehicle";

-- Table OPC_Card
CREATE TABLE IF NOT EXISTS "OPC_Card" (
  "ID" SERIAL PRIMARY KEY,
  "token" VARCHAR(50),
  "CardNumber" VARCHAR(30),
  "CardType" VARCHAR(100),
  "FacilityID" INTEGER,
  "VehicleID" INTEGER,
  "DriverID" INTEGER,
  "IssueDate" VARCHAR(30),
  "ExpirationDate" VARCHAR(30),
  "RenewalDate" VARCHAR(30),
  "Supplier" INTEGER,
  "addingDate" DATE,
  "LastUpdate" DATE,
  "userID" INTEGER,
  "status" TEXT DEFAULT 'نشطة' CHECK ("status" IN ('نشطة','منتهية','معلقة','ملغاة')),
  FOREIGN KEY ("FacilityID") REFERENCES "OPC_Facility" ("FacilityID"),
  FOREIGN KEY ("VehicleID") REFERENCES "OPC_Vehicle" ("ID"),
  FOREIGN KEY ("DriverID") REFERENCES "OPC_Driver" ("DriverID"),
  FOREIGN KEY ("Supplier") REFERENCES "Supplier" ("id")
);

-- View OPC_Card_view to provide a generic id column
CREATE OR REPLACE VIEW "OPC_Card_view" AS
SELECT "ID" AS id, * FROM "OPC_Card";

-- Table OPC_DriverCard
CREATE TABLE IF NOT EXISTS "OPC_DriverCard" (
  "ID" SERIAL PRIMARY KEY,
  "token" VARCHAR(50),
  "CardNumber" VARCHAR(30),
  "CardType" INTEGER,
  "Category" VARCHAR(50),
  "FacilityID" INTEGER,
  "DriverID" INTEGER,
  "IssueDate" VARCHAR(30),
  "ExpirationDate" VARCHAR(30),
  "RenewalDate" VARCHAR(30),
  "Supplier" INTEGER,
  "addingDate" DATE,
  "LastUpdate" DATE,
  "userID" INTEGER,
  "status" TEXT DEFAULT 'نشطة' CHECK ("status" IN ('نشطة','منتهية','معلقة','ملغاة')),
  FOREIGN KEY ("CardType") REFERENCES "OPC_LicenseType" ("LicenseTypeID"),
  FOREIGN KEY ("FacilityID") REFERENCES "OPC_Facility" ("FacilityID"),
  FOREIGN KEY ("DriverID") REFERENCES "OPC_Driver" ("DriverID"),
  FOREIGN KEY ("Supplier") REFERENCES "Supplier" ("id")
);

-- View OPC_DriverCard_view to provide a generic id column
CREATE OR REPLACE VIEW "OPC_DriverCard_view" AS
SELECT "ID" AS id, * FROM "OPC_DriverCard";

-- Table Users
CREATE TABLE IF NOT EXISTS "Users" (
  "ID" SERIAL PRIMARY KEY,
  "Username" VARCHAR(100) NOT NULL UNIQUE,
  "FullName" VARCHAR(150) NOT NULL,
  "Email" VARCHAR(150),
  "PasswordHash" VARCHAR(255) NOT NULL,
  "Role" TEXT NOT NULL DEFAULT 'موظف' CHECK ("Role" IN ('مدير','موظف','مراقب')),
  "Status" TEXT DEFAULT 'نشط' CHECK ("Status" IN ('نشط','موقوف')),
  "LastLogin" TIMESTAMP,
  "CreatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- Functions

--
-- توليد رقم البطاقة حسب نوعها مع الحفاظ على تسلسل منفصل لكل نوع
-- ويُستخدم أول ثلاثة أحرف من رقم الترخيص كرمز مُسبق
--
CREATE OR REPLACE FUNCTION generate_card_number(type text, license_number text)
RETURNS text AS $$
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
$$ LANGUAGE plpgsql;

--
-- توليد رمز فريد مع رقم البطاقة المناسب لنوعها والمنشأة
--
CREATE OR REPLACE FUNCTION generate_token_and_card(p_type text, p_facility_id integer,
                                                   OUT token text, OUT cardnumber text)
AS $$
DECLARE
  license_number VARCHAR(30);
BEGIN
  SELECT "LicenseNumber" INTO license_number
  FROM "OPC_Facility"
  WHERE "FacilityID" = p_facility_id
  LIMIT 1;

  token := md5(random()::text || clock_timestamp()::text);
  cardnumber := generate_card_number(p_type, license_number);
END;
$$ LANGUAGE plpgsql;

-- Triggers

CREATE OR REPLACE FUNCTION before_insert_opc_card()
RETURNS TRIGGER AS $$
DECLARE
  details RECORD;
BEGIN
  SELECT * INTO details FROM generate_token_and_card('operation', NEW."FacilityID");
  NEW."token" := details.token;
  NEW."CardNumber" := details.cardnumber;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_insert_opc_card
BEFORE INSERT ON "OPC_Card"
FOR EACH ROW EXECUTE FUNCTION before_insert_opc_card();

CREATE OR REPLACE FUNCTION before_insert_opc_drivercard()
RETURNS TRIGGER AS $$
DECLARE
  details RECORD;
BEGIN
  SELECT * INTO details FROM generate_token_and_card('driver', NEW."FacilityID");
  NEW."token" := details.token;
  NEW."CardNumber" := details.cardnumber;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_insert_opc_drivercard
BEFORE INSERT ON "OPC_DriverCard"
FOR EACH ROW EXECUTE FUNCTION before_insert_opc_drivercard();

CREATE OR REPLACE FUNCTION prevent_duplicate_active_driver_card()
RETURNS TRIGGER AS $$
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
$$ LANGUAGE plpgsql;

CREATE TRIGGER prevent_duplicate_active_driver_card
BEFORE INSERT ON "OPC_DriverCard"
FOR EACH ROW EXECUTE FUNCTION prevent_duplicate_active_driver_card();

-- Indexes
CREATE INDEX IF NOT EXISTS idx_opc_card_facility ON "OPC_Card" ("FacilityID");
CREATE INDEX IF NOT EXISTS idx_opc_card_vehicle ON "OPC_Card" ("VehicleID");
CREATE INDEX IF NOT EXISTS idx_opc_card_driver ON "OPC_Card" ("DriverID");
CREATE INDEX IF NOT EXISTS idx_opc_card_supplier ON "OPC_Card" ("Supplier");

CREATE INDEX IF NOT EXISTS idx_opc_driver_facility ON "OPC_Driver" ("FacilityID");

CREATE INDEX IF NOT EXISTS idx_opc_drivercard_cardtype ON "OPC_DriverCard" ("CardType");
CREATE INDEX IF NOT EXISTS idx_opc_drivercard_facility ON "OPC_DriverCard" ("FacilityID");
CREATE INDEX IF NOT EXISTS idx_opc_drivercard_driver ON "OPC_DriverCard" ("DriverID");
CREATE INDEX IF NOT EXISTS idx_opc_drivercard_supplier ON "OPC_DriverCard" ("Supplier");

CREATE INDEX IF NOT EXISTS idx_opc_facility_licensetype ON "OPC_Facility" ("LicenseTypeID");
CREATE INDEX IF NOT EXISTS idx_opc_facility_licensecity ON "OPC_Facility" ("LicenseCityID");

CREATE INDEX IF NOT EXISTS idx_opc_model_brand ON "OPC_Model" ("BrandID");
CREATE INDEX IF NOT EXISTS idx_opc_vehicle_facility ON "OPC_Vehicle" ("FacilityID");
CREATE INDEX IF NOT EXISTS idx_opc_vehicle_model ON "OPC_Vehicle" ("ModelID");
CREATE INDEX IF NOT EXISTS idx_opc_vehicle_color ON "OPC_Vehicle" ("ColorID");
