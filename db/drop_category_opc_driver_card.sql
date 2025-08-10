-- Migration to drop obsolete category column from opc_driver_card
ALTER TABLE opc_driver_card DROP COLUMN category;
