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
        <TextField source="brand_name" />
      </ReferenceField>
      <TextField source="model_name" />
    </Datagrid>
  </List>
)

const ModelForm = () => (
  <SimpleForm>
    <ReferenceInput source="brand_id" reference="opc_brand">
      <SelectInput optionText="brand_name" />
    </ReferenceInput>
    <TextInput source="model_name" />
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

