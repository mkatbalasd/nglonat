import { useEffect } from 'react'
// استيراد المكوّن الرئيسي لإدارة الواجهة والموارد
import { Admin, Resource, CustomRoutes } from 'react-admin'
import polyglotI18nProvider from 'ra-i18n-polyglot'
import { Route } from 'react-router-dom'
import { createTheme } from '@mui/material'
import arabicMessages from './i18n/arabic'
// استيراد موفّر البيانات المبني على Supabase
import supabaseDataProvider from './data/supabaseDataProvider'
import { AuditLogList, AuditLogShow } from './AuditLog'

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
  SupplierCreate,
  SupplierEdit,
} from './Supplier'
import { BrandList, BrandCreate, BrandEdit } from './Brand'
import { ModelList, ModelCreate, ModelEdit } from './Model'
import { ColorList, ColorCreate, ColorEdit } from './Color'
import {
  VehicleList,
  VehicleShow,
  VehicleCreate,
  VehicleEdit,
} from './Vehicle'
import DriverWizard from './DriverWizard'

// إنشاء الثيم مع دعم الاتجاه من اليمين إلى اليسار
const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: "'Segoe UI', Tahoma, sans-serif",
  },
})

// تهيئة موفر الترجمة للغة العربية
const i18nProvider = polyglotI18nProvider(() => arabicMessages, 'ar')

const App = () => {
  // ضبط اتجاه الصفحة ليكون من اليمين إلى اليسار عند بدء التطبيق
  useEffect(() => {
    document.dir = 'rtl'
  }, [])

  return (
    // مكوّن الإدارة مع تمرير موفّر البيانات، الثيم، وموفّر الترجمة
    <Admin
      dataProvider={supabaseDataProvider()}
      theme={theme}
      i18nProvider={i18nProvider}
    >
      <CustomRoutes>
        <Route path="/wizard" element={<DriverWizard />} />
      </CustomRoutes>
      <Resource
        name="OPC_Facility_view"
        list={FacilityList}
        show={FacilityShow}
        create={FacilityCreate}
        edit={FacilityEdit}
      />
      <Resource
        name="OPC_Driver_view"
        list={DriverList}
        show={DriverShow}
        create={DriverCreate}
        edit={DriverEdit}
      />
      <Resource
        name="OPC_DriverCard_view"
        list={DriverCardList}
        show={DriverCardShow}
        create={DriverCardCreate}
        edit={DriverCardEdit}
      />
      <Resource
        name="OPC_Card_view"
        list={OperationCardList}
        show={OperationCardShow}
        create={OperationCardCreate}
        edit={OperationCardEdit}
      />
      <Resource
        name="OPC_LicenseType_view"
        list={LicenseTypeList}
        show={LicenseTypeShow}
        create={LicenseTypeCreate}
        edit={LicenseTypeEdit}
      />
      <Resource
        name="OPC_Brand_view"
        list={BrandList}
        create={BrandCreate}
        edit={BrandEdit}
      />
      <Resource
        name="OPC_Model_view"
        list={ModelList}
        create={ModelCreate}
        edit={ModelEdit}
      />
      <Resource
        name="OPC_Color_view"
        list={ColorList}
        create={ColorCreate}
        edit={ColorEdit}
      />
      <Resource
        name="Supplier"
        list={SupplierList}
        create={SupplierCreate}
        edit={SupplierEdit}
      />
      <Resource
        name="OPC_Vehicle_view"
        list={VehicleList}
        show={VehicleShow}
        create={VehicleCreate}
        edit={VehicleEdit}
      />
      <Resource name="AuditLog" list={AuditLogList} show={AuditLogShow} />
    </Admin>
  )
}

export default App
