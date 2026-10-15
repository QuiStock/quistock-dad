import { useCallback, useEffect, useMemo, useState } from 'react'
import * as S from './styles'

import {
  Add,
  Search,
  MoreVertOutlined,
  ArticleOutlined,
} from '@mui/icons-material'
import { type GridColDef, type GridRenderCellParams } from '@mui/x-data-grid'
import { IconButton, Menu } from '@mui/material'

import { DatagridComponent } from '@/components/commom/DatagridComponent'
import { IconsComponent } from '@/components/commom/IconsComponent'

import { TextInputWithIcon } from '@/components/commom/TextInputWithIcon'
import { ButtonWithIcon } from '@/components/commom/ButtonWithIcon'
import { ManagerModal, type ISaveManagerData } from './ManagerModal'
import { useSendMutation } from '@/hooks/useSendMutation'
import { useSendQuery } from '@/hooks/useSendQuery'
import emitNotification from '@/events/emitNotification'
import { LoadingMask } from '@/components/commom/LoadingMask'
import { useQueryClient } from '@tanstack/react-query'
import { ManagerStatusEnum } from '@/types/enums'
import {
  getManagers,
  createManager,
  updateManager,
  MANAGERS_QUERY_KEY,
} from '@/services/api-managers'
import type { IManager } from '@/types'

export interface IManagerTableRow {
  id: string
  name: string
  email: string
  store: string
  status: string
  rawItem: IManager
}

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

type TModal = 'create' | 'edit' | 'details' | null

export const ManagersPartial = () => {
  const [searchName, setSearchName] = useState('')
  const [paginationModel, setPaginationModel] = useState(INITIAL_PAGINATION)
  const [showEspecificModal, setShowEspecificModal] = useState<TModal>(null)
  const [selectedItem, setSelectedItem] = useState<IManager | null>(null)

  const queryClient = useQueryClient()

  const { responseManagers: managersData, isLoadingManagers } = useSendQuery<
    IManager[],
    'Managers'
  >({
    queryKey: MANAGERS_QUERY_KEY,
    apiPromise: getManagers,
    suffix: 'Managers',
  })

  const {
    responseCreateManager,
    runFetchCreateManager,
    clearResponseCreateManager,
    isLoadingCreateManager,
  } = useSendMutation<IManager, 'CreateManager'>({
    suffix: 'CreateManager',
  })

  const {
    responseEditManager,
    runFetchEditManager,
    clearResponseEditManager,
    isLoadingEditManager,
  } = useSendMutation<IManager, 'EditManager'>({
    suffix: 'EditManager',
  })

  const handleSaveManager = (data: ISaveManagerData) => {
    if (selectedItem) {
      runFetchEditManager(
        updateManager(selectedItem.id, {
          name: data.name,
          email: data.email,
          status: data.status,
        }),
      )
    } else {
      runFetchCreateManager(
        createManager({
          name: data.name,
          email: data.email,
          password: data.password ?? '',
        }),
      )
    }

    setSelectedItem(null)
    setShowEspecificModal(null)
  }

  const handlePaginationChange = (model: typeof INITIAL_PAGINATION) => {
    setPaginationModel(model)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value)
    setPaginationModel((prev) => ({ ...prev, page: 0 }))
  }

  const tableRows: IManagerTableRow[] = useMemo(() => {
    if (!managersData || !Array.isArray(managersData)) return []

    let list = managersData.map((m) => ({
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

    if (searchName) {
      const query = searchName.toLowerCase()
      list = list.filter(
        (m) =>
          m.name.toLowerCase().includes(query) ||
          m.email.toLowerCase().includes(query) ||
          m.store.toLowerCase().includes(query),
      )
    }

    return list
  }, [managersData, searchName])

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
        renderCell: (params: GridRenderCellParams) => (
          <ActionMenu
            onDetails={() => {
              const row = params.row as IManagerTableRow
              setSelectedItem(row.rawItem)
              setShowEspecificModal('details')
            }}
          />
        ),
      },
    ],
    [],
  )

  const handleResponseCreateManager = useCallback(() => {
    if (!responseCreateManager) return

    emitNotification({
      type: 'success',
      message: 'Gerente cadastrado com sucesso!',
    })
    void queryClient.invalidateQueries({
      queryKey: MANAGERS_QUERY_KEY,
    })
    clearResponseCreateManager()
  }, [responseCreateManager, clearResponseCreateManager, queryClient])

  useEffect(() => {
    handleResponseCreateManager()
  }, [handleResponseCreateManager])

  useEffect(() => {
    if (!responseEditManager) return

    emitNotification({
      type: 'success',
      message: 'Gerente atualizado com sucesso!',
    })
    void queryClient.invalidateQueries({
      queryKey: MANAGERS_QUERY_KEY,
    })
    clearResponseEditManager()
  }, [responseEditManager, clearResponseEditManager, queryClient])

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
          onClick={() => {
            setSelectedItem(null)
            setShowEspecificModal('create')
          }}
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
        open={!!showEspecificModal}
        type={showEspecificModal}
        item={selectedItem}
        onClose={() => setShowEspecificModal(null)}
        onSave={handleSaveManager}
      />

      <LoadingMask
        isLoading={
          isLoadingManagers || isLoadingCreateManager || isLoadingEditManager
        }
      />
    </S.Wrapper>
  )
}
