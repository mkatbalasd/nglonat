import {
  Create,
  SimpleForm,
  TextInput,
  useCreateSuggestionContext,
} from 'react-admin'
import { Dialog, DialogTitle, DialogContent } from '@mui/material'

const SupplierQuickCreate = () => {
  const { onClose, onSuccess, filter } = useCreateSuggestionContext()
  return (
    <Dialog open onClose={onClose} fullWidth>
      <DialogTitle>إضافة جديد</DialogTitle>
      <DialogContent>
        <Create resource="supplier">
          <SimpleForm
            defaultValues={filter}
            onSuccess={data => {
              onSuccess(data)
              onClose()
            }}
          >
            <TextInput source="name" />
          </SimpleForm>
        </Create>
      </DialogContent>
    </Dialog>
  )
}

export default SupplierQuickCreate
