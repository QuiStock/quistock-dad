import { useId, useState, type MouseEvent } from 'react'
import { IconButton, Menu } from '@mui/material'
import { ArticleOutlined, MoreVertOutlined } from '@mui/icons-material'

import * as S from './styles'

interface IRowActionMenuProps {
  onDetails: () => void
  label?: string
}

const RowActionMenu = ({
  onDetails,
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
    onDetails()
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
        <S.StyledItemFloatMenu onClick={handleDetails}>
          <ArticleOutlined />
          <S.TextItemMenuFloat>Detalhes</S.TextItemMenuFloat>
        </S.StyledItemFloatMenu>
      </Menu>
    </>
  )
}

export { RowActionMenu }
