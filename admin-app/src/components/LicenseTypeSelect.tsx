import { Form, Input } from 'antd'
import AddableSelect from './AddableSelect'

const LicenseTypeSelect = props => (
  <AddableSelect
    resource="opc_license_type"
    fields={{
      label: 'license_type_name_ar',
      inputs: (
        <>
          <Form.Item name="license_type_name_ar" label="الاسم بالعربية" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="license_type_name_en" label="الاسم بالإنجليزية">
            <Input />
          </Form.Item>
        </>
      ),
    }}
    {...props}
  />
)

export default LicenseTypeSelect
