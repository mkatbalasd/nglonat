import {
  List,
  Datagrid,
  TextField,
  ReferenceField,
  Create,
  Edit,
  SimpleForm,
  ReferenceInput,
  SelectInput,
  TextInput,
} from 'react-admin'

export const ModelList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <ReferenceField source="brand_id" reference="opc_brand">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="name" />
    </Datagrid>
  </List>
)

const ModelForm = () => (
  <SimpleForm>
    <ReferenceInput source="brand_id" reference="opc_brand">
      <SelectInput optionText="name" />
    </ReferenceInput>
    <TextInput source="name" />
  </SimpleForm>
)

export const ModelCreate = () => (
  <Create>
    <ModelForm />
  </Create>
)

export const ModelEdit = () => (
  <Edit>
    <ModelForm />
  </Edit>
)

