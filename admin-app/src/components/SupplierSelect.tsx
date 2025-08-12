import {
  AutocompleteInput,
  SimpleForm,
  TextInput,
  useCreate,
  useCreateSuggestionContext,
  useNotify,
  required,
} from 'react-admin'

const SupplierQuickCreate = () => {
  const { onCancel, onCreate, filter } = useCreateSuggestionContext()
  const [create] = useCreate()
  const notify = useNotify()

  const handleSubmit = async (values: Record<string, unknown>) => {
    try {
      const { data } = await create('supplier', { data: values })
      onCreate(data)
    } catch (error) {
      notify(
        (error as { message?: string })?.message || 'فشل إنشاء المورد',
        { type: 'error' }
      )
    }
  }

  return (
    <SimpleForm onSubmit={handleSubmit} onCancel={onCancel} defaultValues={{ name: filter }}>
      <TextInput source="name" label="اسم المورد" validate={required()} fullWidth />
    </SimpleForm>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SupplierSelect = (props: any) => (
  <AutocompleteInput
    {...props}
    optionText="name"
    create={<SupplierQuickCreate />}
  />
)

export default SupplierSelect

