import {
  List,
  Datagrid,
  TextField,
  Create,
  Edit,
  SimpleForm,
  TextInput,
} from 'react-admin'

export const CityList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name_ar" />
      <TextField source="name_en" />
    </Datagrid>
  </List>
)

const CityForm = () => (
  <SimpleForm>
    <TextInput source="name_ar" />
    <TextInput source="name_en" />
  </SimpleForm>
)

export const CityCreate = () => (
  <Create>
    <CityForm />
  </Create>
)

export const CityEdit = () => (
  <Edit>
    <CityForm />
  </Edit>
)

