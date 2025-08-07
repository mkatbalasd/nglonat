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
      <TextField source="LicenseTypeID" />
      <TextField source="LicenseTypeNameAR" />
    </Datagrid>
  </List>
)

export const LicenseTypeShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="LicenseTypeID" />
      <TextField source="LicenseTypeNameAR" />
      <TextField source="LicenseTypeNameEN" />
    </SimpleShowLayout>
  </Show>
)

export const LicenseTypeForm = () => (
  <SimpleForm>
    <TextInput source="LicenseTypeNameAR" />
    <TextInput source="LicenseTypeNameEN" />
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

