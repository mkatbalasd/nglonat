import { PlusOutlined } from '@ant-design/icons'
import { Button, Divider, Form, Select } from 'antd'
import type { InputRef, SelectProps } from 'antd'
import { useEffect, useState, forwardRef } from 'react'
import type { ReactNode, RefObject } from 'react'
import { useDataProvider, useNotify } from 'react-admin'

type Item = { id: number | string } & Record<string, unknown>

type AddableSelectProps = {
  resource: string
  optionText: string
  value?: number | string
  onChange?: (value: number | string) => void
  formFields: ReactNode
  initialValues?: Record<string, unknown>
  firstInputRef?: RefObject<InputRef | null>
  onAddError?: (error: unknown) => void
}

const AddableSelect = forwardRef<HTMLDivElement, AddableSelectProps & SelectProps>(
  (
    {
      resource,
      optionText,
      value,
      onChange,
      formFields,
      initialValues,
      firstInputRef,
      onAddError,
      ...rest
    },
    ref
  ) => {
  const dataProvider = useDataProvider()
  const notify = useNotify()
  const [items, setItems] = useState<Item[]>([])
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
    try {
      const values = await form.validateFields()
      setLoading(true)
      const { data } = await dataProvider.create<Item>(resource, {
        data: values,
      })
      setItems([...items, data])
      onChange?.(data.id)
      form.resetFields()
      setTimeout(() => {
        firstInputRef?.current?.focus()
      })
    } catch (error) {
      notify(
        (error as { message?: string })?.message || 'فشل إضافة العنصر',
        { type: 'error' }
      )
      onAddError?.(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Select
      ref={ref as any}
      {...rest}
      style={{ width: '100%' }}
      placeholder="اختر..."
      value={value}
      options={items.map((i) => ({ value: i.id, label: i[optionText as keyof Item] as string }))}
      onChange={onChange}
      popupRender={(menu) => (
        <>
          {menu}
          <Divider style={{ margin: '8px 0' }} />
          <div style={{ padding: '0 8px 4px' }}>
            <Form layout="vertical" form={form} initialValues={initialValues}>
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
)

export default AddableSelect

