import { useEffect, useMemo, useState } from 'react'
import * as S from './styles'

import { Add, Search } from '@mui/icons-material'
import { type GridColDef } from '@mui/x-data-grid'

import { DatagridComponent } from '@/components/commom/DatagridComponent'
import { IconsComponent } from '@/components/commom/IconsComponent'

import { TextInputWithIcon } from '@/components/commom/TextInputWithIcon'
import { ButtonComponent } from '@/components/commom/ButtonComponent'
import { useNavigate } from 'react-router-dom'
import { TabsCompoundComponent } from '@/components/commom/TabsCompoundComponent'
import { ButtonWithIcon } from '@/components/commom/ButtonWithIcon'
import type { IIdAndName } from '@/types'
import { ModalCreateAndEditTitle } from '@/components/commom/ModalCreateAndEditTitle'
import { useSendMutation } from '@/hooks/useSendMutation'
import { postStore } from '@/services/api-quistock'
import emitNotification from '@/events/emitNotification'
import { LoadingMask } from '@/components/commom/LoadingMask'
import { useQueryClient } from '@tanstack/react-query'

const INITIAL_PATINATION = {
  page: 0,
  pageSize: 10,
}

type TModal = 'create' | null

// Mock
const mockStoresData = [
  {
    id: 1,
    name: 'Swift - Marginal Tietê',
    high_flow: 16,
    low_flow: 19,
    active_orders_count: 3,
    active_promotions: 12,
    manager: 'Fulano',
  },
  {
    id: 2,
    name: 'Swift - Guaipá',
    high_flow: 14,
    low_flow: 11,
    active_orders_count: 11,
    active_promotions: 17,
    manager: 'Fulano',
  },
  {
    id: 3,
    name: 'Swift - Pirituba',
    high_flow: 2,
    low_flow: 14,
    active_orders_count: 14,
    active_promotions: 8,
    manager: 'Fulano',
  },
  {
    id: 4,
    name: 'Swift - Marginal Tietê',
    high_flow: 8,
    low_flow: 3,
    active_orders_count: 3,
    active_promotions: 6,
    manager: 'Fulano',
  },
  {
    id: 5,
    name: 'Swift - Guaipá',
    high_flow: 11,
    low_flow: 7,
    active_orders_count: 7,
    active_promotions: 1,
    manager: 'Fulano',
  },
  {
    id: 6,
    name: 'Swift - Pirituba',
    high_flow: 0,
    low_flow: 16,
    active_orders_count: 16,
    active_promotions: 21,
    manager: 'Fulano',
  },
]

export const StoresPartial = () => {
  const [searchName, setSearchName] = useState('')
  const [paginationModel, setPaginationModel] = useState(INITIAL_PATINATION)
  const [, setSelectedItem] = useState<IIdAndName | null>(null)
  const [showEspecificModal, setShowEspecificModal] = useState<TModal>(null)
  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const isStoresPage = window.location.pathname === '/lojas'

  const {
    responseCreateStore,
    runFetchCreateStore,
    clearResponseCreateStore,
    isLoadingCreateStore,
  } = useSendMutation<any, 'CreateStore'>({ suffix: 'CreateStore' })

  const handleSaveStore = (name: string) => {
    runFetchCreateStore(postStore({ name }))

    setSelectedItem(null)
    setShowEspecificModal(null)
  }

  const handlePaginationChange = (model: typeof INITIAL_PATINATION) => {
    setPaginationModel(model)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value)
    setPaginationModel((prev) => ({ ...prev, page: 0 }))
  }

  // Mock
  const filteredStores = useMemo(() => {
    let result = mockStoresData

    if (searchName) {
      result = result.filter((store) =>
        store.name.toLowerCase().includes(searchName.toLowerCase()),
      )
    }

    // Se não estiver na página de lojas, limita a 5 resultados
    return isStoresPage ? result : result.slice(0, 5)
  }, [searchName, isStoresPage])

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: 'name',
        headerName: 'Nome',
        flex: 2,
        editable: false,
      },
      {
        field: 'high_flow',
        headerName: 'Fluxo Alto',
        flex: 2,
        editable: false,
      },
      {
        field: 'low_flow',
        headerName: 'Fluxo Baixo',
        flex: 2,
        editable: false,
      },
      {
        field: 'active_orders_count',
        headerName: 'Pedidos Ativos',
        flex: 2,
        editable: false,
      },
      {
        field: 'active_promotions',
        headerName: 'Promoções Ativas',
        flex: 2,
        editable: false,
      },
      {
        field: 'manager',
        headerName: 'Gerente',
        flex: 2,
        editable: false,
      },
    ],
    [],
  )

  useEffect(() => {
    if (!responseCreateStore) return

    emitNotification({
      type: 'success',
      message: responseCreateStore.message || 'Operação realizada com sucesso!',
    })
    queryClient.invalidateQueries({
      queryKey: ['/stores'],
    })
    clearResponseCreateStore()
  }, [responseCreateStore])

  return (
    <S.Wrapper>
      {isStoresPage ? (
        <S.BoxFilters>
          <S.FilterInputs>
            <TextInputWithIcon
              icon={<Search />}
              label={'Buscar lojas'}
              value={searchName}
              onChange={handleSearchChange}
            />
          </S.FilterInputs>

          <ButtonWithIcon
            children={'Adicionar loja'}
            icon={<Add />}
            variant="outlined"
            onClick={() => setShowEspecificModal('create')}
          />
        </S.BoxFilters>
      ) : (
        <S.BoxFilters>
          <TabsCompoundComponent.Root>
            <TabsCompoundComponent.List>
              <TabsCompoundComponent.Tab label={'Lojas'} index={0} />
            </TabsCompoundComponent.List>
          </TabsCompoundComponent.Root>
          <S.SeeMoreStoresButton>
            <ButtonComponent
              variant="outlined"
              onClick={() => void navigate('/lojas')}
            >
              Ver mais lojas
            </ButtonComponent>
          </S.SeeMoreStoresButton>
        </S.BoxFilters>
      )}

      {filteredStores.length === 0 ? (
        <IconsComponent type="Empty">
          <p>{'Nenhuma loja encontrada'}</p>
        </IconsComponent>
      ) : (
        <DatagridComponent
          isNotMobileFixed
          disableColumnMenu
          columns={columns}
          rows={filteredStores}
          pageSizeOptions={[10, 25, 50]}
          paginationModel={paginationModel}
          paginationMode="client"
          onPaginationModelChange={handlePaginationChange}
          hideFooter={!isStoresPage}
        />
      )}

      {showEspecificModal === 'create' && (
        <ModalCreateAndEditTitle
          open={!!showEspecificModal}
          modalTitle={'Adicionar loja'}
          placeholder="Nome da loja"
          onCancel={() => setShowEspecificModal(null)}
          onSave={handleSaveStore}
        />
      )}

      <LoadingMask isLoading={isLoadingCreateStore} />
    </S.Wrapper>
  )
}
