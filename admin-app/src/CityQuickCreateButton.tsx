import { useState } from 'react'
import { Button, Dialog } from '@mui/material'
import AddCircleOutline from '@mui/icons-material/AddCircleOutline'
import { Create, useCreateSuggestionContext } from 'react-admin'
import CityQuickCreate from './CityQuickCreate'

const CityQuickCreateButton = () => {
  const [open, setOpen] = useState(false)
  const { onCancel, onCreate } = useCreateSuggestionContext()

  const handleClose = () => {
    setOpen(false)
    onCancel()
  }
  const handleSuccess = (data: unknown) => {
    setOpen(false)
    onCreate(data)
  }

  return (
    <>
      <Button startIcon={<AddCircleOutline />} onClick={() => setOpen(true)}>
        إضافة جديد
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <Create
          resource="city"
          mutationOptions={{ onSuccess: handleSuccess }}
          redirect={false}
        >
          <CityQuickCreate />
        </Create>
      </Dialog>
    </>
  )
}

export default CityQuickCreateButton
