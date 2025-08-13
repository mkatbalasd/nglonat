[![Codex CI](https://github.com/mkatbalasd/nglonat/actions/workflows/codex-ci.yml/badge.svg)](https://github.com/mkatbalasd/nglonat/actions/workflows/codex-ci.yml)

# مشروع nglonat

لوحة إدارة لبطاقات السائقين والتشغيل تعتمد على React Admin وSupabase.

## المتطلبات
- **Supabase**: قاعدة بيانات PostgreSQL وخدمات المصادقة وPostgREST لتخزين البيانات وإدارتها.
- **React Admin**: مكتبة واجهات لبناء لوحة الإدارة وتتطلب بيئة Node.js وnpm.

## التهيئة
يمكن البدء بالمستندات التالية:
- [دليل إعداد وتشغيل البيئة](docs/environment_setup.md)
- [دليل الترحيل من MySQL](docs/migration_from_mysql.md)
- [البنية الجديدة للجدول وخطوات الترحيل](docs/new_table_structure.md)
- [تشغيل سكربتات قاعدة البيانات](docs/run_db_scripts.md)
بعد إعداد البيئة، يُنصح بتشغيل ملفات SQL بالترتيب `schema.sql` ثم `functions.sql` ثم `security.sql` ثم `seed.sql` كما هو موضح في الدليل أعلاه.

## التوثيق
يمكن العثور على دليل الاستخدام الكامل في مجلد [docs](./docs)، والذي يشمل:
- [شرح هيكل المشروع ووظائف الملفات](docs/project_structure.md).
- [آلية النشر والتطوير المستقبلي](docs/deployment_and_future_updates.md).

## تشغيل سكربتات PostgreSQL

تحتاج سكربتات قواعد البيانات إلى تحديد متغيرات الاتصال التالية قبل التنفيذ:

- `PGUSER`: اسم مستخدم قاعدة البيانات.
- `PGPASSWORD`: كلمة المرور.
- `PGHOST`: عنوان الخادوم.
- `PGPORT`: المنفذ (الافتراضي `5432`).
- `PGDATABASE`: اسم قاعدة البيانات المستهدفة.

مثال لتشغيل سكربت باستخدام هذه المتغيرات:

```bash
PGUSER=postgres PGPASSWORD=secret PGHOST=localhost PGPORT=5432 PGDATABASE=postgres \
psql -f db/schema.sql
```

يمكن أيضاً استخدام متغيّر واحد `DB_URL` يحتوي على سلسلة الاتصال كاملة بالشكل:

```
postgresql://USER:PASSWORD@HOST:PORT/DATABASE
```

ستستخدم أوامر `npm run migrate` و`npm run seed` هذا المتغيّر تلقائياً:

```bash
export DB_URL=postgresql://postgres:secret@localhost:5432/postgres
npm run migrate
npm run seed
```

لتجنّب إدخال كلمة المرور في كل مرة، يمكن استخدام أحد الخيارين التاليين:

1. **ملف `.env`**
   - أنشئ ملفاً يحتوي المتغيرات السابقة:
     ```
     PGUSER=postgres
     PGPASSWORD=secret
     PGHOST=localhost
     PGPORT=5432
     PGDATABASE=postgres
     ```
   - حمّل القيم في الجلسة الحالية عبر:
     ```bash
     export $(grep -v '^#' .env | xargs)
     ```

2. **ملف `.pgpass`**
   - أنشئ ملفاً في المسار `~/.pgpass` بالقالب:
     ```
     localhost:5432:postgres:postgres:secret
     ```
   - غيّر أذوناته إلى `chmod 600 ~/.pgpass` وسيستخدمه `psql` تلقائياً دون طلب كلمة المرور.

## نشر المشروع على الخادوم

اتّبع الخطوات التالية لنشر التطبيق على خادوم الإنتاج:

1. **إعداد Supabase ذاتي الاستضافة**
   - استنسخ مستودع Supabase الرسمي وشغِّل الحاويات عبر `docker compose up -d`.
   - تأكّد من فتح المنافذ `5432` لقاعدة البيانات و`54321` لـ Studio و`8000` لـ PostgREST`.
   - عرِّف متغيّرات البيئة مثل `SUPABASE_ANON_KEY` و`SUPABASE_SERVICE_ROLE_KEY` واسم قاعدة البيانات قبل تشغيل الحاويات.

2. **تهيئة متغيّرات البيئة للتطبيق**
   - انسخ ملف `.env.example` داخل `admin-app` إلى `.env`.
   - انسخ القيم `SUPABASE_PUBLIC_URL` و`ANON_KEY` من ملف Supabase `.env` إلى `VITE_SUPABASE_URL` و`VITE_SUPABASE_ANON_KEY`.
   - لمزيد من التفاصيل، راجع [دليل إعداد وتشغيل البيئة](docs/environment_setup.md).

3. **بناء التطبيق ورفع مجلد الإنتاج**
   - ثبّت الحزم ثم نفّذ `npm run build`.
   - سينشأ مجلد `dist/`، ارفعه إلى الخادوم أو ضعه في حاوية مخصّصة لتقديم الملفات الثابتة.

4. **إعداد خادوم التقديم**
   - استخدم Nginx أو أي خادوم ويب لتوجيه الطلبات وتقديم محتويات مجلد `dist/`.
   - مثال إعداد Nginx:
     ```
     server {
         listen 80;
         server_name example.com;
         root /var/www/nglonat/dist;
         try_files $uri /index.html;
     }
     ```

5. **تفعيل HTTPS والاختبارات النهائية**
   - فعّل HTTPS باستخدام شهادات Let's Encrypt أو ما يعادلها، ثم حدّث إعداد Nginx ليستمع إلى المنفذ `443`.
   - اختبر التطبيق بعد النشر للتأكد من عمل الواجهات وتكامل الاتصال مع Supabase.


## التشغيل باستخدام Docker

يمكن تشغيل التطبيق محلياً باستخدام Docker Compose بعد تعريف متغيرات البيئة `VITE_SUPABASE_URL` و`VITE_SUPABASE_ANON_KEY`:

```bash
docker compose build
docker compose up -d
```

يعمل أمر `build` على تثبيت الاعتمادات وتشغيل عملية التجميع، ثم يخدم Nginx الملفات الناتجة على المنافذ `80` و`443`.
