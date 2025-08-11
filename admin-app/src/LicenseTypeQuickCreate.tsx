import { Create, SimpleForm, TextInput } from 'react-admin'
import { useFormContext } from 'react-hook-form'

const LicenseTypeQuickCreate = () => {
  const { setValue } = useFormContext()
  const onSuccess = (data: { id: number }) => {
    setValue('license_type_id', data.id)
  }
  return (
    <Create resource="opc_license_type" mutationOptions={{ onSuccess }}>
      <SimpleForm>
        <TextInput source="license_type_name_ar" />
        <TextInput source="license_type_name_en" />
      </SimpleForm>
    </Create>
  )
}

export default LicenseTypeQuickCreate
