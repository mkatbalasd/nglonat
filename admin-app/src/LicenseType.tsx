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
      <TextField source="name_ar" />
    </Datagrid>
  </List>
)

export const LicenseTypeShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name_ar" />
      <TextField source="name_en" />
    </SimpleShowLayout>
  </Show>
)

export const LicenseTypeForm = () => (
  <SimpleForm>
    <TextInput source="name_ar" />
    <TextInput source="name_en" />
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

