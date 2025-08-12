import { Form, Input } from 'antd'
import type { InputRef } from 'antd'
import { useRef } from 'react'
import { useInput } from 'react-admin'
import AddableSelect from './AddableSelect'

const LicenseTypeSelect = (props: Record<string, unknown>) => {
  const firstInputRef = useRef<InputRef | null>(null)
  const { field } = useInput(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    props as any
  )

  return (
    <AddableSelect
      {...field}
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
