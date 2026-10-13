import { useMemo, useState } from 'react'
import * as S from './styles'

import { Search, MoreVertOutlined, ArticleOutlined } from '@mui/icons-material'
import { type GridColDef, type GridRenderCellParams } from '@mui/x-data-grid'
import { IconButton, Menu } from '@mui/material'

import { DatagridComponent } from '@/components/commom/DatagridComponent'
import { IconsComponent } from '@/components/commom/IconsComponent'
import { LoadingMask } from '@/components/commom/LoadingMask'

import { TextInputWithIcon } from '@/components/commom/TextInputWithIcon'
import { TabsCompoundComponent } from '@/components/commom/TabsCompoundComponent'
import { StoreModal } from './StoreModal'
import { ButtonComponent } from '@/components/commom/ButtonComponent'
import { useNavigate } from 'react-router-dom'
import { useSendQuery } from '@/hooks/useSendQuery'
import { getBranches, BRANCHES_QUERY_KEY } from '@/services/api-branches'
import type { IBranch } from '@/types'

const INITIAL_PAGINATION = {
  page: 0,
  pageSize: 10,
}

const ActionMenu = ({ onDetails }: { onDetails: () => void }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleDetails = (event: React.MouseEvent) => {
    event.stopPropagation()
    handleClose()
    onDetails()
  }

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVertOutlined />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <S.StyledItemFloatMenu onClick={handleDetails}>
          <ArticleOutlined />
          <S.TextItemMenuFloat>Detalhes</S.TextItemMenuFloat>
        </S.StyledItemFloatMenu>
      </Menu>
    </>
  )
}

export interface IStoreItem {
  id: string | number
  name: string
  store_id?: number
  high_flow?: number
  low_flow?: number
  active_orders_count?: number
  active_promotions?: number
  manager?: string
  cep?: string
  state?: string
  city?: string
  street?: string
  number?: string
  complement?: string
  address?: string
}

export const StoresPartial = () => {
  const [searchName, setSearchName] = useState('')
  const [paginationModel, setPaginationModel] = useState(INITIAL_PAGINATION)

  const navigate = useNavigate()

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<IStoreItem | null>(null)

  const isStoresPage = window.location.pathname === '/lojas'

  const {
    responseBranches: branchesData,
    isLoadingBranches,
  } = useSendQuery<IBranch[], 'Branches'>({
    queryKey: BRANCHES_QUERY_KEY,
    apiPromise: getBranches,
    suffix: 'Branches',
  })

  const handlePaginationChange = (model: typeof INITIAL_PAGINATION) => {
    setPaginationModel(model)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value)
    setPaginationModel((prev) => ({ ...prev, page: 0 }))
  }

  const storeItems: IStoreItem[] = useMemo(() => {
    if (!branchesData || !Array.isArray(branchesData)) return []

    const list: IStoreItem[] = branchesData.map((branch) => ({
      id: branch.id,
      store_id: branch.store_id,
      name: branch.name,
      city: branch.city ?? '-',
      state: branch.state ?? '-',
      address: branch.address ?? '-',
      high_flow: 0,
      low_flow: 0,
      active_orders_count: 0,
      active_promotions: 0,
      manager: '-',
    }))

    if (searchName) {
      const query = searchName.toLowerCase()
      return list.filter(
        (store) =>
          store.name.toLowerCase().includes(query) ||
          (store.city && store.city.toLowerCase().includes(query)) ||
          (store.state && store.state.toLowerCase().includes(query)),
      )
    }

    return list
  }, [branchesData, searchName])

  const displayedStores = useMemo(() => {
    return isStoresPage ? storeItems : storeItems.slice(0, 5)
  }, [storeItems, isStoresPage])

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: 'name',
        headerName: 'Nome da Filial',
        flex: 2,
        editable: false,
      },
      {
        field: 'city',
        headerName: 'Cidade',
        flex: 1.5,
        editable: false,
      },
      {
        field: 'state',
        headerName: 'Estado',
        flex: 1,
        editable: false,
      },
      {
        field: 'address',
        headerName: 'Endereço',
        flex: 2,
        editable: false,
      },
      {
        field: 'actions',
        headerName: '',
        flex: 0,
        sortable: false,
        renderCell: (params: GridRenderCellParams) => (
          <ActionMenu
            onDetails={() => {
              setSelectedItem(params.row as IStoreItem)
              setIsDetailsModalOpen(true)
            }}
          />
        ),
      },
    ],
    [],
  )

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

      {displayedStores.length === 0 && !isLoadingBranches ? (
        <IconsComponent type="Empty">
          <p>{'Nenhuma loja encontrada'}</p>
        </IconsComponent>
      ) : (
        <DatagridComponent
          isNotMobileFixed
          disableColumnMenu
          columns={columns}
          rows={displayedStores}
          pageSizeOptions={[10, 25, 50]}
          paginationModel={paginationModel}
          paginationMode="client"
          onPaginationModelChange={handlePaginationChange}
          hideFooter={!isStoresPage}
        />
      )}

      <StoreModal
        open={isDetailsModalOpen}
        item={selectedItem}
        onClose={() => setIsDetailsModalOpen(false)}
      />

      <LoadingMask isLoading={isLoadingBranches} />
    </S.Wrapper>
  )
}
