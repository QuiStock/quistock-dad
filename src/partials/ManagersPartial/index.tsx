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
import { ManagerModal } from './ManagerModal'
import { useSendMutation } from '@/hooks/useSendMutation'
import emitNotification from '@/events/emitNotification'
import { LoadingMask } from '@/components/commom/LoadingMask'
import { useQueryClient } from '@tanstack/react-query'
import { ManagerStatusEnum } from '@/types/enums'
import { postManager, putManager } from '@/services/api-quistock'
import type { IIdAndName } from '@/types'

export interface IManagerItem extends IIdAndName {
  status?: string
  store?: string
}

const INITIAL_PATINATION = {
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

  const handleClose = (event?: React.MouseEvent) => {
    event?.stopPropagation()
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

interface IManagerResponse {
  message: string
}

// Mock
const mockManagersData = [
  {
    id: 1,
    name: 'Paulo Santos',
    store: 'Swift - Marginal Tietê',
    status: ManagerStatusEnum.ACTIVE,
  },
  {
    id: 2,
    name: 'Paulo Santos',
    store: 'Swift - Marginal Tietê',
    status: ManagerStatusEnum.ACTIVE,
  },
  {
    id: 3,
    name: 'Paulo Santos',
    store: 'Swift - Marginal Tietê',
    status: ManagerStatusEnum.ACTIVE,
  },
  {
    id: 4,
    name: 'Paulo Santos',
    store: 'Swift - Marginal Tietê',
    status: ManagerStatusEnum.ACTIVE,
  },
  {
    id: 5,
    name: 'Paulo Santos',
    store: 'Swift - Marginal Tietê',
    status: ManagerStatusEnum.ACTIVE,
  },
  {
    id: 6,
    name: 'Paulo Santos',
    store: 'Swift - Marginal Tietê',
    status: ManagerStatusEnum.ACTIVE,
  },
]

export const ManagersPartial = () => {
  const [searchName, setSearchName] = useState('')
  const [paginationModel, setPaginationModel] = useState(INITIAL_PATINATION)
  const [showEspecificModal, setShowEspecificModal] = useState<TModal>(null)
  const [selectedItem, setSelectedItem] = useState<IManagerItem | null>(null)

  const queryClient = useQueryClient()

  const {
    responseCreateManager,
    runFetchCreateManager,
    clearResponseCreateManager,
    isLoadingCreateManager,
  } = useSendMutation<IManagerResponse, 'CreateManager'>({
    suffix: 'CreateManager',
  })

  const {
    responseEditManager,
    runFetchEditManager,
    clearResponseEditManager,
    isLoadingEditManager,
  } = useSendMutation<IManagerResponse, 'EditManager'>({
    suffix: 'EditManager',
  })

  const handleSaveManager = (name: string, status?: string) => {
    if (selectedItem) {
      runFetchEditManager(putManager({ id: selectedItem.id, name, status }))
    } else runFetchCreateManager(postManager({ name }))

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
  const filteredManagers = useMemo(() => {
    let result = mockManagersData

    if (searchName) {
      result = result.filter((manager) =>
        manager.name.toLowerCase().includes(searchName.toLowerCase()),
      )
    }

    return result
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
        field: 'store',
        headerName: 'Loja',
        flex: 2,
        editable: true,
      },
      {
        field: 'status',
        headerName: 'Status',
        flex: 2,
        editable: true,
      },
      {
        field: 'actions',
        headerName: '',
        flex: 0,
        sortable: false,
        renderCell: (params: GridRenderCellParams) => (
          <ActionMenu
            onDetails={() => {
              setSelectedItem(params.row)
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
      message:
        responseCreateManager.message || 'Operação realizada com sucesso!',
    })
    void queryClient.invalidateQueries({
      queryKey: ['/stores'],
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
      message: 'Operação realizada com sucesso!',
    })
    void queryClient.invalidateQueries({
      queryKey: ['/manager'],
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
          onClick={() => setShowEspecificModal('create')}
        />
      </S.BoxFilters>

      {filteredManagers.length === 0 ? (
        <IconsComponent type="Empty">
          <p>{'Nenhum gerente encontrado'}</p>
        </IconsComponent>
      ) : (
        <DatagridComponent
          isNotMobileFixed
          disableColumnMenu
          columns={columns}
          rows={filteredManagers}
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

      <LoadingMask isLoading={isLoadingCreateManager || isLoadingEditManager} />
    </S.Wrapper>
  )
}
