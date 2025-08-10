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
      <TextField source="brand_name" />
    </Datagrid>
  </List>
)

const BrandForm = () => (
  <SimpleForm>
    <TextInput source="brand_name" />
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

