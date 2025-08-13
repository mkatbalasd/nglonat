import { test, expect } from "vitest"
import { Resource, List, Datagrid, TextField, Create, SimpleForm, TextInput } from 'react-admin'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import renderWithAdmin from '../test-utils/renderWithAdmin'
import mockDataProvider from '../test-utils/mockDataProvider'

const UserList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
    </Datagrid>
  </List>
)

const UserCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" />
    </SimpleForm>
  </Create>
)

test('creates a user and displays it in the list', async () => {
  renderWithAdmin(<Resource name="users" list={UserList} create={UserCreate} />)

  await screen.findByText('Admin')

  await userEvent.click(screen.getByText('Create'))
  await userEvent.type(screen.getByLabelText('Name'), 'John')
  await userEvent.click(screen.getByText('Save'))

  await screen.findByText('John')

  const { data } = await mockDataProvider.getOne('users', { id: 2 })
  expect(data.name).toBe('John')
})
