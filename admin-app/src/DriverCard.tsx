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
  Button,
  TopToolbar,
} from 'react-admin'
import { useNavigate } from 'react-router-dom'

export const DriverCardList = () => {
  const navigate = useNavigate()

  return (
    <List
      actions={
        <TopToolbar>
          <Button
            label="إصدار بطاقة جديدة"
            onClick={() => navigate('/wizard/driver-card/facility')}
          />
        </TopToolbar>
      }
    >
      <Datagrid rowClick="show">
        <TextField source="id" />
        <ReferenceField source="driver_id" reference="opc_driver">
          <TextField source="first_name" />
        </ReferenceField>
        <ReferenceField source="facility_id" reference="opc_facility">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField source="card_type" reference="opc_license_type">
          <TextField source="license_type_name_ar" />
        </ReferenceField>
        <TextField source="issue_date" />
        <TextField source="expiration_date" />
      </Datagrid>
    </List>
  )
}

export const DriverCardShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="card_number" />
      <ReferenceField source="driver_id" reference="opc_driver">
        <TextField source="first_name" />
      </ReferenceField>
      <ReferenceField source="facility_id" reference="opc_facility">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="card_type" reference="opc_license_type">
        <TextField source="license_type_name_ar" />
      </ReferenceField>
      <ReferenceField source="supplier_id" reference="supplier">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="issue_date" />
      <TextField source="expiration_date" />
      <TextField source="status" />
    </SimpleShowLayout>
  </Show>
)

export const DriverCardForm = () => (
  <SimpleForm>
    <ReferenceInput source="facility_id" reference="opc_facility">
      <SelectInput optionText="name" />
    </ReferenceInput>
    <ReferenceInput source="driver_id" reference="opc_driver">
      <SelectInput optionText="first_name" />
    </ReferenceInput>
    <ReferenceInput source="card_type" reference="opc_license_type">
      <SelectInput optionText="license_type_name_ar" />
    </ReferenceInput>
    <ReferenceInput source="supplier_id" reference="supplier">
      <SelectInput optionText="name" />
    </ReferenceInput>
    <DateInput source="issue_date" />
    <DateInput source="expiration_date" />
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

