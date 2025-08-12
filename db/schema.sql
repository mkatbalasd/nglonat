SET client_encoding = 'UTF8';
-- PostgreSQL schema for nagl database

-- Drop existing views
DROP VIEW IF EXISTS city_view;
DROP VIEW IF EXISTS opc_license_type_view;
DROP VIEW IF EXISTS opc_brand_view;
DROP VIEW IF EXISTS opc_model_view;
DROP VIEW IF EXISTS opc_color_view;
DROP VIEW IF EXISTS opc_facility_view;
DROP VIEW IF EXISTS opc_driver_view;
DROP VIEW IF EXISTS opc_vehicle_view;
DROP VIEW IF EXISTS opc_card_view;
DROP VIEW IF EXISTS opc_driver_card_view;

-- Drop existing tables in reverse dependency order
DROP TABLE IF EXISTS opc_driver_card CASCADE;
DROP TABLE IF EXISTS opc_card CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS opc_vehicle CASCADE;
DROP TABLE IF EXISTS opc_driver CASCADE;
DROP TABLE IF EXISTS opc_facility CASCADE;
DROP TABLE IF EXISTS opc_color CASCADE;
DROP TABLE IF EXISTS opc_model CASCADE;
DROP TABLE IF EXISTS opc_brand CASCADE;
DROP TABLE IF EXISTS supplier CASCADE;
DROP TABLE IF EXISTS opc_license_type CASCADE;
DROP TABLE IF EXISTS city CASCADE;
DROP TABLE IF EXISTS card_sequence CASCADE;

