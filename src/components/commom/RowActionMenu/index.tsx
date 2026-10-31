import { useId, useState, type MouseEvent } from 'react'
import { IconButton, Menu } from '@mui/material'
import {
  ArticleOutlined,
  MoreVertOutlined,
  OpenInNewOutlined,
} from '@mui/icons-material'

import * as S from './styles'

interface IRowActionMenuProps {
  onDetails?: () => void
  onViewPage?: () => void
  label?: string
}

const RowActionMenu = ({
  onDetails,
  onViewPage,
  label = 'Abrir ações',
}: IRowActionMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const menuId = useId()
  const open = Boolean(anchorEl)

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleDetails = (event: MouseEvent) => {
    event.stopPropagation()
    handleClose()
    onDetails?.()
  }

  const handleViewPage = (event: MouseEvent) => {
    event.stopPropagation()
    handleClose()
    onViewPage?.()
  }

  return (
    <>
      <IconButton
        aria-label={label}
        aria-controls={open ? menuId : undefined}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={handleClick}
      >
        <MoreVertOutlined />
      </IconButton>
      <Menu id={menuId} anchorEl={anchorEl} open={open} onClose={handleClose}>
        {onDetails && (
          <S.StyledItemFloatMenu onClick={handleDetails}>
            <ArticleOutlined />
            <S.TextItemMenuFloat>Detalhes</S.TextItemMenuFloat>
          </S.StyledItemFloatMenu>
        )}
        {onViewPage && (
          <S.StyledItemFloatMenu onClick={handleViewPage}>
            <OpenInNewOutlined />
            <S.TextItemMenuFloat>Ver detalhes</S.TextItemMenuFloat>
          </S.StyledItemFloatMenu>
        )}
      </Menu>
    </>
  )
}

export { RowActionMenu }
