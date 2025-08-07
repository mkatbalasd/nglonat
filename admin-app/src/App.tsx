import { useEffect } from 'react'
// استيراد المكوّن الرئيسي لإدارة الواجهة والموارد
import { Admin, Resource } from 'react-admin'
import { createTheme } from '@mui/material'
// استيراد موفّر البيانات المبني على Supabase
import supabaseDataProvider from './data/supabaseDataProvider'

// استيراد مكونات الموارد
import {
  FacilityList,
  FacilityShow,
  FacilityCreate,
  FacilityEdit,
} from './Facility'
import {
  DriverList,
  DriverShow,
  DriverCreate,
  DriverEdit,
} from './Driver'
import {
  DriverCardList,
  DriverCardShow,
  DriverCardCreate,
  DriverCardEdit,
} from './DriverCard'
import {
  OperationCardList,
  OperationCardShow,
  OperationCardCreate,
  OperationCardEdit,
} from './OperationCard'
import {
  LicenseTypeList,
  LicenseTypeShow,
  LicenseTypeCreate,
  LicenseTypeEdit,
} from './LicenseType'
import {
  SupplierList,
  SupplierShow,
  SupplierCreate,
  SupplierEdit,
} from './Supplier'
import {
  VehicleList,
  VehicleShow,
  VehicleCreate,
  VehicleEdit,
} from './Vehicle'

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
    <Admin dataProvider={supabaseDataProvider()} theme={theme}>
      <Resource
        name="OPC_Facility"
        list={FacilityList}
        show={FacilityShow}
        create={FacilityCreate}
        edit={FacilityEdit}
      />
      <Resource
        name="OPC_Driver"
        list={DriverList}
        show={DriverShow}
        create={DriverCreate}
        edit={DriverEdit}
      />
      <Resource
        name="OPC_DriverCard"
        list={DriverCardList}
        show={DriverCardShow}
        create={DriverCardCreate}
        edit={DriverCardEdit}
      />
      <Resource
        name="OPC_Card"
        list={OperationCardList}
        show={OperationCardShow}
        create={OperationCardCreate}
        edit={OperationCardEdit}
      />
      <Resource
        name="OPC_LicenseType"
        list={LicenseTypeList}
        show={LicenseTypeShow}
        create={LicenseTypeCreate}
        edit={LicenseTypeEdit}
      />
      <Resource
        name="Supplier"
        list={SupplierList}
        show={SupplierShow}
        create={SupplierCreate}
        edit={SupplierEdit}
      />
      <Resource
        name="OPC_Vehicle"
        list={VehicleList}
        show={VehicleShow}
        create={VehicleCreate}
        edit={VehicleEdit}
      />
    </Admin>
  )
}

export default App
