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
  NumberInput,
} from 'react-admin'

export const VehicleList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <TextField source="PlateNumber" />
      <ReferenceField source="FacilityID" reference="OPC_Facility">
        <TextField source="Name" />
      </ReferenceField>
    </Datagrid>
  </List>
)

export const VehicleShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <ReferenceField source="FacilityID" reference="OPC_Facility">
        <TextField source="Name" />
      </ReferenceField>
      <TextField source="Brand" />
      <TextField source="Model" />
      <TextField source="Color" />
      <TextField source="PlateNumber" />
      <TextField source="SerialNumber" />
      <TextField source="ManufacturingYear" />
    </SimpleShowLayout>
  </Show>
)

export const VehicleForm = () => (
  <SimpleForm>
    <ReferenceInput source="FacilityID" reference="OPC_Facility">
      <SelectInput optionText="Name" />
    </ReferenceInput>
    <TextInput source="Brand" />
    <TextInput source="Model" />
    <TextInput source="Color" />
    <TextInput source="PlateNumber" />
    <TextInput source="SerialNumber" />
    <NumberInput source="ManufacturingYear" />
  </SimpleForm>
)

export const VehicleCreate = () => (
  <Create>
    <VehicleForm />
  </Create>
)

export const VehicleEdit = () => (
  <Edit>
    <VehicleForm />
  </Edit>
)

