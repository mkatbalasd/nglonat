import { Form, Input } from 'antd'
import AddableSelect from './AddableSelect'

const SupplierSelect = (props: Record<string, unknown>) => (
  <AddableSelect
    resource="supplier"
    fields={{
      label: 'name',
      inputs: (
        <Form.Item name="name" label="الاسم" rules={[{ required: true }]}> 
          <Input />
        </Form.Item>
      ),
    }}
    {...props}
  />
)

export default SupplierSelect
