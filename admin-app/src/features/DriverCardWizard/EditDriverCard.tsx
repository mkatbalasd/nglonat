import { useEffect } from 'react'
import { useDriverCardWizardState } from './state'

const EditDriverCard = () => {
  const { reset } = useDriverCardWizardState()
  useEffect(() => {
    reset()
  }, [reset])
  return <div>Edit Driver Card Step</div>
}

export default EditDriverCard
