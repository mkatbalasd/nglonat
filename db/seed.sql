-- Seed data using the new id and created_at columns
-- Adjust or extend as needed for real deployments.

TRUNCATE TABLE "City", "OPC_LicenseType", "Supplier" RESTART IDENTITY CASCADE;

INSERT INTO "City" (id, "NameAr", "NameEn", created_at) VALUES
  (1, 'طرابلس', 'Tripoli', now()),
  (2, 'بنغازي', 'Benghazi', now())
ON CONFLICT (id) DO NOTHING;

INSERT INTO "OPC_LicenseType" (id, "LicenseTypeNameAR", "LicenseTypeNameEN", created_at) VALUES
  (1, 'تشغيل', 'Operation', now())
ON CONFLICT (id) DO NOTHING;

INSERT INTO "Supplier" (id, "name", created_at) VALUES
  (1, 'Default Supplier', now())
ON CONFLICT (id) DO NOTHING;
