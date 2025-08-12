import { SelectInput, ReferenceInput, useNotify, useDataProvider } from 'react-admin'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LicenseTypeSelect = ({ source, onCreate, ...props }: any) => {
  const notify = useNotify()
  const dataProvider = useDataProvider()

  return (
    <ReferenceInput source={source} reference="opc_license_type">
      <SelectInput
        optionText="license_type_name_ar"
        onCreate={async value => {
          const { data } = await dataProvider.create('opc_license_type', {
            data: { license_type_name_ar: value },
          })
          notify('ra.notification.created', { type: 'info' })
          onCreate?.({
            id: data.id,
            license_type_name_ar: data.license_type_name_ar,
          })
          return {
            id: data.id,
            license_type_name_ar: data.license_type_name_ar,
          }
        }}
        {...props}
      />
    </ReferenceInput>
  )
}

export default LicenseTypeSelect

