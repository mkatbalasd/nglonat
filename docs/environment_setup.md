# دليل إعداد وتشغيل البيئة

1. **المتطلبات الأساسية**
   - تثبيت Node.js (الإصدار 18 أو أحدث) و npm.
   - حساب على [Supabase](https://supabase.com) للحصول على مفاتيح الاتصال.
2. **استنساخ المستودع وتشغيل الواجهة**
   ```bash
   git clone <repo-url>
   cd nglonat/admin-app
   npm install
   ```
3. **إعداد متغيرات البيئة**
   - افتح ملف `.env` الخاص بمشروع Supabase واستخرج القيمتين `SUPABASE_PUBLIC_URL` و`ANON_KEY`.
   - أنشئ ملفًا باسم `.env` داخل مجلد `admin-app` ثم انسخ القيم على النحو الآتي:
     ```
     VITE_SUPABASE_URL=<قيمة SUPABASE_PUBLIC_URL>
     VITE_SUPABASE_ANON_KEY=<قيمة ANON_KEY>
     ```
4. **التشغيل محليًا**
   ```bash
   npm run dev
   ```
   يتم تشغيل التطبيق افتراضيًا على العنوان `http://localhost:5173`.
5. **تنفيذ الاختبارات أو التحقق من الشيفرة**
   - لتشغيل أداة الفحص الساكن:
     ```bash
     npm run lint
     ```
