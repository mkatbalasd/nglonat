-- Seed data using the new id and created_at columns
-- Adjust or extend as needed for real deployments.

TRUNCATE TABLE city, opc_license_type, supplier RESTART IDENTITY CASCADE;

INSERT INTO city (id, name_ar, name_en, created_at) VALUES
  (1, 'طرابلس', 'Tripoli', now()),
  (2, 'بنغازي', 'Benghazi', now())
ON CONFLICT (id) DO NOTHING;

INSERT INTO opc_license_type (id, license_type_name_ar, license_type_name_en, created_at) VALUES
  (1, 'تشغيل', 'Operation', now())
ON CONFLICT (id) DO NOTHING;

INSERT INTO supplier (id, name, created_at) VALUES
  (1, 'Default Supplier', now())
ON CONFLICT (id) DO NOTHING;
