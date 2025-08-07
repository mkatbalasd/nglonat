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
   - أنشئ ملفًا باسم `.env` داخل مجلد `admin-app` يتضمن القيم التالية:
     ```
     VITE_SUPABASE_URL=رابط-مشروع-supabase
     VITE_SUPABASE_ANON_KEY=المفتاح-العام
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
