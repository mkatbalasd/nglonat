import { Form, Input } from 'antd'
import type { InputRef } from 'antd'
import { useRef } from 'react'
import AddableSelect from './AddableSelect'

const LicenseTypeSelect = (props: Record<string, unknown>) => {
  const firstInputRef = useRef<InputRef | null>(null)

  return (
    <AddableSelect
      {...props}
      resource="opc_license_type"
      optionText="license_type_name_ar"
      firstInputRef={firstInputRef}
      formFields={
        <>
          <Form.Item
            name="license_type_name_ar"
            label="الاسم بالعربية"
            rules={[{ required: true }]}
          >
            <Input ref={firstInputRef} />
          </Form.Item>
          <Form.Item name="license_type_name_en" label="الاسم بالإنجليزية">
            <Input />
          </Form.Item>
        </>
      }
    />
  )
}

export default LicenseTypeSelect
