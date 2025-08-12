import { Form, Input } from 'antd'
import type { InputRef } from 'antd'
import { useRef } from 'react'
import { useInput } from 'react-admin'
import AddableSelect from './AddableSelect'

const SupplierSelect = () => {
  const firstInputRef = useRef<InputRef | null>(null)
  const { field } = useInput(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    props as any
  )

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
