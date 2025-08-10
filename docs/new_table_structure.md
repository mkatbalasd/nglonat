# البنية الجديدة للجداول

يحتوي النظام على ثلاثة عشر جدولاً مترابطة. يوضح هذا المستند الأعمدة الأساسية لكل جدول وأهم القيود والفهارس المرتبطة به.

## card_sequence
- **الأعمدة:** id، prefix، last_driver_card_number، last_operation_card_number، created_at، updated_at.
- **القيود:** مفتاح أساسي على `id`، و`prefix` فريد.
- **الفهارس:** لا توجد فهارس إضافية.

## city
- **الأعمدة:** id، name_ar، name_en، created_at، updated_at.
- **القيود:** مفتاح أساسي على `id`.
- **الفهارس:** `uq_city_name_ar` و`uq_city_name_en` لفهرسة فريدة حساسة لحالة الأحرف باستخدام `LOWER`.

## opc_license_type
- **الأعمدة:** id، license_type_name_ar، license_type_name_en، created_at، updated_at.
- **القيود:** مفتاح أساسي على `id`.
- **الفهارس:** `uq_license_type_name_ar` و`uq_license_type_name_en` لفهرسة فريدة للأسماء بالعربية والإنجليزية.

## supplier
- **الأعمدة:** id، name، created_at، updated_at.
- **القيود:** مفتاح أساسي على `id`.
- **الفهارس:** `uq_supplier_name` لفهرسة فريدة على الاسم.

## opc_brand
- **الأعمدة:** id، brand_name، created_at، updated_at.
- **القيود:** مفتاح أساسي على `id`.
- **الفهارس:** `uq_brand_name` لفهرسة فريدة على اسم العلامة.

## opc_model
- **الأعمدة:** id، brand_id، model_name، created_at، updated_at.
- **القيود:**
  - مفتاح أساسي على `id`.
  - مفتاح أجنبي `brand_id` يشير إلى `opc_brand(id)` مع حذف متسلسل.
- **الفهارس:** `uq_model_brand_name` فهرس فريد يجمع بين `brand_id` و`LOWER(model_name)`.

## opc_color
- **الأعمدة:** id، color_name، created_at، updated_at.
- **القيود:** مفتاح أساسي على `id`.
- **الفهارس:** `uq_color_name` فهرس فريد على اسم اللون.

## opc_facility
- **الأعمدة:** id، identity_number، name، english_name، license_number، license_type_id، license_city_id، license_issue_date، license_expiration_date، created_at، updated_at.
- **القيود:**
  - مفتاح أساسي على `id`.
  - `identity_number` و`license_number` قيم فريدة.
  - حقول التاريخ تتحقق من صيغة `YYYY-MM-DD`.
  - مفاتيح أجنبية إلى `opc_license_type(id)` و`city(id)` مع `ON DELETE SET NULL`.
- **الفهارس:** `idx_facility_license_type` و`idx_facility_license_city`.

## opc_driver
- **الأعمدة:** id، facility_id، first_name، last_name، identity_number، created_at، updated_at.
- **القيود:**
  - مفتاح أساسي على `id`.
  - مفتاح أجنبي `facility_id` يشير إلى `opc_facility(id)` مع حذف متسلسل.
- **الفهارس:** `idx_driver_facility`.

## opc_vehicle
- **الأعمدة:** id، facility_id، model_id، color_id، plate_number، serial_number، manufacturing_year، created_at، updated_at.
- **القيود:**
  - مفتاح أساسي على `id`.
  - `plate_number` قيمة فريدة.
  - مفاتيح أجنبية إلى `opc_facility(id)` (حذف متسلسل)، و`opc_model(id)`، و`opc_color(id)` مع `ON DELETE SET NULL`.
- **الفهارس:** `idx_vehicle_facility`، `idx_vehicle_model`، `idx_vehicle_color`.

## users
- **الأعمدة:** id، username، full_name، email، password_hash، role، status، last_login، created_at، updated_at.
- **القيود:**
  - مفتاح أساسي على `id`.
  - `username` قيمة فريدة مع فحص `LOWER(username)`.
  - تحقق لقيم `role` و`status` ضمن القوائم المحددة.
- **الفهارس:** `uq_users_username_lower` فهرس فريد على `LOWER(username)`.

## opc_card
- **الأعمدة:** id، token، card_number، card_type، facility_id، vehicle_id، driver_id، issue_date، expiration_date، renewal_date، supplier_id، user_id، status، created_at، updated_at.
- **القيود:**
  - مفتاح أساسي على `id`.
  - `token` و`card_number` قيم فريدة.
  - حقول التاريخ تتحقق من صيغة `YYYY-MM-DD`.
  - مفاتيح أجنبية إلى الجداول `opc_facility`، `opc_vehicle`، `opc_driver`، `supplier` و`users` مع حذف أو تعيين `NULL` حسب الحالة.
  - تحقق لقيم الحالة ضمن `('نشطة','منتهية','معلقة','ملغاة')`.
- **الفهارس:** `idx_card_facility`، `idx_card_vehicle`، `idx_card_driver`، `idx_card_supplier`، `idx_card_user`.

## opc_driver_card
- **الأعمدة:** id، token، card_number، card_type، facility_id، driver_id، issue_date، expiration_date، renewal_date، supplier_id، user_id، status، created_at، updated_at.
- **القيود:**
  - مفتاح أساسي على `id`.
  - `token` و`card_number` قيم فريدة.
  - مفاتيح أجنبية إلى `opc_license_type`، `opc_facility`، `opc_driver`، `supplier` و`users`.
  - حقول التاريخ تتحقق من صيغة `YYYY-MM-DD`.
  - تحقق لقيم الحالة ضمن `('نشطة','منتهية','معلقة','ملغاة')`.
- **الفهارس:** `idx_driver_card_card_type`، `idx_driver_card_facility`، `idx_driver_card_driver`، `idx_driver_card_supplier`، `idx_driver_card_user`.

