import { PlusOutlined } from '@ant-design/icons'
import { Button, Divider, Input, Select, Space } from 'antd'
import type { InputRef } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useDataProvider } from 'react-admin'

type Item = { id: number | string } & Record<string, unknown>

type AddableSelectProps = {
  resource: string
  label: string
  value?: number | string
  onChange?: (value: number | string) => void
}

const AddableSelect = ({ resource, label, value, onChange }: AddableSelectProps) => {
  const dataProvider = useDataProvider()
  const [items, setItems] = useState<Item[]>([])
  const [name, setName] = useState('')
  const inputRef = useRef<InputRef>(null)
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
    if (!name) return
    setLoading(true)
    const { data } = await dataProvider.create<Item>(resource, {
      data: { [label]: name },
    })
    setItems([...items, data])
    onChange?.(data.id)
    setName('')
    setLoading(false)
    setTimeout(() => {
      inputRef.current?.focus()
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
          <Space style={{ padding: '0 8px 4px' }}>
            <Input
              placeholder="أدخل القيمة"
              ref={inputRef}
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.stopPropagation()}
            />
            <Button type="text" icon={<PlusOutlined />} onClick={addItem} loading={loading}>
              إضافة
            </Button>
          </Space>
        </>
      )}
    />
  )
}

export default AddableSelect

