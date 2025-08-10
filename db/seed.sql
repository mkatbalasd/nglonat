-- Seed data using the new id and created_at columns
-- Adjust or extend as needed for real deployments.

INSERT INTO "City" (id, "NameAr", "NameEn", created_at) VALUES
  (1, 'طرابلس', 'Tripoli', now()),
  (2, 'بنغازي', 'Benghazi', now());

INSERT INTO "OPC_LicenseType" (id, "LicenseTypeNameAR", "LicenseTypeNameEN", created_at) VALUES
  (1, 'تشغيل', 'Operation', now());

INSERT INTO "Supplier" (id, "name", created_at) VALUES
  (1, 'Default Supplier', now());
