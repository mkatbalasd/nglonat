import { SelectInput, ReferenceInput, useNotify, useDataProvider } from 'react-admin'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ColorSelect = ({ source, ...props }: any) => {
  const notify = useNotify()
  const dataProvider = useDataProvider()

  return (
    <ReferenceInput source={source} reference="opc_color">
      <SelectInput
        optionText="color_name"
        onCreate={async value => {
          const { data: created } = await dataProvider.create('opc_color', {
            data: { color_name: value },
          })
          notify('ra.notification.created', { type: 'info' })
          return { id: created.id, color_name: created.color_name }
        }}
        {...props}
      />
    </ReferenceInput>
  )
}

export default ColorSelect

