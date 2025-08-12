import {
  AutocompleteInput,
  SimpleForm,
  TextInput,
  useCreate,
  useCreateSuggestionContext,
  useNotify,
  required,
} from 'react-admin'

const LicenseTypeQuickCreate = () => {
  const { onCancel, onCreate, filter } = useCreateSuggestionContext()
  const [create] = useCreate()
  const notify = useNotify()

  const handleSubmit = async (values: Record<string, unknown>) => {
    try {
      const { data } = await create('opc_license_type', { data: values })
      onCreate(data)
    } catch (error) {
      notify(
        (error as { message?: string })?.message || 'فشل إنشاء نوع الترخيص',
        { type: 'error' }
      )
    }
  }

  return (
    <SimpleForm onSubmit={handleSubmit} onCancel={onCancel} defaultValues={{ license_type_name_ar: filter }}>
      <TextInput
        source="license_type_name_ar"
        label="نوع الترخيص"
        validate={required()}
        fullWidth
      />
    </SimpleForm>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LicenseTypeSelect = (props: any) => (
  <AutocompleteInput
    {...props}
    optionText="license_type_name_ar"
    create={<LicenseTypeQuickCreate />}
  />
)

export default LicenseTypeSelect

