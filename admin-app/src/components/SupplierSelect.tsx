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

const SupplierQuickCreateForm = () => {
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
      resource="supplier"
      redirect={false}
      mutationOptions={{
        onSuccess: data => onCreate(data),
        onError: error =>
          notify(
            (error as { message?: string })?.message || 'فشل إنشاء المورد',
            { type: 'error' }
          ),
      }}
    >
      <SimpleForm defaultValues={{ name: filter }} toolbar={<QuickCreateToolbar />}>
        <TextInput source="name" label="اسم المورد" validate={required()} fullWidth />
      </SimpleForm>
    </Create>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SupplierSelect = ({ source, ...props }: any) => (
  <ReferenceInput source={source} reference="supplier">
    <AutocompleteInput
      optionText="name"
      create={<SupplierQuickCreateForm />}
      {...props}
    />
  </ReferenceInput>
)

export default SupplierSelect

