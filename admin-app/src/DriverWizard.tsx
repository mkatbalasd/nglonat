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
import { useDataProvider } from 'react-admin'

const steps = ['المنشأة', 'السائق', 'بطاقة السائق', 'بطاقة التشغيل']

const DriverWizard = () => {
  const dataProvider = useDataProvider()
  const [activeStep, setActiveStep] = useState(0)

  const [facility, setFacility] = useState({ IdentityNumber: '', Name: '' })
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

  const [driverCard, setDriverCard] = useState({ CardNumber: '' })
  const [operationCard, setOperationCard] = useState({ CardNumber: '', issue: false })

  const handleFacilityNext = async () => {
    const { data } = await dataProvider.create('OPC_Facility', { data: facility })
    setFacilityRecord(data)
    setActiveStep(1)
  }

  const handleDriverNext = async () => {
    const { data } = await dataProvider.create('OPC_Driver', {
      data: { ...driver, FacilityID: facilityRecord?.id },
    })
    setDriverRecord(data)
    setActiveStep(2)
  }

  const handleDriverCardNext = async () => {
    await dataProvider.create('OPC_DriverCard', {
      data: {
        ...driverCard,
        DriverID: driverRecord?.id,
        FacilityID: facilityRecord?.id,
      },
    })
    setActiveStep(3)
  }

  const handleOperationCardFinish = async () => {
    if (operationCard.issue) {
      await dataProvider.create('OPC_Card', {
        data: {
          CardNumber: operationCard.CardNumber,
          DriverID: driverRecord?.id,
          FacilityID: facilityRecord?.id,
        },
      })
    }
    setActiveStep(4)
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
            label="اسم المنشأة"
            fullWidth
            margin="normal"
            value={facility.Name}
            onChange={e => setFacility({ ...facility, Name: e.target.value })}
          />
          <MuiButton variant="contained" onClick={handleFacilityNext}>
            التالي
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
          <MuiButton variant="contained" onClick={handleDriverNext}>
            التالي
          </MuiButton>
        </Box>
      )}
      {activeStep === 2 && (
        <Box>
          <TextField
            label="رقم بطاقة السائق"
            fullWidth
            margin="normal"
            value={driverCard.CardNumber}
            onChange={e => setDriverCard({ ...driverCard, CardNumber: e.target.value })}
          />
          <MuiButton variant="contained" onClick={handleDriverCardNext}>
            التالي
          </MuiButton>
        </Box>
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
          {operationCard.issue && (
            <TextField
              label="رقم بطاقة التشغيل"
              fullWidth
              margin="normal"
              value={operationCard.CardNumber}
              onChange={e =>
                setOperationCard({ ...operationCard, CardNumber: e.target.value })
              }
            />
          )}
          <MuiButton variant="contained" onClick={handleOperationCardFinish}>
            إنهاء
          </MuiButton>
        </Box>
      )}
      {activeStep === 4 && <Box>تم إكمال المعالج</Box>}
    </Box>
  )
}

export default DriverWizard
