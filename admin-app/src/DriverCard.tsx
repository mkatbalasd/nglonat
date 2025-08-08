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

export const DriverCardList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <ReferenceField source="DriverID" reference="OPC_Driver">
        <TextField source="FirstName" />
      </ReferenceField>
      <ReferenceField source="FacilityID" reference="OPC_Facility">
        <TextField source="Name" />
      </ReferenceField>
      <ReferenceField source="CardType" reference="OPC_LicenseType_view">
        <TextField source="LicenseTypeNameAR" />
      </ReferenceField>
      <TextField source="IssueDate" />
      <TextField source="ExpirationDate" />
    </Datagrid>
  </List>
)

export const DriverCardShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="CardNumber" />
      <ReferenceField source="DriverID" reference="OPC_Driver">
        <TextField source="FirstName" />
      </ReferenceField>
      <ReferenceField source="FacilityID" reference="OPC_Facility">
        <TextField source="Name" />
      </ReferenceField>
      <ReferenceField source="CardType" reference="OPC_LicenseType_view">
        <TextField source="LicenseTypeNameAR" />
      </ReferenceField>
      <ReferenceField source="Supplier" reference="Supplier">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="IssueDate" />
      <TextField source="ExpirationDate" />
      <TextField source="Status" />
    </SimpleShowLayout>
  </Show>
)

export const DriverCardForm = () => (
  <SimpleForm>
    <ReferenceInput source="FacilityID" reference="OPC_Facility">
      <SelectInput optionText="Name" />
    </ReferenceInput>
    <ReferenceInput source="DriverID" reference="OPC_Driver">
      <SelectInput optionText="FirstName" />
    </ReferenceInput>
    <ReferenceInput source="CardType" reference="OPC_LicenseType_view">
      <SelectInput optionText="LicenseTypeNameAR" />
    </ReferenceInput>
    <ReferenceInput source="Supplier" reference="Supplier">
      <SelectInput optionText="name" />
    </ReferenceInput>
    <DateInput source="IssueDate" />
    <DateInput source="ExpirationDate" />
    <TextInput source="Category" />
  </SimpleForm>
)

export const DriverCardCreate = () => (
  <Create>
    <DriverCardForm />
  </Create>
)

export const DriverCardEdit = () => (
  <Edit>
    <DriverCardForm />
  </Edit>
)

