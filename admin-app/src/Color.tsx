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
      <TextField source="color_name" />
    </Datagrid>
  </List>
)

const ColorForm = () => (
  <SimpleForm>
    <TextInput source="color_name" />
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

