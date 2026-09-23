import { useMemo, useState } from 'react'
import * as S from './styles'

import { Search } from '@mui/icons-material'
import { type GridColDef } from '@mui/x-data-grid'

import { DatagridComponent } from '@/components/commom/DatagridComponent'
import { IconsComponent } from '@/components/commom/IconsComponent'

import { TextInputWithIcon } from '@/components/commom/TextInputWithIcon'

const INITIAL_PATINATION = {
  page: 0,
  pageSize: 10,
}

// Mock
const mockStoresData = [
  {
    id: 1,
    name: 'Swift - Marginal Tietê',
    high_flow: 16,
    low_flow: 19,
    active_orders_count: 3,
    active_promotions: 12,
  },
  {
    id: 2,
    name: 'Swift - Guaipá',
    high_flow: 14,
    low_flow: 11,
    active_orders_count: 11,
    active_promotions: 17,
  },
  {
    id: 3,
    name: 'Swift - Pirituba',
    high_flow: 2,
    low_flow: 14,
    active_orders_count: 14,
    active_promotions: 8,
  },
  {
    id: 4,
    name: 'Swift - Marginal Tietê',
    high_flow: 8,
    low_flow: 3,
    active_orders_count: 3,
    active_promotions: 6,
  },
  {
    id: 5,
    name: 'Swift - Guaipá',
    high_flow: 11,
    low_flow: 7,
    active_orders_count: 7,
    active_promotions: 1,
  },
  {
    id: 6,
    name: 'Swift - Pirituba',
    high_flow: 0,
    low_flow: 16,
    active_orders_count: 16,
    active_promotions: 21,
  },
]

export const StoresPartial = () => {
  const [searchName, setSearchName] = useState('')
  const [paginationModel, setPaginationModel] = useState(INITIAL_PATINATION)

  const handlePaginationChange = (model: typeof INITIAL_PATINATION) => {
    setPaginationModel(model)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value)
    setPaginationModel((prev) => ({ ...prev, page: 0 }))
  }

  // Mock
  const filteredStores = useMemo(() => {
    if (!searchName) return mockStoresData
    return mockStoresData.filter((store) =>
      store.name.toLowerCase().includes(searchName.toLowerCase()),
    )
  }, [searchName])

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
    ],
    [],
  )

  return (
    <S.Wrapper>
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
        />
      )}
    </S.Wrapper>
  )
}
