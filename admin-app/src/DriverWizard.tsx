import { useState } from 'react'
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button as MuiButton,
  TextField,
} from '@mui/material'
import {
  useDataProvider,
  useRedirect,
  Form,
  TextInput,
  ReferenceInput,
  SelectInput,
  DateInput,
} from 'react-admin'

const DriverWizard = () => {
  const dataProvider = useDataProvider()
  const redirect = useRedirect()
  const [activeStep, setActiveStep] = useState(0)

  const [facility, setFacility] = useState({
    identity_number: '',
    name: '',
    english_name: '',
    license_number: '',
    license_type_id: '',
    license_city_id: '',
    license_issue_date: '',
    license_expiration_date: '',
  })
  interface FacilityRecord {
    id: number
  }
  const [facilityRecord, setFacilityRecord] = useState<FacilityRecord | null>(
    null
  )
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
  const [showDriverCreate, setShowDriverCreate] = useState(false)
  const [driverCardRecord, setDriverCardRecord] =
    useState<Record<string, unknown> | null>(null)

  const steps = ['المنشأة', 'السائق', 'بطاقة السائق']

  const handleFacilitySearch = async () => {
    try {
      const { data } = await dataProvider.getList('opc_facility', {
        filter: { identity_number: facility.identity_number },
        pagination: { page: 1, perPage: 1 },
        sort: { field: 'id', order: 'ASC' },
      })
      if (data.length > 0) {
        setFacilityRecord(data[0])
        setFacility({
          identity_number: data[0].identity_number || '',
          name: data[0].name || '',
          english_name: data[0].english_name || '',
          license_number: data[0].license_number || '',
          license_type_id: data[0].license_type_id || '',
          license_city_id: data[0].license_city_id || '',
          license_issue_date: data[0].license_issue_date || '',
          license_expiration_date: data[0].license_expiration_date || '',
        })
        setActiveStep(1)
      } else {
        setShowFacilityCreate(true)
      }
    } catch {
      window.alert('فشل البحث عن المنشأة')
    }
  }

  const handleFacilityNext = async () => {
    try {
      const { data } = await dataProvider.create('opc_facility', {
        data: facility,
      })
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
        const { data: cardData } = await dataProvider.getList(
          'opc_driver_card',
          {
            filter: { driver_id: data[0].id },
            pagination: { page: 1, perPage: 1 },
            sort: { field: 'id', order: 'ASC' },
          }
        )
        setDriverCardRecord(cardData.length > 0 ? cardData[0] : null)
        setActiveStep(2)
      } else {
        setShowDriverCreate(true)
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
      setShowDriverCreate(false)
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
      else await dataProvider.create('opc_driver_card', { data: payload })
      redirect('/opc_driver_card')
    } catch {
      window.alert('فشل حفظ بطاقة السائق')
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
                label="الاسم بالإنجليزية"
                fullWidth
                margin="normal"
                value={facility.english_name}
                onChange={e =>
                  setFacility({ ...facility, english_name: e.target.value })
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
                label="نوع الترخيص"
                fullWidth
                margin="normal"
                value={facility.license_type_id}
                onChange={e =>
                  setFacility({ ...facility, license_type_id: e.target.value })
                }
              />
              <TextField
                label="مدينة الترخيص"
                fullWidth
                margin="normal"
                value={facility.license_city_id}
                onChange={e =>
                  setFacility({ ...facility, license_city_id: e.target.value })
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
                التالي
              </MuiButton>
            </>
          )}
        </Box>
      )}
      {activeStep === 1 && (
        <Box>
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
          {showDriverCreate && (
            <>
              <TextField
                label="الاسم الأول"
                fullWidth
                margin="normal"
                value={driver.first_name}
                onChange={e =>
                  setDriver({ ...driver, first_name: e.target.value })
                }
              />
              <TextField
                label="اسم العائلة"
                fullWidth
                margin="normal"
                value={driver.last_name}
                onChange={e =>
                  setDriver({ ...driver, last_name: e.target.value })
                }
              />
              <MuiButton
                variant="contained"
                onClick={handleDriverNext}
                sx={{ ml: 1 }}
              >
                التالي
              </MuiButton>
            </>
          )}
        </Box>
      )}
      {activeStep === 2 && (
        <Form
          onSubmit={handleDriverCardNext}
          defaultValues={driverCardRecord || {}}
        >
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
            حفظ
          </MuiButton>
        </Form>
      )}
    </Box>
  )
}

export default DriverWizard

