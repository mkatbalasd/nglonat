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
} from 'react-admin'
import { Button } from '@mui/material'

const ColorQuickCreateForm = () => {
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
      resource="opc_color"
      redirect={false}
      mutationOptions={{
        onSuccess: data =>
          onCreate({ id: data.id, color_name: data.color_name }),
        onError: error =>
          notify(
            (error as { message?: string })?.message ||
              'فشل إنشاء اللون',
            { type: 'error' }
          ),
      }}
    >
      <SimpleForm
        defaultValues={{ color_name: filter }}
        toolbar={<QuickCreateToolbar />}
      >
        <TextInput
          source="color_name"
          label="اسم اللون"
          validate={required()}
          fullWidth
        />
      </SimpleForm>
    </Create>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ColorSelect = ({ source, ...props }: any) => (
  <ReferenceInput source={source} reference="opc_color">
    <AutocompleteInput
      optionText="color_name"
      create={<ColorQuickCreateForm />}
      {...props}
    />
  </ReferenceInput>
)

export default ColorSelect

