import { useEffect } from 'react'
import { useDriverCardWizardState } from './state'

const CreateDriverCard = () => {
  const { reset } = useDriverCardWizardState()
  useEffect(() => {
    reset()
  }, [reset])
  return <div>Create Driver Card Step</div>
}

export default CreateDriverCard