-- Table card_sequence
CREATE TABLE IF NOT EXISTS card_sequence (
    id BIGSERIAL PRIMARY KEY,
    prefix VARCHAR(10) UNIQUE,
    last_driver_card_number INTEGER DEFAULT 47115,
    last_operation_card_number INTEGER DEFAULT 14220,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Table city
CREATE TABLE IF NOT EXISTS city (
    id BIGSERIAL PRIMARY KEY,
    name_ar VARCHAR(100) NOT NULL,
    name_en VARCHAR(100) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Table opc_license_type
CREATE TABLE IF NOT EXISTS opc_license_type (
    id BIGSERIAL PRIMARY KEY,
    license_type_name_ar VARCHAR(255) NOT NULL,
    license_type_name_en VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Table supplier
CREATE TABLE IF NOT EXISTS supplier (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Table opc_brand
CREATE TABLE IF NOT EXISTS opc_brand (
    id BIGSERIAL PRIMARY KEY,
    brand_name VARCHAR(50) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Table opc_model
CREATE TABLE IF NOT EXISTS opc_model (
    id BIGSERIAL PRIMARY KEY,
    brand_id INTEGER NOT NULL,
    model_name VARCHAR(50) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    CONSTRAINT fk_opc_model_brand FOREIGN KEY (brand_id) REFERENCES opc_brand (id) ON DELETE CASCADE
);

-- Table opc_color
CREATE TABLE IF NOT EXISTS opc_color (
    id BIGSERIAL PRIMARY KEY,
    color_name VARCHAR(30) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Table opc_facility
CREATE TABLE IF NOT EXISTS opc_facility (
    id BIGSERIAL PRIMARY KEY,
    identity_number VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    english_name VARCHAR(100),
    license_number VARCHAR(30) UNIQUE,
    license_type_id INTEGER,
    license_city_id INTEGER,
    license_issue_date VARCHAR(10) CHECK (license_issue_date ~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}$'),
    license_expiration_date VARCHAR(10) CHECK (license_expiration_date ~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}$'),
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    CONSTRAINT fk_facility_license_type FOREIGN KEY (license_type_id) REFERENCES opc_license_type (id) ON DELETE SET NULL,
    CONSTRAINT fk_facility_license_city FOREIGN KEY (license_city_id) REFERENCES city (id) ON DELETE SET NULL
);

-- Table opc_driver
CREATE TABLE IF NOT EXISTS opc_driver (
    id BIGSERIAL PRIMARY KEY,
    facility_id INTEGER,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    identity_number VARCHAR(30),
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    CONSTRAINT fk_driver_facility FOREIGN KEY (facility_id) REFERENCES opc_facility (id) ON DELETE CASCADE
);

-- Table opc_vehicle
CREATE TABLE IF NOT EXISTS opc_vehicle (
    id BIGSERIAL PRIMARY KEY,
    facility_id INTEGER,
    model_id INTEGER,
    color_id INTEGER,
    plate_number VARCHAR(30) UNIQUE,
    serial_number VARCHAR(30),
    manufacturing_year INTEGER,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    CONSTRAINT fk_vehicle_facility FOREIGN KEY (facility_id) REFERENCES opc_facility (id) ON DELETE CASCADE,
    CONSTRAINT fk_vehicle_model FOREIGN KEY (model_id) REFERENCES opc_model (id) ON DELETE SET NULL,
    CONSTRAINT fk_vehicle_color FOREIGN KEY (color_id) REFERENCES opc_color (id) ON DELETE SET NULL
);

-- Table users
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150),
    password_hash VARCHAR(255) NOT NULL,
    role TEXT NOT NULL DEFAULT 'موظف' CHECK (role IN ('مدير','موظف','مراقب')),
    status TEXT DEFAULT 'نشط' CHECK (status IN ('نشط','موقوف')),
    last_login TIMESTAMP,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Table opc_card
CREATE TABLE IF NOT EXISTS opc_card (
    id BIGSERIAL PRIMARY KEY,
    token VARCHAR(50) UNIQUE,
    card_number VARCHAR(30) UNIQUE,
    card_type INTEGER,
    facility_id INTEGER,
    vehicle_id INTEGER,
    driver_id INTEGER,
    issue_date VARCHAR(10) CHECK (issue_date ~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}$'),
    expiration_date VARCHAR(10) CHECK (expiration_date ~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}$'),
    renewal_date VARCHAR(10) CHECK (renewal_date ~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}$'),
    supplier_id INTEGER,
    user_id INTEGER,
    status TEXT DEFAULT 'نشطة' CHECK (status IN ('نشطة','منتهية','معلقة','ملغاة')),
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    CONSTRAINT fk_card_facility FOREIGN KEY (facility_id) REFERENCES opc_facility (id) ON DELETE CASCADE,
    CONSTRAINT fk_card_vehicle FOREIGN KEY (vehicle_id) REFERENCES opc_vehicle (id) ON DELETE SET NULL,
    CONSTRAINT fk_card_driver FOREIGN KEY (driver_id) REFERENCES opc_driver (id) ON DELETE SET NULL,
    CONSTRAINT fk_card_type FOREIGN KEY (card_type) REFERENCES opc_license_type (id) ON DELETE SET NULL,
    CONSTRAINT fk_card_supplier FOREIGN KEY (supplier_id) REFERENCES supplier (id) ON DELETE SET NULL,
    CONSTRAINT fk_card_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE SET NULL
);

-- Table opc_driver_card
CREATE TABLE IF NOT EXISTS opc_driver_card (
    id BIGSERIAL PRIMARY KEY,
    token VARCHAR(50) UNIQUE,
    card_number VARCHAR(30) UNIQUE,
    card_type INTEGER,
    facility_id INTEGER,
    driver_id INTEGER,
    issue_date VARCHAR(10) CHECK (issue_date ~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}$'),
    expiration_date VARCHAR(10) CHECK (expiration_date ~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}$'),
    renewal_date VARCHAR(10) CHECK (renewal_date ~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}$'),
    supplier_id INTEGER,
    user_id INTEGER,
    status TEXT DEFAULT 'نشطة' CHECK (status IN ('نشطة','منتهية','معلقة','ملغاة')),
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    CONSTRAINT fk_driver_card_type FOREIGN KEY (card_type) REFERENCES opc_license_type (id) ON DELETE SET NULL,
    CONSTRAINT fk_driver_card_facility FOREIGN KEY (facility_id) REFERENCES opc_facility (id) ON DELETE CASCADE,
    CONSTRAINT fk_driver_card_driver FOREIGN KEY (driver_id) REFERENCES opc_driver (id) ON DELETE CASCADE,
    CONSTRAINT fk_driver_card_supplier FOREIGN KEY (supplier_id) REFERENCES supplier (id) ON DELETE SET NULL,
    CONSTRAINT fk_driver_card_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE SET NULL
);

-- Unique and general indexes
CREATE UNIQUE INDEX IF NOT EXISTS uq_city_name_ar ON city (LOWER(name_ar));
CREATE UNIQUE INDEX IF NOT EXISTS uq_city_name_en ON city (LOWER(name_en));

CREATE UNIQUE INDEX IF NOT EXISTS uq_license_type_name_ar ON opc_license_type (LOWER(license_type_name_ar));
CREATE UNIQUE INDEX IF NOT EXISTS uq_license_type_name_en ON opc_license_type (LOWER(license_type_name_en));

CREATE UNIQUE INDEX IF NOT EXISTS uq_supplier_name ON supplier (LOWER(name));

CREATE UNIQUE INDEX IF NOT EXISTS uq_brand_name ON opc_brand (LOWER(brand_name));

CREATE UNIQUE INDEX IF NOT EXISTS uq_model_brand_name ON opc_model (brand_id, LOWER(model_name));

CREATE UNIQUE INDEX IF NOT EXISTS uq_color_name ON opc_color (LOWER(color_name));

CREATE INDEX IF NOT EXISTS idx_driver_facility ON opc_driver (facility_id);

CREATE INDEX IF NOT EXISTS idx_vehicle_facility ON opc_vehicle (facility_id);
CREATE INDEX IF NOT EXISTS idx_vehicle_model ON opc_vehicle (model_id);
CREATE INDEX IF NOT EXISTS idx_vehicle_color ON opc_vehicle (color_id);

CREATE UNIQUE INDEX IF NOT EXISTS uq_users_username_lower ON users (LOWER(username));

CREATE INDEX IF NOT EXISTS idx_card_facility ON opc_card (facility_id);
CREATE INDEX IF NOT EXISTS idx_card_vehicle ON opc_card (vehicle_id);
CREATE INDEX IF NOT EXISTS idx_card_driver ON opc_card (driver_id);
CREATE INDEX IF NOT EXISTS idx_card_supplier ON opc_card (supplier_id);
CREATE INDEX IF NOT EXISTS idx_card_user ON opc_card (user_id);

CREATE INDEX IF NOT EXISTS idx_driver_card_card_type ON opc_driver_card (card_type);
CREATE INDEX IF NOT EXISTS idx_driver_card_facility ON opc_driver_card (facility_id);
CREATE INDEX IF NOT EXISTS idx_driver_card_driver ON opc_driver_card (driver_id);
CREATE INDEX IF NOT EXISTS idx_driver_card_supplier ON opc_driver_card (supplier_id);
CREATE INDEX IF NOT EXISTS idx_driver_card_user ON opc_driver_card (user_id);

-- Ensure only one active card per driver and facility
CREATE UNIQUE INDEX IF NOT EXISTS uq_active_driver_facility
  ON opc_driver_card (driver_id, facility_id)
  WHERE status = 'نشطة';

CREATE INDEX IF NOT EXISTS idx_facility_license_type ON opc_facility (license_type_id);
CREATE INDEX IF NOT EXISTS idx_facility_license_city ON opc_facility (license_city_id);

