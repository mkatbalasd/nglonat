import { useInput } from 'react-admin'
import AddableSelect from './AddableSelect'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CitySelect = (props: any) => {
  const { field } = useInput(props)
  return <AddableSelect {...field} resource="city" optionText="name_ar" />
}

export default CitySelect

