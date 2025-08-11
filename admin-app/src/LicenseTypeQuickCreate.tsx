import { SimpleForm, TextInput } from 'react-admin'

const LicenseTypeQuickCreate = () => (
  <SimpleForm>
    <TextInput source="license_type_name_ar" />
    <TextInput source="license_type_name_en" />
  </SimpleForm>
)

export default LicenseTypeQuickCreate
