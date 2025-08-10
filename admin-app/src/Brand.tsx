import {
  List,
  Datagrid,
  TextField,
  Create,
  Edit,
  SimpleForm,
  TextInput,
} from 'react-admin'

export const BrandList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
    </Datagrid>
  </List>
)

const BrandForm = () => (
  <SimpleForm>
    <TextInput source="name" />
  </SimpleForm>
)

export const BrandCreate = () => (
  <Create>
    <BrandForm />
  </Create>
)

export const BrandEdit = () => (
  <Edit>
    <BrandForm />
  </Edit>
)

