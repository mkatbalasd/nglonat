import { useInput } from 'react-admin'
import AddableSelect from './AddableSelect'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SupplierSelect = (props: any) => {
  const { field } = useInput(props)
  return <AddableSelect {...field} resource="supplier" optionText="name" />
}

export default SupplierSelect

