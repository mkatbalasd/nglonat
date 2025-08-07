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
} from 'react-admin'

export const DriverList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="DriverID" />
      <TextField source="FirstName" />
      <TextField source="LastName" />
      <ReferenceField source="FacilityID" reference="OPC_Facility">
        <TextField source="Name" />
      </ReferenceField>
    </Datagrid>
  </List>
)

export const DriverShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="DriverID" />
      <TextField source="FirstName" />
      <TextField source="LastName" />
      <TextField source="IdentityNumber" />
      <ReferenceField source="FacilityID" reference="OPC_Facility">
        <TextField source="Name" />
      </ReferenceField>
    </SimpleShowLayout>
  </Show>
)

export const DriverForm = () => (
  <SimpleForm>
    <ReferenceInput source="FacilityID" reference="OPC_Facility">
      <SelectInput optionText="Name" />
    </ReferenceInput>
    <TextInput source="FirstName" />
    <TextInput source="LastName" />
    <TextInput source="IdentityNumber" />
  </SimpleForm>
)

export const DriverCreate = () => (
  <Create>
    <DriverForm />
  </Create>
)

export const DriverEdit = () => (
  <Edit>
    <DriverForm />
  </Edit>
)

