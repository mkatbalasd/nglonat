import { SelectInput, ReferenceInput, useNotify, useDataProvider } from 'react-admin'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ModelSelect = ({ source, ...props }: any) => {
  const notify = useNotify()
  const dataProvider = useDataProvider()

  return (
    <ReferenceInput source={source} reference="opc_model">
      <SelectInput
        optionText="model_name"
        onCreate={async value => {
          const { data: created } = await dataProvider.create('opc_model', {
            data: { model_name: value },
          })
          notify('ra.notification.created', { type: 'info' })
          return { id: created.id, model_name: created.model_name }
        }}
        {...props}
      />
    </ReferenceInput>
  )
}

export default ModelSelect

