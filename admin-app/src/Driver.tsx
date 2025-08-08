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
  TopToolbar,
  CreateButton,
  Button,
} from 'react-admin'
import { useNavigate } from 'react-router-dom'

const DriverListActions = () => {
  const navigate = useNavigate()
  return (
    <TopToolbar>
      <CreateButton />
      <Button label="المعالج" onClick={() => navigate('/wizard')} />
    </TopToolbar>
  )
}

export const DriverList = () => (
  <List actions={<DriverListActions />}>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <TextField source="FirstName" />
      <TextField source="LastName" />
      <ReferenceField source="FacilityID" reference="OPC_Facility_view">
        <TextField source="Name" />
      </ReferenceField>
    </Datagrid>
  </List>
)

export const DriverShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="FirstName" />
      <TextField source="LastName" />
      <TextField source="IdentityNumber" />
      <ReferenceField source="FacilityID" reference="OPC_Facility_view">
        <TextField source="Name" />
      </ReferenceField>
    </SimpleShowLayout>
  </Show>
)

export const DriverForm = () => (
  <SimpleForm>
    <ReferenceInput source="FacilityID" reference="OPC_Facility_view">
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

