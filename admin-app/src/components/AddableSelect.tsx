import { PlusOutlined } from '@ant-design/icons'
import { Button, Divider, Form, Select } from 'antd'
import type { InputRef } from 'antd'
import { useEffect, useState } from 'react'
import type { ReactNode, RefObject } from 'react'
import { useDataProvider } from 'react-admin'

type Item = { id: number | string } & Record<string, unknown>

type AddableSelectProps = {
  resource: string
  label: string
  value?: number | string
  onChange?: (value: number | string) => void
  formFields: ReactNode
  initialValues?: Record<string, unknown>
  firstFieldRef?: RefObject<InputRef>
}

const AddableSelect = ({
  resource,
  label,
  value,
  onChange,
  formFields,
  initialValues,
  firstFieldRef,
}: AddableSelectProps) => {
  const dataProvider = useDataProvider()
  const [items, setItems] = useState<Item[]>([])
  const [formValues, setFormValues] = useState<Record<string, unknown>>(initialValues || {})
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    dataProvider
      .getList<Item>(resource, {
        pagination: { page: 1, perPage: 100 },
        sort: { field: 'id', order: 'ASC' },
      })
      .then(({ data }) => setItems(data))
  }, [resource, dataProvider])

  const addItem = async () => {
    if (!Object.keys(formValues).length) return
    setLoading(true)
    const { data } = await dataProvider.create<Item>(resource, {
      data: formValues,
    })
    setItems([...items, data])
    onChange?.(data.id)
    setFormValues(initialValues || {})
    form.resetFields()
    setLoading(false)
    setTimeout(() => {
      firstFieldRef?.current?.focus()
    })
  }

  return (
    <Select
      style={{ width: '100%' }}
      value={value}
      options={items.map((i) => ({ value: i.id, label: i[label] }))}
      onChange={onChange}
      popupRender={(menu) => (
        <>
          {menu}
          <Divider style={{ margin: '8px 0' }} />
          <div style={{ padding: '0 8px 4px' }}>
            <Form
              layout="vertical"
              form={form}
              initialValues={initialValues}
              onValuesChange={(_, allValues) => setFormValues(allValues)}
            >
              {formFields}
              <Form.Item>
                <Button type="text" icon={<PlusOutlined />} onClick={addItem} loading={loading}>
                  إضافة
                </Button>
              </Form.Item>
            </Form>
          </div>
        </>
      )}
    />
  )
}

export default AddableSelect

