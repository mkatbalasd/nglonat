import { SelectInput, ReferenceInput, useNotify, useDataProvider } from 'react-admin'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SupplierSelect = ({ source, onCreate, ...props }: any) => {
  const notify = useNotify()
  const dataProvider = useDataProvider()

  return (
    <ReferenceInput source={source} reference="supplier">
      <SelectInput
        optionText="name"
        onCreate={async value => {
          const { data } = await dataProvider.create('supplier', {
            data: { name: value },
          })
          notify('ra.notification.created', { type: 'info' })
          onCreate?.({ id: data.id, name: data.name })
          return { id: data.id, name: data.name }
        }}
        {...props}
      />
    </ReferenceInput>
  )
}

export default SupplierSelect

