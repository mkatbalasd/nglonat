import type {
  DataProvider,
  RaRecord,
  Identifier,
  GetListParams,
  GetListResult,
  GetOneParams,
  GetOneResult,
  GetManyParams,
  GetManyResult,
  GetManyReferenceParams,
  GetManyReferenceResult,
  UpdateParams,
  UpdateResult,
  CreateParams,
  CreateResult,
  DeleteParams,
  DeleteResult,
} from 'react-admin'

// In-memory data store seeded with users and main resources
const db: Record<string, RaRecord[]> = {
  users: [{ id: 1, name: 'Admin' }],
  opc_facility: [],
  opc_driver: [],
  opc_driver_card: [],
  opc_card: [],
  opc_license_type: [],
  opc_brand: [],
  opc_model: [],
  opc_color: [],
  supplier: [],
  city: [],
  opc_vehicle: [],
  audit_log: [],
}

const mockDataProvider: DataProvider = {
  getList: async <T extends RaRecord>(
    resource: string,
    _params: GetListParams
  ): Promise<GetListResult<T>> => ({
    data: (db[resource] as T[]) ?? [],
    total: (db[resource] ?? []).length,
  }),
  getOne: async <T extends RaRecord>(
    resource: string,
    params: GetOneParams<T>
  ): Promise<GetOneResult<T>> => ({
    data: (db[resource] ?? []).find(record => record.id === params.id) as T,
  }),
  getMany: async <T extends RaRecord>(
    resource: string,
    params: GetManyParams<T>
  ): Promise<GetManyResult<T>> => ({
    data: ((db[resource] as T[]) ?? []).filter(record =>
      params.ids.includes(record.id)
    ),
  }),
  getManyReference: async <T extends RaRecord>(
    resource: string,
    params: GetManyReferenceParams
  ): Promise<GetManyReferenceResult<T>> => {
    const records = ((db[resource] as T[]) ?? []).filter(
      record => record[params.target] === params.id
    )
    return { data: records, total: records.length }
  },
  update: async <T extends RaRecord>(
    resource: string,
    params: UpdateParams<T>
  ): Promise<UpdateResult<T>> => {
    const records = (db[resource] as T[]) ?? []
    const index = records.findIndex(record => record.id === params.id)
    const updated = { ...records[index], ...params.data } as T
    records[index] = updated
    db[resource] = records
    return { data: updated }
  },
  updateMany: async (resource, params) => {
    const records = db[resource] ?? []
    const ids: Identifier[] = []
    db[resource] = records.map(record => {
      if (params.ids.includes(record.id)) {
        ids.push(record.id)
        return { ...record, ...params.data }
      }
      return record
    })
    return { data: ids }
  },
  create: async <T extends RaRecord>(
    resource: string,
    params: CreateParams<T>
  ): Promise<CreateResult<T>> => {
    const records = (db[resource] as T[]) ?? []
    const id =
      (params.data as T & { id?: Identifier }).id ??
      Math.max(0, ...records.map(r => Number(r.id))) + 1
    const record = { ...params.data, id } as T
    db[resource] = [...records, record]
    return { data: record }
  },
  delete: async <T extends RaRecord>(
    resource: string,
    params: DeleteParams<T>
  ): Promise<DeleteResult<T>> => {
    const records = (db[resource] as T[]) ?? []
    const index = records.findIndex(record => record.id === params.id)
    const [removed] = records.splice(index, 1)
    db[resource] = records
    return { data: removed as T }
  },
  deleteMany: async (resource, params) => {
    const records = db[resource] ?? []
    db[resource] = records.filter(record => !params.ids.includes(record.id))
    return { data: params.ids }
  },
}

export default mockDataProvider
