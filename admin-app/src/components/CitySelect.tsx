import { Form, Input } from 'antd'
import type { InputRef } from 'antd'
import { useRef } from 'react'
import AddableSelect from './AddableSelect'

const CitySelect = (props: Record<string, unknown>) => {
  const firstInputRef = useRef<InputRef>(null)

  return (
    <AddableSelect
      resource="city"
      label="name_ar"
      firstInputRef={firstInputRef}
      formFields={
        <>
          <Form.Item
            name="name_ar"
            label="الاسم بالعربية"
            rules={[{ required: true }]}
          >
            <Input ref={firstInputRef} />
          </Form.Item>
          <Form.Item name="name_en" label="الاسم بالإنجليزية">
            <Input />
          </Form.Item>
        </>
      }
      {...props}
    />
  )
}

export default CitySelect
