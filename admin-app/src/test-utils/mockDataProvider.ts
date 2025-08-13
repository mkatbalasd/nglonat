import type { DataProvider, RaRecord, Identifier } from 'react-admin'

// In-memory data store seeded with users and main resources
const data: Record<string, RaRecord[]> = {
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
  getList: async resource => ({
    data: data[resource] ?? [],
    total: data[resource]?.length ?? 0,
  }),
  getOne: async (resource, params) => ({
    data: (data[resource] ?? []).find(record => record.id === params.id) as RaRecord,
  }),
  getMany: async (resource, params) => ({
    data: (data[resource] ?? []).filter(record => params.ids.includes(record.id)),
  }),
  getManyReference: async (resource, params) => {
    const records = (data[resource] ?? []).filter(
      record => record[params.target] === params.id
    )
    return { data: records, total: records.length }
  },
  update: async (resource, params) => {
    const records = data[resource] ?? []
    const index = records.findIndex(record => record.id === params.id)
    const updated = { ...records[index], ...params.data }
    records[index] = updated
    data[resource] = records
    return { data: updated }
  },
  updateMany: async (resource, params) => {
    const records = data[resource] ?? []
    const ids: Identifier[] = []
    data[resource] = records.map(record => {
      if (params.ids.includes(record.id)) {
        ids.push(record.id)
        return { ...record, ...params.data }
      }
      return record
    })
    return { data: ids }
  },
  create: async (resource, params) => {
    const records = data[resource] ?? []
    const id =
      params.data.id ?? Math.max(0, ...records.map(r => Number(r.id))) + 1
    const record = { ...params.data, id }
    data[resource] = [...records, record]
    return { data: record }
  },
  delete: async (resource, params) => {
    const records = data[resource] ?? []
    const index = records.findIndex(record => record.id === params.id)
    const [removed] = records.splice(index, 1)
    data[resource] = records
    return { data: removed }
  },
  deleteMany: async (resource, params) => {
    const records = data[resource] ?? []
    data[resource] = records.filter(record => !params.ids.includes(record.id))
    return { data: params.ids }
  },
}

export default mockDataProvider
