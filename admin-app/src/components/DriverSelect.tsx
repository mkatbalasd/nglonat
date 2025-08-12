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

interface DriverQuickCreateProps {
  facilityId?: number
}

const DriverQuickCreateForm = ({ facilityId }: DriverQuickCreateProps) => {
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
      resource="opc_driver"
      redirect={false}
      mutationOptions={{
        onSuccess: data =>
          onCreate({ id: data.id, first_name: data.first_name }),
        onError: error =>
          notify(
            (error as { message?: string })?.message ||
              'فشل إنشاء السائق',
            { type: 'error' }
          ),
      }}
    >
      <SimpleForm
        defaultValues={{ first_name: filter, facility_id: facilityId }}
        toolbar={<QuickCreateToolbar />}
      >
        {!facilityId && (
          <ReferenceInput source="facility_id" reference="opc_facility">
            <AutocompleteInput optionText="name" validate={required()} />
          </ReferenceInput>
        )}
        <TextInput
          source="first_name"
          label="الاسم الأول"
          validate={required()}
          fullWidth
        />
        <TextInput source="last_name" label="اسم العائلة" validate={required()} fullWidth />
        <TextInput source="identity_number" label="رقم الهوية" fullWidth />
      </SimpleForm>
    </Create>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DriverSelect = ({ source, facilityId, ...props }: any) => (
  <ReferenceInput source={source} reference="opc_driver">
    <AutocompleteInput
      optionText="first_name"
      create={<DriverQuickCreateForm facilityId={facilityId} />}
      {...props}
    />
  </ReferenceInput>
)

export default DriverSelect

