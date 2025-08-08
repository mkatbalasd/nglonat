# دليل الترحيل من MySQL إلى PostgreSQL

يشرح هذا المستند خطوات تحويل قواعد البيانات من MySQL إلى PostgreSQL (المستخدمة في Supabase)، بما في ذلك الجداول والدوال والقوادح.

## 1. تصدير قاعدة بيانات MySQL
- استخدم `mysqldump` لاستخراج البنية والبيانات مع الدوال والقوادح:
  ```bash
  mysqldump --routines --triggers --databases old_db > old_db.sql
  ```

## 2. إنشاء قاعدة PostgreSQL جديدة
- أنشئ قاعدة بيانات فارغة:
  ```bash
  createdb new_db
  ```

## 3. تحويل الجداول والبيانات
- استخدم [pgloader](https://pgloader.readthedocs.io/) لنقل الجداول مباشرة:
  ```bash
  pgloader mysql://user:pass@localhost/old_db postgresql://user:pass@localhost/new_db
  ```
- تحقّق من الجداول بعد التحويل:
  ```bash
  psql -d new_db -c '\dt'
  ```

## 4. تحويل الدوال (Functions)
- قد تتطلب الدوال إعادة كتابة بلغة `plpgsql`:
  ```sql
  -- مثال دالة في MySQL
  CREATE FUNCTION add_tax(total DECIMAL(10,2)) RETURNS DECIMAL(10,2)
  BEGIN
    RETURN total * 1.05;
  END;

  -- الصيغة في PostgreSQL
  CREATE OR REPLACE FUNCTION add_tax(total numeric)
  RETURNS numeric AS $$
  BEGIN
    RETURN total * 1.05;
  END;
  $$ LANGUAGE plpgsql;
  ```

## 5. تحويل القوادح (Triggers)
- قم بإنشاء دالة في PostgreSQL ثم اربطها بقادح:
  ```sql
  -- قادح قبل الإدراج في MySQL
  CREATE TRIGGER before_insert
  BEFORE INSERT ON orders
  FOR EACH ROW SET NEW.created_at = NOW();

  -- في PostgreSQL
  CREATE OR REPLACE FUNCTION set_created_at()
  RETURNS trigger AS $$
  BEGIN
    NEW.created_at := NOW();
    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;

  CREATE TRIGGER before_insert
  BEFORE INSERT ON orders
  FOR EACH ROW EXECUTE FUNCTION set_created_at();
  ```

## 6. التحقق النهائي
- بعد الانتهاء، نفّذ اختبارات للتأكد من عمل الدوال والقوادح:
  ```bash
  psql -d new_db -c 'SELECT add_tax(100);'
  psql -d new_db -c 'INSERT INTO orders(id) VALUES (1);'
  ```

- راجع السجلات والبيانات للتأكد من سلامة التحويل.
