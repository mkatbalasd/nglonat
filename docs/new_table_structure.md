# البنية الجديدة للجدول وآلية الترحيل

## بنية الجدول
| الحقل | النوع | الوصف |
|-------|------|--------|
| `id` | BIGSERIAL / BIGINT AUTO_INCREMENT | معرف فريد يستخدم كمفتاح أساسي. يتم توليده تلقائيًا. |
| `created_at` | TIMESTAMPTZ / TIMESTAMP DEFAULT CURRENT_TIMESTAMP | وقت إنشاء السجل ويملأ تلقائيًا عند الإدراج. |

## خطوات تحويل البيانات من المخطط القديم
### PostgreSQL
1. إضافة الحقول الجديدة:
   ```sql
   ALTER TABLE drivers ADD COLUMN id BIGSERIAL PRIMARY KEY;
   ALTER TABLE drivers ADD COLUMN created_at TIMESTAMPTZ DEFAULT NOW();
   ```
2. تعبئة قيمة `created_at` للصفوف القديمة:
   ```sql
   UPDATE drivers SET created_at = NOW() WHERE created_at IS NULL;
   ```

### MySQL
1. إضافة الحقول الجديدة:
   ```sql
   ALTER TABLE drivers ADD COLUMN id BIGINT AUTO_INCREMENT PRIMARY KEY;
   ALTER TABLE drivers ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
   ```
2. تعبئة قيمة `created_at` للصفوف القديمة:
   ```sql
   UPDATE drivers SET created_at = NOW() WHERE created_at IS NULL;
   ```

> **ملاحظة:** استبدل اسم الجدول `drivers` بالاسم المناسب في مشروعك.

## أمثلة على استعلامات الإدراج والتحديث
```sql
-- إدراج سجل جديد، يتم توليد `id` و `created_at` تلقائيًا
INSERT INTO drivers (name) VALUES ('أحمد');

-- تحديث سجل موجود باستخدام `id`
UPDATE drivers SET name = 'محمد' WHERE id = 1;
```
