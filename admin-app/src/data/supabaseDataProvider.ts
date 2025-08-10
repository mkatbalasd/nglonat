/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  DataProvider,
  GetListParams,
  GetOneParams,
  GetManyParams,
  GetManyReferenceParams,
  CreateParams,
  UpdateParams,
  UpdateManyParams,
  DeleteParams,
  DeleteManyParams,
} from 'react-admin'
import { supabase } from '../supabaseClient'

/**
 * موفّر بيانات يعتمد على Supabase لتنفيذ عمليات CRUD مع دعم تسجيل العمليات.
 * يمكن تمرير عميل Supabase مخصّص لاستخدامه في الاختبارات أو السياقات المختلفة.
 *
 * @param client عميل Supabase جاهز للاستخدام.
 * @returns كائن {@link DataProvider} متوافق مع React-Admin.
 */
const supabaseDataProvider = (client = supabase): DataProvider => {
  /**
   * يسجل العملية في جدول audit_log مع تجاهل أي أخطاء قد تحدث أثناء التسجيل.
   */
  const logAudit = async (
    action: string,
    resource: string,
    record: unknown,
    id?: string | number
  ) => {
    try {
      await client.from('audit_log').insert({
        table_name: resource,
        action,
        record_id: id ?? ((record as { id?: string | number })?.id ?? null),
        payload: record,
      })
    } catch (error) {
      console.error('Failed to log audit action', error)
    }
  }

  return {
  /**
   * جلب قائمة من السجلات مع دعم التصفية والترتيب والتقسيم إلى صفحات.
   *
   * @param resource اسم الجدول أو المورد في Supabase.
   * @param params معلومات التصفية والترتيب والصفحات.
   * @returns قائمة السجلات وعددها الكلي.
   * @throws يظهر خطأ من Supabase عند فشل التنفيذ.
   */
  async getList(resource: string, params: GetListParams) {
    const { page, perPage } = params.pagination ?? { page: 1, perPage: 10 }
    const { field, order } = params.sort ?? { field: 'id', order: 'ASC' }
    const from = (page - 1) * perPage
    const to = from + perPage - 1

    let query = (client as any)
      .from(resource)
      .select('*', { count: 'exact' })
      .order(field, { ascending: order === 'ASC' })
      .range(from, to)

    Object.entries(params.filter ?? {}).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        query = query.in(key, value)
      } else {
        query = query.eq(key, value as string | number | boolean | null)
      }
    })

    const { data, error, count } = await query
    if (error) {
      console.error(`Supabase error in ${resource}/getList`, error)
      throw error
    }
    return { data: data ?? [], total: count ?? 0 }
  },

  /**
   * جلب سجل واحد اعتماداً على المعرّف.
   *
   * @param resource اسم الجدول أو المورد.
   * @param params يحوي المعرّف المطلوب.
   * @returns السجل المطلوب.
   * @throws يظهر خطأ من Supabase عند فشل التنفيذ.
   */
  async getOne(resource: string, params: GetOneParams) {
    const { data, error } = await (client as any)
      .from(resource)
      .select('*')
      .eq('id', params.id)
      .single()
    if (error) {
      console.error(`Supabase error in ${resource}/getOne`, error)
      throw error
    }
    return { data }
  },

  /**
   * جلب عدة سجلات حسب مجموعة من المعرفات مع إمكانية التصفية.
   *
   * @param resource اسم الجدول أو المورد.
   * @param params يحوي قائمة المعرفات ومرشحات إضافية.
   * @returns السجلات المطابقة.
   * @throws يظهر خطأ من Supabase عند فشل التنفيذ.
   */
  async getMany(resource: string, params: GetManyParams) {
    let query = (client as any)
      .from(resource)
      .select('*')
      .in('id', params.ids)

    const filter = (params as { filter?: Record<string, unknown> }).filter ?? {}
    Object.entries(filter).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        query = query.in(key, value)
      } else {
        query = query.eq(key, value as string | number | boolean | null)
      }
    })

    const { data, error } = await query
    if (error) {
      console.error(`Supabase error in ${resource}/getMany`, error)
      throw error
    }
    return { data: data ?? [] }
  },

  /**
   * جلب سجلات مرتبطة بسجل آخر عبر مفتاح أجنبي مع دعم التصفية والصفحات.
   *
   * @param resource اسم الجدول أو المورد.
   * @param params يحوي معلومات المرجع والتصفية والصفحات.
   * @returns السجلات المطابقة وعددها الكلي.
   * @throws يظهر خطأ من Supabase عند فشل التنفيذ.
   */
  async getManyReference(resource: string, params: GetManyReferenceParams) {
    const { page, perPage } = params.pagination ?? { page: 1, perPage: 10 }
    const { field, order } = params.sort ?? { field: 'id', order: 'ASC' }
    const from = (page - 1) * perPage
    const to = from + perPage - 1

    let query = (client as any)
      .from(resource)
      .select('*', { count: 'exact' })
      .order(field, { ascending: order === 'ASC' })
      .range(from, to)
      .eq(params.target, params.id)

    Object.entries(params.filter ?? {}).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        query = query.in(key, value)
      } else {
        query = query.eq(key, value as string | number | boolean | null)
      }
    })

    const { data, error, count } = await query

    if (error) {
      console.error(`Supabase error in ${resource}/getManyReference`, error)
      throw error
    }
    return { data: data ?? [], total: count ?? 0 }
  },

  /**
   * إنشاء سجل جديد في المورد المحدّد.
   *
   * @param resource اسم الجدول أو المورد.
   * @param params البيانات المراد إدخالها.
   * @returns السجل المُنشأ.
   * @throws يظهر خطأ من Supabase عند فشل التنفيذ.
   */
  async create(resource: string, params: CreateParams) {
    const { data, error } = await (client as any)
      .from(resource)
      .insert(params.data)
      .select('*')
      .single()
    if (error) {
      console.error(`Supabase error in ${resource}/create`, error)
      throw error
    }
    await logAudit('create', resource, data, (data as { id?: string | number })?.id)
    return { data }
  },

  /**
   * تحديث سجل موجود بالمعرّف.
   *
   * @param resource اسم الجدول أو المورد.
   * @param params يحتوي على المعرّف والبيانات الجديدة.
   * @returns السجل بعد التحديث.
   * @throws يظهر خطأ من Supabase عند فشل التنفيذ.
  */
  async update(resource: string, params: UpdateParams) {
    const { data: updated, error } = await (client as any)
      .from(resource)
      .update(params.data)
      .eq('id', params.id)
      .select('*')
      .single()

    if (error) {
      console.error(`Supabase error in ${resource}/update`, error)
      throw error
    }
    await logAudit('update', resource, updated, params.id)
    return { data: updated }
  },

  /**
   * تحديث مجموعة من السجلات وفق قائمة من المعرفات مع دعم التصفية.
   *
   * @param resource اسم الجدول أو المورد.
   * @param params يحوي المعرفات والبيانات الجديدة ومرشحات إضافية.
   * @returns قائمة المعرفات التي تم تحديثها.
   * @throws يظهر خطأ من Supabase عند فشل التنفيذ.
   */
  async updateMany(resource: string, params: UpdateManyParams) {
    let query = client.from(resource).update(params.data).in('id', params.ids)

    const filter = (params as { filter?: Record<string, unknown> }).filter ?? {}
    Object.entries(filter).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        query = query.in(key, value)
      } else {
        query = query.eq(key, value as string | number | boolean | null)
      }
    })

    const { data: updated, error } = await (query as any).select('id')
    if (error) {
      console.error(`Supabase error in ${resource}/updateMany`, error)
      throw error
    }
    const ids = (updated ?? []).map(
      (record: { id: string | number }) => record.id
    )
    return { data: ids }
  },

  /**
   * حذف سجل موجود بالمعرّف.
   *
   * @param resource اسم الجدول أو المورد.
   * @param params يحتوي على المعرّف المراد حذفه.
   * @returns السجل المحذوف.
   * @throws يظهر خطأ من Supabase عند فشل التنفيذ.
   */
  async delete(resource: string, params: DeleteParams) {
    const { data, error } = await (client as any)
      .from(resource)
      .delete()
      .eq('id', params.id)
      .select('*')
      .single()
    if (error) {
      console.error(`Supabase error in ${resource}/delete`, error)
      throw error
    }
    await logAudit('delete', resource, data, params.id)
    return { data }
  },

  /**
   * حذف مجموعة من السجلات وفق قائمة من المعرفات مع دعم التصفية.
   *
   * @param resource اسم الجدول أو المورد.
   * @param params يحوي قائمة المعرفات المراد حذفها ومرشحات إضافية.
   * @returns قائمة المعرفات التي تم حذفها.
   * @throws يظهر خطأ من Supabase عند فشل التنفيذ.
   */
  async deleteMany(resource: string, params: DeleteManyParams) {
    let query = client.from(resource).delete().in('id', params.ids)

    const filter = (params as { filter?: Record<string, unknown> }).filter ?? {}
    Object.entries(filter).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        query = query.in(key, value)
      } else {
        query = query.eq(key, value as string | number | boolean | null)
      }
    })

    const { data, error } = await (query as any).select('id')
    if (error) {
      console.error(`Supabase error in ${resource}/deleteMany`, error)
      throw error
    }
    const ids = (data ?? []).map(
      (record: { id: string | number }) => record.id
    )
    return { data: ids }
  },
} as DataProvider
}

export default supabaseDataProvider

