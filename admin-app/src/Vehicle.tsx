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
import ModelSelect from './components/ModelSelect'
import ColorSelect from './components/ColorSelect'

export const VehicleList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <TextField source="plate_number" />
      <ReferenceField source="facility_id" reference="opc_facility">
        <TextField source="name" />
      </ReferenceField>
    </Datagrid>
  </List>
)

export const VehicleShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <ReferenceField source="facility_id" reference="opc_facility">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="model_id" reference="opc_model">
        <TextField source="model_name" />
      </ReferenceField>
      <ReferenceField source="color_id" reference="opc_color">
        <TextField source="color_name" />
      </ReferenceField>
      <TextField source="plate_number" />
      <TextField source="serial_number" />
      <TextField source="manufacturing_year" />
    </SimpleShowLayout>
  </Show>
)

export const VehicleForm = () => (
  <SimpleForm>
    <ReferenceInput source="facility_id" reference="opc_facility">
      <SelectInput optionText="name" />
    </ReferenceInput>
    <ModelSelect source="model_id" />
    <ColorSelect source="color_id" />
    <TextInput source="plate_number" />
    <TextInput source="serial_number" />
    <NumberInput source="manufacturing_year" />
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

