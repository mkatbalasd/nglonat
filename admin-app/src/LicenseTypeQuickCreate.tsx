import {
  Create,
  SimpleForm,
  TextInput,
  useCreateSuggestionContext,
} from 'react-admin'
import { Dialog, DialogTitle, DialogContent } from '@mui/material'

const LicenseTypeQuickCreate = () => {
  const { onClose, onSuccess, filter } = useCreateSuggestionContext()
  return (
    <Dialog open onClose={onClose} fullWidth>
      <DialogTitle>إضافة جديد</DialogTitle>
      <DialogContent>
        <Create resource="opc_license_type">
          <SimpleForm
            defaultValues={filter}
            onSuccess={data => {
              onSuccess(data)
              onClose()
            }}
          >
            <TextInput source="license_type_name_ar" />
            <TextInput source="license_type_name_en" />
          </SimpleForm>
        </Create>
      </DialogContent>
    </Dialog>
  )
}

export default LicenseTypeQuickCreate
