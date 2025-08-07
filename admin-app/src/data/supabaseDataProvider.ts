import { createClient } from '@supabase/supabase-js'
import type {
  DataProvider,
  GetListParams,
  GetOneParams,
  CreateParams,
  UpdateParams,
  DeleteParams,
} from 'react-admin'
import { supabaseUrl, supabaseAnonKey } from '../supabaseClient'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

const supabaseDataProvider = () => ({
  getList: async (resource: string, params: GetListParams) => {
    const { page, perPage } = params.pagination ?? { page: 1, perPage: 10 }
    const { field, order } = params.sort ?? { field: 'id', order: 'ASC' }
    const from = (page - 1) * perPage
    const to = from + perPage - 1

    let query = supabase
      .from(resource)
      .select('*', { count: 'exact' })
      .order(field, { ascending: order === 'ASC' })
      .range(from, to)

    Object.entries(params.filter ?? {}).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        query = query.in(key, value)
      } else {
        query = query.eq(
          key,
          value as string | number | boolean | null
        )
      }
    })

    const { data, error, count } = await query
    if (error) throw error
    return { data: data ?? [], total: count ?? 0 }
  },

  getOne: async (resource: string, params: GetOneParams) => {
    const { data, error } = await supabase
      .from(resource)
      .select('*')
      .eq('id', params.id)
      .single()

    if (error) throw error
    return { data }
  },

  create: async (resource: string, params: CreateParams) => {
    const { data, error } = await supabase
      .from(resource)
      .insert(params.data)
      .select()
      .single()

    if (error) throw error
    return { data }
  },

  update: async (resource: string, params: UpdateParams) => {
    const { data, error } = await supabase
      .from(resource)
      .update(params.data)
      .eq('id', params.id)
      .select()
      .single()

    if (error) throw error
    return { data }
  },

  delete: async (resource: string, params: DeleteParams) => {
    const { data, error } = await supabase
      .from(resource)
      .delete()
      .eq('id', params.id)
      .select()
      .single()

    if (error) throw error
    return { data }
  },
}) as DataProvider

export default supabaseDataProvider
