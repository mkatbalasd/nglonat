import { Form, Input } from 'antd'
import type { InputRef } from 'antd'
import { useRef } from 'react'
import { useReferenceInputContext } from 'react-admin'
import AddableSelect from './AddableSelect'

const SupplierSelect = () => {
  const firstInputRef = useRef<InputRef | null>(null)
  const { field } = useReferenceInputContext()

  return (
    <AddableSelect
      {...field}
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
