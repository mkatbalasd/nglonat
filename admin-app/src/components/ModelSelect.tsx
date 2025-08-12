import { SelectInput, ReferenceInput, useNotify, useDataProvider } from 'react-admin'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ModelSelect = ({ source, onCreate, ...props }: any) => {
  const notify = useNotify()
  const dataProvider = useDataProvider()

  return (
    <ReferenceInput source={source} reference="opc_model">
      <SelectInput
        optionText="model_name"
        onCreate={async value => {
          const { data } = await dataProvider.create('opc_model', {
            data: { model_name: value },
          })
          notify('ra.notification.created', { type: 'info' })
          onCreate?.({ id: data.id, model_name: data.model_name })
          return { id: data.id, model_name: data.model_name }
        }}
        {...props}
      />
    </ReferenceInput>
  )
}

export default ModelSelect

