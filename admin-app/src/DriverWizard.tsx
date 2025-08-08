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
    IdentityNumber: '',
    LicenseNumber: '',
    Name: '',
  })
  interface FacilityRecord {
    id: number
  }
  const [facilityRecord, setFacilityRecord] = useState<FacilityRecord | null>(null)

  const [driver, setDriver] = useState({
    FirstName: '',
    LastName: '',
    IdentityNumber: '',
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
      if (facility.IdentityNumber)
        filter.IdentityNumber = facility.IdentityNumber
      if (facility.LicenseNumber)
        filter.LicenseNumber = facility.LicenseNumber
      const { data } = await dataProvider.getList('OPC_Facility_view', {
        filter,
        pagination: { page: 1, perPage: 1 },
        sort: { field: 'id', order: 'ASC' },
      })
      if (data.length > 0) {
        setFacilityRecord(data[0])
        setFacility({
          IdentityNumber: data[0].IdentityNumber || '',
          LicenseNumber: data[0].LicenseNumber || '',
          Name: data[0].Name || '',
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
      const { data } = await dataProvider.create('OPC_Facility_view', { data: facility })
      setFacilityRecord(data)
      setActiveStep(1)
    } catch {
      window.alert('فشل إنشاء المنشأة')
    }
  }

  const handleDriverSearch = async () => {
    try {
      const { data } = await dataProvider.getList('OPC_Driver_view', {
        filter: { IdentityNumber: driver.IdentityNumber },
        pagination: { page: 1, perPage: 1 },
        sort: { field: 'id', order: 'ASC' },
      })
      if (data.length > 0) {
        setDriverRecord(data[0])
        setDriver({
          FirstName: data[0].FirstName || '',
          LastName: data[0].LastName || '',
          IdentityNumber: data[0].IdentityNumber || '',
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
      const { data } = await dataProvider.create('OPC_Driver_view', {
        data: { ...driver, FacilityID: facilityRecord?.id },
      })
      setDriverRecord(data)
      setActiveStep(2)
    } catch {
      window.alert('فشل إنشاء السائق')
    }
  }

  const handleDriverCardNext = async (values: Record<string, unknown>) => {
    try {
      await dataProvider.create('OPC_DriverCard_view', {
        data: {
          ...values,
          DriverID: driverRecord?.id,
          FacilityID: facilityRecord?.id,
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
        await dataProvider.create('OPC_Card_view', {
          data: {
            ...values,
            DriverID: driverRecord?.id,
            FacilityID: facilityRecord?.id,
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
            value={facility.IdentityNumber}
            onChange={e => setFacility({ ...facility, IdentityNumber: e.target.value })}
          />
          <TextField
            label="رقم الترخيص"
            fullWidth
            margin="normal"
            value={facility.LicenseNumber}
            onChange={e => setFacility({ ...facility, LicenseNumber: e.target.value })}
          />
          <TextField
            label="اسم المنشأة"
            fullWidth
            margin="normal"
            value={facility.Name}
            onChange={e => setFacility({ ...facility, Name: e.target.value })}
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
            value={driver.FirstName}
            onChange={e => setDriver({ ...driver, FirstName: e.target.value })}
          />
          <TextField
            label="اسم العائلة"
            fullWidth
            margin="normal"
            value={driver.LastName}
            onChange={e => setDriver({ ...driver, LastName: e.target.value })}
          />
          <TextField
            label="رقم الهوية"
            fullWidth
            margin="normal"
            value={driver.IdentityNumber}
            onChange={e => setDriver({ ...driver, IdentityNumber: e.target.value })}
          />
          <MuiButton onClick={handleDriverSearch}>بحث</MuiButton>
          <MuiButton variant="contained" onClick={handleDriverNext} sx={{ ml: 1 }}>
            إنشاء
          </MuiButton>
        </Box>
      )}
      {activeStep === 2 && (
        <Form onSubmit={handleDriverCardNext} defaultValues={{}}>
          <TextInput source="CardNumber" label="رقم بطاقة السائق" fullWidth />
          <ReferenceInput source="LicenseTypeID" reference="OPC_LicenseType_view">
            <SelectInput optionText="LicenseTypeNameAR" />
          </ReferenceInput>
          <ReferenceInput source="SupplierID" reference="Supplier">
            <SelectInput optionText="name" />
          </ReferenceInput>
          <DateInput source="IssueDate" label="تاريخ الإصدار" />
          <DateInput source="ExpiryDate" label="تاريخ الانتهاء" />
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
              <TextInput source="CardNumber" label="رقم بطاقة التشغيل" fullWidth />
              <ReferenceInput source="SupplierID" reference="Supplier">
                <SelectInput optionText="name" />
              </ReferenceInput>
              <DateInput source="IssueDate" label="تاريخ الإصدار" />
              <DateInput source="ExpiryDate" label="تاريخ الانتهاء" />
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
