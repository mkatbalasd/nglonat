import { useDriverCardWizardState } from './state'

const FacilityStep = () => {
  const { state } = useDriverCardWizardState()
  return <div>Driver Card Facility Step {state.activeStep}</div>
}

export default FacilityStep
