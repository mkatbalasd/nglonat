import { SelectInput, ReferenceInput, useNotify, useDataProvider } from 'react-admin'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CitySelect = ({ source, ...props }: any) => {
  const notify = useNotify()
  const dataProvider = useDataProvider()

  return (
    <ReferenceInput source={source} reference="city">
      <SelectInput
        optionText="name_ar"
        onCreate={async value => {
          const { data: created } = await dataProvider.create('city', {
            data: { name_ar: value },
          })
          notify('ra.notification.created', { type: 'info' })
          return { id: created.id, name_ar: created.name_ar }
        }}
        {...props}
      />
    </ReferenceInput>
  )
}

export default CitySelect

