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
      <TextField source="first_name" />
      <TextField source="last_name" />
      <ReferenceField source="facility_id" reference="opc_facility">
        <TextField source="name" />
      </ReferenceField>
    </Datagrid>
  </List>
)

export const DriverShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="first_name" />
      <TextField source="last_name" />
      <TextField source="identity_number" />
      <ReferenceField source="facility_id" reference="opc_facility">
        <TextField source="name" />
      </ReferenceField>
    </SimpleShowLayout>
  </Show>
)

export const DriverForm = () => (
  <SimpleForm>
    <ReferenceInput source="facility_id" reference="opc_facility">
      <SelectInput optionText="name" />
    </ReferenceInput>
    <TextInput source="first_name" />
    <TextInput source="last_name" />
    <TextInput source="identity_number" />
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

