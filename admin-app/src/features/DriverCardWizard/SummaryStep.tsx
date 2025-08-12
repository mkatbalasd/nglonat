import { useEffect } from 'react'
import { useDataProvider, useNotify } from 'react-admin'
import { useNavigate } from 'react-router-dom'
import { useDriverCardWizardState } from './state'

const SummaryStep = () => {
  const { state, setState } = useDriverCardWizardState()
  const dataProvider = useDataProvider()
  const notify = useNotify()
  const navigate = useNavigate()

  useEffect(() => {
    const checkActiveCard = async () => {
      const facilityId = (state.facilityRecord as { id: number } | null)?.id
      const driverId = (state.driverRecord as { id: number } | null)?.id
      if (!facilityId || !driverId) return

      try {
        const { data } = await dataProvider.getList('opc_driver_card', {
          filter: {
            facility_id: facilityId,
            driver_id: driverId,
            status: 'active',
          },
          pagination: { page: 1, perPage: 2 },
          sort: { field: 'id', order: 'ASC' },
        })

        if (data.length === 1) {
          setState({ driverCardRecord: data[0] })
          navigate(`/wizard/driver-card/edit/${data[0].id}`)
        } else if (data.length > 1) {
          notify('يوجد أكثر من بطاقة فعالة لهذا السائق والمنشأة. يرجى اختيار البطاقة.', {
            type: 'warning',
          })
          navigate('/opc_driver_card')
        } else {
          setState({ driverCardRecord: null })
        }
      } catch (error) {
        notify(
          (error as { message?: string })?.message || 'فشل التحقق من بطاقة السائق',
          { type: 'error' }
        )
      }
    }

    checkActiveCard()
  }, [state.facilityRecord, state.driverRecord, dataProvider, navigate, notify, setState])

  return <div>Driver Card Summary Step {state.activeStep}</div>
}

export default SummaryStep
