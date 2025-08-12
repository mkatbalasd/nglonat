import { SelectInput, ReferenceInput, useNotify, useDataProvider } from 'react-admin'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CitySelect = ({ source, onCreate, ...props }: any) => {
  const notify = useNotify()
  const dataProvider = useDataProvider()

  return (
    <ReferenceInput source={source} reference="city">
      <SelectInput
        optionText="name_ar"
        onCreate={async value => {
          const { data } = await dataProvider.create('city', {
            data: { name_ar: value },
          })
          notify('ra.notification.created', { type: 'info' })
          onCreate?.({ id: data.id, name_ar: data.name_ar })
          return { id: data.id, name_ar: data.name_ar }
        }}
        {...props}
      />
    </ReferenceInput>
  )
}

export default CitySelect

