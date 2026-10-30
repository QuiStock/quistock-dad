import { ArrowBack } from '@mui/icons-material'
import { useNavigate, useParams } from 'react-router-dom'

import * as S from './styles'
import { Page } from '@/components/commom/Page'
import { ButtonWithIcon } from '@/components/commom/ButtonWithIcon'
import { LoadingMask } from '@/components/commom/LoadingMask'
import { useSendQuery } from '@/hooks/useSendQuery'
import { getManagerById, managerDetailQueryKey } from '@/services/api-managers'
import type { IManager } from '@/types'

const ManagerDetail = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const managerId = id?.trim() ?? ''
  const hasValidId = managerId !== ''

  const { responseManager, isLoadingManager, errorManager } = useSendQuery<
    IManager,
    'Manager'
  >({
    queryKey: managerDetailQueryKey(managerId),
    apiPromise: (signal) => getManagerById(managerId, signal),
    suffix: 'Manager',
    options: { enabled: hasValidId },
  })

  const backButton = (
    <ButtonWithIcon
      variant="outlined"
      icon={<ArrowBack />}
      onClick={() => {
        void navigate('/gerentes')
      }}
    >
      Voltar
    </ButtonWithIcon>
  )

  const renderContent = () => {
    if (!hasValidId) {
      return (
        <S.ErrorMessage role="alert">
          Identificador do gerente não informado.
        </S.ErrorMessage>
      )
    }

    if (isLoadingManager) return <LoadingMask isLoading />

    if (errorManager || !responseManager) {
      return (
        <S.ErrorMessage role="alert">
          Não foi possível carregar o gerente.
        </S.ErrorMessage>
      )
    }

    return (
      <S.DetailList>
        <S.DetailLabel>Nome</S.DetailLabel>
        <S.DetailValue>{responseManager.name}</S.DetailValue>
        <S.DetailLabel>E-mail</S.DetailLabel>
        <S.DetailValue>{responseManager.email}</S.DetailValue>
        <S.DetailLabel>Loja</S.DetailLabel>
        <S.DetailValue>{responseManager.store_name ?? '-'}</S.DetailValue>
        <S.DetailLabel>Região</S.DetailLabel>
        <S.DetailValue>{responseManager.region_name ?? '-'}</S.DetailValue>
        <S.DetailLabel>Status</S.DetailLabel>
        <S.DetailValue>
          {responseManager.status === 'ACTIVE' ? 'Ativo' : 'Inativo'}
        </S.DetailValue>
      </S.DetailList>
    )
  }

  return (
    <Page title={'Detalhes do gerente'}>
      <S.Wrapper>
        {backButton}
        {renderContent()}
      </S.Wrapper>
    </Page>
  )
}

export default ManagerDetail
