import AddableSelect from './AddableSelect'

const LicenseTypeSelect = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: any
) => (
  <AddableSelect
    {...props}
    resource="opc_license_type"
    optionText="license_type_name_ar"
    /* باقي الإعدادات أو props الإضافية */
  />
)

export default LicenseTypeSelect

