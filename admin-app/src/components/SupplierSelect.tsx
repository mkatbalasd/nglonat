import { Form, Input } from 'antd'
import type { InputRef } from 'antd'
import { useRef } from 'react'
import AddableSelect from './AddableSelect'

const SupplierSelect = (props: Record<string, unknown>) => {
  const firstInputRef = useRef<InputRef | null>(null)

  return (
    <AddableSelect
      {...props}
      resource="supplier"
      optionText="name"
      firstInputRef={firstInputRef}
      formFields={
        <Form.Item name="name" label="اسم المورد" rules={[{ required: true }]}> 
          <Input ref={firstInputRef} />
        </Form.Item>
      }
    />
  )
}

export default SupplierSelect
