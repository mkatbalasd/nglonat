import { useStore } from 'react-admin'

export interface DriverCardWizardState {
  activeStep: number
  facility: { identity_number: string }
  facilityRecord: Record<string, unknown> | null
  showFacilityCreate: boolean
  driver: {
    first_name: string
    last_name: string
    identity_number: string
  }
  driverRecord: Record<string, unknown> | null
  showDriverCreate: boolean
  driverCardRecord: Record<string, unknown> | null
}

const defaultState: DriverCardWizardState = {
  activeStep: 0,
  facility: { identity_number: '' },
  facilityRecord: null,
  showFacilityCreate: false,
  driver: { first_name: '', last_name: '', identity_number: '' },
  driverRecord: null,
  showDriverCreate: false,
  driverCardRecord: null,
}

export const useDriverCardWizardState = () => {
  const [state, setState] = useStore<DriverCardWizardState>(
    'driver-card-wizard-state',
    defaultState
  )

  const update = (patch: Partial<DriverCardWizardState>) =>
    setState({ ...state, ...patch })

  const reset = () => setState(defaultState)

  return { state, setState: update, reset }
}
