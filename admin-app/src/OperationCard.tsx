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

export const OperationCardList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <ReferenceField source="FacilityID" reference="OPC_Facility">
        <TextField source="Name" />
      </ReferenceField>
      <ReferenceField source="DriverID" reference="OPC_Driver">
        <TextField source="FirstName" />
      </ReferenceField>
      <ReferenceField source="VehicleID" reference="OPC_Vehicle">
        <TextField source="PlateNumber" />
      </ReferenceField>
      <TextField source="IssueDate" />
      <TextField source="ExpirationDate" />
    </Datagrid>
  </List>
)

export const OperationCardShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="CardNumber" />
      <ReferenceField source="FacilityID" reference="OPC_Facility">
        <TextField source="Name" />
      </ReferenceField>
      <ReferenceField source="DriverID" reference="OPC_Driver">
        <TextField source="FirstName" />
      </ReferenceField>
      <ReferenceField source="VehicleID" reference="OPC_Vehicle">
        <TextField source="PlateNumber" />
      </ReferenceField>
      <ReferenceField source="Supplier" reference="Supplier">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="CardType" />
      <TextField source="IssueDate" />
      <TextField source="ExpirationDate" />
      <TextField source="Status" />
    </SimpleShowLayout>
  </Show>
)

export const OperationCardForm = () => (
  <SimpleForm>
    <ReferenceInput source="FacilityID" reference="OPC_Facility">
      <SelectInput optionText="Name" />
    </ReferenceInput>
    <ReferenceInput source="DriverID" reference="OPC_Driver">
      <SelectInput optionText="FirstName" />
    </ReferenceInput>
    <ReferenceInput source="VehicleID" reference="OPC_Vehicle">
      <SelectInput optionText="PlateNumber" />
    </ReferenceInput>
    <ReferenceInput source="Supplier" reference="Supplier">
      <SelectInput optionText="name" />
    </ReferenceInput>
    <TextInput source="CardType" />
    <DateInput source="IssueDate" />
    <DateInput source="ExpirationDate" />
  </SimpleForm>
)

export const OperationCardCreate = () => (
  <Create>
    <OperationCardForm />
  </Create>
)

export const OperationCardEdit = () => (
  <Edit>
    <OperationCardForm />
  </Edit>
)

