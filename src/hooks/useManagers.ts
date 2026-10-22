import { useCallback } from 'react'
import { useQueryClient } from '@tanstack/react-query'

import emitNotification from '@/events/emitNotification'
import { useSendMutation } from '@/hooks/useSendMutation'
import { useSendQuery } from '@/hooks/useSendQuery'
import {
  createManager,
  getManagers,
  MANAGERS_QUERY_KEY,
  updateManager,
} from '@/services/api-managers'
import type { IManager, ISaveManagerData } from '@/types'

interface IUseManagersParams {
  onSaveSuccess: () => void
}

export const useManagers = ({ onSaveSuccess }: IUseManagersParams) => {
  const queryClient = useQueryClient()

  const handleManagerSuccess = useCallback(
    (message: string) => {
      emitNotification({ type: 'success', message })
      onSaveSuccess()
      void queryClient.invalidateQueries({ queryKey: MANAGERS_QUERY_KEY })
    },
    [onSaveSuccess, queryClient],
  )

  const { responseManagers: managers, isLoadingManagers } = useSendQuery<
    IManager[],
    'Managers'
  >({
    queryKey: MANAGERS_QUERY_KEY,
    apiPromise: getManagers,
    suffix: 'Managers',
  })

  const { runFetchCreateManager, isLoadingCreateManager } = useSendMutation<
    IManager,
    'CreateManager'
  >({
    suffix: 'CreateManager',
    onSuccess: () => handleManagerSuccess('Gerente cadastrado com sucesso!'),
  })

  const { runFetchEditManager, isLoadingEditManager } = useSendMutation<
    IManager,
    'EditManager'
  >({
    suffix: 'EditManager',
    onSuccess: () => handleManagerSuccess('Gerente atualizado com sucesso!'),
  })

  const saveManager = (data: ISaveManagerData, existing: IManager | null) => {
    if (existing) {
      runFetchEditManager(
        updateManager(existing.id, {
          name: data.name,
          email: data.email,
          status: data.status,
          store_id: data.store_id,
          replacement_manager_id: data.replacement_manager_id,
        }),
      )
      return
    }

    runFetchCreateManager(
      createManager({
        name: data.name,
        email: data.email,
        password: data.password ?? '',
        store_id: data.store_id,
      }),
    )
  }

  return {
    managers,
    isLoadingManagers,
    isSavingManager: isLoadingCreateManager || isLoadingEditManager,
    saveManager,
  }
}
