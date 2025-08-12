import { useState, type ReactNode } from 'react'
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button as MuiButton,
  TextField,
  Stack,
  CircularProgress,
} from '@mui/material'
import {
  useDataProvider,
  useRedirect,
  useNotify,
  CreateBase,
  SimpleForm,
  TextInput,
  DateInput,
  NumberInput,
  required,
} from 'react-admin'
import { useFormContext } from 'react-hook-form'
import LicenseTypeSelect from './components/LicenseTypeSelect'
import CitySelect from './components/CitySelect'
import SupplierSelect from './components/SupplierSelect'
import ModelSelect from './components/ModelSelect'
import ColorSelect from './components/ColorSelect'
import DriverSelect from './components/DriverSelect'

const OperationCardWizard = () => {
  const dataProvider = useDataProvider()
  const redirect = useRedirect()
  const notify = useNotify()
  const [activeStep, setActiveStep] = useState(0)
  const [loading, setLoading] = useState(false)

  const [facility, setFacility] = useState({
    identity_number: '',
  })
  interface FacilityRecord {
    id: number
  }
  const [facilityRecord, setFacilityRecord] = useState<FacilityRecord | null>(
    null
  )
  const [showFacilityCreate, setShowFacilityCreate] = useState(false)

  const [vehicleSearch, setVehicleSearch] = useState({
    plate_number: '',
    serial_number: '',
  })
  interface VehicleRecord {
    id: number
  }
  const [vehicleRecord, setVehicleRecord] = useState<VehicleRecord | null>(null)
  const [showVehicleCreate, setShowVehicleCreate] = useState(false)

  const [existingCard, setExistingCard] =
    useState<Record<string, unknown> | null>(null)

  const steps = ['المنشأة', 'المركبة', 'بطاقة التشغيل']

  interface WizardStepWrapProps {
    resource: string
    onSubmit: (values: Record<string, unknown>) => void
    defaultValues?: Record<string, unknown>
    children: ReactNode
  }

  const WizardStepWrap = ({
    resource,
    onSubmit,
    defaultValues,
    children,
  }: WizardStepWrapProps) => (
    <CreateBase resource={resource}>
      <SimpleForm
        onSubmit={onSubmit}
        defaultValues={defaultValues}
        toolbar={false}
      >
        {children}
      </SimpleForm>
    </CreateBase>
  )

  const FacilityCreateForm = () => {
    const { setValue } = useFormContext()
    return (
      <Stack spacing={2}>
        <TextInput
          source="name"
          label="اسم المنشأة"
          fullWidth
          validate={required()}
          placeholder="أدخل اسم المنشأة"
        />
        <TextInput
          source="english_name"
          label="الاسم بالإنجليزية"
          fullWidth
          placeholder="أدخل الاسم بالإنجليزية"
        />
        <TextInput
          source="license_number"
          label="رقم الترخيص"
          fullWidth
          validate={required()}
          placeholder="أدخل رقم الترخيص"
        />
        <LicenseTypeSelect source="license_type_id" validate={required()} />
        <CitySelect source="license_city_id" validate={required()} />
        <DateInput
          source="license_issue_date"
          label="تاريخ إصدار الترخيص"
          validate={required()}
          onChange={value => {
            const issue =
              typeof value === 'string'
                ? value
                : (value as { target?: { value: string } }).target?.value
            if (issue) {
              const exp = new Date(issue)
              exp.setFullYear(exp.getFullYear() + 1)
              setValue('license_expiration_date', exp.toISOString().split('T')[0])
            }
          }}
        />
        <DateInput
          source="license_expiration_date"
          label="تاريخ انتهاء الترخيص"
          disabled
        />
        <MuiButton
          type="submit"
          variant="contained"
          sx={{ ml: 1 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'التالي'}
        </MuiButton>
      </Stack>
    )
  }

  const handleFacilitySearch = async () => {
    if (!facility.identity_number) {
      notify('يرجى إدخال هوية المنشأة', { type: 'warning' })
      return
    }
    setLoading(true)
    try {
      const { data } = await dataProvider.getList('opc_facility', {
        filter: { identity_number: facility.identity_number },
        pagination: { page: 1, perPage: 1 },
        sort: { field: 'id', order: 'ASC' },
      })
      if (data.length > 0) {
        setFacilityRecord(data[0])
        setActiveStep(1)
      } else {
        setShowFacilityCreate(true)
      }
    } catch (error) {
      notify(
        (error as { message?: string })?.message || 'فشل البحث عن المنشأة',
        { type: 'error' }
      )
    } finally {
      setLoading(false)
    }
  }

  const handleFacilityNext = async (values: Record<string, unknown>) => {
    setLoading(true)
    try {
      const { data } = await dataProvider.create('opc_facility', {
        data: { ...values, identity_number: facility.identity_number },
      })
      setFacilityRecord(data)
      setShowFacilityCreate(false)
      setActiveStep(1)
    } catch (error) {
      notify(
        (error as { message?: string })?.message || 'فشل إنشاء المنشأة',
        { type: 'error' }
      )
    } finally {
      setLoading(false)
    }
  }

  const handleVehicleSearch = async () => {
    if (!vehicleSearch.plate_number && !vehicleSearch.serial_number) {
      notify('يرجى إدخال رقم اللوحة أو الرقم التسلسلي', {
        type: 'warning',
      })
      return
    }
    setLoading(true)
    try {
      const filter: Record<string, string> = {}
      if (vehicleSearch.plate_number)
        filter.plate_number = vehicleSearch.plate_number
      if (vehicleSearch.serial_number)
        filter.serial_number = vehicleSearch.serial_number
      const { data } = await dataProvider.getList('opc_vehicle', {
        filter,
        pagination: { page: 1, perPage: 1 },
        sort: { field: 'id', order: 'ASC' },
      })
      if (data.length > 0) {
        setVehicleRecord(data[0])
        const { data: cardData } = await dataProvider.getList('opc_card', {
          filter: { vehicle_id: data[0].id },
          pagination: { page: 1, perPage: 1 },
          sort: { field: 'id', order: 'ASC' },
        })
        setExistingCard(cardData.length > 0 ? cardData[0] : null)
        setActiveStep(2)
      } else {
        setShowVehicleCreate(true)
      }
    } catch (error) {
      notify(
        (error as { message?: string })?.message || 'فشل البحث عن المركبة',
        { type: 'error' }
      )
    } finally {
      setLoading(false)
    }
  }

  const handleVehicleNext = async (values: Record<string, unknown>) => {
    setLoading(true)
    try {
      const { data } = await dataProvider.create('opc_vehicle', {
        data: { ...values, facility_id: facilityRecord?.id },
      })
      setVehicleRecord(data)
      setExistingCard(null)
      setShowVehicleCreate(false)
      setActiveStep(2)
    } catch (error) {
      notify(
        (error as { message?: string })?.message || 'فشل إنشاء المركبة',
        { type: 'error' }
      )
    } finally {
      setLoading(false)
    }
  }

  const handleOperationCardSave = async (values: Record<string, unknown>) => {
    setLoading(true)
    try {
      const payload = {
        ...values,
        facility_id: facilityRecord?.id,
        vehicle_id: vehicleRecord?.id,
      }
      if (existingCard)
        await dataProvider.update('opc_card', {
          id: (existingCard as { id: number }).id,
          data: payload,
          previousData: existingCard as Record<string, unknown>,
        })
      else await dataProvider.create('opc_card', { data: payload })
      redirect('/opc_card')
    } catch (error) {
      const message =
        (error as { body?: string; message?: string })?.body ||
        (error as { message?: string })?.message ||
        ''
      notify(
        message.includes('duplicate key')
          ? 'رقم بطاقة التشغيل مستخدم مسبقاً'
          : message || 'فشل حفظ بطاقة التشغيل',
        { type: 'error' }
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{ maxWidth: 600, m: 'auto', p: 2 }}>
      <Stepper activeStep={activeStep} sx={{ mb: 2 }}>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === 0 && (
        <Box>
          <TextField
            label="هوية المنشأة"
            fullWidth
            margin="normal"
            value={facility.identity_number}
            onChange={e =>
              setFacility({ ...facility, identity_number: e.target.value })
            }
          />
          <MuiButton onClick={handleFacilitySearch} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'بحث'}
          </MuiButton>
          {showFacilityCreate && (
            <WizardStepWrap
              resource="opc_facility"
              onSubmit={handleFacilityNext}
            >
              <FacilityCreateForm />
            </WizardStepWrap>
          )}
        </Box>
      )}
      {activeStep === 1 && (
        <Box>
          <TextField
            label="رقم اللوحة"
            fullWidth
            margin="normal"
            value={vehicleSearch.plate_number}
            onChange={e =>
              setVehicleSearch({
                ...vehicleSearch,
                plate_number: e.target.value,
              })
            }
          />
          <TextField
            label="الرقم التسلسلي"
            fullWidth
            margin="normal"
            value={vehicleSearch.serial_number}
            onChange={e =>
              setVehicleSearch({
                ...vehicleSearch,
                serial_number: e.target.value,
              })
            }
          />
          <MuiButton onClick={handleVehicleSearch} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'بحث'}
          </MuiButton>
          {showVehicleCreate && (
            <WizardStepWrap
              resource="opc_vehicle"
              onSubmit={handleVehicleNext}
            >
              <Stack spacing={2}>
                <ModelSelect source="model_id" />
                <ColorSelect source="color_id" />
                <TextInput source="plate_number" />
                <TextInput source="serial_number" />
                <NumberInput source="manufacturing_year" />
                <MuiButton
                  type="submit"
                  variant="contained"
                  sx={{ ml: 1 }}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : 'التالي'}
                </MuiButton>
              </Stack>
            </WizardStepWrap>
          )}
        </Box>
      )}
      {activeStep === 2 && (
        <WizardStepWrap
          resource="opc_card"
          onSubmit={handleOperationCardSave}
          defaultValues={existingCard ?? {}}
        >
          <Stack spacing={2}>
            {existingCard && <TextInput source="card_number" disabled />}
            <DriverSelect source="driver_id" facilityId={facilityRecord?.id} />
            <LicenseTypeSelect source="card_type" />
            <SupplierSelect source="supplier_id" />
            <DateInput source="issue_date" />
            <DateInput source="expiration_date" />
            <MuiButton type="submit" disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'حفظ'}
            </MuiButton>
          </Stack>
        </WizardStepWrap>
      )}
    </Box>
  )
}

export default OperationCardWizard

