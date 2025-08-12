import { useDriverCardWizardState } from './state'

const DriverStep = () => {
  const { state } = useDriverCardWizardState()
  return <div>Driver Card Driver Step {state.activeStep}</div>
}

export default DriverStep
