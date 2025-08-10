# تشغيل سكربتات قواعد البيانات

يوضح هذا الدليل كيفية تنفيذ ملفات SQL الأساسية بالترتيب الصحيح لتهيئة قاعدة البيانات.

## التنفيذ اليدوي
نفّذ الملفات التالية باستخدام `psql` أو أي عميل PostgreSQL آخر مع الاستبدال بالقيم المناسبة لاسم القاعدة والمستخدم:

```bash
psql -d <اسم_القاعدة> -U <المستخدم> -f db/schema.sql
psql -d <اسم_القاعدة> -U <المستخدم> -f db/functions.sql
psql -d <اسم_القاعدة> -U <المستخدم> -f db/security.sql
psql -d <اسم_القاعدة> -U <المستخدم> -f db/seed.sql
```

## استخدام أوامر npm
كبديل يمكن تشغيل السكربتات المجمعة عبر أوامر npm:

```bash
npm run migrate   # ينفذ rebuild_tables.sql الذي يستدعي schema.sql وfunctions.sql وsecurity.sql
npm run seed      # ينفذ seed.sql لإدخال البيانات التجريبية
```
