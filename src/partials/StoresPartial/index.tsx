import { useMemo } from 'react'
import * as S from './styles'

import { Search } from '@mui/icons-material'
import { type GridColDef, type GridRenderCellParams } from '@mui/x-data-grid'
import { useLocation, useNavigate } from 'react-router-dom'

import { DatagridComponent } from '@/components/commom/DatagridComponent'
import { IconsComponent } from '@/components/commom/IconsComponent'
import { LoadingMask } from '@/components/commom/LoadingMask'
import { RowActionMenu } from '@/components/commom/RowActionMenu'
import { TextInputWithIcon } from '@/components/commom/TextInputWithIcon'
import { TabsCompoundComponent } from '@/components/commom/TabsCompoundComponent'
import { ButtonComponent } from '@/components/commom/ButtonComponent'
import { useBranches } from '@/hooks/useBranches'
import { useTableSearch } from '@/hooks/useTableSearch'
import type { IStoreItem } from '@/types'

const STORES_PATH = '/lojas'

export const StoresPartial = () => {
  const {
    searchName,
    paginationModel,
    handleSearchChange,
    handlePaginationChange,
  } = useTableSearch()

  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isStoresPage = pathname === STORES_PATH

  const { branches: branchesData, isLoadingBranches } = useBranches()

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
        minWidth: 160,
        editable: false,
      },
      {
        field: 'city',
        headerName: 'Cidade',
        flex: 1.5,
        minWidth: 120,
        editable: false,
      },
      {
        field: 'state',
        headerName: 'Estado',
        flex: 1,
        minWidth: 72,
        editable: false,
      },
      {
        field: 'address',
        headerName: 'Endereço',
        flex: 2,
        minWidth: 180,
        editable: false,
      },
      {
        field: 'actions',
        headerName: '',
        flex: 0,
        sortable: false,
        renderCell: (params: GridRenderCellParams) => {
          const row = params.row as IStoreItem
          return (
            <RowActionMenu
              label={`Ações da loja ${row.name}`}
              onViewPage={
                row.store_id === undefined
                  ? undefined
                  : () => {
                      void navigate(`/lojas/${row.store_id}`)
                    }
              }
            />
          )
        },
      },
    ],
    [navigate],
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
        <S.SectionHeader>
          <TabsCompoundComponent.Root>
            <TabsCompoundComponent.List>
              <TabsCompoundComponent.Tab label={'Lojas'} index={0} />
            </TabsCompoundComponent.List>
          </TabsCompoundComponent.Root>
          <ButtonComponent
            variant="outlined"
            onClick={() => void navigate(STORES_PATH)}
          >
            Ver mais lojas
          </ButtonComponent>
        </S.SectionHeader>
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

      <LoadingMask isLoading={isLoadingBranches} />
    </S.Wrapper>
  )
}
