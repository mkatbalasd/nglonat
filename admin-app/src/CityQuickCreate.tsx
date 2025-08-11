import { Create, SimpleForm, TextInput } from 'react-admin'
import { useFormContext } from 'react-hook-form'

const CityQuickCreate = () => {
  const { setValue } = useFormContext()
  const onSuccess = (data: { id: number }) => {
    setValue('license_city_id', data.id)
  }
  return (
    <Create resource="city" mutationOptions={{ onSuccess }}>
      <SimpleForm>
        <TextInput source="name_ar" />
        <TextInput source="name_en" />
      </SimpleForm>
    </Create>
  )
}

export default CityQuickCreate
