import { SelectInput, ReferenceInput, useNotify, useDataProvider } from 'react-admin'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SupplierSelect = ({ source, ...props }: any) => {
  const notify = useNotify()
  const dataProvider = useDataProvider()

  return (
    <ReferenceInput source={source} reference="supplier">
      <SelectInput
        optionText="name"
        onCreate={async value => {
          const { data: created } = await dataProvider.create('supplier', {
            data: { name: value },
          })
          notify('ra.notification.created', { type: 'info' })
          return { id: created.id, name: created.name }
        }}
        {...props}
      />
    </ReferenceInput>
  )
}

export default SupplierSelect

