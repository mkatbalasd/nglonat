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
import { CityList, CityCreate, CityEdit } from './City'
import { BrandList, BrandCreate, BrandEdit } from './Brand'
import { ModelList, ModelCreate, ModelEdit } from './Model'
import { ColorList, ColorCreate, ColorEdit } from './Color'
import {
  VehicleList,
  VehicleShow,
  VehicleCreate,
  VehicleEdit,
} from './Vehicle'
import OperationCardWizard from './OperationCardWizard'
import DriverWizard, {
  FacilityStep,
  DriverStep,
  SummaryStep,
  CreateDriverCard,
  EditDriverCard,
} from './features/DriverCardWizard'

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
        <Route path="/operation-wizard" element={<OperationCardWizard />} />
        <Route path="/wizard/driver-card/facility" element={<FacilityStep />} />
        <Route path="/wizard/driver-card/driver" element={<DriverStep />} />
        <Route path="/wizard/driver-card/summary" element={<SummaryStep />} />
        <Route path="/wizard/driver-card/create" element={<CreateDriverCard />} />
        <Route
          path="/wizard/driver-card/edit/:cardId"
          element={<EditDriverCard />}
        />
      </CustomRoutes>
      <Resource
        name="opc_facility"
        list={FacilityList}
        show={FacilityShow}
        create={FacilityCreate}
        edit={FacilityEdit}
      />
      <Resource
        name="opc_driver"
        list={DriverList}
        show={DriverShow}
        create={DriverCreate}
        edit={DriverEdit}
      />
      <Resource
        name="opc_driver_card"
        list={DriverCardList}
        show={DriverCardShow}
        create={DriverCardCreate}
        edit={DriverCardEdit}
      />
      <Resource
        name="opc_card"
        list={OperationCardList}
        show={OperationCardShow}
        create={OperationCardCreate}
        edit={OperationCardEdit}
      />
      <Resource
        name="opc_license_type"
        list={LicenseTypeList}
        show={LicenseTypeShow}
        create={LicenseTypeCreate}
        edit={LicenseTypeEdit}
      />
      <Resource
        name="opc_brand"
        list={BrandList}
        create={BrandCreate}
        edit={BrandEdit}
      />
      <Resource
        name="opc_model"
        list={ModelList}
        create={ModelCreate}
        edit={ModelEdit}
      />
      <Resource
        name="opc_color"
        list={ColorList}
        create={ColorCreate}
        edit={ColorEdit}
      />
      <Resource
        name="supplier"
        list={SupplierList}
        create={SupplierCreate}
        edit={SupplierEdit}
      />
      <Resource name="city" list={CityList} create={CityCreate} edit={CityEdit} />
      <Resource
        name="opc_vehicle"
        list={VehicleList}
        show={VehicleShow}
        create={VehicleCreate}
        edit={VehicleEdit}
      />
      <Resource name="audit_log" list={AuditLogList} show={AuditLogShow} />
    </Admin>
  )
}

export default App
