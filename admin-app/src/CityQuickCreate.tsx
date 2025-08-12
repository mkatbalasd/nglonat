import {
  Create,
  SimpleForm,
  TextInput,
  useCreateSuggestionContext,
} from 'react-admin'
import { Dialog, DialogTitle, DialogContent } from '@mui/material'

const CityQuickCreate = () => {
  const { onClose, onSuccess, filter } = useCreateSuggestionContext()
  return (
    <Dialog open onClose={onClose} fullWidth>
      <DialogTitle>إضافة جديد</DialogTitle>
      <DialogContent>
        <Create resource="city">
          <SimpleForm
            defaultValues={filter}
            onSuccess={data => {
              onSuccess(data)
              onClose()
            }}
          >
            <TextInput source="name_ar" />
            <TextInput source="name_en" />
          </SimpleForm>
        </Create>
      </DialogContent>
    </Dialog>
  )
}

export default CityQuickCreate
