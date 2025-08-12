import { PlusOutlined } from '@ant-design/icons'
import { Button, Divider, Form, Modal, Select } from 'antd'
import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { useDataProvider } from 'react-admin'

type Item = { id: number | string } & Record<string, unknown>

type AddableSelectProps = {
  resource: string
  fields: { label: string; inputs: ReactNode }
  value?: number | string
  onChange?: (value: number | string) => void
}

const AddableSelect = ({ resource, fields, value, onChange }: AddableSelectProps) => {
  const dataProvider = useDataProvider()
  const [items, setItems] = useState<Item[]>([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  useEffect(() => {
    dataProvider
      .getList<Item>(resource, {
        pagination: { page: 1, perPage: 100 },
        sort: { field: 'id', order: 'ASC' },
      })
      .then(({ data }) => setItems(data))
  }, [resource, dataProvider])

  const addItem = async () => {
    try {
      const values = await form.validateFields()
      setLoading(true)
      const { data } = await dataProvider.create<Item>(resource, { data: values })
      setItems([...items, data])
      onChange?.(data.id)
      setOpen(false)
      form.resetFields()
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Select
        style={{ width: '100%' }}
        value={value}
        options={items.map((i) => ({ value: i.id, label: i[fields.label] }))}
        onChange={onChange}
        dropdownRender={(menu) => (
          <>
            {menu}
            <Divider style={{ margin: '8px 0' }} />
            <Button type="text" icon={<PlusOutlined />} onClick={() => setOpen(true)}>
              إضافة
            </Button>
          </>
        )}
      />
      <Modal
        open={open}
        title="إضافة"
        onCancel={() => setOpen(false)}
        onOk={addItem}
        confirmLoading={loading}
        okText="حفظ"
        cancelText="إلغاء"
      >
        <Form form={form} layout="vertical">
          {fields.inputs}
        </Form>
      </Modal>
    </>
  )
}

export default AddableSelect
