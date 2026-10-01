import { useState } from 'react'
import * as S from './styles'
import { NotificationsCard } from '@/components/notifications/NotificationsCard'
import { Pagination } from '@mui/material'

import ProductionQuantityLimitsOutlinedIcon from '@mui/icons-material/ProductionQuantityLimitsOutlined'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined'
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'

const mockNotifications = [
  {
    id: 1,
    icon: <ProductionQuantityLimitsOutlinedIcon />,
    message: '22 produtos com risco de perda em toda a região',
    date: 'Há 13 minutos',
  },
  {
    id: 2,
    icon: <LocalShippingOutlinedIcon />,
    message: '13 pedidos de lojas diferentes estão em andamento',
    date: 'Há 21 minutos',
  },
  {
    id: 3,
    icon: <LocalOfferOutlinedIcon />,
    message: 'Promoção aprovada com sucesso na Swift - Valinhos',
    date: 'Há 42 minutos',
  },
  {
    id: 4,
    icon: <Inventory2OutlinedIcon />,
    message: 'Estoque baixo em 5 lojas da região',
    date: 'Há 49 minutos',
  },
  {
    id: 5,
    icon: <CalendarMonthOutlinedIcon />,
    message: '8 produtos próximos do vencimento nesta semana',
    date: 'Há 1h30',
  },
  {
    id: 6,
    icon: <LocalShippingOutlinedIcon />,
    message: 'Pedido da loja Swift - Guarulhos está atrasado',
    date: 'Há 1h30',
  },
  {
    id: 7,
    icon: <LocalOfferOutlinedIcon />,
    message: '3 sugestões de promoção aguardam aprovação',
    date: 'Há 1h41',
  },
  {
    id: 8,
    icon: <Inventory2OutlinedIcon />,
    message: 'Demanda alta prevista para 6 produtos',
    date: 'Há 1h41',
  },
]

export const NotificationsPartial = () => {
  const [page, setPage] = useState(1)
  const itemsPerPage = 5

  const totalPages = Math.ceil(mockNotifications.length / itemsPerPage)

  const currentNotifications = mockNotifications.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  )

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value)
  }

  return (
    <S.Wrapper>
      <S.NotificationsList>
        {currentNotifications.map((notification) => (
          <NotificationsCard
            key={notification.id}
            icon={notification.icon}
            message={notification.message}
            date={notification.date}
          />
        ))}
      </S.NotificationsList>

      <S.PaginationWrapper>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          shape="rounded"
        />
      </S.PaginationWrapper>
    </S.Wrapper>
  )
}
