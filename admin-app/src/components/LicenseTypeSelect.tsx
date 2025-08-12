import AddableSelect from './AddableSelect'

const LicenseTypeSelect = (props: Record<string, unknown>) => (
  <AddableSelect resource="opc_license_type" label="license_type_name_ar" {...props} />
)

export default LicenseTypeSelect
