import { SelectInput, ReferenceInput, useNotify, useDataProvider } from 'react-admin'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LicenseTypeSelect = ({ source, ...props }: any) => {
  const notify = useNotify()
  const dataProvider = useDataProvider()

  return (
    <ReferenceInput source={source} reference="opc_license_type">
      <SelectInput
        optionText="license_type_name_ar"
        onCreate={async value => {
          const { data: created } = await dataProvider.create('opc_license_type', {
            data: { license_type_name_ar: value },
          })
          notify('ra.notification.created', { type: 'info' })
          return {
            id: created.id,
            license_type_name_ar: created.license_type_name_ar,
          }
        }}
        {...props}
      />
    </ReferenceInput>
  )
}

export default LicenseTypeSelect

