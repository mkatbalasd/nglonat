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
  ReferenceInput,
  SelectInput,
  DateInput,
} from 'react-admin'

export const OperationCardList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <ReferenceField source="facility_id" reference="opc_facility">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="driver_id" reference="opc_driver">
        <TextField source="first_name" />
      </ReferenceField>
      <ReferenceField source="vehicle_id" reference="opc_vehicle">
        <TextField source="plate_number" />
      </ReferenceField>
      <ReferenceField source="card_type" reference="opc_license_type">
        <TextField source="license_type_name_ar" />
      </ReferenceField>
      <TextField source="issue_date" />
      <TextField source="expiration_date" />
    </Datagrid>
  </List>
)

export const OperationCardShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="card_number" />
      <ReferenceField source="facility_id" reference="opc_facility">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="driver_id" reference="opc_driver">
        <TextField source="first_name" />
      </ReferenceField>
      <ReferenceField source="vehicle_id" reference="opc_vehicle">
        <TextField source="plate_number" />
      </ReferenceField>
      <ReferenceField source="supplier_id" reference="supplier">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="card_type" reference="opc_license_type">
        <TextField source="license_type_name_ar" />
      </ReferenceField>
      <TextField source="issue_date" />
      <TextField source="expiration_date" />
      <TextField source="status" />
    </SimpleShowLayout>
  </Show>
)

export const OperationCardForm = () => (
  <SimpleForm>
    <ReferenceInput source="facility_id" reference="opc_facility">
      <SelectInput optionText="name" />
    </ReferenceInput>
    <ReferenceInput source="driver_id" reference="opc_driver">
      <SelectInput optionText="first_name" />
    </ReferenceInput>
    <ReferenceInput source="vehicle_id" reference="opc_vehicle">
      <SelectInput optionText="plate_number" />
    </ReferenceInput>
    <ReferenceInput source="supplier_id" reference="supplier">
      <SelectInput optionText="name" />
    </ReferenceInput>
    <ReferenceInput source="card_type" reference="opc_license_type">
      <SelectInput optionText="license_type_name_ar" />
    </ReferenceInput>
    <DateInput source="issue_date" />
    <DateInput source="expiration_date" />
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

