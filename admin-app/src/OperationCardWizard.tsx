import { useState } from 'react'
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button as MuiButton,
  TextField,
  Stack,
} from '@mui/material'
import {
  useDataProvider,
  useRedirect,
  useNotify,
  Form,
  TextInput,
  ReferenceInput,
  SelectInput,
  DateInput,
  NumberInput,
  required,
} from 'react-admin'
import { useFormContext } from 'react-hook-form'
import LicenseTypeSelect from './components/LicenseTypeSelect'
import CitySelect from './components/CitySelect'

const OperationCardWizard = () => {
  const dataProvider = useDataProvider()
  const redirect = useRedirect()
  const notify = useNotify()
  const [activeStep, setActiveStep] = useState(0)

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
        <ReferenceInput source="license_type_id" reference="opc_license_type">
          <LicenseTypeSelect validate={required()} />
        </ReferenceInput>
        <ReferenceInput source="license_city_id" reference="city">
          <CitySelect validate={required()} />
        </ReferenceInput>
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
        <MuiButton type="submit" variant="contained" sx={{ ml: 1 }}>
          التالي
        </MuiButton>
      </Stack>
    )
  }

  const handleFacilitySearch = async () => {
    if (!facility.identity_number) {
      notify('يرجى إدخال هوية المنشأة', { type: 'warning' })
      return
    }
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
    }
  }

  const handleFacilityNext = async (values: Record<string, unknown>) => {
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
    }
  }

  const handleVehicleSearch = async () => {
    if (!vehicleSearch.plate_number && !vehicleSearch.serial_number) {
      notify('يرجى إدخال رقم اللوحة أو الرقم التسلسلي', {
        type: 'warning',
      })
      return
    }
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
    }
  }

  const handleVehicleNext = async (values: Record<string, unknown>) => {
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
    }
  }

  const handleOperationCardSave = async (values: Record<string, unknown>) => {
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
          <MuiButton onClick={handleFacilitySearch}>بحث</MuiButton>
          {showFacilityCreate && (
            <Form onSubmit={handleFacilityNext}>
              <FacilityCreateForm />
            </Form>
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
          <MuiButton onClick={handleVehicleSearch}>بحث</MuiButton>
          {showVehicleCreate && (
            <Form onSubmit={handleVehicleNext}>
              <Stack spacing={2}>
                <ReferenceInput source="model_id" reference="opc_model">
                  <SelectInput optionText="model_name" />
                </ReferenceInput>
                <ReferenceInput source="color_id" reference="opc_color">
                  <SelectInput optionText="color_name" />
                </ReferenceInput>
                <TextInput source="plate_number" />
                <TextInput source="serial_number" />
                <NumberInput source="manufacturing_year" />
                <MuiButton type="submit" variant="contained" sx={{ ml: 1 }}>
                  التالي
                </MuiButton>
              </Stack>
            </Form>
          )}
        </Box>
      )}
      {activeStep === 2 && (
        <Form
          onSubmit={handleOperationCardSave}
          defaultValues={existingCard ?? {}}
        >
          <Stack spacing={2}>
            {existingCard && <TextInput source="card_number" disabled />}
            <ReferenceInput source="driver_id" reference="opc_driver">
              <SelectInput optionText="first_name" />
            </ReferenceInput>
            <ReferenceInput source="card_type" reference="opc_license_type">
              <SelectInput optionText="license_type_name_ar" />
            </ReferenceInput>
            <ReferenceInput source="supplier_id" reference="supplier">
              <SelectInput optionText="name" />
            </ReferenceInput>
            <DateInput source="issue_date" />
            <DateInput source="expiration_date" />
            <MuiButton type="submit">حفظ</MuiButton>
          </Stack>
        </Form>
      )}
    </Box>
  )
}

export default OperationCardWizard

