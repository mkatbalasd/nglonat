-- Migration script to rebuild tables with new id and created_at columns
-- Existing tables are renamed with a _backup suffix before new ones are created.
-- The original data remains in the *_backup tables for reference or manual migration.

BEGIN;

ALTER TABLE IF EXISTS "CardSequence" RENAME TO "CardSequence_backup";
ALTER TABLE IF EXISTS "City" RENAME TO "City_backup";
ALTER TABLE IF EXISTS "OPC_LicenseType" RENAME TO "OPC_LicenseType_backup";
ALTER TABLE IF EXISTS "Supplier" RENAME TO "Supplier_backup";
ALTER TABLE IF EXISTS "OPC_Brand" RENAME TO "OPC_Brand_backup";
ALTER TABLE IF EXISTS "OPC_Model" RENAME TO "OPC_Model_backup";
ALTER TABLE IF EXISTS "OPC_Color" RENAME TO "OPC_Color_backup";
ALTER TABLE IF EXISTS "OPC_Facility" RENAME TO "OPC_Facility_backup";
ALTER TABLE IF EXISTS "OPC_Driver" RENAME TO "OPC_Driver_backup";
ALTER TABLE IF EXISTS "OPC_Vehicle" RENAME TO "OPC_Vehicle_backup";
ALTER TABLE IF EXISTS "OPC_Card" RENAME TO "OPC_Card_backup";
ALTER TABLE IF EXISTS "OPC_DriverCard" RENAME TO "OPC_DriverCard_backup";
ALTER TABLE IF EXISTS "Users" RENAME TO "Users_backup";

COMMIT;

-- Recreate the tables using the latest schema
\ir schema.sql
\ir functions.sql
\ir security.sql
