# خطة مشروع لوحة إدارة البطاقات

تهدف هذه الخطة إلى بناء لوحة تحكم متكاملة باستخدام React Admin و Supabase لإدارة بطاقات السائقين (Driver Cards) وبطاقات التشغيل (Operation Cards) بناءً على قاعدة البيانات المرفقة، وذلك باستخدام النموذج الجاهز من React Admin: https://marmelab.com/react-admin-demo/، مع تعديل بسيط ليتناسب مع متطلبات المشروع. لا نحتاج لتفعيل سجل الأحداث Audit Trail.

---

## 1. إعداد البيئة والتقنيات

### تهيئة المشروع
- إنشاء تطبيق React Admin Vite (أو CRA).
- تثبيت الحزم الأساسية:

```bash
npm install react-admin @mui/material @emotion/react @emotion/styled
npm install @supabase/supabase-js
npm install ra-wizard-form react-hook-form dayjs
```

### Supabase
- رفع الجداول المطلوبة إلى Supabase (ملف قاعدة البيانات موجود في `/db/schema.sql`).
- إعداد Supabase Auth (للمستخدمين) + Supabase client.js.
- إعداد Supabase Data Provider
  - يمكن استخدام مزود جاهز أو تخصيص مزود بسيط باستخدام Supabase client.

---

## 2. تصميم قاعدة البيانات (مرجع مختصر)

- OPC_Facility: منشآت التشغيل (مع رقم الترخيص، الاسم، نوع الجهة المصدرة، تاريخ الانتهاء...).
- OPC_LicenseType: أنواع الترخيص (ترخيص بلدي، نقل، إلخ).
- OPC_Driver: السائقون.
- OPC_DriverCard: بطاقة السائقين (تربط بين السائق والمنشأة) وتحتوي على (cardtype, cardtypeID, issueDate, expirationDate, supplier).
- OPC_Supplier: الموردون.

---

## 3. مخطط الواجهة وتجربة الاستخدام

### 1. التصميم العام
- استخدام خط "Segoe UI", Tahoma, sans-serif.
- RTL كامل عبر MUI Theme (direction: rtl).
- الاعتماد على تصميم نظيف باستخدام MUI's Flexbox/Grid.
- تعديل React Admin layout ليشمل صفحة Wizard منفصلة لـ 3 كيانات (Drivers, Facilities, Driver Cards, Operation Cards).

### 2. الواجهة العامة
- لوحة رئيسية (Dashboard).
- صفحة Wizard: مخصص للعملية الموجهة لإضافة بطاقة.
- استخدام Theme مخصص داخل `src/muiTheme`.

---

## 4. النماذج (Forms)

- RA لا يدعم react-hook-form في جميع النماذج بشكل مباشر، لكن يمكن استخدامه في `<SimpleForm>`, `<TextInput>` ...
- استخدم إدخال مرجعي (ReferenceInput) لاختيار `cardtypeID`, `licenseTypeID`, `supplierID` من جداول المرجعية المرتبطة عبر Supabase Dropdown.
- تواريخ هجري يتم إدخالها كنص (TextInput) بصيغة `"1446-01-01"`، بدون DatePicker.
- لا حاجة لتفعيل Audit Trail في أي نموذج.

---

## 5. خطوات الـ Wizard (ra-wizard-form أو MUI Stepper)

### الخطوة 1: التحقق أو إنشاء المنشأة
1. يدخل المستخدم رقم هوية المنشأة أو رقم الترخيص.
2. يتم البحث عن المنشأة في Supabase عبر:
   - إما FacilityID أو LicenseNumber.
3. إذا وُجدت → الانتقال للخطوة التالية في Wizard.
4. إذا لم توجد → فتح نموذج لإدخال بيانات المنشأة (اسم المنشأة، جهة الترخيص، LicenseNumber, LicenseExpirationDate ...).

### الخطوة 2: التحقق أو إنشاء السائق

1. إدخال رقم الهوية للسائق.
2. يتم البحث في جدول OPC_Driver.
3. إذا لم يوجد → فتح نموذج إدخال (FirstName, LastName, IdentityNumber, FacilityID ...).
4. إذا وُجد → الانتقال للخطوة التالية.

### الخطوة 3: إصدار بطاقة السائق

1. نموذج البطاقة:
   - CardType (بطاقة نقل، إلخ).
   - التاريخ الهجري (IssueDate, ExpirationDate).
   - DriverID (تم ربطه من الخطوة السابقة).
   - Supplier, LicenseType (dropdown).
2. ربط البطاقة بالسائق والمنشأة التي تم إدخالهما في الخطوات السابقة.

### الخطوة 4 (اختيارية): إصدار بطاقة تشغيل

1. نفس منطق الخطوة السابقة، مع بيانات إضافية:
   - VehicleID (من جدول OPC_Vehicle المرتبط بالمنشأة).
   - SupplierID (من جدول الموردين).
2. يمكن استكمالها لاحقًا أو جعلها اختيارية في نهاية الـ Wizard.

---

## 6. موارد React Admin

1. Facility Resource
   - قائمة عرض، تحرير، إنشاء.
2. Driver Resource
   - قائمة عرض، تحرير، إنشاء.
3. DriverCard Resource
   - قائمة عرض، إنشاء Wizard فقط.
4. OperationCard Resource
   - اختيارية (نفس منطق DriverCard).
5. Reference pages
   - licenseType, supplier, Vehicle كمراجع فقط لأجل القوائم المسندة.

---

## 7. العمل المتبقي

1. Wizard Data Provider (Supabase).
2. التحقق من العلاقات.
3. إعداد RTL مخصص للـ Theme.
4. بعد الانتهاء يتم نشر المشروع على (Vercel, Netlify...) بعد ربطه مع Supabase.

📁 يتم حفظ المشروع كاملاً مع خطة التطوير داخل `/docs/plan.md` مع هذه الخطة في الملف.
