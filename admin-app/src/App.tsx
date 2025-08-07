import { useEffect } from 'react'
// استيراد المكوّن الرئيسي لإدارة الواجهة
import { Admin } from 'react-admin'
import { createTheme } from '@mui/material'
// استيراد موفّر البيانات المبني على Supabase
import supabaseDataProvider from './data/supabaseDataProvider'

// إنشاء الثيم مع دعم الاتجاه من اليمين إلى اليسار
const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: "'Segoe UI', Tahoma, sans-serif",
  },
})

const App = () => {
  // ضبط اتجاه الصفحة ليكون من اليمين إلى اليسار عند بدء التطبيق
  useEffect(() => {
    document.documentElement.dir = 'rtl'
  }, [])

  return (
    // مكوّن الإدارة مع تمرير موفّر بيانات Supabase والثيم المخصص
    <Admin dataProvider={supabaseDataProvider()} theme={theme} />
  )
}

export default App
