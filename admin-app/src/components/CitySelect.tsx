import { Form, Input } from 'antd'
import type { InputRef } from 'antd'
import { useRef } from 'react'
import { useReferenceInputContext } from 'react-admin'
import AddableSelect from './AddableSelect'

const CitySelect = () => {
  const firstInputRef = useRef<InputRef | null>(null)
  const { field } = useReferenceInputContext()

  return (
    <AddableSelect
      {...field}
      resource="city"
      optionText="name_ar"
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
    />
  )
}

export default CitySelect
