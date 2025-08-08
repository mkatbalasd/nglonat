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
      <ReferenceField source="BrandID" reference="OPC_Brand_view">
        <TextField source="BrandName" />
      </ReferenceField>
      <TextField source="ModelName" />
    </Datagrid>
  </List>
)

const ModelForm = () => (
  <SimpleForm>
    <ReferenceInput source="BrandID" reference="OPC_Brand_view">
      <SelectInput optionText="BrandName" />
    </ReferenceInput>
    <TextInput source="ModelName" />
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

