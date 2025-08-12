import { Form, Input } from 'antd'
import AddableSelect from './AddableSelect'

const SupplierSelect = (props: Record<string, unknown>) => (
  <AddableSelect
    resource="supplier"
    label="name"
    formFields={
      <Form.Item name="name" label="اسم المورد" rules={[{ required: true }]}> 
        <Input />
      </Form.Item>
    }
    {...props}
  />
)

export default SupplierSelect
