import TextField from '@mui/material/TextField'
import type { TextFieldProps } from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import { forwardRef, useEffect, useState } from 'react'
import { useDataProvider, useNotify } from 'react-admin'

type Item = { id: number | string } & Record<string, unknown>

type AddableSelectProps = {
  resource: string
  optionText: string
  value?: number | string
  onChange?: (value: number | string) => void
} & TextFieldProps

const AddableSelect = forwardRef<HTMLInputElement, AddableSelectProps>(
  ({ resource, optionText, value, onChange, ...rest }, ref) => {
    const dataProvider = useDataProvider()
    const notify = useNotify()
    const [items, setItems] = useState<Item[]>([])

    useEffect(() => {
      dataProvider
        .getList<Item>(resource, {
          pagination: { page: 1, perPage: 100 },
          sort: { field: 'id', order: 'ASC' },
        })
        .then(({ data }) => setItems(data))
        .catch((error) =>
          notify(
            (error as { message?: string })?.message || 'فشل جلب البيانات',
            { type: 'error' }
          )
        )
    }, [resource, dataProvider, notify])

    return (
      <TextField
        select
        fullWidth
        value={value ?? ''}
        onChange={(e) => onChange?.(e.target.value as string | number)}
        inputRef={ref}
        {...rest}
      >
        {items.map((i) => (
          <MenuItem key={i.id} value={i.id}>
            {i[optionText as keyof Item] as string}
          </MenuItem>
        ))}
      </TextField>
    )
  }
)

export default AddableSelect

