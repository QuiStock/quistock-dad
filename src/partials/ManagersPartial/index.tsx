import { useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as S from './styles'

import { Add, Search } from '@mui/icons-material'
import { type GridColDef, type GridRenderCellParams } from '@mui/x-data-grid'

import { DatagridComponent } from '@/components/commom/DatagridComponent'
import { IconsComponent } from '@/components/commom/IconsComponent'
import { TextInputWithIcon } from '@/components/commom/TextInputWithIcon'
import { ButtonWithIcon } from '@/components/commom/ButtonWithIcon'
import { LoadingMask } from '@/components/commom/LoadingMask'
import { RowActionMenu } from '@/components/commom/RowActionMenu'
import { ManagerModal } from './ManagerModal'
import { useManagers } from '@/hooks/useManagers'
import { useTableSearch } from '@/hooks/useTableSearch'
import { ManagerStatusEnum } from '@/types/enums'
import type {
  IManager,
  IManagerTableRow,
  ISaveManagerData,
  TManagerModalType,
} from '@/types'

interface IManagerModalState {
  type: TManagerModalType
  item: IManager | null
}

const CLOSED_MODAL: IManagerModalState = { type: null, item: null }

export const ManagersPartial = () => {
  const {
    searchName,
    paginationModel,
    handleSearchChange,
    handlePaginationChange,
  } = useTableSearch()
  const [modal, setModal] = useState<IManagerModalState>(CLOSED_MODAL)
  const navigate = useNavigate()

  const handleSaveSuccess = useCallback(() => setModal(CLOSED_MODAL), [])
  const { managers, isLoadingManagers, isSavingManager, saveManager } =
    useManagers({ onSaveSuccess: handleSaveSuccess })

  const handleSaveManager = (data: ISaveManagerData) => {
    saveManager(data, modal.item)
  }

  // Keep DataGrid rows stable between unrelated modal/loading renders.
  const tableRows: IManagerTableRow[] = useMemo(() => {
    if (!managers || !Array.isArray(managers)) return []

    const list = managers.map((m) => ({
      id: String(m.id),
      name: m.name,
      email: m.email,
      store: m.store_name || '-',
      status:
        m.status === 'ACTIVE'
          ? ManagerStatusEnum.ACTIVE
          : ManagerStatusEnum.INACTIVE,
      rawItem: m,
    }))

    if (!searchName) return list

    const query = searchName.toLowerCase()
    return list.filter(
      (m) =>
        m.name.toLowerCase().includes(query) ||
        m.email.toLowerCase().includes(query) ||
        m.store.toLowerCase().includes(query),
    )
  }, [managers, searchName])

  // DataGrid uses stable column references to preserve widths and sort state.
  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: 'name',
        headerName: 'Nome',
        flex: 2,
        editable: false,
      },
      {
        field: 'email',
        headerName: 'E-mail',
        flex: 2,
        editable: false,
      },
      {
        field: 'store',
        headerName: 'Loja',
        flex: 2,
        editable: false,
      },
      {
        field: 'status',
        headerName: 'Status',
        flex: 1.5,
        editable: false,
      },
      {
        field: 'actions',
        headerName: '',
        flex: 0,
        sortable: false,
        renderCell: (params: GridRenderCellParams) => {
          const row = params.row as IManagerTableRow
          return (
            <RowActionMenu
              label={`Ações do gerente ${row.name}`}
              onDetails={() => setModal({ type: 'details', item: row.rawItem })}
              onViewPage={() => {
                void navigate(`/gerentes/${encodeURIComponent(row.id)}`)
              }}
            />
          )
        },
      },
    ],
    [navigate],
  )

  return (
    <S.Wrapper>
      <S.BoxFilters>
        <S.FilterInputs>
          <TextInputWithIcon
            icon={<Search />}
            label={'Buscar gerentes'}
            value={searchName}
            onChange={handleSearchChange}
          />
        </S.FilterInputs>

        <ButtonWithIcon
          children={'Adicionar gerente'}
          icon={<Add />}
          variant="outlined"
          onClick={() => setModal({ type: 'create', item: null })}
        />
      </S.BoxFilters>

      {tableRows.length === 0 && !isLoadingManagers ? (
        <IconsComponent type="Empty">
          <p>{'Nenhum gerente encontrado'}</p>
        </IconsComponent>
      ) : (
        <DatagridComponent
          isNotMobileFixed
          disableColumnMenu
          columns={columns}
          rows={tableRows}
          pageSizeOptions={[10, 25, 50]}
          paginationModel={paginationModel}
          paginationMode="client"
          onPaginationModelChange={handlePaginationChange}
        />
      )}

      <ManagerModal
        open={!!modal.type}
        type={modal.type}
        item={modal.item}
        managers={managers ?? []}
        isSaving={isSavingManager}
        onClose={() => setModal((prev) => ({ ...prev, type: null }))}
        onSave={handleSaveManager}
      />

      <LoadingMask isLoading={isLoadingManagers || isSavingManager} />
    </S.Wrapper>
  )
}
