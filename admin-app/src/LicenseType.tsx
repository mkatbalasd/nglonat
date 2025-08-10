import {
  List,
  Datagrid,
  TextField,
  Show,
  SimpleShowLayout,
  Create,
  Edit,
  SimpleForm,
  TextInput,
} from 'react-admin'

export const LicenseTypeList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <TextField source="license_type_name_ar" />
    </Datagrid>
  </List>
)

export const LicenseTypeShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="license_type_name_ar" />
      <TextField source="license_type_name_en" />
    </SimpleShowLayout>
  </Show>
)

export const LicenseTypeForm = () => (
  <SimpleForm>
    <TextInput source="license_type_name_ar" />
    <TextInput source="license_type_name_en" />
  </SimpleForm>
)

export const LicenseTypeCreate = () => (
  <Create>
    <LicenseTypeForm />
  </Create>
)

export const LicenseTypeEdit = () => (
  <Edit>
    <LicenseTypeForm />
  </Edit>
)

