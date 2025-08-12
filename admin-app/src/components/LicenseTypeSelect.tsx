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

const LicenseTypeQuickCreateForm = () => {
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
      resource="opc_license_type"
      redirect={false}
      mutationOptions={{
        onSuccess: data => onCreate(data),
        onError: error =>
          notify(
            (error as { message?: string })?.message || 'فشل إنشاء نوع الترخيص',
            { type: 'error' }
          ),
      }}
    >
      <SimpleForm
        defaultValues={{ license_type_name_ar: filter }}
        toolbar={<QuickCreateToolbar />}
      >
        <TextInput
          source="license_type_name_ar"
          label="نوع الترخيص"
          validate={required()}
          fullWidth
        />
        <TextInput source="license_type_name_en" label="الاسم بالإنجليزية" fullWidth />
      </SimpleForm>
    </Create>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LicenseTypeSelect = ({ source, ...props }: any) => (
  <ReferenceInput source={source} reference="opc_license_type">
    <AutocompleteInput
      optionText="license_type_name_ar"
      create={<LicenseTypeQuickCreateForm />}
      {...props}
    />
  </ReferenceInput>
)

export default LicenseTypeSelect

