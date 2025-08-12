import { Form, Input } from 'antd'
import AddableSelect from './AddableSelect'

const CitySelect = (props: Record<string, unknown>) => (
  <AddableSelect
    resource="city"
    fields={{
      label: 'name_ar',
      inputs: (
        <>
          <Form.Item name="name_ar" label="الاسم بالعربية" rules={[{ required: true }]}> 
            <Input />
          </Form.Item>
          <Form.Item name="name_en" label="الاسم بالإنجليزية">
            <Input />
          </Form.Item>
        </>
      ),
    }}
    {...props}
  />
)

export default CitySelect
