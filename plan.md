# خطة مشروع لوحة إدارة البطاقات

إدارة بطاقات التشغيل (Operation Cards) وبطاقات السائقين (Driver Cards) باستخدام React Admin و Supabase. الهدف من المشروع استخدام db/schema.sql كنقطة انطلاق، وتوفير واجهة عربية تتجاهل من اليمين إلى اليسار، ومتوافقة مع الأجهزة المحمولة، وتشمل المخطط التتابعي للحقول، مع دعم توثيق الأحداث (Audit Trail).

---

## 1. إعداد البيئة والتقنيات

### تهيئة التطبيق
- استخدام React Admin (Vite أو CRA) لإنشاء مشروع
- تثبيت الحزم:
  - react-admin
  - @supabase/supabase-js
  - react-hook-form
  - @mui/material, @emotion/react, @emotion/styled
  - @mui/icons-material



- أو تعريف مشروع مخصص باستخدام `arabic` template.

### تهيئة Supabase
- استيراد قاعدة البيانات من Supabase باستخدام `db/schema.sql`.
- إعداد عميل Supabase في الواجهة (`supabaseClient.ts`).
- تمكين قواعد الأمان (RLS) وتفعيل الجداول المطلوبة.

### إنشاء Data Provider
- إعداد Data Provider لربط React Admin مع Supabase.
- دعم العمليات الأساسية (getList, getOne, create ...) على Supabase.
- دعم فلترة البيانات في `getList` (مثل `filter` على FacilityID، DriverID ... إلخ).

---

## 2. تصميم قاعدة البيانات (مرجع مختصر)

- `OPC_Facility`: معلومات المنشأة بما فيها رقم الهوية، رقم الرخصة، نوع الرخصة، وتواريخ الإصدار/الانتهاء.
- `OPC_LicenseType`: نوع الرخصة (LicenseTypeID و CardType).
- `OPC_Driver`: معلومات السائقين المرتبطين بالمنشأة.
- `OPC_DriverCard`: بطاقات السائقين مع الحقول المرتبطة (CardType, FacilityID, DriverID, Supplier ...).
- `OPC_Card`: بطاقات التشغيل (اختيارية) تُربط بالمنشأة والسائق والمركبة.
- `Supplier`: جدول الموردين (للاستخدام في البطاقات).

---

## 3. مخطط الواجهة وواجهة الاستخدام

### التصميم العام
- استخدام الخط `'Segoe UI', Tahoma, sans-serif`.
- دعم RTL عبر MUI theme (`direction: 'rtl'`).
- تصميم شبكي باستخدام MUI /Flexbox/Grid.
- استخدام تصميم بسيط يربط بين الجداول والموارد المختلفة (Drivers, Facilities, Driver Cards, Operation Cards).

### الترجمة والدعم العربي
- ملف ترجمة مخصص لتبديل النصوص إلى العربية.
- تخصيص القيم في Theme.
- دعم `document.dir = "rtl"`.

---

## 4. نماذج الإدخال والمراجع

- RA يدعم `SimpleForm`، ويمكن الاستفادة من تكامل `react-hook-form`.
- استخدام `react-hook-form` في جميع النماذج.
- عرض الحقول المرجعية كمفتاح أجنبي (CardTypeID, LicenseTypeID, SupplierID ...) باستخدام `ReferenceInput` من Supabase Data Provider.
- استخدام واجهات إدخال حديثة (`TextInput`) وتنسيق التاريخ باستخدام `DatePicker`.
- أو سجلات Audit Trail بتاريخ تطبيق أي إجراء.

---

## 5. خطوات Wizard (ra-wizard-form أو MUI Stepper)

### الخطوة 1: التحقق أو إنشاء المنشأة
- حقل لإدخال رقم رخصة المنشأة أو هويتها الوطنية `OPC_Facility`.
- إذا وُجدت منشأة متطابقة، الانتقال للخطوة التالية.
- إذا لم توجد، يظهر نموذج لإنشاء منشأة تحتوي على (IdentityNumber, Name, LicenseNumber, LicenseTypeID, LicenseCityID, LicenseIssueDate, LicenseExpirationDate).

### الخطوة 2: التحقق أو إنشاء السائق
- حقل لإدخال رقم الهوية الشخصية.
- البحث في `OPC_Driver`:
- إن وُجد السائق، يتم ربطه بالمنشأة.
- إن لم يوجد، يظهر نموذج إنشاء السائق مع (FirstName, LastName, IdentityNumber, FacilityID ...).

### الخطوة 3: إصدار بطاقة سائق
- نموذج يحتوي على:
- `react-hook-form` للجمع بين الحقول:
  - CardType (نص أو اختيار)
  - LicenseType من `OPC_LicenseType`
  - Supplier
  - تواريخ الإصدار والانتهاء (IssueDate, ExpirationDate)
  - DriverID (اختيار السائق من المنشأة)
- البطاقة مرتبطة بالمنشأة والسائق إن لزم الأمر.

### الخطوة 4 (اختيارية): إصدار بطاقة تشغيل
- مثل الخطوة السابقة ولكن خاصة بـ `OPC_Card`.
- الحقول الأساسية:
- CardType (نص أو اختيار).
- VehicleID (إن وُجد `OPC_Vehicle`).
- DriverID (يمكن استخدام السائق من الخطوة السابقة).
- Supplier, IssueDate, ExpirationDate.

---

## 6. موارد React Admin

- `Facility Resource`: قائمة، عرض، إنشاء.
- `Driver Resource`: قائمة، عرض، إنشاء.
- `DriverCard Resource`: قائمة، عرض، إنشاء فقط عبر Wizard.
- `OperationCard Resource`: قائمة، عرض، إنشاء فقط عبر Wizard.
- `Reference Tables`:
- LicenseType, Supplier, Vehicle
- كموارد للقراءة فقط لملء القوائم المنسدلة.

---

## 7. العمل المتبقي

- ضبط Data Provider لـ Supabase.
- تفعيل خطوات الـ Wizard.
- دعم الواجهة RTL.
- نشر النسخة النهائية بعد اختبار الربط مع Supabase.
