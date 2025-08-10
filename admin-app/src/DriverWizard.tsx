import { useState } from 'react'
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button as MuiButton,
  TextField,
  Checkbox,
  FormControlLabel,
} from '@mui/material'
import {
  useDataProvider,
  Form,
  TextInput,
  ReferenceInput,
  SelectInput,
  DateInput,
} from 'react-admin'

const steps = ['المنشأة', 'السائق', 'بطاقة السائق', 'بطاقة التشغيل']

const DriverWizard = () => {
  const dataProvider = useDataProvider()
  const [activeStep, setActiveStep] = useState(0)

  const [facility, setFacility] = useState({
    identity_number: '',
    license_number: '',
    name: '',
    license_issue_date: '',
    license_expiration_date: '',
  })
  interface FacilityRecord {
    id: number
  }
  const [facilityRecord, setFacilityRecord] = useState<FacilityRecord | null>(null)
  const [showFacilityCreate, setShowFacilityCreate] = useState(false)

  const [driver, setDriver] = useState({
    first_name: '',
    last_name: '',
    identity_number: '',
  })
  interface DriverRecord {
    id: number
  }
  const [driverRecord, setDriverRecord] = useState<DriverRecord | null>(null)
  const [driverCardRecord, setDriverCardRecord] = useState<Record<string, unknown> | null>(null)

  const [operationCard, setOperationCard] = useState({
    issue: false,
  })
  const [vehicle, setVehicle] = useState({
    plate_number: '',
    serial_number: '',
  })
  interface VehicleRecord {
    id: number
    plate_number?: string
    serial_number?: string
  }
  const [vehicleRecord, setVehicleRecord] = useState<VehicleRecord | null>(null)
  const [showVehicleCreate, setShowVehicleCreate] = useState(false)
  const [operationCardRecord, setOperationCardRecord] =
    useState<Record<string, unknown> | null>(null)

  const handleFacilitySearch = async () => {
    try {
      const filter: Record<string, string> = {}
      if (facility.identity_number)
        filter.identity_number = facility.identity_number
      if (facility.license_number)
        filter.license_number = facility.license_number
      const { data } = await dataProvider.getList('opc_facility', {
        filter,
        pagination: { page: 1, perPage: 1 },
        sort: { field: 'id', order: 'ASC' },
      })
      if (data.length > 0) {
        setFacilityRecord(data[0])
        setFacility({
          identity_number: data[0].identity_number || '',
          license_number: data[0].license_number || '',
          name: data[0].name || '',
          license_issue_date: data[0].license_issue_date || '',
          license_expiration_date: data[0].license_expiration_date || '',
        })
        setActiveStep(1)
      } else {
        setShowFacilityCreate(true)
        setFacility({ ...facility, identity_number: filter.identity_number || '' })
      }
    } catch {
      window.alert('فشل البحث عن المنشأة')
    }
  }

  const handleFacilityNext = async () => {
    try {
      const { data } = await dataProvider.create('opc_facility', { data: facility })
      setFacilityRecord(data)
      setShowFacilityCreate(false)
      setActiveStep(1)
    } catch {
      window.alert('فشل إنشاء المنشأة')
    }
  }

  const handleDriverSearch = async () => {
    try {
      const { data } = await dataProvider.getList('opc_driver', {
        filter: { identity_number: driver.identity_number },
        pagination: { page: 1, perPage: 1 },
        sort: { field: 'id', order: 'ASC' },
      })
      if (data.length > 0) {
        setDriverRecord(data[0])
        setDriver({
          first_name: data[0].first_name || '',
          last_name: data[0].last_name || '',
          identity_number: data[0].identity_number || '',
        })
        const { data: cardData } = await dataProvider.getList('opc_driver_card', {
          filter: { driver_id: data[0].id },
          pagination: { page: 1, perPage: 1 },
          sort: { field: 'id', order: 'ASC' },
        })
        if (cardData.length > 0) setDriverCardRecord(cardData[0])
        else setDriverCardRecord(null)
        setActiveStep(2)
      } else {
        window.alert('لم يتم العثور على سائق')
      }
    } catch {
      window.alert('فشل البحث عن السائق')
    }
  }

  const handleDriverNext = async () => {
    try {
      const { data } = await dataProvider.create('opc_driver', {
        data: { ...driver, facility_id: facilityRecord?.id },
      })
      setDriverRecord(data)
      setDriverCardRecord(null)
      setActiveStep(2)
    } catch {
      window.alert('فشل إنشاء السائق')
    }
  }

  const handleDriverCardNext = async (values: Record<string, unknown>) => {
    try {
      const { card_type, supplier_id, ...rest } = values as {
        card_type: unknown
        supplier_id: unknown
        [key: string]: unknown
      }
      const payload = {
        ...rest,
        card_type,
        supplier_id,
        driver_id: driverRecord?.id,
        facility_id: facilityRecord?.id,
      }
      if (driverCardRecord)
        await dataProvider.update('opc_driver_card', {
          id: (driverCardRecord as { id: number }).id,
          data: payload,
        })
      else
        await dataProvider.create('opc_driver_card', {
          data: payload,
        })
      setActiveStep(3)
    } catch {
      window.alert('فشل إنشاء بطاقة السائق')
    }
  }

  const handleVehicleSearch = async () => {
    try {
      const filter: Record<string, string> = {}
      if (vehicle.plate_number) filter.plate_number = vehicle.plate_number
      if (vehicle.serial_number) filter.serial_number = vehicle.serial_number
      const { data } = await dataProvider.getList('vehicle', {
        filter,
        pagination: { page: 1, perPage: 1 },
        sort: { field: 'id', order: 'ASC' },
      })
      if (data.length > 0) {
        setVehicleRecord(data[0])
        setVehicle({
          plate_number: data[0].plate_number || '',
          serial_number: data[0].serial_number || '',
        })
        const { data: cardData } = await dataProvider.getList('opc_card', {
          filter: { vehicle_id: data[0].id },
          pagination: { page: 1, perPage: 1 },
          sort: { field: 'id', order: 'ASC' },
        })
        if (cardData.length > 0) setOperationCardRecord(cardData[0])
        else setOperationCardRecord(null)
      } else {
        setShowVehicleCreate(true)
      }
    } catch {
      window.alert('فشل البحث عن المركبة')
    }
  }

  const handleVehicleCreate = async (values: Record<string, unknown>) => {
    try {
      const { model_id, color_id, plate_number, serial_number } = values as {
        model_id: unknown
        color_id: unknown
        plate_number: string
        serial_number: string
      }
      const { data } = await dataProvider.create('vehicle', {
        data: {
          model_id,
          color_id,
          plate_number,
          serial_number,
          facility_id: facilityRecord?.id,
        },
      })
      setVehicleRecord(data)
      setVehicle({
        plate_number: data.plate_number || '',
        serial_number: data.serial_number || '',
      })
      setShowVehicleCreate(false)
      setOperationCardRecord(null)
    } catch {
      window.alert('فشل إنشاء المركبة')
    }
  }

  const handleOperationCardFinish = async (values: Record<string, unknown>) => {
    try {
      if (operationCard.issue && vehicleRecord) {
        const payload = {
          ...values,
          driver_id: driverRecord?.id,
          facility_id: facilityRecord?.id,
          vehicle_id: vehicleRecord.id,
        }
        if (operationCardRecord)
          await dataProvider.update('opc_card', {
            id: (operationCardRecord as { id: number }).id,
            data: payload,
          })
        else await dataProvider.create('opc_card', { data: payload })
      }
      setActiveStep(4)
    } catch {
      window.alert('فشل إنشاء بطاقة التشغيل')
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
          <TextField
            label="رقم الترخيص"
            fullWidth
            margin="normal"
            value={facility.license_number}
            onChange={e =>
              setFacility({ ...facility, license_number: e.target.value })
            }
          />
          {showFacilityCreate && (
            <>
              <TextField
                label="اسم المنشأة"
                fullWidth
                margin="normal"
                value={facility.name}
                onChange={e =>
                  setFacility({ ...facility, name: e.target.value })
                }
              />
              <TextField
                label="تاريخ إصدار الترخيص"
                type="date"
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                value={facility.license_issue_date}
                onChange={e => {
                  const issue = e.target.value
                  const exp = new Date(issue)
                  exp.setFullYear(exp.getFullYear() + 1)
                  setFacility({
                    ...facility,
                    license_issue_date: issue,
                    license_expiration_date: exp.toISOString().split('T')[0],
                  })
                }}
              />
              <TextField
                label="تاريخ انتهاء الترخيص"
                type="date"
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                value={facility.license_expiration_date}
                disabled
              />
              <MuiButton
                variant="contained"
                onClick={handleFacilityNext}
                sx={{ ml: 1 }}
              >
                إنشاء
              </MuiButton>
            </>
          )}
          <MuiButton onClick={handleFacilitySearch}>بحث</MuiButton>
        </Box>
      )}
      {activeStep === 1 && (
        <Box>
          <TextField
            label="الاسم الأول"
            fullWidth
            margin="normal"
            value={driver.first_name}
            onChange={e => setDriver({ ...driver, first_name: e.target.value })}
          />
          <TextField
            label="اسم العائلة"
            fullWidth
            margin="normal"
            value={driver.last_name}
            onChange={e => setDriver({ ...driver, last_name: e.target.value })}
          />
          <TextField
            label="رقم الهوية"
            fullWidth
            margin="normal"
            value={driver.identity_number}
            onChange={e =>
              setDriver({ ...driver, identity_number: e.target.value })
            }
          />
          <MuiButton onClick={handleDriverSearch}>بحث</MuiButton>
          <MuiButton variant="contained" onClick={handleDriverNext} sx={{ ml: 1 }}>
            إنشاء
          </MuiButton>
        </Box>
      )}
      {activeStep === 2 && (
        <Form onSubmit={handleDriverCardNext} defaultValues={driverCardRecord || {}}>
          <TextInput source="card_number" label="رقم بطاقة السائق" fullWidth />
          <ReferenceInput source="card_type" reference="opc_license_type">
            <SelectInput optionText="license_type_name_ar" />
          </ReferenceInput>
          <ReferenceInput source="supplier_id" reference="supplier">
            <SelectInput optionText="name" />
          </ReferenceInput>
          <DateInput source="issue_date" label="تاريخ الإصدار" />
          <DateInput source="expiration_date" label="تاريخ الانتهاء" />
          <MuiButton type="submit" variant="contained">
            التالي
          </MuiButton>
        </Form>
      )}
      {activeStep === 3 && (
        <Box>
          <FormControlLabel
            control={
              <Checkbox
                checked={operationCard.issue}
                onChange={e =>
                  setOperationCard({ ...operationCard, issue: e.target.checked })
                }
              />
            }
            label="إصدار بطاقة تشغيل"
          />
          {operationCard.issue && !vehicleRecord && !showVehicleCreate && (
            <Box>
              <TextField
                label="رقم اللوحة"
                fullWidth
                margin="normal"
                value={vehicle.plate_number}
                onChange={e =>
                  setVehicle({ ...vehicle, plate_number: e.target.value })
                }
              />
              <TextField
                label="رقم الهيكل"
                fullWidth
                margin="normal"
                value={vehicle.serial_number}
                onChange={e =>
                  setVehicle({ ...vehicle, serial_number: e.target.value })
                }
              />
              <MuiButton onClick={handleVehicleSearch}>بحث المركبة</MuiButton>
            </Box>
          )}
          {operationCard.issue && showVehicleCreate && (
            <Form
              onSubmit={handleVehicleCreate}
              defaultValues={{
                plate_number: vehicle.plate_number,
                serial_number: vehicle.serial_number,
              }}
            >
              <ReferenceInput source="model_id" reference="opc_model">
                <SelectInput optionText="model_name" />
              </ReferenceInput>
              <ReferenceInput source="color_id" reference="opc_color">
                <SelectInput optionText="color_name" />
              </ReferenceInput>
              <TextInput source="plate_number" label="رقم اللوحة" />
              <TextInput source="serial_number" label="رقم الهيكل" />
              <MuiButton type="submit" variant="contained">
                إنشاء المركبة
              </MuiButton>
            </Form>
          )}
          {operationCard.issue && vehicleRecord && (
            <Form
              onSubmit={handleOperationCardFinish}
              defaultValues={operationCardRecord || {}}
            >
              <TextInput source="card_number" label="رقم بطاقة التشغيل" fullWidth />
              <ReferenceInput source="supplier_id" reference="supplier">
                <SelectInput optionText="name" />
              </ReferenceInput>
              <DateInput source="issue_date" label="تاريخ الإصدار" />
              <DateInput source="expiration_date" label="تاريخ الانتهاء" />
              <MuiButton type="submit" variant="contained">
                إنهاء
              </MuiButton>
            </Form>
          )}
          {!operationCard.issue && (
            <MuiButton
              variant="contained"
              onClick={() => handleOperationCardFinish({})}
            >
              إنهاء
            </MuiButton>
          )}
        </Box>
      )}
      {activeStep === 4 && <Box>تم إكمال المعالج</Box>}
    </Box>
  )
}

export default DriverWizard
