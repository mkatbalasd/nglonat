import { useEffect } from 'react'
import { Admin } from 'react-admin'
import { createTheme } from '@mui/material'
import supabaseDataProvider from './data/supabaseDataProvider'

const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: "'Segoe UI', Tahoma, sans-serif",
  },
})

const App = () => {
  useEffect(() => {
    document.documentElement.dir = 'rtl'
  }, [])

  return <Admin dataProvider={supabaseDataProvider()} theme={theme} />
}

export default App
