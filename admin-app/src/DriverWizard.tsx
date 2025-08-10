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
  })
  interface FacilityRecord {
    id: number
  }
  const [facilityRecord, setFacilityRecord] = useState<FacilityRecord | null>(null)

  const [driver, setDriver] = useState({
    first_name: '',
    last_name: '',
    identity_number: '',
  })
  interface DriverRecord {
    id: number
  }
  const [driverRecord, setDriverRecord] = useState<DriverRecord | null>(null)

  const [operationCard, setOperationCard] = useState({
    issue: false,
  })

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
        })
        setActiveStep(1)
      } else {
        window.alert('لم يتم العثور على منشأة')
      }
    } catch {
      window.alert('فشل البحث عن المنشأة')
    }
  }

  const handleFacilityNext = async () => {
    try {
      const { data } = await dataProvider.create('opc_facility', { data: facility })
      setFacilityRecord(data)
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
      await dataProvider.create('opc_driver_card', {
        data: {
          ...rest,
          card_type,
          supplier_id,
          driver_id: driverRecord?.id,
          facility_id: facilityRecord?.id,
        },
      })
      setActiveStep(3)
    } catch {
      window.alert('فشل إنشاء بطاقة السائق')
    }
  }

  const handleOperationCardFinish = async (values: Record<string, unknown>) => {
    try {
      if (operationCard.issue) {
        await dataProvider.create('opc_card', {
          data: {
            ...values,
            driver_id: driverRecord?.id,
            facility_id: facilityRecord?.id,
          },
        })
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
          <TextField
            label="اسم المنشأة"
            fullWidth
            margin="normal"
            value={facility.name}
            onChange={e => setFacility({ ...facility, name: e.target.value })}
          />
          <MuiButton onClick={handleFacilitySearch}>بحث</MuiButton>
          <MuiButton variant="contained" onClick={handleFacilityNext} sx={{ ml: 1 }}>
            إنشاء
          </MuiButton>
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
        <Form onSubmit={handleDriverCardNext} defaultValues={{}}>
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
        <Form onSubmit={handleOperationCardFinish} defaultValues={{}}>
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
          {operationCard.issue && (
            <>
              <TextInput source="card_number" label="رقم بطاقة التشغيل" fullWidth />
              <ReferenceInput source="supplier_id" reference="supplier">
                <SelectInput optionText="name" />
              </ReferenceInput>
              <DateInput source="issue_date" label="تاريخ الإصدار" />
              <DateInput
                source="expiration_date"
                label="تاريخ الانتهاء"
              />
            </>
          )}
          <MuiButton type="submit" variant="contained">
            إنهاء
          </MuiButton>
        </Form>
      )}
      {activeStep === 4 && <Box>تم إكمال المعالج</Box>}
    </Box>
  )
}

export default DriverWizard
