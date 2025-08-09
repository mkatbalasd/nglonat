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
      <TextField source="NameAr" />
      <TextField source="NameEn" />
    </Datagrid>
  </List>
)

const CityForm = () => (
  <SimpleForm>
    <TextInput source="NameAr" />
    <TextInput source="NameEn" />
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

