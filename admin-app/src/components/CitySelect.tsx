import {
  AutocompleteInput,
  SimpleForm,
  TextInput,
  useCreate,
  useCreateSuggestionContext,
  useNotify,
  required,
} from 'react-admin'

const CityQuickCreate = () => {
  const { onCancel, onCreate, filter } = useCreateSuggestionContext()
  const [create] = useCreate()
  const notify = useNotify()

  const handleSubmit = async (values: Record<string, unknown>) => {
    try {
      const { data } = await create('city', { data: values })
      onCreate(data)
    } catch (error) {
      notify(
        (error as { message?: string })?.message || 'فشل إنشاء المدينة',
        { type: 'error' }
      )
    }
  }

  return (
    <SimpleForm onSubmit={handleSubmit} onCancel={onCancel} defaultValues={{ name_ar: filter }}>
      <TextInput source="name_ar" label="اسم المدينة" validate={required()} fullWidth />
    </SimpleForm>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CitySelect = (props: any) => (
  <AutocompleteInput
    {...props}
    optionText="name_ar"
    create={<CityQuickCreate />}
  />
)

export default CitySelect

