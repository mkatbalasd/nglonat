import { List, Datagrid, TextField, DateField, Show, SimpleShowLayout } from 'react-admin'

export const AuditLogList = () => (
  <List sort={{ field: 'created_at', order: 'DESC' }}>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <TextField source="table_name" />
      <TextField source="action" />
      <TextField source="record_id" />
      <DateField source="created_at" />
    </Datagrid>
  </List>
)

export const AuditLogShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="table_name" />
      <TextField source="action" />
      <TextField source="record_id" />
      <DateField source="created_at" />
      <TextField source="payload" />
    </SimpleShowLayout>
  </Show>
)
