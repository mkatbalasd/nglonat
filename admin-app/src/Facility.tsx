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
      <TextField source="Name" />
      <TextField source="LicenseNumber" />
    </Datagrid>
  </List>
)

export const FacilityShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="IdentityNumber" />
      <TextField source="Name" />
      <TextField source="EnglishName" />
      <TextField source="LicenseNumber" />
      <ReferenceField source="LicenseTypeID" reference="OPC_LicenseType_view">
        <TextField source="LicenseTypeNameAR" />
      </ReferenceField>
      <ReferenceField source="LicenseCityID" reference="City">
        <TextField source="NameAr" />
      </ReferenceField>
      <TextField source="LicenseIssueDate" />
      <TextField source="LicenseExpirationDate" />
    </SimpleShowLayout>
  </Show>
)

export const FacilityForm = () => (
  <SimpleForm>
    <TextInput source="IdentityNumber" />
    <TextInput source="Name" />
    <TextInput source="EnglishName" />
    <TextInput source="LicenseNumber" />
    <ReferenceInput source="LicenseTypeID" reference="OPC_LicenseType_view">
      <SelectInput optionText="LicenseTypeNameAR" />
    </ReferenceInput>
    <ReferenceInput source="LicenseCityID" reference="City">
      <SelectInput optionText="NameAr" />
    </ReferenceInput>
    <DateInput source="LicenseIssueDate" />
    <DateInput source="LicenseExpirationDate" />
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

