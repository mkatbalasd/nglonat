import { SelectInput, ReferenceInput, useNotify, useDataProvider } from 'react-admin'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DriverSelect = ({ source, facilityId, onCreate, ...props }: any) => {
  const notify = useNotify()
  const dataProvider = useDataProvider()

  return (
    <ReferenceInput source={source} reference="opc_driver">
      <SelectInput
        optionText="first_name"
        onCreate={async value => {
          const { data } = await dataProvider.create('opc_driver', {
            data: { first_name: value, facility_id: facilityId },
          })
          notify('ra.notification.created', { type: 'info' })
          onCreate?.({ id: data.id, first_name: data.first_name })
          return { id: data.id, first_name: data.first_name }
        }}
        {...props}
      />
    </ReferenceInput>
  )
}

export default DriverSelect

