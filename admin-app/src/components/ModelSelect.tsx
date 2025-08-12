import {
  AutocompleteInput,
  SimpleForm,
  TextInput,
  useCreateSuggestionContext,
  useNotify,
  required,
  ReferenceInput,
  Create,
  Toolbar,
  SaveButton,
  SelectInput,
} from 'react-admin'
import { Button } from '@mui/material'

const ModelQuickCreateForm = () => {
  const { onCancel, onCreate, filter } = useCreateSuggestionContext()
  const notify = useNotify()

  const QuickCreateToolbar = () => (
    <Toolbar>
      <SaveButton />
      <Button onClick={onCancel}>إلغاء</Button>
    </Toolbar>
  )

  return (
    <Create
      resource="opc_model"
      redirect={false}
      mutationOptions={{
        onSuccess: data =>
          onCreate({ id: data.id, model_name: data.model_name }),
        onError: error =>
          notify(
            (error as { message?: string })?.message ||
              'فشل إنشاء الطراز',
            { type: 'error' }
          ),
      }}
    >
      <SimpleForm
        defaultValues={{ model_name: filter }}
        toolbar={<QuickCreateToolbar />}
      >
        <ReferenceInput source="brand_id" reference="opc_brand">
          <SelectInput optionText="brand_name" validate={required()} />
        </ReferenceInput>
        <TextInput
          source="model_name"
          label="اسم الطراز"
          validate={required()}
          fullWidth
        />
      </SimpleForm>
    </Create>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ModelSelect = ({ source, ...props }: any) => (
  <ReferenceInput source={source} reference="opc_model">
    <AutocompleteInput
      optionText="model_name"
      create={<ModelQuickCreateForm />}
      {...props}
    />
  </ReferenceInput>
)

export default ModelSelect

