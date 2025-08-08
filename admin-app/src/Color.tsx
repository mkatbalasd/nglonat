import {
  List,
  Datagrid,
  TextField,
  Create,
  Edit,
  SimpleForm,
  TextInput,
} from 'react-admin'

export const ColorList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="ColorName" />
    </Datagrid>
  </List>
)

const ColorForm = () => (
  <SimpleForm>
    <TextInput source="ColorName" />
  </SimpleForm>
)

export const ColorCreate = () => (
  <Create>
    <ColorForm />
  </Create>
)

export const ColorEdit = () => (
  <Edit>
    <ColorForm />
  </Edit>
)

