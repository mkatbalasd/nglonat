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
import DriverSelect from './components/DriverSelect'
import SupplierSelect from './components/SupplierSelect'
import LicenseTypeSelect from './components/LicenseTypeSelect'
 
export const OperationCardList = () => {
  const navigate = useNavigate()
  return (
    <List
      actions={
        <TopToolbar>
          <Button
            label="إصدار بطاقة تشغيل"
            onClick={() => navigate('/operation-wizard')}
          />
        </TopToolbar>
      }
    >
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
}

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
    <DriverSelect source="driver_id" />
    <ReferenceInput source="vehicle_id" reference="opc_vehicle">
      <SelectInput optionText="plate_number" />
    </ReferenceInput>
    <SupplierSelect source="supplier_id" />
    <LicenseTypeSelect source="card_type" />
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

