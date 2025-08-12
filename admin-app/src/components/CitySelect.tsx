import AddableSelect from './AddableSelect'

const CitySelect = (props: Record<string, unknown>) => (
  <AddableSelect resource="city" label="name_ar" {...props} />
)

export default CitySelect
