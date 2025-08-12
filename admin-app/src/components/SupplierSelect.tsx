import AddableSelect from './AddableSelect'

const SupplierSelect = (props: Record<string, unknown>) => (
  <AddableSelect resource="supplier" label="name" {...props} />
)

export default SupplierSelect
