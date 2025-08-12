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

const CityQuickCreateForm = () => {
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
      resource="city"
      redirect={false}
      mutationOptions={{
        onSuccess: data => onCreate(data),
        onError: error =>
          notify(
            (error as { message?: string })?.message || 'فشل إنشاء المدينة',
            { type: 'error' }
          ),
      }}
    >
      <SimpleForm defaultValues={{ name_ar: filter }} toolbar={<QuickCreateToolbar />}>
        <TextInput source="name_ar" label="اسم المدينة" validate={required()} fullWidth />
        <TextInput source="name_en" label="الاسم بالإنجليزية" fullWidth />
      </SimpleForm>
    </Create>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CitySelect = ({ source, ...props }: any) => (
  <ReferenceInput source={source} reference="city">
    <AutocompleteInput
      optionText="name_ar"
      create={<CityQuickCreateForm />}
      {...props}
    />
  </ReferenceInput>
)

export default CitySelect

