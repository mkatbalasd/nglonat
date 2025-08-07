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

export const SupplierList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <TextField source="name" />
    </Datagrid>
  </List>
)

export const SupplierShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
    </SimpleShowLayout>
  </Show>
)

export const SupplierForm = () => (
  <SimpleForm>
    <TextInput source="name" />
  </SimpleForm>
)

export const SupplierCreate = () => (
  <Create>
    <SupplierForm />
  </Create>
)

export const SupplierEdit = () => (
  <Edit>
    <SupplierForm />
  </Edit>
)

