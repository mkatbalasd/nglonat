import {
  List,
  Datagrid,
  TextField,
  ReferenceField,
  Show,
  SimpleShowLayout,
  Create,
  Edit,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
  DateInput,
} from 'react-admin'

export const FacilityList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="license_number" />
    </Datagrid>
  </List>
)

export const FacilityShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="identity_number" />
      <TextField source="name" />
      <TextField source="english_name" />
      <TextField source="license_number" />
      <ReferenceField source="license_type_id" reference="opc_license_type">
        <TextField source="license_type_name_ar" />
      </ReferenceField>
      <ReferenceField source="license_city_id" reference="city">
        <TextField source="name_ar" />
      </ReferenceField>
      <TextField source="license_issue_date" />
      <TextField source="license_expiration_date" />
    </SimpleShowLayout>
  </Show>
)

export const FacilityForm = () => (
  <SimpleForm>
    <TextInput source="identity_number" />
    <TextInput source="name" />
    <TextInput source="english_name" />
    <TextInput source="license_number" />
    <ReferenceInput source="license_type_id" reference="opc_license_type">
      <SelectInput optionText="license_type_name_ar" />
    </ReferenceInput>
    <ReferenceInput source="license_city_id" reference="city">
      <SelectInput optionText="name_ar" />
    </ReferenceInput>
    <DateInput source="license_issue_date" />
    <DateInput source="license_expiration_date" />
  </SimpleForm>
)

export const FacilityCreate = () => (
  <Create>
    <FacilityForm />
  </Create>
)

export const FacilityEdit = () => (
  <Edit>
    <FacilityForm />
  </Edit>
)

