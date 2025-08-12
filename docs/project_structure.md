# هيكل المشروع

يوضح هذا الملف البنية العامة للمشروع ووظيفة كل ملف ودالة.

## الجذر
- `admin-app/`: تطبيق React Admin الذي يدير الواجهة.
- `db/schema.sql`: تعريف جداول قاعدة البيانات لبدء مشروع Supabase.
- `docs/`: مستندات التوثيق.
- `plan.md`: خطة العمل العامة.
- `DEVELOPMENT_GUIDELINES_AR.md`: إرشادات التطوير بالعربية.

## مجلد `admin-app`
- `package.json`: الحزم المستخدمة وأوامر التشغيل.
- `src/`: شيفرة التطبيق الرئيسية:
  - `main.tsx`: نقطة الدخول التي تقوم بتركيب المكوّن `App`.
  - `App.tsx`: يهيئ React Admin، الثيم العربي، ويوجه الموارد والمسارات.
  - `supabaseClient.ts`: تهيئة اتصال Supabase باستخدام مفاتيح البيئة.
  - `data/supabaseDataProvider.ts`: موفّر البيانات مع الدوال:
    - `getList`, `getOne`, `getMany`, `getManyReference`, `create`, `update`, `updateMany`, `delete`, `deleteMany` لتنفيذ عمليات CRUD مع دعم التصفية والترتيب.
  - `i18n/arabic.ts`: نصوص الترجمة العربية المستخدمة في الواجهة.
  - ملفات الموارد التالية، وكل منها يصدّر الدوال:
    - `Facility.tsx`: `FacilityList`, `FacilityShow`, `FacilityForm`, `FacilityCreate`, `FacilityEdit` لإدارة منشآت `OPC_Facility`.
    - `Driver.tsx`: `DriverList`, `DriverShow`, `DriverForm`, `DriverCreate`, `DriverEdit` لإدارة السائقين `OPC_Driver`.
    - `DriverCard.tsx`: `DriverCardList`, `DriverCardShow`, `DriverCardForm`, `DriverCardCreate`, `DriverCardEdit` لبطاقات السائقين.
    - `OperationCard.tsx`: `OperationCardList`, `OperationCardShow`, `OperationCardForm`, `OperationCardCreate`, `OperationCardEdit` لبطاقات التشغيل.
    - `LicenseType.tsx`: `LicenseTypeList`, `LicenseTypeShow`, `LicenseTypeForm`, `LicenseTypeCreate`, `LicenseTypeEdit` لأنواع الرخص.
    - `Supplier.tsx`: `SupplierList`, `SupplierShow`, `SupplierForm`, `SupplierCreate`, `SupplierEdit` للمزوّدين.
    - `Vehicle.tsx`: `VehicleList`, `VehicleShow`, `VehicleForm`, `VehicleCreate`, `VehicleEdit` للمركبات.
    - `features/DriverCardWizard/DriverWizard.tsx`: مكوّن معالج متعدد الخطوات لإنشاء منشأة، سائق، بطاقة سائق وبطاقة تشغيل.
  - ملفات الأنماط مثل `App.css` و`index.css` لتنسيق الواجهة.

