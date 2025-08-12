import { useDriverCardWizardState } from './state'

const SummaryStep = () => {
  const { state } = useDriverCardWizardState()
  return <div>Driver Card Summary Step {state.activeStep}</div>
}

export default SummaryStep
