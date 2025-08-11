import { SimpleForm, TextInput } from 'react-admin'

const CityQuickCreate = () => (
  <SimpleForm>
    <TextInput source="name_ar" />
    <TextInput source="name_en" />
  </SimpleForm>
)

export default CityQuickCreate
